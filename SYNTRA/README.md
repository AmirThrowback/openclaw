# SYNTRA

**Your personal autonomous AI operating system.**

SYNTRA is the personal-assistant layer built on top of this OpenClaw fork. It keeps upstream OpenClaw intact and adds an owner-specific product plan, configuration templates, safety policy, and integration roadmap.

## Target setup

- **Devices:** Windows PC + Android phone + optional always-on cloud host.
- **Primary channel:** WhatsApp.
- **Automation:** high autonomy for routine, reversible tasks.
- **Control:** owner-only commands, explicit allowlists, audit trail, and confirmation for consequential actions.
- **Agent runtime:** OpenClaw Gateway; Hermes is evaluated as a complementary specialist runtime, not blindly merged into the gateway.

## What SYNTRA is intended to do

1. Answer the owner's WhatsApp messages and voice notes.
2. Research user-requested topics and return sourced summaries.
3. Draft and send routine replies within approved contact and content rules.
4. Run scheduled workflows and report their outcomes.
5. Work across approved files and desktop workflows when a paired device/host is online.
6. Maintain durable, inspectable personal memory.

## Repository layout

- `SYNTRA/ARCHITECTURE.md` — system boundaries and deployment topology.
- `SYNTRA/SECURITY.md` — autonomy, identity, and action policy.
- `SYNTRA/.env.example` — names of required configuration values; never put real secrets here.
- `SYNTRA/ROADMAP.md` — staged implementation plan.

## First-run status

This branch is an integration bootstrap, not a deployed assistant. No WhatsApp account is linked, no model credentials are configured, and no messages have been sent. Follow the upstream OpenClaw installation guide first, then the SYNTRA roadmap.

## Safety baseline

A WhatsApp message is untrusted input until its sender is authenticated and authorized. Routine actions may be automated only inside explicit scope. Payments, purchases, account/security changes, bulk messaging, deletion, and other high-impact or irreversible actions require a fresh owner confirmation.

Never commit API keys, session files, QR codes, WhatsApp auth state, personal data, or production configuration.
