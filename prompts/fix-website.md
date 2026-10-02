# Fix Website — reusable prompt

Version: 2.0.0

Audit and improve this website. This is the light version: it contains the complete workflow, the routing table, and the quick-pass checks for each area, and requires no installed skills or particular agent/framework. Use the request details below and anything else supplied in this conversation. Ask about consequential missing information instead of guessing.

Default to audit → user review → selected fixes → verification. Use audit-and-fix when I explicitly request it, audit only when requested, and re-audit when I ask you to re-check saved findings. Apply one combined review checkpoint across the website.

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

## Establish the website and its scope

Inspect the repository instructions, entry points, route definitions, package/build configuration, environment examples, existing tests, and any supplied URL or brief. Record what the site actually does, the critical visitor journeys, the available environments, and the limits of your access. With URL-only access, audit what is observable; request source access only when implementation needs it.

Resolve material gaps with the user: the primary conversion or business goal, intended audience, important routes, intended public/private content, supported languages and browsers, and access to a safe test environment when needed. Do not ask for facts already established by the repository or conversation. Uncertain intent is an open question, not a defect.

Map public, authenticated, administrative, and error routes plus shared layouts. Start with critical journeys and shared components, then extend to the agreed scope. For large sites, propose a representative sample and document its limits; do not claim every page was checked from a sample.

## Select relevant areas

Use this routing table to assess applicability. A full-site audit must account for every area as audited, partially audited, not verified, or not applicable with a reason. Do not infer that a missing optional feature is a bug.

| Area | Applies when | Finding prefix |
| --- | --- | --- |
| UI and accessibility | Visual layout, responsive behavior, keyboard/screen-reader access, or browser compatibility is in scope | UI |
| Interactions and forms | Navigation, routing, buttons, forms, search, or client state exists | UX |
| Content and branding | Public copy, translations, identity, contact details, footer, or media branding and licensing is in scope | CONTENT |
| SEO and AI discoverability | Search indexing, sharing previews, or intended AI access is relevant | SEO |
| Performance and media | Loading, responsiveness, images/video, caching, or an existing/requested PWA is in scope | PERF |
| Backend and code reliability | Application code, APIs, data access, maintainability, or automated tests are available | REL |
| Security and authentication | Sensitive data, accounts, trust boundaries, AI/LLM features, dependencies, or prototype leftovers are in scope | SEC |
| Commerce | Checkout, payments, orders, inventory, subscriptions, or refunds exist | PAY |
| Privacy and analytics | Personal data, cookies, tracking, consent, or policies are relevant | PRIV |
| Operations and email | Deployment, environments, CI/CD, operator access, costs, email, monitoring, backups, or infrastructure is in scope | OPS |

This light prompt carries only the quick-pass checks for each area, which are enough for a quick-depth audit. For a standard or deep audit of an area, say that its full checklist is not included here. Then either continue from the quick-pass checks and your own knowledge, marking the area partially audited, or ask me for the full prompt (`fix-website-full.md`) or the focused prompt for that area.

The corresponding focused prompts and skills are named `website-ui-accessibility`, `website-interactions`, `website-content-branding`, `website-seo-discoverability`, `website-performance`, `website-backend-reliability`, `website-security-auth`, `website-commerce`, `website-privacy-analytics`, and `website-operations`. They are optional conveniences, not dependencies. This workflow does not require multiple agents or agent-specific commands.

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

## Quick-pass checks

These are the checks each area's full checklist names for a quick pass. Apply only the areas that are in scope.

### UI and accessibility

- **Viewports.** Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- **Overflow and clipping.** Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- **Keyboard operation.** Traverse meaningful journeys using the keyboard. Interactive controls must be reachable in a logical order, have a visible focus indicator, and work without pointer gestures. Do not make static elements focusable merely to satisfy a blanket rule.
- **Form errors and announcements.** Verify form labels and programmatic errors, first-error navigation, and announcements of asynchronous outcomes. Live regions and toasts should announce important changes without repeatedly interrupting the user.
- **Contrast and targets.** Check contrast in actual themes and interaction states. Information must not rely on color alone. Evaluate touch target size and spacing, including close buttons and adjacent links.

### Interactions and forms

- **Links and destinations.** Detect broken destinations, meaningless `#` links, unused navigation, and fake links/buttons. Use anchors for navigation and buttons for actions. Check logo-to-home behavior, active navigation, external/new-tab links, anchor targets, and appropriate `rel` protections without assuming every link needs `noreferrer`.
- **Direct loads and missing routes.** Open in-scope routes directly and refresh them. Check SPA server fallbacks, genuine 404 responses, deleted/renamed resources, redirects, back/forward behavior, encoded path/query values, malformed parameters, and safe normalization. A catch-all success page must not conceal missing routes.
- **Button actions.** Confirm that buttons perform their advertised action, including copy, share, and download. Evaluate copy buttons for useful repeatable values such as code snippets, URLs, or public contact information. Copy only the intended value on a user action, announce success only after the clipboard operation succeeds, and give usable failure or manual-copy feedback when access is unavailable. A console log is not completion; ask whether an unfinished feature should be implemented, disabled with explanation, or removed.
- **Validation.** Verify client-side feedback and authoritative server-side validation. Use context-appropriate normalization, validation, output encoding, and safe storage; do not indiscriminately strip legitimate characters as a substitute for injection protection.
- **Success and error states.** Verify form success and error states against the actual submission result. Make success clear, announce it appropriately, and provide a useful next step when needed; never show success merely because the submit handler ran. Keep entered values after failures where appropriate, avoid retaining sensitive values unnecessarily, link errors to fields, and focus/scroll to a useful first error or summary.

