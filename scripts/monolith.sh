#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
ACTION="${1:-setup}"
if [[ $# -gt 0 ]]; then shift; fi
CACHE_ROOT="${XDG_CACHE_HOME:-$HOME/.cache}"
TOOLCHAIN="$CACHE_ROOT/monolith-toolchain"
export PATH="$TOOLCHAIN/node_modules/.bin:$PATH"

supported_node() {
  command -v node >/dev/null 2>&1 && node -e '
    const [major, minor] = process.versions.node.split(".").map(Number);
    process.exit((major === 22 && minor >= 18) || major >= 24 ? 0 : 1);
  '
}

if ! supported_node || ! command -v pnpm >/dev/null 2>&1 || [[ "$(pnpm --version)" != '11.16.0' ]]; then
  echo 'Preparing isolated Node.js 24.11.1 and pnpm 11.16.0 (no global changes)...'
  command -v npm >/dev/null 2>&1 || { echo 'Install Node.js/npm first.' >&2; exit 1; }
  npm install --prefix "$TOOLCHAIN" --no-audit --no-fund node@24.11.1 pnpm@11.16.0
  export PATH="$TOOLCHAIN/node_modules/.bin:$PATH"
fi

# Disable upstream's background lint/typecheck processes and file-rewriting watchers.
# Checks remain available as explicit commands; neither flag supplies account credentials.
export TWEB_PREVIEW=1
export TWEB_E2E=1
export TWEB_TEST_QUEUE=0
export RAYON_NUM_THREADS="${RAYON_NUM_THREADS:-1}"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}"
# pnpm 11 verifies/auto-installs before exec; keep its store consistent with setup.
export npm_config_store_dir="$CACHE_ROOT/pnpm-store"
export pnpm_config_verify_deps_before_run=never

restore_git_metadata() {
  # Arena snapshots intentionally omit .git/config, including public remotes.
  # Restore credential-free remote URLs only; never request tokens or replace an existing origin.
  if [[ -f .git/HEAD ]]; then
    if [[ -f .git/config.worktree ]]; then
      git config --local core.repositoryformatversion 1
      git config --local extensions.worktreeConfig true
    fi
    if ! git remote get-url origin >/dev/null 2>&1 && [[ -f monolith.upstream.json ]]; then
      local origin_url
      origin_url="$(node -e 'const m=require("./monolith.upstream.json");const u=m.github?.cloneUrl||"";if(u&&!/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\.git$/.test(u))throw Error("Invalid origin URL");process.stdout.write(u)')"
      if [[ -n "$origin_url" ]]; then git remote add origin "$origin_url"; fi
    fi
    if ! git remote get-url upstream >/dev/null 2>&1; then
      git remote add upstream https://github.com/morethanwords/tweb.git
    fi
    if find .git/objects/pack -maxdepth 1 -name '*.promisor' -print -quit 2>/dev/null | grep -q .; then
      git config --local remote.upstream.promisor true
      git config --local remote.upstream.partialclonefilter blob:none
    fi
    git submodule init src/opus-recorder >/dev/null 2>&1 || true
  fi
}

ensure_sources() {
  restore_git_metadata
  # Arena omits every directory named dist/out from snapshots, even tracked vendor
  # runtimes. Preserve those files in a small source-side archive and restore on demand.
  if [[ -f assets/monolith/vendor-runtime.json ]]; then
    if ! node -e 'const fs=require("fs");const m=require("./assets/monolith/vendor-runtime.json");process.exit(m.files.every(f=>fs.existsSync(f))?0:1)'; then
      echo 'Restoring pinned upstream vendor runtime files...'
      node -e 'const fs=require("fs"),crypto=require("crypto"),m=require("./assets/monolith/vendor-runtime.json");if(crypto.createHash("sha256").update(fs.readFileSync(m.archive)).digest("hex")!==m.sha256)throw Error("Vendor runtime archive checksum mismatch")'
      tar -xzf assets/monolith/vendor-runtime.tar.gz -C "$ROOT"
    fi
  fi
  if [[ ! -f src/opus-recorder/dist/recorder.min.js ]]; then
    git submodule update --init --depth 1 src/opus-recorder
  fi
}

install_dependencies() {
  CI=true pnpm install --frozen-lockfile --store-dir "$CACHE_ROOT/pnpm-store" --network-concurrency 6 --child-concurrency 2
}

case "$ACTION" in
  setup)
    ensure_sources
    install_dependencies
    echo "Ready: Node $(node --version), pnpm $(pnpm --version)."
    echo 'Development: bash scripts/monolith.sh dev'
    ;;
  dev|build|serve|test|check|smoke)
    ensure_sources
    if [[ ! -x node_modules/.bin/vite ]]; then install_dependencies; fi
    case "$ACTION" in
      dev) exec node node_modules/vite/bin/vite.js --config vite.monolith.config.ts "$@" ;;
      build) exec node node_modules/vite/bin/vite.js build --config vite.monolith.config.ts "$@" ;;
      serve)
        if [[ ! -f dist/index.html ]]; then
          node node_modules/vite/bin/vite.js build --config vite.monolith.config.ts
        fi
        exec node scripts/monolith-server.cjs "$@"
        ;;
      test) exec pnpm exec vitest run --maxWorkers=1 "$@" ;;
      check) exec pnpm run typecheck "$@" ;;
      smoke) exec node scripts/monolith-smoke.cjs "$@" ;;
    esac
    ;;
  *)
    echo 'Usage: bash scripts/monolith.sh {setup|dev|build|serve|test|check|smoke}' >&2
    exit 2
    ;;
esac
