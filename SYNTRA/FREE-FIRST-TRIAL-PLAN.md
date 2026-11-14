# SYNTRA Free-First Trial Plan

## Goal

Validate SYNTRA before committing to paid hosting. Start with a local Windows 11 proof-of-concept, then evaluate a genuinely free always-on cloud option only if the local tests are successful.

## Phase 1 — Local proof-of-concept

When the Windows 11 PC is available:

1. Install OpenClaw using the official Windows installer and verify the installed version.
2. Complete onboarding with an AI provider route already available to the owner, if any. Note that free Gateway software does not imply free model inference; provider usage may be billed.
3. Keep the Gateway local and authenticated. Do not expose its control port to the public internet.
4. Test chat, research, safe read-only tools, and the owner approval flow.
5. Test routine actions only with a dedicated test contact and explicit limits.
6. Record reliability, response quality, latency, and any provider/API costs.

Official setup reference: https://docs.openclaw.ai/getting-started

## Phase 2 — WhatsApp and Android test

1. Pair WhatsApp only from the owner's own phone, using the supported onboarding flow.
2. Never share QR codes, OTPs, credentials, or session files in chat or GitHub.
3. Begin with owner-only tests. Unknown senders and group commands remain denied.
4. Test Android companion connectivity and notifications when the device is available.
5. Keep publishing, bulk messaging, payments, purchases, account changes, and destructive actions behind fresh owner approval.

WhatsApp pairing and AI provider usage may have separate costs or platform constraints; verify current terms before relying on them.

## Phase 3 — Free cloud evaluation

A possible candidate is Oracle Cloud Free Tier, which advertises Always Free compute services and a separate US$300 trial credit for up to 30 days. Trial credits are temporary and are not the same as permanent free hosting.

Before selecting any provider:
- Verify current eligibility, region capacity, compute limits, and account requirements.
- Check whether a payment card or phone verification is required.
- Confirm that the selected instance is explicitly marked Always Free; avoid accidentally creating paid resources.
- Set budget alerts/quotas where available and review usage regularly.
- Do not store production WhatsApp sessions or sensitive files on an untested host.

Provider information: https://www.oracle.com/cloud/free/

Free-tier availability, capacity, and terms can change. A free VPS is not guaranteed, and account approval or instance capacity may be unavailable.

## Phase 4 — Decision gate

After several days of testing, review:
- Answer quality and usefulness.
- WhatsApp reliability and policy compliance.
- Android and Windows connectivity.
- Uptime and recovery after restarts.
- Tool permissions and auditability.
- Actual model/API and hosting costs.

Only move to a paid VPS if the owner approves the provider, monthly budget, and deployment. Do not purchase, provision, or activate paid resources without explicit approval.

## Current status

- Free-first approach approved by owner.
- No cloud account or VPS provisioned by this project.
- No paid service activated.
- Local Windows setup pending PC availability.
- WhatsApp pairing pending owner-side setup.
- 24/7 operation remains a target, not an achieved capability.
