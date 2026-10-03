# Deployment, observability, and email operations

Quick pass: Environments; Backups; Operator access; Cost controls; Error tracking and logs; Form delivery.

Severity examples: critical — there is no usable backup of production data, or production secrets are reachable by the public; high — a deploy cannot be rolled back, or an outage would go unnoticed; medium — missing health checks, noisy or sensitive logs, or undelivered contact email; low — documentation gaps.

## Establish environments and operational ownership

Map the current development, staging, and production environments, deployment path, runtime/services, storage, email provider, monitoring, and access. Inspect existing configuration before proposing infrastructure. Ask about reliability goals, environment exposure, retention, delivery destinations, and live-action authority only where they affect the requested work.

Audit with read-only evidence. Code/configuration preparation is distinct from changing DNS, deploying, rotating keys, applying production migrations, sending email, or restoring/deleting data. Use isolated environments for operational exercises unless the user has authorized a specific live operation.

## Deployment and delivery

- **Environments.** Check environment separation, server/public variables, actual production API origins, localhost/example URLs, debug mode, excessive console output, and unintended public dev/admin routes. Staging indexing restrictions do not replace access control when the environment should be private.
- **Source maps.** Review source-map contents and exposure. Remove public sensitive material where needed while preserving private debugging artifacts when useful; source maps are not automatically secrets, and hiding maps does not protect secrets shipped in a bundle.
- **Delivery configuration.** Inspect relevant TLS/certificate, DNS, redirect, caching, CDN, compression, and asset-version behavior using available evidence. Make infrastructure additions only for a demonstrated delivery or capacity need.
- **Health and shutdown.** Check health/readiness probes, graceful shutdown, worker/request draining, and failure recovery. Consider load balancing/autoscaling only when traffic, architecture, and measured constraints justify them.
- **Rollout and rollback.** Review deployment rollback, immutable/versioned artifacts, compatible migrations, environment configuration, and whether downtime requirements are established. Prepare a concrete rollout/rollback plan for risky changes and verify it in a suitable nonproduction environment where possible.
- **Backups.** Inspect backup scope, encryption/access where relevant, freshness, retention, capacity/storage monitoring, and restore evidence. A configured backup job does not prove recoverability. Test restores into isolated targets; never overwrite a live database to demonstrate a backup works.
- **Domain and certificate expiry.** Check domain registration expiry and auto-renewal, registrar lock, certificate expiry and automatic renewal, and who receives the expiry notices.
- **Pipeline permissions.** Inspect CI/CD for least-privilege deploy tokens, secrets exposed to untrusted branches or forks, unpinned third-party actions or scripts, branch protection and required checks on the deploy branch, and preview deployments that expose private data.
- **Operator access.** Review who can reach production hosting, the database, DNS and the registrar, the source repository, payment and email providers, and analytics. Look for shared logins, former collaborators, over-broad roles, and administrator accounts without multi-factor authentication. Report findings; removing access or changing roles is the owner's decision.
- **Cost controls.** Identify usage-billed services such as hosting, serverless functions, databases, storage, email, SMS, and model APIs. Check for budget alerts, spend caps or quotas where the provider offers them, and limits on anything an anonymous visitor can trigger. Ask the owner for thresholds; do not set a hard cap that could take the site down without their decision.
- **Load testing.** Before a launch or campaign that will change traffic, check whether expected peak load has been estimated and tested in a production-like environment, including the database, third-party quotas, and autoscaling limits. Do not load test production or a third-party service without authorization.
- **Dependency updates.** Check whether dependency and base-image updates are surfaced automatically, for example by an update bot or a scheduled audit, and whether someone reviews and merges them. Enabling a bot is a proposal for the owner.

## Observability

- **Error tracking and logs.** Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- **Monitoring.** Check visibility into uptime, API/frontend errors, latency, database performance, queues, failed jobs, and payment webhook failures as applicable. Use existing systems before introducing a provider.
- **Alerts.** Verify that critical alerts reach the intended operator and have actionable context using authorized test channels. Ask about alert recipients and thresholds if missing; do not send unsolicited alerts or configure noisy blanket alarms.
- **Log retention.** Review searchability, access, retention, and deletion behavior against operational needs and approved data practices, including audit records of security-relevant actions, which should not be alterable by the accounts they describe. Do not invent log retention durations or silently change provider billing plans.
- **Incident readiness.** Check whether there is a short written procedure for the likely failures, such as the site being down, a bad deploy, data loss, or a leaked credential, naming who is contacted, how to roll back, and where status is communicated. Its absence is a finding for a site with real users; drafting one needs the owner's inputs.
- **Status communication.** Check whether the owner and users can tell when the site is down: an external uptime check, and a status page or agreed channel for announcing incidents. Propose one in proportion to the site's audience.

## Contact and email delivery

- **Contact links.** Check approved email/phone values and `mailto:`/`tel:` behavior. Avoid exposing a private mailbox where a public contact route is intended.
- **Form delivery.** Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
- **Sender authentication.** Inspect sender domain verification and SPF, DKIM, and DMARC against provider guidance and actual DNS. Distinguish application configuration, DNS publication, authentication results, and inbox delivery; none alone proves all the others.
- **Transactional messages.** Review contact, receipt, password-reset, verification, and other relevant transactional messages in authorized test delivery. Check mobile readability, link origins, HTTPS, deep links, expected token expiration/single use, and absence of leaked tokens in reports.
- **Unsubscribe.** Check unsubscribe and communication preferences where required by the message type and applicable rules. Do not automatically add marketing behavior to transactional flows or invent mailing-list membership.
- **Bounces and complaints.** Check that hard bounces and spam complaints are processed and suppress further sending, and that the provider's reputation or bounce-rate signals are visible to someone. Do not generate bounces against real addresses to test this.
- **Email rendering.** Check transactional emails in dark mode, in common clients, with images blocked, and with a screen reader: meaningful alternative text, readable contrast, a plain-text part, and links that are distinguishable without color.

## Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Vercel deployment settings.** Check environment variables per environment, deployment protection for previews, the function region relative to the database, function duration and memory limits against real workloads, cron job configuration, and spend alerts or limits.
- **Supabase project operations.** Check backup availability on the plan in use and whether point-in-time recovery is needed, whether a free-tier project can be paused after inactivity, separate projects or branches for development and production, and who holds owner access.
- **Firebase project operations.** Check the billing plan and budget alerts, remembering that an alert does not cap spend; separate projects for development and production; scheduled database backups or exports; and the roles granted on the underlying cloud project.

## Evidence and verification

Prefer production-like builds, isolated restore/rollback exercises, test inboxes, controlled health failures, and observable log/alert receipt. Report exactly what was inspected versus exercised, including environment, access, and delivery limits. Provide prepared configuration and outstanding actions when live access or authorization is absent; do not describe an unexecuted deployment or recovery plan as complete.