### Content and branding

- **Placeholder and unsupported content.** Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- **Factual claims.** Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- **Purpose and CTA.** Assess whether each important page has a clear purpose and appropriate next action. Check for a single clear primary CTA per page or section, with secondary actions visually subordinate; competing CTAs of equal emphasis obscure the intended next step. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.
- **Footer and contact.** Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- **Legal links.** Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.

### SEO and AI discoverability

- **Titles and descriptions.** Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- **Canonicals and indexing directives.** Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- **Missing pages.** Find internal links, sitemap entries, canonicals, and previously published URLs that return 404. Restore the page, redirect to a genuinely equivalent one, or remove the reference; missing pages should return a real 404 status, not a success page or a blanket redirect to the homepage.
- **Sitemap.** Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- **Robots and crawler access.** Check robots rules and relevant response headers at the intended origin. Confirm that crawlers the owner intends to allow are not blocked on public pages by robots rules, firewall or bot-protection settings, or authentication. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.

### Performance and media

- **Image delivery.** Check broken images, remote-domain configuration, hotlinks, actual transfer dimensions, compression, and rendered aspect ratios. Use responsive candidates and `sizes` matching layout so mobile clients avoid unnecessary desktop payloads.
- **Loading priority.** Lazy-load below-the-fold media and noncritical embeds when beneficial. Do not lazy-load the primary LCP image. Preload or prioritize the actual critical image only when evidence supports it; avoid duplicate downloads and competing preloads.
- **Bundle contents.** Inspect bundle composition, unused code/styles/dependencies, render-blocking resources, and third-party scripts. Verify runtime/dynamic use before removal; consent-required trackers also need privacy review.
- **Caching.** Inspect static caching, hashed asset names, deployment invalidation, compression, and origin/CDN behavior. Avoid caching private/personalized responses publicly or making HTML stale across deployments.
- **Server response time.** Measure time to first byte for key documents and API calls from a relevant location, separating network, cold-start, rendering, and data-access cost. Coordinate a slow origin with backend reliability before adding client-side workarounds.

### Backend and code reliability

- **Validation and errors.** Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- **Timeouts and retries.** Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- **Concurrency.** Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- **Query cost.** Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- **Type and lint errors.** Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.

### Security and authentication

- **Exposure sweep.** Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- **Authorization.** Verify authentication and object/action authorization on the server for every sensitive operation. Test cross-user, cross-tenant, and cross-role access (IDOR/BOLA) with at least two safe fixture accounts, including IDs supplied by the browser. Hidden buttons and client-side role checks are not enforcement.
- **Row-level security.** Check tenant boundaries and database row-level security when the architecture relies on it. Do not assume every backend requires RLS or that enabling it alone establishes a complete policy.
- **Data-store and cloud permissions.** Review effective database, storage, and cloud permissions: open read/write rules, policies that allow every caller, ordinary requests served with owner/superuser or service-role credentials, databases reachable from the public internet, buckets that allow public listing or writing or expose private objects, and permissive access policies or exposed consoles/ports. Apply least privilege to what the application needs, confirm intentionally public assets before restricting them, and do not change live permissions without scope for that action.
- **Injection.** Inspect parameterized database access, context-appropriate output encoding, unsafe HTML/DOM operations, shell invocation, path construction, and upload/storage paths for SQL and NoSQL/query-operator injection, XSS, command injection, traversal, and unsafe deserialization of untrusted data. Do not equate generic input sanitization with protection in every context.
- **Token storage and JWTs.** Check where session and refresh tokens are held. Tokens in `localStorage` or `sessionStorage` are readable by any injected script; prefer HttpOnly cookies when the architecture allows, and review CSRF protection together with any change of token transport. Where JWTs are used, verify signature, algorithm, expiry, and audience checks, and that the signing secret is strong, server-only, and not a default or example value.

### Commerce

- **Server-side totals.** Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- **Idempotency.** Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- **Confirmation integrity.** Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.
- **Card data handling.** Check that card numbers and security codes go directly to the payment provider through its hosted fields, redirect, or SDK, and never pass through or get stored or logged by the site's own servers, analytics, error tracking, or session replay. Handling raw card data changes the site's PCI obligations and is the owner's decision, not an implementation detail.
- **Signatures.** Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.

### Privacy and analytics

- **Inventory.** Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- **Consent states.** Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- **Working controls.** Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- **Sensitive data.** Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- **Policy accuracy.** Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.

### Operations and email

- **Environments.** Check environment separation, server/public variables, actual production API origins, localhost/example URLs, debug mode, excessive console output, and unintended public dev/admin routes. Staging indexing restrictions do not replace access control when the environment should be private.
- **Backups.** Inspect backup scope, encryption/access where relevant, freshness, retention, capacity/storage monitoring, and restore evidence. A configured backup job does not prove recoverability. Test restores into isolated targets; never overwrite a live database to demonstrate a backup works.
- **Operator access.** Review who can reach production hosting, the database, DNS and the registrar, the source repository, payment and email providers, and analytics. Look for shared logins, former collaborators, over-broad roles, and administrator accounts without multi-factor authentication. Report findings; removing access or changing roles is the owner's decision.
- **Cost controls.** Identify usage-billed services such as hosting, serverless functions, databases, storage, email, SMS, and model APIs. Check for budget alerts, spend caps or quotas where the provider offers them, and limits on anything an anonymous visitor can trigger. Ask the owner for thresholds; do not set a hard cap that could take the site down without their decision.
- **Error tracking and logs.** Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- **Form delivery.** Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
