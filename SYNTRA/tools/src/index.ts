import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";

const configSchema = Type.Object({
  workspaceDir: Type.Optional(Type.String({
    minLength: 1,
    description: "Absolute path for SYNTRA's private data directory. Defaults to the OpenClaw workspace.",
  })),
}, { additionalProperties: false });

type PluginConfig = {
  workspaceDir?: string;
};

function getRoot(config: PluginConfig): string {
  const root = config.workspaceDir?.trim() || process.cwd();
  if (!path.isAbsolute(root)) {
    throw new Error("SYNTRA workspaceDir must be an absolute path.");
  }
  return path.resolve(root, ".syntra");
}

async function ensureStore(config: PluginConfig, kind: "notes" | "tasks"): Promise<string> {
  const dir = path.join(getRoot(config), kind);
  await mkdir(dir, { recursive: true, mode: 0o700 });
  return dir;
}

function assertId(id: string): void {
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    throw new Error("Invalid item ID.");
  }
}

function tokenize(expression: string): string[] {
  const tokens = expression.match(/\d+(?:\.\d+)?|[()+\-*/^]/g);
  if (!tokens || tokens.join("") !== expression.replace(/\s+/g, "")) {
    throw new Error("Use only numbers, parentheses, +, -, *, / and ^.");
  }
  if (tokens.length > 100) throw new Error("Expression is too long.");
  return tokens;
}

