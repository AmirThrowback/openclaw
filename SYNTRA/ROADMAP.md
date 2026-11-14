# SYNTRA implementation roadmap

## Phase 1 — foundation
- [x] Reserve a dedicated feature branch without modifying upstream main.
- [x] Add product architecture, security baseline, and setup placeholders.
- [ ] Confirm the exact Windows host version, available always-on machine, and model provider.
- [ ] Install and run the fork locally; verify Gateway and Control UI.

## Phase 2 — WhatsApp owner channel
- [ ] Pair the owner's WhatsApp account using documented OpenClaw onboarding.
- [ ] Enforce owner-only DM access and verify unknown-sender denial.
- [ ] Test inbound text, outbound reply, reconnect, and session revocation.
- [ ] Confirm account and integration policy compliance.

## Phase 3 — Android + voice
- [ ] Pair Android companion/device node.
- [ ] Test voice-note transcription and spoken responses.
- [ ] Document Android battery/background and permission constraints.

## Phase 4 — agent tools and memory
- [ ] Enable research and approved file workflows.
- [ ] Add inspectable memory and correction/retention controls.
- [ ] Add scheduled tasks with audit events and failure notifications.
- [ ] Evaluate Hermes as a delegated worker only after its source/runtime is available.

## Phase 5 — availability and hardening
- [ ] Decide whether a private cloud host is needed when Windows is offline.
- [ ] Configure private remote access, backups, monitoring, and recovery.
- [ ] Test pause switch, secret rotation, least privilege, and incident recovery.

## Acceptance criteria
- Owner can send a WhatsApp message and receive a correct assistant response.
- Unknown senders cannot invoke tools.
- Routine tasks run only within configured scope.
- Consequential actions pause for confirmation.
- Gateway can restart without losing authorized configuration or exposing secrets.
- A human-readable audit trail exists for executed actions.
