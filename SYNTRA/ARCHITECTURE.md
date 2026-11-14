# SYNTRA architecture

## Runtime

- **Gateway:** OpenClaw Gateway is the primary session, channel, tool, and event control plane.
- **Android:** paired companion/device node for supported notifications, voice, and device-local actions. Android app permissions and OS background limits apply.
- **Windows:** OpenClaw host or supported runtime for desktop files and computer workflows.
- **Cloud (optional):** always-on Gateway host; use private networking and authenticated access. Do not expose an unauthenticated gateway to the public internet.
- **Hermes:** optional specialist agent for delegated research or task execution after its repository is populated and its interfaces are reviewed. The current private `hermes-agent-main` repository contains only a minimal README, so it is not yet a runnable dependency.

## WhatsApp

Start with the WhatsApp channel supported by the pinned OpenClaw release. Pair the owner's account using the documented onboarding flow. Treat linked-device sessions as credentials: store them in the runtime's private state directory, exclude them from Git and backups shared with others, and rotate/revoke them if compromised.

WhatsApp availability and permitted automation depend on the selected integration, account type, platform rules, and applicable messaging policies. Do not promise arbitrary call control: WhatsApp voice-call automation is not equivalent to chat messaging and requires a separately supported integration.

## Request lifecycle

1. Receive an inbound event.
2. Authenticate sender and apply DM/group allowlists.
3. Classify intent and risk.
4. Retrieve only the minimum relevant memory and tools.
5. Execute a read-only or pre-authorized routine action, or request owner confirmation for a consequential action.
6. Record a redacted audit event and return the result to the originating session.

## Model and memory

Use a supported provider configured through OpenClaw onboarding. Keep provider credentials in the runtime secret store/environment, never in tracked files. Memory should be inspectable, correctable, and backed up securely. Avoid storing authentication secrets or unnecessary sensitive personal information.

## Deployment stages

1. Local Windows proof of life and authenticated dashboard.
2. Owner-only WhatsApp pairing and message round-trip.
3. Android companion pairing and voice-note workflow.
4. Scoped tools, schedules, and memory.
5. Optional private cloud Gateway for availability when the PC is off.
