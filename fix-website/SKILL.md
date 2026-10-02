---
name: fix-website
description: Audit and improve a whole website or prepare it for launch, across UI and accessibility, interactions, content, SEO, performance, backend, security including AI features, payments, privacy, and operations. Use for broad website work, a quick whole-site scan, or a re-audit of saved findings; default to user review before fixes unless audit-and-fix is explicitly requested. Use a focused website-* skill when only one area is in scope.
metadata:
  version: "2.0.0"
  prompt-hash: "fbbca97ed63e"
---

# Fix Website

Improve an existing website using evidence from its implementation and available runtime. This skill includes its own workflow, ten domain checklists, and a short checklist, and works without installing any other skill. It is framework and agent agnostic.

Take the target, goal, scope, mode, depth, and constraints from the conversation. Inspect first, and ask only where a missing answer changes the result.

Read [references/workflow.md](references/workflow.md) first. It defines the default **audit → user review → fix → verify** workflow, the explicit **audit-and-fix** option, audit-only and re-audit operation, the quick/standard/deep depth setting, and the findings format. Apply it to the whole engagement; do not create a separate approval round for each domain after the user has reviewed the combined plan.

## Establish the website and its scope

Inspect the repository instructions, entry points, route definitions, package/build configuration, environment examples, existing tests, and any supplied URL or brief. Record what the site actually does, the critical visitor journeys, the available environments, and the limits of your access. With URL-only access, audit what is observable; request source access only when implementation needs it.

Resolve material gaps with the user: the primary conversion or business goal, intended audience, important routes, intended public/private content, supported languages and browsers, and access to a safe test environment when needed. Do not ask for facts already established by the repository or conversation. Uncertain intent is an open question, not a defect.

Map public, authenticated, administrative, and error routes plus shared layouts. Start with critical journeys and shared components, then extend to the agreed scope. For large sites, propose a representative sample and document its limits; do not claim every page was checked from a sample.

## Select relevant checklists

Use this routing table to assess applicability. Read only the references relevant to the current scope, and read each selected reference before its domain audit. A full-site audit must account for every domain as audited, partially audited, not verified, or not applicable with a reason. Do not infer that a missing optional feature is a bug.

| Area | Read when | Checklist | Finding prefix |
| --- | --- | --- | --- |
| UI and accessibility | Visual layout, responsive behavior, keyboard/screen-reader access, or browser compatibility is in scope | [UI and accessibility](references/ui-accessibility.md) | UI |
| Interactions and forms | Navigation, routing, buttons, forms, search, or client state exists | [Interactions](references/interactions.md) | UX |
| Content and branding | Public copy, translations, identity, contact details, footer, or media branding and licensing is in scope | [Content and branding](references/content-branding.md) | CONTENT |
| SEO and AI discoverability | Search indexing, sharing previews, or intended AI access is relevant | [SEO and discoverability](references/seo-discoverability.md) | SEO |
| Performance and media | Loading, responsiveness, images/video, caching, or an existing/requested PWA is in scope | [Performance](references/performance.md) | PERF |
| Backend and code reliability | Application code, APIs, data access, maintainability, or automated tests are available | [Backend and reliability](references/backend-reliability.md) | REL |
| Security and authentication | Sensitive data, accounts, trust boundaries, AI/LLM features, dependencies, or prototype leftovers are in scope | [Security and authentication](references/security-auth.md) | SEC |
| Commerce | Checkout, payments, orders, inventory, subscriptions, or refunds exist | [Commerce](references/commerce.md) | PAY |
| Privacy and analytics | Personal data, cookies, tracking, consent, or policies are relevant | [Privacy and analytics](references/privacy-analytics.md) | PRIV |
| Operations and email | Deployment, environments, CI/CD, operator access, costs, email, monitoring, backups, or infrastructure is in scope | [Operations](references/operations.md) | OPS |

Each checklist starts with a quick-pass line. At quick depth, read the checklist and apply only the checks that line names.

[references/short-checklist.md](references/short-checklist.md) lists every check by label. Read it when the user asks what an audit covers, or at the end of an audit to confirm that nothing was skipped. Do not use it in place of the domain checklists.

Several checklists end with checks specific to a stack or provider: Next.js and Vercel, Supabase, Firebase, Stripe, Clerk, Auth.js, Auth0, and Better Auth. Apply only those that match what the site actually uses.

The corresponding focused skills are named `website-ui-accessibility`, `website-interactions`, `website-content-branding`, `website-seo-discoverability`, `website-performance`, `website-backend-reliability`, `website-security-auth`, `website-commerce`, `website-privacy-analytics`, and `website-operations`. They are optional conveniences, not dependencies. Use the bundled references directly when those skills are absent. This workflow does not require multiple agents or agent-specific commands.

## Combine the audit and review

Maintain a single issue list with stable domain-prefixed IDs. Merge duplicate findings across domains and assign an owner according to the failed behavior: a keyboard-inaccessible menu belongs to UI, a menu that routes to the wrong page to UX, and an authorization bypass to SEC. Link related findings rather than counting them twice.

Prioritize by user harm, exposure, critical journey impact, and demonstrated evidence. Separate confirmed defects, optional improvements, questions requiring a product decision, and checks blocked by access. A broken purchase or authorization boundary outranks cosmetic inconsistencies; effort alone does not set severity.

In the default mode, present the combined findings and concrete proposed changes, then pause for the user's review. Ask which IDs to fix or defer and resolve the decisions needed for those fixes. In audit-and-fix mode, proceed with unambiguous changes within the user's scope, stopping only dependent work when a material answer or additional authority is missing. Retain the user's corrections throughout implementation.

## Integrate and verify

Order accepted changes by their dependencies. For example, settle approved URLs before canonical/sitemap corrections, and confirm authoritative prices before checkout changes. Keep one owner for shared components and configuration. Recheck affected domains after an integration change.

Use the following launch checks as a coverage summary, not permission to deploy or perform live transactions:

- Build the production artifact and exercise it where possible. Report critical errors, relevant warnings, console errors, failed requests, and available server-log evidence.
- Visit the public URLs in scope; exercise major links, CTAs, forms, deep links, refreshes, authentication, the primary conversion, 404 handling, and controlled server-error handling. Use test accounts and destinations for submissions that send messages or create records.
- Check mobile and supported browser behavior, including Safari where required and available; run available accessibility, broken-link, performance, and dependency checks and review their findings.
- Validate intended indexing, sitemap, robots rules, canonicals, structured data, redirects, social previews, favicon, staging restrictions, and private-route access controls. Robots exclusion is not access control.
- Verify applicable analytics/consent behavior, test email delivery, and inspect evidence for TLS, DNS, health checks, alerts, backups, and restore/rollback readiness. Configuration alone does not prove delivery or recovery.
- Inspect the built client output for exposed secrets, unintended demo/mock content, public debug surfaces, and production misconfiguration. Redact sensitive evidence.

Report readiness as **ready within the verified scope**, **not ready because of listed blockers**, or **insufficient evidence**. Show remaining risks and verification gaps; do not claim security, legal compliance, or universal device coverage from a checklist. Implementation completion does not imply approval to publish.
