#!/bin/sh
# Copy the benchmark site into a fresh git repository outside this one, so the
# agent under test cannot see the answer key and has a clean baseline to diff.
#
#   benchmark/setup.sh <target-dir>                 # site at its baseline commit
#   benchmark/setup.sh <target-dir> --with-change   # plus the seeded bad change, uncommitted
#   benchmark/setup.sh <target-dir> --clean-change  # plus a correct change, uncommitted
#   benchmark/setup.sh <target-dir> --reaudit       # plus the owner's partial fixes (committed)
#                                                   # and the earlier findings file
#   benchmark/setup.sh <target-dir> --stack         # the Next.js, Supabase, and Firebase site instead
#
# Set PORT to give a copy of the shop its own port, so several copies can run side by side:
#   PORT=4101 benchmark/setup.sh <target-dir>
set -e

here="$(cd "$(dirname "$0")" && pwd)"
target="$1"
variant="$2"

if [ -z "$target" ]; then
  echo "usage: setup.sh <target-dir> [--with-change | --clean-change | --reaudit | --stack]" >&2
  exit 2
fi
if [ -e "$target" ]; then
  echo "$target already exists; choose a new directory" >&2
  exit 1
fi

commit() {
  git add -A
  git -c user.name="Fernway" -c user.email="dev@fernway.test" commit -q -m "$1"
}

if [ "$variant" = "--stack" ]; then
  mkdir -p "$target"
  cp -R "$here/stack-site/." "$target/"
  cd "$target"
  rm -rf node_modules .next .env.local supabase/.temp supabase/.branches package-lock.json
  git init -q
  commit "Fernway Care Club"
  echo "Stack benchmark site ready in $target"
  echo "See its README.md for how to run it (needs Docker)."
  exit 0
fi

mkdir -p "$target"
cp -R "$here/site/." "$target/"
cd "$target"
rm -rf node_modules dist data package-lock.json

if [ -n "$PORT" ] && [ "$PORT" != "4000" ]; then
  for file in server/index.js src/api.js .env; do
    sed "s/4000/$PORT/g" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  done
fi

git init -q
commit "Fernway Plants shop"
# Keep installed and generated files out of `git status` without adding the
# .gitignore the project is missing.
printf 'node_modules/\ndist/\ndata/\npackage-lock.json\n' >> .git/info/exclude

case "$variant" in
  --with-change)
    git apply "$here/changes/001-order-notes.patch"
    echo "Applied the seeded bad change as uncommitted edits."
    ;;
  --clean-change)
    git apply "$here/changes/002-stock-label.patch"
    echo "Applied the clean change as uncommitted edits."
    ;;
  --reaudit)
    git apply "$here/changes/003-partial-fixes.patch"
    commit "Fix audit findings"
    cp "$here/reaudit/website-audit-findings.md" .
    echo "Committed the owner's fixes and copied the earlier findings file."
    ;;
  "")
    ;;
  *)
    echo "unknown option: $variant" >&2
    exit 2
    ;;
esac

echo "Benchmark site ready in $target"
echo "Run it with: npm install && npm run build && npm start   (http://localhost:4000)"
