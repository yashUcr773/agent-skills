# Website Interactions and Forms — reusable prompt

Version: 1.2.0

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the request details below and anything else supplied in this conversation: the repository, URL, goals, constraints, and prior decisions. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings. If I ask for a re-audit, re-check the saved findings instead of starting over.

Use `UX-001`, `UX-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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
- **Re-audit — when requested:** when a findings file from an earlier audit exists and the user asks to re-check it, test each recorded finding against the current site and mark it fixed and verified, still open, regressed, or not verified, with the evidence. Also check what each fix changed around it: a problem the fix introduced is a new finding that names the original ID. Do not repeat the whole audit, search for unrelated problems, or change application files. Record a new problem met along the way as a new finding.

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
5. At standard and deep depth, finish by going through the check labels of every selected checklist. Add a coverage section to the report with one line per domain that names each label not verified or not applicable, with the reason; every label not named there counts as audited.

Prefer checks that change nothing. When proving a problem needs a write, such as showing that one user can change another user's data, use accounts and records created for the test, or a write that leaves the stored value unchanged. Undo what you create. Do not change other people's accounts, sessions, or data, and list anything you could not undo under Owner actions.

For every finding, whatever its severity, record:

- A stable ID, severity, confidence, and short problem statement.
- The affected route, file/component, or service; redacted reproduction/evidence and user impact.
- A concrete proposed change, relevant tradeoffs/dependencies, and observable pass criteria.
- The user's decision or open question, implementation status, and verification result.

A row in a summary table is not a finding by itself; it needs these details too. An item with no proposed change is an open question, not a finding. Give each distinct defect its own finding, even when several share a file or route, and link related findings rather than merging them. Merge only duplicates: the same defect reached from two directions.

Use critical for demonstrated severe exposure or loss, high for major security/reliability failures or blocked core journeys, medium for meaningful degradation, and low for minor defects. Rate each finding by the harm it demonstrates, not by the worst problem near it. Keep preference-driven improvements optional rather than assigning artificial urgency. Do not print credentials, personal data, reset links, or session tokens in reports. This includes test and seed accounts and hardcoded defaults: name where the value is and why it is weak, without the value itself. Take any counts in a summary from the final findings list.

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

## Navigation, interactions, forms, and state

Quick pass: Links and destinations; Direct loads and missing routes; Button actions; Validation; Success and error states.

Severity examples: critical — the primary conversion, such as signup, checkout, or contact, silently fails or loses the user's data; high — a main route cannot be loaded directly, or a form reports success when it failed; medium — dead links, missing loading or error states, or input lost after an error; low — a missing active state or minor feedback gap.

### Establish real journeys

Inventory routes, navigation items, CTAs, forms, search, and stateful actions. Trace each important action from UI to destination or backend result. Evaluate missing optional controls against actual content and user journeys, proposing applicable additions through the selected review workflow rather than adding every feature. Ask what an unfinished or placeholder control should do before deleting it or inventing behavior. Test with fixtures or safe accounts when an action submits data, sends a message, or changes a resource.

### Navigation and routing

- **Links and destinations.** Detect broken destinations, meaningless `#` links, unused navigation, and fake links/buttons. Use anchors for navigation and buttons for actions. Check logo-to-home behavior, active navigation, external/new-tab links, anchor targets, and appropriate `rel` protections without assuming every link needs `noreferrer`.
- **Mobile menu.** Evaluate a mobile menu when the existing navigation does not fit. Check its labeled toggle and expanded state, opening/dismissal, Escape handling where appropriate, closing after navigation, breakpoint changes, and restoration of focus/scroll state. Prevent background scrolling for an overlay that requires it, and reliably restore scrolling after closure. Keyboard behavior must match the control semantics.
- **Progressive navigation.** Verify meaningful navigation without JavaScript where the architecture promises it; do not impose a framework rewrite. Breadcrumbs and extra navigation are optional when they help users locate themselves.
- **Direct loads and missing routes.** Open in-scope routes directly and refresh them. Check SPA server fallbacks, genuine 404 responses, deleted/renamed resources, redirects, back/forward behavior, encoded path/query values, malformed parameters, and safe normalization. A catch-all success page must not conceal missing routes.
- **URL design and state.** Check readable URLs, route parameters, filter/search sharing, necessary query parameters, and preserved navigation state. Do not remove identifiers, change stable URLs, or discard campaign parameters without understanding their consumers; plan redirects for approved URL changes.
- **Returning position.** On back/forward navigation, check that scroll position, loaded pages of a list or infinite scroll, selected tabs, and applied filters are restored as users would expect. A new navigation should start at the top unless it targets an anchor.
- **Back to top.** Evaluate a back-to-top button or link on long pages where it helps users. Give it a clear accessible name and keyboard/touch behavior; use a real destination and ensure subsequent keyboard navigation follows the intended top-of-page context. Respect reduced motion, avoid covering content or controls, and keep hidden instances out of the tab order.

### Buttons and feedback

- **Button actions.** Confirm that buttons perform their advertised action, including copy, share, and download. Evaluate copy buttons for useful repeatable values such as code snippets, URLs, or public contact information. Copy only the intended value on a user action, announce success only after the clipboard operation succeeds, and give usable failure or manual-copy feedback when access is unavailable. A console log is not completion; ask whether an unfinished feature should be implemented, disabled with explanation, or removed.
- **Control states.** Check hover states alongside pressed, focus, disabled, loading, success, warning, and error states as applicable. Hover styling should preserve contrast and layout, with equivalent keyboard focus feedback and no hover-only functionality on touch devices. Prevent duplicate submissions while preserving a recovery path after failure. Server-side idempotency may be necessary where disabling a button cannot prevent duplicate effects.
- **Feedback placement.** Choose inline feedback, status text, spinners, skeletons, or toasts according to the action. Avoid overlays that cover essential content, repeated announcements, and timers that hide important errors. Auto-dismiss noncritical messages only when users can still understand the result.
- **Confirmation and undo.** For destructive or otherwise consequential operations, evaluate confirmation modals and practical undo behavior. Name the action and affected resource clearly, offer an unambiguous cancel path, and perform no mutation before confirmation. Verify dialog semantics, initial focus, modal focus containment, cancellation, and focus restoration; avoid unnecessary confirmation for routine reversible actions. Do not claim an irreversible operation can be undone when its side effects cannot be restored. Explain disabled actions when the reason is unclear.

