# Stack-specific operations checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Vercel deployment settings.** Check environment variables per environment, deployment protection for previews, the function region relative to the database, function duration and memory limits against real workloads, cron job configuration, and spend alerts or limits.
- **Supabase project operations.** Check backup availability on the plan in use and whether point-in-time recovery is needed, whether a free-tier project can be paused after inactivity, separate projects or branches for development and production, and who holds owner access.
- **Firebase project operations.** Check the billing plan and budget alerts, remembering that an alert does not cap spend; separate projects for development and production; scheduled database backups or exports; and the roles granted on the underlying cloud project.
