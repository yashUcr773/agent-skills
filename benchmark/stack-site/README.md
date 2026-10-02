# Fernway Care Club

A members' area for Fernway customers: private plant care notes and reminders, photo uploads, and a shared feed of care tips.

Built with Next.js (App Router), Supabase for sign-in, the database, and file storage, and Firebase Firestore for the tips feed.

## Run it locally

You need Node 20 or newer and Docker.

```bash
npm install
npm run supabase:start     # local Supabase stack in Docker; the first run downloads several images
npm run firebase:start     # Firestore emulator in Docker
npm run local:env          # writes .env.local from the local Supabase stack
npm run seed               # creates three members with notes and reminders
npm run dev                # http://localhost:3000
```

Seeded accounts: `maya@example.test` / `password1`, `leo@example.test` / `password2`, `admin@fernway.test` / `admin123`.

Stop the services with `npm run supabase:stop` and `npm run firebase:stop`.

## Deploy

Deployed on Vercel. The scheduler in `vercel.json` calls the digest route every morning.