### Forms and uploads

- **Labels and input types.** Check real labels and associations, required indicators, useful input types/autocomplete, helpful placeholders, and accessible descriptions. Placeholders are not labels. Remove demo values only after distinguishing examples from actual saved data.
- **Validation.** Verify client-side feedback and authoritative server-side validation. Use context-appropriate normalization, validation, output encoding, and safe storage; do not indiscriminately strip legitimate characters as a substitute for injection protection.
- **Success and error states.** Verify form success and error states against the actual submission result. Make success clear, announce it appropriately, and provide a useful next step when needed; never show success merely because the submit handler ran. Keep entered values after failures where appropriate, avoid retaining sensitive values unnecessarily, link errors to fields, and focus/scroll to a useful first error or summary.
- **Password visibility toggle.** Evaluate a password visibility toggle on password fields when useful. Use a labeled, keyboard-accessible non-submit button with a clear show/hide action or state. Start masked, preserve the entered value and password-manager/autofill behavior when toggling, and avoid unexpected focus loss or accidental submission. Do not copy, log, persist, or send the password through analytics as part of this control.
- **Input extremes.** Test empty, extremely long, Unicode, emoji, special-character, and malformed values; meaningful character limits/counts; email, international phone, URL, and date constraints; autofill and password managers. Ask about business constraints instead of adding arbitrary limits or restrictive validation.
- **Uploads.** Verify upload type and size enforcement, server-side content validation, progress when available, cancellation, retry, and failed/partial upload cleanup. Client-supplied MIME types or filename extensions alone do not establish safety.
- **Slow, failed, and abusive submissions.** Exercise delayed responses, disconnection, server rejection, retries, and repeated clicks. Public-form anti-spam controls should match observed risk; evaluate rate limiting or honeypots and the accessibility/privacy cost of CAPTCHA before introducing it.
- **Multi-step forms.** Show progress and the current step, allow going back without losing entries, validate each step before advancing, and resume or save a draft where the form's length warrants it. Check refresh, the back button, and direct links into a later step.
- **Unsaved changes.** Where users edit substantial content, check that navigating away, closing a dialog, or refreshing either warns about or preserves unsaved work. Do not prompt on pages with nothing to lose, and clear the warning after a successful save.

### Loading, error, and empty states

- **State coverage.** Check initial loading, empty content, zero search results, network failure, permission denial, expired sessions, rate limits, server errors, and offline behavior where applicable. Avoid confusing an empty result with a failed request.
- **Loading indicators.** Evaluate loading animations, spinners, or skeletons for real pending work. Pair them with an understandable accessible status, respect reduced motion, preserve layout, and stop on success or failure. Do not delay ready content for a decorative animation or show a fabricated percentage for work whose progress is unknown.
- **Error pages and recovery.** Provide understandable status, retry or navigation when useful, and useful 404/500 handling; evaluate 401/403 and maintenance pages where the product or platform needs them. Do not add static pages that the deployed server never uses.
- **Error detail.** Do not expose stack traces, raw database errors, or internal identifiers unnecessarily. A retry must be safe and preserve enough context to recover.

### Search and client state

- **Site search.** Evaluate site search when the content volume and discovery journeys warrant it. Clarify which content is searchable and how results should rank or filter before choosing an implementation. Return real, current results with useful titles and destinations; enforce permissions so private pages and snippets cannot leak through results or a client-side search index. Do not ship a decorative search field with no working search.
- **Search edge cases.** Exercise blank/whitespace searches, special characters, keyboard interaction, loading/error/no-result states, results paging, and optional match highlighting. Preserve a query in the URL when shareability is intended.
- **Request timing.** Check whether debouncing reduces unnecessary requests without breaking submit behavior. Cancel or ignore stale requests so old results cannot overwrite newer queries; cancellation alone may not prevent a completed stale response from applying.
- **Client state.** Examine duplicated or stale state, settings persistence, refresh behavior, multi-tab changes, session expiry, sensitive-state cleanup on logout, and navigation away during requests. Preserve essential state only according to its sensitivity and intended lifetime.
- **Optimistic updates.** Test optimistic updates under rejection, out-of-order responses, concurrent changes, and unmount/navigation. Roll back or reconcile failed operations without losing unrelated user changes.

### Expandable information

Evaluate expandable FAQs when genuine questions and answers benefit from progressive disclosure. Prefer native disclosure controls where suitable, or correctly labeled buttons with an accurate expanded state and associated answer. Test keyboard/touch activation, focus, open/close behavior, links inside answers, and supported deep-link or find-in-page behavior. Essential answers should remain available in the document instead of being missing until an inaccessible interaction; coordinate print output so intended answers are not silently omitted. Ask for approved answers rather than inventing claims to populate an accordion.

### Evidence and verification

Use observable journey outcomes, network/server results, URL/back-button behavior, and focused regression tests for important state transitions. Verify both the successful path and the failure that motivated each fix. A toast alone does not prove a record was saved, email delivered, or payment completed.
