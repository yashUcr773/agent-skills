---
name: website-security-auth
description: Audit and harden website trust boundaries, sessions, authentication, authorization, dependencies, and accidental prototype/secret exposure. Review findings before fixes unless audit-and-fix is explicitly requested.
---

# Website Security and Authentication

This skill is self-contained, framework agnostic, and agent agnostic. Default to audit, user review, then selected fixes and verification. Use audit-and-fix only when explicitly requested.

Use `SEC-001`, `SEC-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

## Website improvement workflow

Use the actual repository, site, and conversation as evidence. The checklist identifies things to examine; it is not a requirement to add every feature. Preserve established product behavior and visual identity unless a requested correction changes them.

### Choose the operating mode

- **Review first — default:** audit, present findings and proposed fixes, get the user's review, then implement the selected fixes with their corrections and verify them. During the audit, do not change application source, dependency/lock files, configuration, or hosted settings. Non-mutating inspection and existing diagnostic checks with ordinary temporary outputs are appropriate.
- **Audit and fix — explicit option:** when the user explicitly requests auditing and fixing without an intermediate review, gather evidence and implement unambiguous fixes within the requested scope, then verify and report. This mode does not answer unresolved product questions or authorize unrelated live-system changes.
- **Audit only — when requested:** report findings and stop. Do not turn an audit request into implementation.

Use the mode requested in the conversation; no exact invocation phrase is required. Honor earlier review decisions and authorization. Do not ask again for approval already given for the same concrete scope. A later instruction to pause or narrow the task takes precedence.

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

### Present the review

In review-first mode, give a concise prioritized findings list and an actionable proposed scope before changing application files. Separate confirmed defects from options and questions. Ask the user which finding IDs to fix, defer, or change, and ask any concrete questions needed for that choice. Then pause implementation until their response. This review is the user checkpoint required by this workflow.

Apply the response as the implementation brief. If the user selects only some findings, implement only those and their necessary supporting changes. If a requested alternative has a concrete drawback, explain the evidence and resolve it with the user. Do not silently revert to your original recommendation. Record deferred findings and reasons. If new unrelated issues emerge while fixing, add them to the report rather than silently expanding the accepted scope.

### Implement within the agreed scope

Use small, coherent changes and existing project conventions. Do not replace frameworks, add major dependencies, delete apparently unused features, introduce infrastructure, or rewrite copy based on guesswork. Check callers and runtime use before removing code or assets. Treat optional additions such as caching, analytics, service workers, CAPTCHAs, load balancers, and new tests as choices driven by a demonstrated need.

Use isolated fixtures, test accounts, sandbox payments, and test email destinations where applicable. Do not send real messages, charge/refund money, rotate live credentials, change DNS, deploy, apply production migrations, or alter retention/data without that action being in the user's authorized scope. Read-only access is not authorization to mutate a live service. Prepare reviewable code/configuration and ask for the specific missing authority only when the next step needs it.

Consult current authoritative documentation when a fix depends on changing platform behavior, security advisories, browser support, search/crawler rules, or legal requirements. If current guidance is unavailable, record that limit rather than inventing a rule. Do not promise legal compliance, search rankings, or complete security from these checks.

### Verify and hand off

Reproduce the original failure, check the fix against its pass criteria, and exercise affected adjacent behavior. Use existing builds, lint/type checks, tests, and browser checks in proportion to the change. Add regression tests for meaningful logic, trust boundaries, or critical journeys when they improve confidence; avoid tests that simply repeat implementation or assert cosmetic wording.

Check the production build when relevant. A screenshot does not prove an interaction, an automated accessibility scan does not prove full accessibility, a configured integration does not prove delivery, and a single performance run does not prove a stable improvement.

Report what changed and why, what was verified and where, what still fails, and what was deferred or needs user input. Keep **fixed and verified**, **changed but not verified**, **unfixed**, and **not applicable** distinct. Describe unavailable browsers, devices, accounts, network conditions, or infrastructure evidence explicitly. Stop when the agreed scope is complete and report any remaining work without implying it was done.

## Security, authentication, and prototype leaks

Source checklist sections: 16 (security), 17 (authentication), 31 (common prototype/vibe-coded leaks).

### Establish the trust boundaries

Map public, authenticated, administrative, tenant-specific, storage, and server-only surfaces. Identify the session/auth provider and actual authorization model. Inspect source and configuration and use controlled test accounts for runtime checks. Active attack probes against a live site require an authorized target and scope; prefer local/test environments. Missing credentials or inaccessible code means not verified, not secure.

### Secrets and prototype artifacts

- Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- Distinguish intentionally public client configuration from privileged material. Firebase/Supabase-style client configuration is not automatically a leaked secret; evaluate server/service keys, key restrictions, data rules, and effective permissions. `NEXT_PUBLIC_*` and equivalent variables reach the browser and must not carry server credentials.
- Look for demo/placeholder keys, hardcoded admin identities, localhost/example domains and contacts, fake search/login/checkout/newsletter flows, mock API responses, fixture arrays, sample avatars, debug panels, unprotected admin pages, remote image mistakes, permissive CORS, and wildcard OAuth/redirect rules.
- Confirm intended production behavior before replacing mocks, deleting fixtures, removing unsupported claims, or changing identity providers. Content authenticity belongs to content review; nonfunctional actions to interactions; exploitable exposure to this audit.
- If a real credential is exposed, identify the affected system without revealing the value, recommend revocation/rotation, and prepare scoped source/configuration fixes. Deleting the current source value does not revoke a credential or erase history. Live rotation and history rewrites require scope for those actions and coordination of dependent services.

### Server-side access and injection defenses

- Verify authentication and object/action authorization on the server for every sensitive operation. Test cross-user and cross-role access with safe fixtures, including IDs supplied by the browser. Hidden buttons are not enforcement.
- Check tenant boundaries and database row-level security when the architecture relies on it. Do not assume every backend requires RLS or that enabling it alone establishes a complete policy.
- Inspect parameterized database access, context-appropriate output encoding, unsafe HTML/DOM operations, shell invocation, path construction, and upload/storage paths for SQL injection, XSS, command injection, and traversal. Do not equate generic input sanitization with protection in every context.
- Verify upload limits and content validation, executable-content handling, storage/serving isolation, and authorization to download private files. Do not trust client MIME/type declarations alone.
- Inspect CSRF protections in the context of the session and credential transport. Review CORS origin/credentials behavior and redirect/callback allowlists; avoid broad wildcards and unvalidated destinations.

### Transport, cookies, and browser policy

- Check HTTPS and redirects, TLS evidence where available, and secure cookie flags suited to the session: Secure, HttpOnly where script access is unnecessary, and intentional SameSite behavior. Test login, embedded flows, and cross-site callbacks affected by changes.
- Evaluate HSTS deliberately, especially long lifetimes, `includeSubDomains`, and preload implications. Do not enable irreversible/broad transport commitments before verifying affected hosts and operational intent.
- Review Content Security Policy, content-type sniffing protection, frame/embed controls, and referrer policy against actual resource/embed needs. Develop and verify policy changes without blindly breaking scripts, login, payments, or intentional embedding.
- Reduce unnecessary server/version disclosure and raw internal errors where practical. Hiding a header does not remediate an underlying vulnerable component.

### Account and session journeys

- Test signup, login, incorrect credentials, logout, duplicate signup, email verification, expired verification links, password reset/change, expired reset links, session expiry, refresh behavior, and protected routes where present.
- For password visibility toggles, check that intentional reveal affects only the relevant field, starts masked on a fresh form, preserves password-manager/autofill behavior, and does not submit or duplicate the secret into logs, analytics, clipboard, persistent client state, or print output. Masking is a display choice, not encryption or authorization.
- Verify safe login/logout redirects and intended-destination preservation without open redirects. Check enumeration risk in visible messages, status codes, and materially observable timing without destructive bulk tests.
- Review rate limits for login and reset, secure random reset/verification tokens, appropriate expiry and single use, and session invalidation after relevant password/security changes. Redact tokens in logs and artifacts.
- Evaluate MFA according to account risk and product requirements; adding a new auth capability needs a product decision. Test role changes, concurrent sessions, multi-tab logout, and sensitive-state cleanup.

### Dependencies and verification

Use the existing ecosystem's audit tools and current primary advisories to assess affected versions, reachable code, and available fixes. Explain breaking changes before major updates; remove packages only after verifying they are unused.

For each fix, verify both denied and allowed behavior: unauthorized access is rejected and legitimate users can still finish their journey. Add targeted tests for trust boundaries where practical. Report the tested roles, endpoints, environment, and remaining unknowns; do not certify the entire site as secure from a limited scan.
