# Website Operations and Email — reusable prompt

Version: 1.1.0

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the request details below and anything else supplied in this conversation: the repository, URL, goals, constraints, and prior decisions. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings. If I ask for a re-audit, re-check the saved findings instead of starting over.

Use `OPS-001`, `OPS-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

## Request details

Replace the bracketed values with what you know. Where a line is left unfilled, inspect first and ask me only if the answer changes the result.

- Target: [repository path or website URL]
- Goal: [what should improve]
- Scope: [pages, components, or journeys]
- Mode: [review first / audit only / audit and fix / re-audit]
- Depth: [quick / standard / deep]
- Constraints: [behavior, design, or integrations to preserve]

## Website improvement workflow

Use the actual repository, site, and conversation as evidence. The checklist identifies things to examine; it is not a requirement to add every feature. Preserve established product behavior and visual identity unless a requested correction changes them.

### Choose the operating mode

- **Review first — default:** audit, present findings and proposed fixes, get the user's review, then implement the selected fixes with their corrections and verify them. During the audit, do not change application source, dependency/lock files, configuration, or hosted settings. Non-mutating inspection and existing diagnostic checks with ordinary temporary outputs are appropriate.
- **Audit and fix — explicit option:** when the user explicitly requests auditing and fixing without an intermediate review, gather evidence and implement unambiguous fixes within the requested scope, then verify and report. This mode does not answer unresolved product questions or authorize unrelated live-system changes.
- **Audit only — when requested:** report findings and stop. Do not turn an audit request into implementation.
- **Re-audit — when requested:** when a findings file from an earlier audit exists and the user asks to re-check it, test each recorded finding against the current site and mark it fixed and verified, still open, regressed, or not verified, with the evidence. Do not repeat the whole audit or change application files. Record a new problem met along the way as a new finding.

Use the mode requested in the conversation; no exact invocation phrase is required. Honor earlier review decisions and authorization. Do not ask again for approval already given for the same concrete scope. A later instruction to pause or narrow the task takes precedence.

### Choose the depth

Depth is separate from mode and defaults to standard.

- **Quick:** a time-boxed pass over the critical journeys, shared layouts, and the checks named on each selected checklist's quick-pass line. Report it as a partial audit and list what was skipped.
- **Standard — default:** the selected checklists across the agreed scope, sampling large sites as described below.
- **Deep:** every in-scope route and state, repeated measurements, and adversarial or edge-case testing where it applies. Use it when requested or before a high-stakes launch.

A quick pass can still surface a critical finding, but it cannot support a readiness claim.

### Clarify consequential choices

Inspect first so questions are specific. Ask for missing information when the answer changes the intended result: business behavior, brand assets, factual copy, public/private access, crawler policy, pricing, jurisdictions, supported environments, or permission to use live systems. Offer concrete options and explain their effect briefly. Do not invent an answer or silently select a provider, redesign, legal policy, paid service, or architecture.

Continue independent inspection while answers are pending. Mark dependent work as awaiting input. Do not require a questionnaire before useful investigation, and do not treat missing access or an unverified assumption as proof of a defect. Routine implementation mechanics supported by the existing code do not require a product decision.

### Audit with evidence

1. Establish the in-scope routes, components, services, and important journeys. Use the project's actual stack and existing tools; no particular browser automation, package manager, hosting service, or agent is required.
2. Record a baseline using available builds, tests, runtime observations, screenshots, response headers, traces, or code paths. Distinguish code inference from observed runtime behavior and environmental failures from application bugs.
3. Exercise applicable normal, empty, loading, invalid, failure, and permission states. For large scopes, state the sampling method and uncovered routes or environments.
4. Convert demonstrated problems into findings. Classify optional suggestions separately. Mark a domain or check **not applicable** with a reason, or **not verified** with the missing evidence; neither is a pass.

For each actionable finding record:

- A stable ID, severity, confidence, and short problem statement.
- The affected route, file/component, or service; redacted reproduction/evidence and user impact.
- A concrete proposed change, relevant tradeoffs/dependencies, and observable pass criteria.
- The user's decision or open question, implementation status, and verification result.

Use critical for demonstrated severe exposure or loss, high for major security/reliability failures or blocked core journeys, medium for meaningful degradation, and low for minor defects. Keep preference-driven improvements optional rather than assigning artificial urgency. Do not print credentials, personal data, reset links, or session tokens in reports.

Finding IDs must stay stable across the whole engagement. When the work will continue in a later session, or the user asks, offer to save the findings to `website-audit-findings.md` in a location the user chooses. Writing that file is not an application change, but ask before adding it to the repository, and keep secrets and personal data out of it. When the file already exists, read it first, keep its IDs and decisions, update statuses, and number new findings after the highest existing ID.

Use this layout for the findings file so any later session can read it:

```markdown
# Website audit findings

