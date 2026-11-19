# Upstream CI templates — disabled for the initial import

These files are preserved from `morethanwords/tweb` at commit
`2e4bbb52b6aec5e95ee32e5c2882c1f05de32200` for reference:

- `production-image.yml`: an upstream Docker Hub release pipeline, including legacy Node.js 14 configuration and Docker Hub secrets.
- `push-review.yml`: an upstream review/notification workflow requiring third-party review-service and Telegram credentials.

They are intentionally outside `.github/workflows/`, so importing this development baseline
will not run either pipeline, publish Docker images, or call an external review/notification service.

No corresponding secrets have been created or copied. Before enabling CI for Monolith,
write or review a dedicated workflow, set explicit permissions, pin its toolchain/dependencies,
and approve any external service access. The original files are documentation, not active deployment configuration.
