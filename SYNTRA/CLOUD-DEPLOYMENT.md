# SYNTRA Cloud Deployment Plan

## Decision

SYNTRA is intended to remain available 24/7 even when the owner's Windows 11 PC is powered off. Use a cloud-hosted OpenClaw Gateway as the always-on control plane, with Android and Windows acting as companion devices/nodes.

This document is a deployment plan only. No VPS has been purchased, no server has been provisioned, no WhatsApp account has been paired, and no live service is running.

## Target topology

```text
                    Owner
                     |
             WhatsApp / Android
                     |
              secure outbound
                     |
          +----------------------+
          |   SYNTRA Cloud VPS   |
          |                      |
          | OpenClaw Gateway     |
          | Agent + tool policy  |
          | Schedules / memory   |
          | Audit + health checks|
          +----------------------+
                 /        \
        secure outbound   secure outbound
              /              \
    Android companion     Windows 11 node
    notifications/voice   desktop/files/tasks
```

The cloud Gateway remains online independently of either personal device. Companion devices reconnect when available. Windows-only operations are unavailable while the PC is off or disconnected; cloud-native research, scheduling, and messaging can continue subject to configured permissions and service availability.

## Hosting requirements

- A supported Linux VPS with a stable public IP or hostname.
- A maintained Node.js runtime compatible with the pinned OpenClaw release and its package manager.
- HTTPS/TLS for any exposed web endpoint; do not expose unauthenticated control ports.
- Firewall allowing only required inbound traffic. Prefer outbound device connections and private access for administration.
- Persistent encrypted storage for Gateway configuration and WhatsApp session state.
- Automated encrypted backups, tested restore procedure, log rotation, uptime monitoring, and security updates.
- A dedicated non-root service account and least-privilege filesystem permissions.

## Secrets and account safety

- Never commit API keys, provider tokens, WhatsApp session files, QR contents, passwords, or private keys.
- Keep secrets in the VPS secret store or a root-readable environment file outside the Git checkout.
- Restrict dashboard and Gateway access with strong authentication; use an SSH tunnel or VPN for administration where practical.
- Pair WhatsApp only from the owner's device during the deployment session. Never send OTPs, QR codes, or session exports to chat.
- Allowlist the owner's account. Deny unknown senders and group commands by default.
- Log actions without logging message contents or credentials unnecessarily.

## Action permissions

- Tier 0: read-only research and status checks may run automatically.
- Tier 1: routine, reversible actions may run only within explicit limits and with audit records.
- Tier 2: publishing, bulk messaging, first-contact messages, account changes, and private-file sharing require owner approval.
- Tier 3: payments, purchases, transfers, credential/security changes, destructive deletion, and legal commitments require fresh explicit confirmation.

A global pause/revoke mechanism must be tested before enabling unattended operation.

## Deployment sequence

1. Select a VPS provider and monthly budget; compare region, bandwidth, backups, and support.
2. Confirm the exact OpenClaw release's runtime and installation requirements.
3. Provision a minimal Linux host, harden SSH, configure firewall, and apply updates.
4. Install and pin OpenClaw; configure the Gateway as a supervised service.
5. Configure authentication, owner allowlist, action policy, persistent encrypted state, backups, and monitoring.
6. Verify Gateway health and remote administration before connecting any messaging account.
7. Pair WhatsApp from the owner's phone and test with a controlled owner-only conversation.
8. Connect Android companion features; connect Windows 11 when the PC is available.
9. Test restart recovery, backup restore, device reconnect, audit trail, and emergency pause.
10. Enable only the automation tiers explicitly approved by the owner.

## Cost and operational notes

A 24/7 VPS normally has a recurring charge. Additional costs may include model/API usage, storage/backups, domain name, and messaging-related services. Actual cost depends on provider, server size, region, usage, and model choice. Do not provision or subscribe until the owner approves a provider and budget.

## Current status

- Architecture decision: cloud-first, 24/7 target.
- GitHub preparation: documentation only.
- VPS: not selected or provisioned.
- Gateway: not deployed.
- WhatsApp: not paired.
- Android and Windows nodes: not connected.
- Production readiness: not yet achieved.