function calculate(expression: string): number {
  const tokens = tokenize(expression);
  let index = 0;

  function primary(): number {
    const token = tokens[index++];
    if (token === "+" || token === "-") {
      const value = primary();
      return token === "-" ? -value : value;
    }
    if (token === "(") {
      const value = sum();
      if (tokens[index++] !== ")") throw new Error("Missing closing parenthesis.");
      return value;
    }
    if (!token || !/^\d+(?:\.\d+)?$/.test(token)) {
      throw new Error("Expected a number.");
    }
    return Number(token);
  }

  function power(): number {
    const left = primary();
    if (tokens[index] === "^") {
      index++;
      return left ** unary();
    }
    return left;
  }

  function unary(): number {
    if (tokens[index] === "+" || tokens[index] === "-") {
      const sign = tokens[index++] === "-" ? -1 : 1;
      return sign * unary();
    }
    return power();
  }

  function product(): number {
    let value = unary();
    while (tokens[index] === "*" || tokens[index] === "/") {
      const op = tokens[index++];
      const rhs = unary();
      if (op === "/" && rhs === 0) throw new Error("Division by zero.");
      value = op === "*" ? value * rhs : value / rhs;
    }
    return value;
  }

  function sum(): number {
    let value = product();
    while (tokens[index] === "+" || tokens[index] === "-") {
      const op = tokens[index++];
      const rhs = product();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  const result = sum();
  if (index !== tokens.length || !Number.isFinite(result)) {
    throw new Error("Invalid expression or non-finite result.");
  }
  return Number(result.toPrecision(12));
}

export default defineToolPlugin({
  id: "syntra-tools",
  name: "SYNTRA Tools",
  description: "A single integrated set of safe calculation, private notes, tasks, and workspace status tools.",
  configSchema,
  tools: (tool) => [
    tool({
      name: "syntra_calculate",
      label: "SYNTRA Calculator",
      description: "Evaluate a basic arithmetic expression. Supports +, -, *, /, ^ and parentheses. Does not execute code.",
      parameters: Type.Object({
        expression: Type.String({ minLength: 1, maxLength: 200 }),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        expression: Type.String(),
        result: Type.Number(),
      }, { additionalProperties: false }),
      execute: ({ expression }) => ({
        expression,
        result: calculate(expression),
      }),
    }),
    tool({
      name: "syntra_note_save",
      label: "Save SYNTRA Note",
      description: "Save a private note in SYNTRA's local workspace. Creates a new note; does not overwrite existing notes.",
      optional: true,
      parameters: Type.Object({
        title: Type.String({ minLength: 1, maxLength: 120 }),
        content: Type.String({ minLength: 1, maxLength: 12000 }),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        id: Type.String(),
        title: Type.String(),
        saved: Type.Boolean(),
      }, { additionalProperties: false }),
      async execute({ title, content }, config) {
        const dir = await ensureStore(config, "notes");
        const id = randomUUID();
        const safeTitle = title.replace(/[\r\n\t]/g, " ").trim();
        await writeFile(path.join(dir, id + ".md"), "# " + safeTitle + "\n\n" + content + "\n", {
          encoding: "utf8",
          flag: "wx",
          mode: 0o600,
        });
        return { id, title: safeTitle, saved: true };
      },
    }),
    tool({
      name: "syntra_notes_list",
      label: "List SYNTRA Notes",
      description: "List note IDs and titles saved in SYNTRA's private workspace.",
      parameters: Type.Object({}, { additionalProperties: false }),
      outputSchema: Type.Object({
        notes: Type.Array(Type.Object({
          id: Type.String(),
          title: Type.String(),
        }, { additionalProperties: false })),
      }, { additionalProperties: false }),
      async execute(_args, config) {
        const dir = await ensureStore(config, "notes");
        const files = (await readdir(dir)).filter((name) => /^[0-9a-f-]{36}\.md$/i.test(name));
        const notes = [];
        for (const file of files.slice(0, 100)) {
          const body = await readFile(path.join(dir, file), "utf8");
          notes.push({
            id: file.slice(0, -3),
            title: body.split("\n")[0].replace(/^#\s*/, "").slice(0, 120),
          });
        }
        return { notes };
      },
    }),
    tool({
      name: "syntra_note_read",
      label: "Read SYNTRA Note",
      description: "Read one note by its ID from SYNTRA's private notes store.",
      parameters: Type.Object({
        id: Type.String({ minLength: 36, maxLength: 36 }),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        id: Type.String(),
        content: Type.String(),
      }, { additionalProperties: false }),
      async execute({ id }, config) {
        assertId(id);
        const file = path.join(await ensureStore(config, "notes"), id + ".md");
        return { id, content: await readFile(file, "utf8") };
      },
    }),
    tool({
      name: "syntra_task_add",
      label: "Add SYNTRA Task",
      description: "Add a task to SYNTRA's private local task list.",
      optional: true,
      parameters: Type.Object({
        title: Type.String({ minLength: 1, maxLength: 240 }),
        due: Type.Optional(Type.String({ maxLength: 80, description: "Optional due date or time as plain text." })),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        id: Type.String(),
        title: Type.String(),
        status: Type.String(),
      }, { additionalProperties: false }),
      async execute({ title, due }, config) {
        const dir = await ensureStore(config, "tasks");
        const id = randomUUID();
        const task = { id, title: title.trim(), due: due?.trim() || null, status: "open", createdAt: new Date().toISOString() };
        await writeFile(path.join(dir, id + ".json"), JSON.stringify(task, null, 2), {
          encoding: "utf8",
          flag: "wx",
          mode: 0o600,
        });
        return { id, title: task.title, status: task.status };
      },
    }),
    tool({
      name: "syntra_task_list",
      label: "List SYNTRA Tasks",
      description: "List tasks in SYNTRA's private local task list.",
      parameters: Type.Object({
        status: Type.Optional(Type.Union([Type.Literal("open"), Type.Literal("done"), Type.Literal("all")])),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        tasks: Type.Array(Type.Object({
          id: Type.String(),
          title: Type.String(),
          due: Type.Union([Type.String(), Type.Null()]),
          status: Type.String(),
        }, { additionalProperties: false })),
      }, { additionalProperties: false }),
      async execute({ status = "open" }, config) {
        const dir = await ensureStore(config, "tasks");
        const files = (await readdir(dir)).filter((name) => /^[0-9a-f-]{36}\.json$/i.test(name));
        const tasks = [];
        for (const file of files.slice(0, 200)) {
          const task = JSON.parse(await readFile(path.join(dir, file), "utf8"));
          if (status === "all" || task.status === status) {
            tasks.push({ id: task.id, title: task.title, due: task.due, status: task.status });
          }
        }
        return { tasks };
      },
    }),
    tool({
      name: "syntra_task_complete",
      label: "Complete SYNTRA Task",
      description: "Mark one task as complete by its ID.",
      optional: true,
      parameters: Type.Object({
        id: Type.String({ minLength: 36, maxLength: 36 }),
      }, { additionalProperties: false }),
      outputSchema: Type.Object({
        id: Type.String(),
        status: Type.String(),
      }, { additionalProperties: false }),
      async execute({ id }, config) {
        assertId(id);
        const file = path.join(await ensureStore(config, "tasks"), id + ".json");
        const task = JSON.parse(await readFile(file, "utf8"));
        task.status = "done";
        task.completedAt = new Date().toISOString();
        const temp = file + ".tmp";
        await writeFile(temp, JSON.stringify(task, null, 2), { encoding: "utf8", mode: 0o600 });
        await rename(temp, file);
        return { id, status: "done" };
      },
    }),
    tool({
      name: "syntra_workspace_status",
      label: "SYNTRA Workspace Status",
      description: "Report whether SYNTRA's private notes and tasks folders exist and how many items they contain.",
      parameters: Type.Object({}, { additionalProperties: false }),
      outputSchema: Type.Object({
        workspace: Type.String(),
        notes: Type.Number(),
        tasks: Type.Number(),
      }, { additionalProperties: false }),
      async execute(_args, config) {
        const root = getRoot(config);
        const notesDir = await ensureStore(config, "notes");
        const tasksDir = await ensureStore(config, "tasks");
        const notes = (await readdir(notesDir)).filter((name) => name.endsWith(".md")).length;
        const tasks = (await readdir(tasksDir)).filter((name) => name.endsWith(".json")).length;
        return { workspace: root, notes, tasks };
      },
    }),
  ],
});
