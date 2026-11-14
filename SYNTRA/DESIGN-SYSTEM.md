# SYNTRA Visual Design System

Status: approved visual direction for the Android companion UI.
Reference: user-approved dashboard image shared in the SYNTRA planning conversation.

## Brand identity

- Product name: SYNTRA
- Descriptor: Your Personal AI Tool
- Overall style: premium dark glassmorphism / Morphoglass, technical and restrained.
- Mood: professional AI control centre, not a gaming interface.

## Locked colour rules

- Background: deep navy / near-black.
- Primary interface colour: neon cyan / turquoise.
- Secondary interface colour: cool electric blue.
- Typography and neutral icons: white / cool grey.
- Orange is reserved for exactly two brand accents:
  1. SYNTRA wordmark / logo.
  2. The primary voice / microphone action button.
- Do not use orange for cards, borders, general icons, feature labels, background lighting, or decorative glows.
- Avoid yellow and warm gradients.
- Violet may be used only as a very subtle cool secondary glow, never as a dominant colour.

Suggested starting tokens (refine against the supplied reference during implementation):
- `--syntra-bg: #071521`
- `--syntra-surface: rgba(8, 35, 54, 0.72)`
- `--syntra-cyan: #00E5F2`
- `--syntra-blue: #168BFF`
- `--syntra-white: #F4FAFF`
- `--syntra-muted: #A8C2D3`
- `--syntra-orange-brand: #FF981F` (logo and voice action only)

## Dashboard composition

1. Header: SYNTRA logo, notification control, profile control.
2. Greeting: personalised greeting and short assistant prompt.
3. Assistant hero: 3D/animated assistant orb and voice interaction area.
4. Prompt row: text input, microphone action, optional quick action.
5. Quick actions: Coding, Image, Research (show only when implemented).
6. Tool grid:
   - AI Chat
   - My Tasks
   - My Files
   - PC Control
   - Automation
   - Workspace
7. System status: Android, Windows PC, WhatsApp.
8. Bottom navigation: Home, Chat, Voice, Tools, Settings.

## Component treatment

- Use translucent dark glass surfaces with subtle blur, cyan/blue edge lighting, and restrained shadows.
- Use cyan/blue outlines for feature cards and icons.
- Keep text contrast high and labels legible at common Android screen sizes.
- Use consistent corner radii, spacing, icon sizes, and touch targets.
- The central voice button is the only prominent orange UI control; keep its glow local to the button.
- Animations should be smooth and lightweight: orb idle pulse, voice listening waveform, and subtle card transitions. Respect reduced-motion settings.

## Functional truth and safety

- Visual status must reflect real connection state. Never show Windows PC as connected or WhatsApp as active before pairing and a successful health check.
- Hide or disable tools that are not implemented; do not imply that a mock control is functional.
- Consequential actions require owner confirmation. Keep permission and connection controls discoverable.
- Provide loading, empty, offline, error, and permission-denied states.

## Responsive and accessibility requirements

- Android-first, responsive layout; cards reflow rather than overflow on narrow screens.
- Support system font scaling and screen readers.
- Maintain readable contrast over blurred backgrounds.
- Minimum practical touch target: 48dp.
- Avoid relying on colour alone to communicate status.

## Acceptance checklist

- [ ] Orange appears only in the SYNTRA logo and primary voice button.
- [ ] All general UI accents are cyan/blue/white on deep navy.
- [ ] Dashboard matches the user-approved reference composition.
- [ ] UI adapts to narrow and large Android screens.
- [ ] Voice states (idle/listening/processing/speaking/error) are distinct.
- [ ] Device and channel status is based on actual connection checks.
- [ ] Unimplemented features are clearly marked or hidden.
- [ ] Accessibility and reduced-motion behaviour are covered.
