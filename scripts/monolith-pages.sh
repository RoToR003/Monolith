#!/usr/bin/env bash
# GPL-3.0-only. Local Pages build / request a secret-backed Actions deployment.
# Updated 2026-11-19: Pages now deploys an Actions artifact, not a gh-pages push.
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
ACTION="${1:-build}"
if [[ "$ACTION" != build && "$ACTION" != deploy ]]; then
  echo 'Usage: bash scripts/monolith-pages.sh {build|deploy}' >&2
  exit 2
fi
SOURCE_BRANCH='monolith/baseline'
REMOTE_URL='https://github.com/RoToR003/Monolith.git'
export MONOLITH_SOURCE_COMMIT="$(git rev-parse HEAD)"

if [[ "$ACTION" == deploy ]]; then
  [[ "$(git branch --show-current)" == "$SOURCE_BRANCH" ]] || {
    echo "Switch to $SOURCE_BRANCH before requesting deployment." >&2; exit 1;
  }
  [[ -z "$(git status --porcelain)" ]] || {
    echo 'Commit all source changes before deployment; the GPL source link must match the build.' >&2; exit 1;
  }
  remote_source="$(git ls-remote "$REMOTE_URL" "refs/heads/$SOURCE_BRANCH" | cut -f1)"
  [[ "$remote_source" == "$MONOLITH_SOURCE_COMMIT" ]] || {
    echo "Push the current source commit to $SOURCE_BRANCH first; that push triggers deployment automatically." >&2; exit 1;
  }
  command -v gh >/dev/null 2>&1 || {
    echo 'For a manual rebuild, install/authenticate GitHub CLI or use the repository Actions page.' >&2; exit 1;
  }
  gh workflow run monolith-pages.yml --repo RoToR003/Monolith --ref "$SOURCE_BRANCH"
  echo 'Requested the secret-backed GitHub Actions build. Check Actions → Monolith Pages for its result.'
  echo 'No Telegram API credentials were read from GitHub or displayed by this command.'
  exit 0
fi

CACHE_ROOT="${XDG_CACHE_HOME:-$HOME/.cache}"
export PATH="$CACHE_ROOT/monolith-toolchain/node_modules/.bin:$PATH"
export MONOLITH_PAGES=1
export MONOLITH_BASE_PATH="${MONOLITH_BASE_PATH:-/Monolith/}"
bash scripts/monolith.sh build
node scripts/monolith-pages-check.mjs
