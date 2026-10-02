#!/bin/sh
# Write .env.local from the running local Supabase stack.
set -e
cd "$(dirname "$0")/.."

status="$(npx supabase status -o env)"
value() {
  printf '%s\n' "$status" | sed -n "s/^$1=\"\\{0,1\\}\\([^\"]*\\)\"\\{0,1\\}\$/\\1/p" | head -n 1
}

cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=$(value API_URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY=$(value ANON_KEY)
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=$(value SERVICE_ROLE_KEY)

NEXT_PUBLIC_FIREBASE_API_KEY=demo-fernway-web-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-fernway
NEXT_PUBLIC_FIRESTORE_EMULATOR=127.0.0.1:8080
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
EOF

echo "Wrote .env.local"
