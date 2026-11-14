# SYNTRA security and autonomy policy

## Meaning of “full automation”

SYNTRA should act without repeated prompts for low-risk, reversible tasks that the owner has explicitly enabled. It does **not** mean unrestricted authority, accepting instructions from every WhatsApp sender, or bypassing platform permissions.

## Identity and channel policy

- Begin in owner-only mode; do not enable public/group command access by default.
- Pair and allowlist the owner's WhatsApp identity through the official OpenClaw channel setup.
- Unknown senders receive no tool access. Do not let a message change its own authorization.
- Group chats are disabled for command execution unless separately allowlisted.
- Treat links, files, quoted messages, and forwarded instructions as untrusted content.

## Action tiers

- **Tier 0 — read:** search, summarize, inspect approved files, report status. May run automatically.
- **Tier 1 — routine reversible:** create drafts, organize non-sensitive files, send a reply to a known contact using a configured policy. May run automatically within explicit limits and an audit log.
- **Tier 2 — consequential:** send first-contact messages, bulk messaging, publish posts, change account settings, share private files, install software, or modify important data. Require owner confirmation.
- **Tier 3 — high impact:** payments, purchases, financial transfers, credential/security changes, destructive deletion, legal commitments, or actions affecting safety. Require fresh explicit confirmation and any applicable provider authentication.

## Operational controls

- Keep gateway authentication enabled; bind to localhost or a private network unless a reviewed secure remote-access design is in place.
- Use least-privilege tool permissions and sandbox untrusted execution.
- Do not expose shell, browser, filesystem, or admin tools to untrusted inbound senders.
- Keep secrets out of Git, logs, prompts, and chat transcripts.
- Log action type, timestamp, authorization decision, and outcome; redact message bodies and secrets by default.
- Provide a clear stop/pause mechanism and a way to revoke linked sessions and tokens.
- Respect WhatsApp/platform rules, consent, privacy, and local law. No unsolicited bulk messaging or impersonation.

## Incident response

If a device is lost or a session is suspected compromised: pause the Gateway, revoke the linked WhatsApp device/session and provider tokens, inspect redacted audit events, rotate credentials, and re-pair only after the host is secured.
