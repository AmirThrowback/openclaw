# SYNTRA Tools

This is the first executable SYNTRA extension package for the OpenClaw Gateway. It is part of the one SYNTRA project, not a separate app or dashboard.

## Included tools

| Tool | Purpose | Default access |
|---|---|---|
| `syntra_calculate` | Safe arithmetic parser; never evaluates JavaScript | Available when plugin enabled |
| `syntra_note_save` | Create a private Markdown note | Optional tool; owner must enable |
| `syntra_notes_list` | List saved notes | Available when plugin enabled |
| `syntra_note_read` | Read a note by generated ID | Available when plugin enabled |
| `syntra_task_add` | Add a local task | Optional tool; owner must enable |
| `syntra_task_list` | List open, done, or all tasks | Available when plugin enabled |
| `syntra_task_complete` | Mark a task done | Optional tool; owner must enable |
| `syntra_workspace_status` | Show local note/task counts | Available when plugin enabled |

Notes and tasks are stored below `.syntra/notes` and `.syntra/tasks` inside the configured workspace. They are not sent to a cloud service by this plugin. Do not place secrets in notes.

## Build on the Windows host

Run these commands from this directory after the OpenClaw repository and its dependencies are installed:

```powershell
npm install
npm run plugin:build
npm run plugin:validate
```

Then install/enable the built plugin using the OpenClaw plugin commands supported by the pinned host version. Verify with:

```powershell
openclaw plugins inspect syntra-tools --runtime --json
```

The plugin SDK is experimental. Keep the OpenClaw host pinned to the version in this package until the extension is tested against a newer release.

## Configuration

Set `workspaceDir` to an absolute directory owned by the SYNTRA service account. The plugin appends `.syntra` and creates private subdirectories with restrictive permissions. If omitted, the OpenClaw process working directory is used.

## Safety

- Calculator accepts arithmetic only; it does not use `eval`, shell, or arbitrary code execution.
- Note and task creation/completion tools are optional and must be explicitly enabled in OpenClaw.
- The plugin does not send messages, access WhatsApp sessions, browse arbitrary URLs, execute shell commands, or read arbitrary files.
- Tool availability is not proof of deployment. Build, validate, enable, and test on the target host before relying on it.
