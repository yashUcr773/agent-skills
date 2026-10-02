---
name: website-security-auth
description: Audit and harden website trust boundaries, sessions, authentication, authorization and user isolation, injection defenses, database/storage/cloud permissions, AI/LLM features, dependencies, and accidental prototype/secret exposure. Review findings before fixes unless audit-and-fix is explicitly requested.
metadata:
  version: "1.1.0"
  prompt-hash: "2259b8587dd0"
---

# Website Security and Authentication

This skill is self-contained, framework agnostic, and agent agnostic. Default to audit, user review, then selected fixes and verification. Use audit-and-fix or audit only when the user asks for it, and re-audit when they ask to re-check saved findings.

Take the target, goal, scope, mode, depth, and constraints from the conversation. Inspect first, and ask only where a missing answer changes the result.

Use `SEC-001`, `SEC-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Security, authentication, and prototype leaks

Quick pass: Exposure sweep; Authorization; Row-level security; Data-store and cloud permissions; Injection; Token storage and JWTs.

Severity examples: critical — an anonymous visitor or any signed-in user can read or change other users' data, or a live privileged credential is exposed; high — injection, stored XSS, or account takeover that needs some precondition; medium — missing hardening such as security headers, rate limits, or enumeration protection; low — version disclosure and minor information leaks.

### Establish the trust boundaries

Map public, authenticated, administrative, tenant-specific, storage, and server-only surfaces. Identify the session/auth provider and actual authorization model. Inspect source and configuration and use controlled test accounts for runtime checks. Review each entry point as an attacker would: consider what an anonymous visitor, an ordinary account, and a tampered client could attempt, and record confirmed defects separately from potential weaknesses that still need evidence. Active attack probes against a live site require an authorized target and scope; prefer local/test environments. Missing credentials or inaccessible code means not verified, not secure.

### Secrets and prototype artifacts

- **Exposure sweep.** Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- **Served files and history.** Check that the deployed site does not serve `.env` files, backups, database dumps, or repository metadata, and look for database credentials or connection strings in client code, logs, and committed configuration. Where history is in scope, scan it with an available secret scanner; a clean working tree does not show what earlier commits contain.
- **Public versus privileged configuration.** Distinguish intentionally public client configuration from privileged material. Firebase/Supabase-style client configuration is not automatically a leaked secret; evaluate server/service keys, key restrictions, data rules, and effective permissions. `NEXT_PUBLIC_*` and equivalent variables reach the browser and must not carry server credentials.
- **Prototype leftovers.** Look for demo/placeholder keys, default or seed credentials, hardcoded admin identities, localhost/example domains and contacts, fake search/login/checkout/newsletter flows, mock API responses, fixture arrays, sample avatars, debug panels, unprotected admin pages, remote image mistakes, permissive CORS, and wildcard OAuth/redirect rules.
- **AI tooling leftovers.** Look for files left behind by AI coding tools and agents: committed agent or editor configuration that contains tokens, tool or MCP server settings with credentials, prompt and conversation logs, generated scratch files, and local environment files. Check that instruction files do not disclose internal URLs or secrets, and that none of this is served by the site.
- **Intended behavior.** Confirm intended production behavior before replacing mocks, deleting fixtures, removing unsupported claims, or changing identity providers. Content authenticity belongs to content review; nonfunctional actions to interactions; exploitable exposure to this audit.
- **Exposed credentials.** If a real credential is exposed, identify the affected system without revealing the value, recommend revocation/rotation, and prepare scoped source/configuration fixes. Deleting the current source value does not revoke a credential or erase history. Live rotation and history rewrites require scope for those actions and coordination of dependent services.
- **Secret rotation.** Check whether there is a known procedure for rotating each credential the site depends on, who can perform it, and which services must be updated together. A secret that cannot be rotated without downtime or guesswork is a finding even when it is not exposed. Do not rotate live credentials as a test.

### Server-side access and injection defenses

- **Authorization.** Verify authentication and object/action authorization on the server for every sensitive operation. Test cross-user, cross-tenant, and cross-role access (IDOR/BOLA) with at least two safe fixture accounts, including IDs supplied by the browser. Hidden buttons and client-side role checks are not enforcement.
- **Field tampering.** Check which fields the server accepts on create and update requests. Client-supplied role, ownership, tenant, price, status, or verification fields must be ignored or authorized, not bound directly to stored records (field tampering/mass assignment). Test by adding or altering such fields with a safe fixture.
- **Row-level security.** Check tenant boundaries and database row-level security when the architecture relies on it. Do not assume every backend requires RLS or that enabling it alone establishes a complete policy.
- **Data-store and cloud permissions.** Review effective database, storage, and cloud permissions: open read/write rules, policies that allow every caller, ordinary requests served with owner/superuser or service-role credentials, databases reachable from the public internet, buckets that allow public listing or writing or expose private objects, and permissive access policies or exposed consoles/ports. Apply least privilege to what the application needs, confirm intentionally public assets before restricting them, and do not change live permissions without scope for that action.
- **Dangling DNS.** Where DNS records are visible, look for subdomains that point at deprovisioned hosting, storage, or SaaS resources another party could claim. Report them; changing DNS needs scope for that action.
- **Injection.** Inspect parameterized database access, context-appropriate output encoding, unsafe HTML/DOM operations, shell invocation, path construction, and upload/storage paths for SQL and NoSQL/query-operator injection, XSS, command injection, traversal, and unsafe deserialization of untrusted data. Do not equate generic input sanitization with protection in every context.
- **SSRF.** Where the server fetches URLs influenced by users, such as webhooks, link previews, imports, or image proxies, check SSRF defenses: destination validation, redirect handling, and access to internal or cloud-metadata addresses.
- **Uploads.** Verify upload limits and content validation, executable-content handling, storage/serving isolation, and authorization to download private files. Do not trust client MIME/type declarations alone.
- **CSRF and CORS.** Inspect CSRF protections in the context of the session and credential transport. Review CORS origin/credentials behavior and redirect/callback allowlists; avoid broad wildcards and unvalidated destinations.
- **GraphQL and real-time channels.** Where present, check authorization on every resolver and field, not only at the gateway; query depth, complexity, and batching limits; and whether introspection or a playground is exposed in production on purpose. Check that WebSocket and server-sent-event connections authenticate when they connect, authorize each subscription or message, and validate origin.
- **Business-logic abuse.** Look for flows that work as coded but can be misused: skipping a step in a multi-step process, replaying a one-time action, exceeding plan limits or quotas, manipulating referral or invitation credit, and racing two requests for a single-use resource. Test with safe fixtures.

### Transport, cookies, and browser policy

- **HTTPS and cookies.** Check HTTPS and redirects, TLS evidence where available, and secure cookie flags suited to the session: Secure, HttpOnly where script access is unnecessary, and intentional SameSite behavior. Test login, embedded flows, and cross-site callbacks affected by changes.
- **Token storage and JWTs.** Check where session and refresh tokens are held. Tokens in `localStorage` or `sessionStorage` are readable by any injected script; prefer HttpOnly cookies when the architecture allows, and review CSRF protection together with any change of token transport. Where JWTs are used, verify signature, algorithm, expiry, and audience checks, and that the signing secret is strong, server-only, and not a default or example value.
- **HSTS.** Evaluate HSTS deliberately, especially long lifetimes, `includeSubDomains`, and preload implications. Do not enable irreversible/broad transport commitments before verifying affected hosts and operational intent.
- **Browser policy headers.** Review Content Security Policy, content-type sniffing protection, frame/embed controls, and referrer policy against actual resource/embed needs. Develop and verify policy changes without blindly breaking scripts, login, payments, or intentional embedding.
- **Third-party scripts.** Inventory scripts loaded from other origins. Use Subresource Integrity for fixed-version files where the provider supports it, prefer self-hosted or pinned versions over mutable URLs, and remove scripts that are no longer used. Integrity hashes break deliberately mutable scripts such as tag managers; do not add them blindly.
- **Disclosure.** Reduce unnecessary server/version disclosure and raw internal errors where practical. Hiding a header does not remediate an underlying vulnerable component.
- **Disclosure contact.** Check whether the site offers a way to report a vulnerability, such as a `security.txt` file under `/.well-known/` with a monitored contact. Propose one where the site has accounts or sensitive data; the contact address and policy are the owner's to choose.

### Account and session journeys

- **Account journeys.** Test signup, login, incorrect credentials, logout, duplicate signup, email verification, expired verification links, password reset/change, expired reset links, session expiry, refresh behavior, and protected routes where present.
- **Password visibility.** For password visibility toggles, check that intentional reveal affects only the relevant field, starts masked on a fresh form, preserves password-manager/autofill behavior, and does not submit or duplicate the secret into logs, analytics, clipboard, persistent client state, or print output. Masking is a display choice, not encryption or authorization.
- **Redirects and enumeration.** Verify safe login/logout redirects and intended-destination preservation without open redirects. Check enumeration risk in visible messages, status codes, and materially observable timing without destructive bulk tests.
- **Rate limits and tokens.** Review rate limits for login and reset, secure random reset/verification tokens, appropriate expiry and single use, session identifier rotation at login, server-side invalidation at logout, and session invalidation after relevant password/security changes. Redact tokens in logs and artifacts.
- **Automated abuse.** Check defenses against credential stuffing, signup and form bots, and scripted enumeration: rate limits by account and by source, breached-password checks, lockout or step-up that cannot be used to lock out legitimate users, and monitoring of failed-login spikes. Match controls to observed risk and weigh the accessibility and privacy cost of a CAPTCHA.
- **Password handling.** Review password handling: storage with a current password-hashing algorithm, never plaintext, reversible encryption, or a fast hash; a server-enforced policy that favors length and rejects common or breached passwords over arbitrary composition rules; and strength feedback that helps users without sending the password to analytics or third parties. A client-side strength meter alone is not enforcement, and changing the policy for existing accounts is a product decision.
- **MFA and roles.** Evaluate MFA according to account risk and product requirements; adding a new auth capability needs a product decision. Test role changes, concurrent sessions, multi-tab logout, and sensitive-state cleanup.
- **OAuth and SSO.** Where third-party sign-in is used, check the `state` parameter and PKCE where the flow calls for them, exact redirect URI matching, token validation of issuer, audience, and expiry, and account linking that cannot attach an attacker's identity to an existing account through an unverified email.
- **Sensitive changes.** Check that changing the email address, password, MFA settings, or payout details, or deleting the account, requires recent authentication, and that the previous address is notified of email and password changes.
- **Audit records.** Where accounts or sensitive data exist, check that security-relevant actions such as sign-ins and failures, password/MFA changes, role or permission changes, administrative operations, and bulk exports or deletions leave an attributable audit record of actor, action, target, and time, without secrets or unnecessary personal data. Retention and tooling belong to operations.

### AI and LLM features

Apply this section only when the site calls a language model or similar AI service. Test with safe fixtures and low volume; do not run abusive load against a paid API.

- **Keys and cost.** Model API keys must stay server-side. Check that model endpoints require the intended authentication and have per-user and overall rate and spend limits, so an anonymous caller cannot run up cost or use the site as a free proxy.
- **Prompt injection.** Treat user input and any retrieved content, such as web pages, documents, emails, and other users' data, as untrusted instructions. Check what the model can reach through tools, retrieval, or function calls: its privileges should not exceed the requesting user's, and consequential actions need server-side authorization or confirmation, not the model's judgment.
- **Output handling.** Treat model output as untrusted. Encode it before rendering, do not pass it unchecked into HTML, SQL, shell commands, URLs, or file paths, and validate structured output before acting on it.
- **Data exposure.** Check that system prompts hold no secrets, that retrieval respects per-user and per-tenant permissions, and that prompts, uploads, and conversation logs are stored, retained, and shared with providers as the privacy policy states.

### Stack-specific checks

When the site uses Next.js, Vercel, Supabase, Firebase, Clerk, Auth.js, Auth0, or Better Auth, read [references/stack-checks.md](references/stack-checks.md) and apply the checks for what is in use. Skip it otherwise.

### Dependencies and verification

Use the existing ecosystem's audit tools and current primary advisories to assess affected versions, reachable code, and available fixes. Explain breaking changes before major updates; remove packages only after verifying they are unused.

For each fix, verify both denied and allowed behavior: unauthorized access is rejected and legitimate users can still finish their journey. Add targeted tests for trust boundaries where practical. Report the tested roles, endpoints, environment, and remaining unknowns; do not certify the entire site as secure from a limited scan.
