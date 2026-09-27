# Deployment, observability, and email operations

Source checklist sections: 23 (email/contact), 24 (deployment/infrastructure), 25 (observability).

## Establish environments and operational ownership

Map the current development, staging, and production environments, deployment path, runtime/services, storage, email provider, monitoring, and access. Inspect existing configuration before proposing infrastructure. Ask about reliability goals, environment exposure, retention, delivery destinations, and live-action authority only where they affect the requested work.

Audit with read-only evidence. Code/configuration preparation is distinct from changing DNS, deploying, rotating keys, applying production migrations, sending email, or restoring/deleting data. Use isolated environments for operational exercises unless the user has authorized a specific live operation.

## Deployment and delivery

- Check environment separation, server/public variables, actual production API origins, localhost/example URLs, debug mode, excessive console output, and unintended public dev/admin routes. Staging indexing restrictions do not replace access control when the environment should be private.
- Review source-map contents and exposure. Remove public sensitive material where needed while preserving private debugging artifacts when useful; source maps are not automatically secrets, and hiding maps does not protect secrets shipped in a bundle.
- Inspect relevant TLS/certificate, DNS, redirect, caching, CDN, compression, and asset-version behavior using available evidence. Make infrastructure additions only for a demonstrated delivery or capacity need.
- Check health/readiness probes, graceful shutdown, worker/request draining, and failure recovery. Consider load balancing/autoscaling only when traffic, architecture, and measured constraints justify them.
- Review deployment rollback, immutable/versioned artifacts, compatible migrations, environment configuration, and whether downtime requirements are established. Prepare a concrete rollout/rollback plan for risky changes and verify it in a suitable nonproduction environment where possible.
- Inspect backup scope, encryption/access where relevant, freshness, retention, capacity/storage monitoring, and restore evidence. A configured backup job does not prove recoverability. Test restores into isolated targets; never overwrite a live database to demonstrate a backup works.

## Observability

- Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- Check visibility into uptime, API/frontend errors, latency, database performance, queues, failed jobs, and payment webhook failures as applicable. Use existing systems before introducing a provider.
- Verify that critical alerts reach the intended operator and have actionable context using authorized test channels. Ask about alert recipients and thresholds if missing; do not send unsolicited alerts or configure noisy blanket alarms.
- Review searchability, access, retention, and deletion behavior against operational needs and approved data practices. Do not invent log retention durations or silently change provider billing plans.

## Contact and email delivery

- Check approved email/phone values and `mailto:`/`tel:` behavior. Avoid exposing a private mailbox where a public contact route is intended.
- Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
- Inspect sender domain verification and SPF, DKIM, and DMARC against provider guidance and actual DNS. Distinguish application configuration, DNS publication, authentication results, and inbox delivery; none alone proves all the others.
- Review contact, receipt, password-reset, verification, and other relevant transactional messages in authorized test delivery. Check mobile readability, link origins, HTTPS, deep links, expected token expiration/single use, and absence of leaked tokens in reports.
- Check unsubscribe and communication preferences where required by the message type and applicable rules. Do not automatically add marketing behavior to transactional flows or invent mailing-list membership.

## Evidence and verification

Prefer production-like builds, isolated restore/rollback exercises, test inboxes, controlled health failures, and observable log/alert receipt. Report exactly what was inspected versus exercised, including environment, access, and delivery limits. Provide prepared configuration and outstanding actions when live access or authorization is absent; do not describe an unexecuted deployment or recovery plan as complete.