- Target: <repository or URL>
- Last updated: <date>
- Mode and depth: <mode>, <depth>
- Scope: <routes, journeys, or areas covered>
- Not covered: <areas skipped or not verified>

| ID | Severity | Status | Location | Problem | Proposed change | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | high | open | `server/orders.js` | Any signed-in user can read any order | Check ownership on the server | fix |

## SEC-001

- Confidence: <high / medium / low>
- Evidence: <redacted reproduction or code path>
- Impact: <who is affected and how>
- Pass criteria: <observable result that proves the fix>
- Verification: <what was re-checked, when, and the result>
```

Status is one of `open`, `fixed and verified`, `changed but not verified`, `deferred`, `not applicable`, or `regressed`. Decision records the user's choice: `fix`, `defer`, `change`, or `undecided`.

### Present the review

In review-first mode, give a concise prioritized findings list and an actionable proposed scope before changing application files. Separate confirmed defects from options and questions. Ask the user which finding IDs to fix, defer, or change, and ask any concrete questions needed for that choice. Then pause implementation until their response. This review is the user checkpoint required by this workflow.

Apply the response as the implementation brief. If the user selects only some findings, implement only those and their necessary supporting changes. If a requested alternative has a concrete drawback, explain the evidence and resolve it with the user. Do not silently revert to your original recommendation. Record deferred findings and reasons. If new unrelated issues emerge while fixing, add them to the report rather than silently expanding the accepted scope.

### Implement within the agreed scope

Use small, coherent changes and existing project conventions. Do not replace frameworks, add major dependencies, delete apparently unused features, introduce infrastructure, or rewrite copy based on guesswork. Check callers and runtime use before removing code or assets. Treat optional additions such as caching, analytics, service workers, CAPTCHAs, load balancers, and new tests as choices driven by a demonstrated need.

Fix one finding at a time. Keep each finding's change separate enough to review and revert on its own, verify it against its pass criteria before starting the next, and update the findings file when one exists. Commit or push only when the user has asked; when they have, make one commit per finding or small related group and name the finding IDs in the message.

Use isolated fixtures, test accounts, sandbox payments, and test email destinations where applicable. Do not send real messages, charge/refund money, rotate live credentials, change DNS, deploy, apply production migrations, or alter retention/data without that action being in the user's authorized scope. Read-only access is not authorization to mutate a live service. Prepare reviewable code/configuration and ask for the specific missing authority only when the next step needs it.

Consult current authoritative documentation when a fix depends on changing platform behavior, security advisories, browser support, search/crawler rules, or legal requirements. If current guidance is unavailable, record that limit rather than inventing a rule. Do not promise legal compliance, search rankings, or complete security from these checks.

### Verify and hand off

Reproduce the original failure, check the fix against its pass criteria, and exercise affected adjacent behavior. Use existing builds, lint/type checks, tests, and browser checks in proportion to the change. Add regression tests for meaningful logic, trust boundaries, or critical journeys when they improve confidence; avoid tests that simply repeat implementation or assert cosmetic wording.

Check the production build when relevant. A screenshot does not prove an interaction, an automated accessibility scan does not prove full accessibility, a configured integration does not prove delivery, and a single performance run does not prove a stable improvement.

Report what changed and why, what was verified and where, what still fails, and what was deferred or needs user input. Keep **fixed and verified**, **changed but not verified**, **unfixed**, and **not applicable** distinct. Describe unavailable browsers, devices, accounts, network conditions, or infrastructure evidence explicitly. Stop when the agreed scope is complete and report any remaining work without implying it was done.

End every report with an **Owner actions** list: the things only the owner can do or confirm. Typical items are DNS and registrar changes, credential rotation, legal and policy sign-off, switching payments to live mode, settings in a hosting or provider dashboard, and product decisions left open. For each, say what to do, where, and why it could not be done or verified here.

## Deployment, observability, and email operations

Quick pass: Environments; Backups; Operator access; Cost controls; Error tracking and logs; Form delivery.

Severity examples: critical — there is no usable backup of production data, or production secrets are reachable by the public; high — a deploy cannot be rolled back, or an outage would go unnoticed; medium — missing health checks, noisy or sensitive logs, or undelivered contact email; low — documentation gaps.

### Establish environments and operational ownership

Map the current development, staging, and production environments, deployment path, runtime/services, storage, email provider, monitoring, and access. Inspect existing configuration before proposing infrastructure. Ask about reliability goals, environment exposure, retention, delivery destinations, and live-action authority only where they affect the requested work.

Audit with read-only evidence. Code/configuration preparation is distinct from changing DNS, deploying, rotating keys, applying production migrations, sending email, or restoring/deleting data. Use isolated environments for operational exercises unless the user has authorized a specific live operation.

### Deployment and delivery

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

### Observability

- **Error tracking and logs.** Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- **Monitoring.** Check visibility into uptime, API/frontend errors, latency, database performance, queues, failed jobs, and payment webhook failures as applicable. Use existing systems before introducing a provider.
- **Alerts.** Verify that critical alerts reach the intended operator and have actionable context using authorized test channels. Ask about alert recipients and thresholds if missing; do not send unsolicited alerts or configure noisy blanket alarms.
- **Log retention.** Review searchability, access, retention, and deletion behavior against operational needs and approved data practices, including audit records of security-relevant actions, which should not be alterable by the accounts they describe. Do not invent log retention durations or silently change provider billing plans.
- **Incident readiness.** Check whether there is a short written procedure for the likely failures, such as the site being down, a bad deploy, data loss, or a leaked credential, naming who is contacted, how to roll back, and where status is communicated. Its absence is a finding for a site with real users; drafting one needs the owner's inputs.
- **Status communication.** Check whether the owner and users can tell when the site is down: an external uptime check, and a status page or agreed channel for announcing incidents. Propose one in proportion to the site's audience.

### Contact and email delivery

- **Contact links.** Check approved email/phone values and `mailto:`/`tel:` behavior. Avoid exposing a private mailbox where a public contact route is intended.
- **Form delivery.** Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
- **Sender authentication.** Inspect sender domain verification and SPF, DKIM, and DMARC against provider guidance and actual DNS. Distinguish application configuration, DNS publication, authentication results, and inbox delivery; none alone proves all the others.
- **Transactional messages.** Review contact, receipt, password-reset, verification, and other relevant transactional messages in authorized test delivery. Check mobile readability, link origins, HTTPS, deep links, expected token expiration/single use, and absence of leaked tokens in reports.
- **Unsubscribe.** Check unsubscribe and communication preferences where required by the message type and applicable rules. Do not automatically add marketing behavior to transactional flows or invent mailing-list membership.
- **Bounces and complaints.** Check that hard bounces and spam complaints are processed and suppress further sending, and that the provider's reputation or bounce-rate signals are visible to someone. Do not generate bounces against real addresses to test this.
- **Email rendering.** Check transactional emails in dark mode, in common clients, with images blocked, and with a screen reader: meaningful alternative text, readable contrast, a plain-text part, and links that are distinguishable without color.

### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Vercel deployment settings.** Check environment variables per environment, deployment protection for previews, the function region relative to the database, function duration and memory limits against real workloads, cron job configuration, and spend alerts or limits.
- **Supabase project operations.** Check backup availability on the plan in use and whether point-in-time recovery is needed, whether a free-tier project can be paused after inactivity, separate projects or branches for development and production, and who holds owner access.
- **Firebase project operations.** Check the billing plan and budget alerts, remembering that an alert does not cap spend; separate projects for development and production; scheduled database backups or exports; and the roles granted on the underlying cloud project.

### Evidence and verification

Prefer production-like builds, isolated restore/rollback exercises, test inboxes, controlled health failures, and observable log/alert receipt. Report exactly what was inspected versus exercised, including environment, access, and delivery limits. Provide prepared configuration and outstanding actions when live access or authorization is absent; do not describe an unexecuted deployment or recovery plan as complete.
