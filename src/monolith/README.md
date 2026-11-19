# Monolith modules — next stage

This directory is reserved for Monolith-specific client modules.

Stage 0 deliberately keeps the upstream Telegram protocol and message behavior unchanged:
no MTProto interception, no message retention, no extra telemetry, no account session export,
and no background watcher. A small defensive sign-in country lookup fix is documented in MONOLITH.md.

Add features in small, separately testable steps, with explicit settings and conservative defaults.
Introduce a typed hooks facade only when the first actual integration point is implemented.

See `MONOLITH.md` for setup, limitations, verification and the pinned upstream revision.
The original project specification in `docs/monolith-specification.uk.md` is a proposal, not a
list of implemented features or independently verified guarantees.
