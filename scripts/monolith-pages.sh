#!/usr/bin/env bash
# GPL-3.0-only. Monolith GitHub Pages deployment, added 2026-11-19.
# Builds locally, then updates only gh-pages with a normal (never forced) push.
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
ACTION="${1:-build}"
if [[ "$ACTION" != build && "$ACTION" != deploy ]]; then
  echo 'Usage: bash scripts/monolith-pages.sh {build|deploy}' >&2
  exit 2
fi
CACHE_ROOT="${XDG_CACHE_HOME:-$HOME/.cache}"
export PATH="$CACHE_ROOT/monolith-toolchain/node_modules/.bin:$PATH"
export MONOLITH_PAGES=1
export MONOLITH_BASE_PATH="${MONOLITH_BASE_PATH:-/Monolith/}"
export MONOLITH_SOURCE_COMMIT="$(git rev-parse HEAD)"
SOURCE_BRANCH='monolith/baseline'
PUBLISH_BRANCH='gh-pages'
REMOTE_URL='https://github.com/RoToR003/Monolith.git'
SITE_URL='https://rotor003.github.io/Monolith/'
SITE_DIR="$ROOT/.cache/monolith-pages/site"

if [[ "$ACTION" == deploy ]]; then
  [[ "$(git branch --show-current)" == "$SOURCE_BRANCH" ]] || {
    echo "Switch to $SOURCE_BRANCH before deploying." >&2; exit 1;
  }
  [[ -z "$(git status --porcelain)" ]] || {
    echo 'Commit all source changes before deployment; the GPL source link must match the build.' >&2; exit 1;
  }
  remote_source="$(git ls-remote "$REMOTE_URL" "refs/heads/$SOURCE_BRANCH" | cut -f1)"
  [[ "$remote_source" == "$MONOLITH_SOURCE_COMMIT" ]] || {
    echo "Push the current source commit to $SOURCE_BRANCH before deployment." >&2; exit 1;
  }
fi

bash scripts/monolith.sh build
node scripts/monolith-pages-check.mjs
[[ "$ACTION" == deploy ]] || exit 0

# A cache-only checkout keeps compiled assets out of the source repository/index
# and out of Arena snapshots. No source archive is created or served.
mkdir -p "$CACHE_ROOT"
PUBLISH_DIR="$(mktemp -d "$CACHE_ROOT/monolith-pages-publish.XXXXXXXX")"
trap 'rm -rf -- "$PUBLISH_DIR"' EXIT
git init --quiet --initial-branch="$PUBLISH_BRANCH" "$PUBLISH_DIR"
git -C "$PUBLISH_DIR" remote add origin "$REMOTE_URL"
remote_pages="$(git ls-remote "$REMOTE_URL" "refs/heads/$PUBLISH_BRANCH" | cut -f1)"
if [[ -n "$remote_pages" ]]; then
  git -C "$PUBLISH_DIR" fetch --quiet --depth=1 origin "refs/heads/$PUBLISH_BRANCH"
  git -C "$PUBLISH_DIR" checkout --quiet -B "$PUBLISH_BRANCH" FETCH_HEAD
fi
find "$PUBLISH_DIR" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf -- {} +
cp -a "$SITE_DIR/." "$PUBLISH_DIR/"
git -C "$PUBLISH_DIR" config user.name "$(git config user.name)"
git -C "$PUBLISH_DIR" config user.email "$(git config user.email)"
git -C "$PUBLISH_DIR" add --all
if git -C "$PUBLISH_DIR" diff --cached --quiet; then
  echo 'The published files already match this source commit.'
else
  git -C "$PUBLISH_DIR" -c commit.gpgsign=false commit --quiet -m "Deploy Monolith ${MONOLITH_SOURCE_COMMIT:0:12}"
  git -C "$PUBLISH_DIR" push origin "HEAD:refs/heads/$PUBLISH_BRANCH"
fi
export MONOLITH_PAGES_COMMIT="$(git -C "$PUBLISH_DIR" rev-parse HEAD)"
node -e 'const fs=require("node:fs");fs.writeFileSync(".cache/monolith-pages/deployment.json",JSON.stringify({sourceCommit:process.env.MONOLITH_SOURCE_COMMIT,pagesCommit:process.env.MONOLITH_PAGES_COMMIT,siteUrl:"https://rotor003.github.io/Monolith/",deployedAt:new Date().toISOString()},null,2)+"\n")'
printf '\nPublished branch: %s\nSource commit: %s\nSite (after GitHub finishes publishing): %s\n' "$PUBLISH_BRANCH" "$MONOLITH_SOURCE_COMMIT" "$SITE_URL"
