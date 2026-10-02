# Fix Website — reusable prompt (full)

Version: 2.0.0

Audit and improve this website. This is the full version: it contains the complete workflow, all ten domain checklists, and the short checklist, and requires no installed skills or particular agent/framework. Use the request details below and anything else supplied in this conversation. Ask about consequential missing information instead of guessing.

Default to audit → user review → selected fixes → verification. Use audit-and-fix when I explicitly request it, audit only when requested, and re-audit when I ask you to re-check saved findings. Apply one combined review checkpoint across the website. Checklist links below point to sections in this prompt; no separate files need to be opened.

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

## Select relevant checklists

Use this routing table to assess applicability. Read only the checklists relevant to the current scope, and read each selected checklist before its domain audit. A full-site audit must account for every domain as audited, partially audited, not verified, or not applicable with a reason. Do not infer that a missing optional feature is a bug.

| Area | Applies when | Checklist | Finding prefix |
| --- | --- | --- | --- |
| UI and accessibility | Visual layout, responsive behavior, keyboard/screen-reader access, or browser compatibility is in scope | [UI and accessibility](#checklist-website-ui-accessibility) | UI |
| Interactions and forms | Navigation, routing, buttons, forms, search, or client state exists | [Interactions and forms](#checklist-website-interactions) | UX |
| Content and branding | Public copy, translations, identity, contact details, footer, or media branding and licensing is in scope | [Content and branding](#checklist-website-content-branding) | CONTENT |
| SEO and AI discoverability | Search indexing, sharing previews, or intended AI access is relevant | [SEO and AI discoverability](#checklist-website-seo-discoverability) | SEO |
| Performance and media | Loading, responsiveness, images/video, caching, or an existing/requested PWA is in scope | [Performance and media](#checklist-website-performance) | PERF |
| Backend and code reliability | Application code, APIs, data access, maintainability, or automated tests are available | [Backend and code reliability](#checklist-website-backend-reliability) | REL |
| Security and authentication | Sensitive data, accounts, trust boundaries, AI/LLM features, dependencies, or prototype leftovers are in scope | [Security and authentication](#checklist-website-security-auth) | SEC |
| Commerce | Checkout, payments, orders, inventory, subscriptions, or refunds exist | [Commerce](#checklist-website-commerce) | PAY |
| Privacy and analytics | Personal data, cookies, tracking, consent, or policies are relevant | [Privacy and analytics](#checklist-website-privacy-analytics) | PRIV |
| Operations and email | Deployment, environments, CI/CD, operator access, costs, email, monitoring, backups, or infrastructure is in scope | [Operations and email](#checklist-website-operations) | OPS |

The short checklist at the end of this prompt lists every check by label. Use it for a fast scan of what an audit covers, or at the end of an audit to confirm that nothing was skipped, not in place of the domain checklists.

Several checklists end with checks specific to a stack or provider: Next.js and Vercel, Supabase, Firebase, Stripe, Clerk, Auth.js, Auth0, and Better Auth. Apply only those that match what the site actually uses.

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

## Checklist: website-ui-accessibility

### UI, accessibility, and browser compatibility

Quick pass: Viewports; Overflow and clipping; Keyboard operation; Form errors and announcements; Contrast and targets.

Severity examples: critical — a core journey cannot be completed at all on a supported device or with a keyboard; high — content or controls are cut off, overlapped, or unreachable at common phone widths, or focus is invisible across the site; medium — contrast failures, missing labels or alternative text, or zoom disabled; low — spacing or alignment inconsistencies.

#### Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

Ask which accessibility conformance target applies, for example WCAG 2.2 AA. Without a stated target, use that commonly adopted level as the reference and say so. A partial check does not establish conformance.

#### Layout and responsiveness

- **Viewports.** Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- **Overflow and clipping.** Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- **Content extremes.** Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- **Visual consistency.** Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- **Sticky and layered elements.** Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- **Mobile viewport and keyboards.** Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- **Zoom and font scaling.** Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.
- **Text direction.** For supported right-to-left languages, check the `dir` attribute, mirrored layout and directional icons, logical CSS properties, and mixed-direction text such as numbers and URLs. Do not add right-to-left support for languages the site does not offer.

#### Keyboard, focus, and semantics

- **Keyboard operation.** Traverse meaningful journeys using the keyboard. Interactive controls must be reachable in a logical order, have a visible focus indicator, and work without pointer gestures. Do not make static elements focusable merely to satisfy a blanket rule.
- **Skip link and semantics.** Check skip-to-content behavior and provide a skip link where repeated navigation needs a bypass. It must become visible on focus, reach a real main-content target, and move keyboard navigation to that content without hiding it under a sticky header. Check semantic landmarks, meaningful headings, table header associations, native controls, accessible names for icon buttons, and appropriate alternate text. Use ARIA only to express semantics native HTML cannot supply; remove misleading or contradictory ARIA.
- **Menus and dialogs.** Check menu/dropdown keyboard behavior, Escape dismissal where expected, focus entry/restoration, and proper dialog names and semantics. Modal dialogs must contain focus while open without trapping users after closure; nonmodal popovers need behavior suited to their role.
- **Route changes.** With client-side navigation, check that each route sets a distinct document title, moves focus to a sensible place such as the new page heading or main region, and announces the change to assistive technology. Focus must not remain on a control that no longer exists or silently reset without context.
- **Form errors and announcements.** Verify form labels and programmatic errors, first-error navigation, and announcements of asynchronous outcomes. Live regions and toasts should announce important changes without repeatedly interrupting the user.
- **Contrast and targets.** Check contrast in actual themes and interaction states. Information must not rely on color alone. Evaluate touch target size and spacing, including close buttons and adjacent links.
- **Motion and media.** Respect reduced motion, avoid flashing content, and test accessible carousel controls. Important video/audio needs usable captions or transcripts appropriate to the content.
- **Time limits.** Where sessions, forms, or carts expire, check that users are warned before the limit, can extend it where security allows, and do not lose entered data without notice. Keep security timeouts; make them understandable instead of removing them.
- **Accessible authentication.** Check that login, signup, and verification do not depend on a cognitive test, such as a puzzle CAPTCHA, transcribing characters, or memorizing a code, without an accessible alternative. Password managers, paste, and autofill must work. Where a CAPTCHA is used, check its audio or alternative path with assistive technology.
- **Dragging alternatives.** Where reordering, sliders, maps, or uploads rely on dragging, check that a single-pointer or keyboard alternative achieves the same result.

#### Theme controls, scrollbars, and print output

- **Dark mode toggle.** Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- **Custom scrollbars.** Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- **Print stylesheet.** Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

#### Documents and accessibility statement

- **Documents and downloads.** Check that important PDFs and downloadable documents are tagged, have a logical reading order, real text instead of scanned images, and alternative text, or that the same content is available as an accessible page.
- **Accessibility statement.** Where the owner publishes or is required to publish an accessibility statement, check that it names the conformance target, known limitations, and a working contact route, and that its claims match the audit findings. Do not draft claims of conformance the evidence does not support.

#### Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

#### Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.

## Checklist: website-interactions

### Navigation, interactions, forms, and state

Quick pass: Links and destinations; Direct loads and missing routes; Button actions; Validation; Success and error states.

Severity examples: critical — the primary conversion, such as signup, checkout, or contact, silently fails or loses the user's data; high — a main route cannot be loaded directly, or a form reports success when it failed; medium — dead links, missing loading or error states, or input lost after an error; low — a missing active state or minor feedback gap.

#### Establish real journeys

Inventory routes, navigation items, CTAs, forms, search, and stateful actions. Trace each important action from UI to destination or backend result. Evaluate missing optional controls against actual content and user journeys, proposing applicable additions through the selected review workflow rather than adding every feature. Ask what an unfinished or placeholder control should do before deleting it or inventing behavior. Test with fixtures or safe accounts when an action submits data, sends a message, or changes a resource.

#### Navigation and routing

- **Links and destinations.** Detect broken destinations, meaningless `#` links, unused navigation, and fake links/buttons. Use anchors for navigation and buttons for actions. Check logo-to-home behavior, active navigation, external/new-tab links, anchor targets, and appropriate `rel` protections without assuming every link needs `noreferrer`.
- **Mobile menu.** Evaluate a mobile menu when the existing navigation does not fit. Check its labeled toggle and expanded state, opening/dismissal, Escape handling where appropriate, closing after navigation, breakpoint changes, and restoration of focus/scroll state. Prevent background scrolling for an overlay that requires it, and reliably restore scrolling after closure. Keyboard behavior must match the control semantics.
- **Progressive navigation.** Verify meaningful navigation without JavaScript where the architecture promises it; do not impose a framework rewrite. Breadcrumbs and extra navigation are optional when they help users locate themselves.
- **Direct loads and missing routes.** Open in-scope routes directly and refresh them. Check SPA server fallbacks, genuine 404 responses, deleted/renamed resources, redirects, back/forward behavior, encoded path/query values, malformed parameters, and safe normalization. A catch-all success page must not conceal missing routes.
- **URL design and state.** Check readable URLs, route parameters, filter/search sharing, necessary query parameters, and preserved navigation state. Do not remove identifiers, change stable URLs, or discard campaign parameters without understanding their consumers; plan redirects for approved URL changes.
- **Returning position.** On back/forward navigation, check that scroll position, loaded pages of a list or infinite scroll, selected tabs, and applied filters are restored as users would expect. A new navigation should start at the top unless it targets an anchor.
- **Back to top.** Evaluate a back-to-top button or link on long pages where it helps users. Give it a clear accessible name and keyboard/touch behavior; use a real destination and ensure subsequent keyboard navigation follows the intended top-of-page context. Respect reduced motion, avoid covering content or controls, and keep hidden instances out of the tab order.

#### Buttons and feedback

- **Button actions.** Confirm that buttons perform their advertised action, including copy, share, and download. Evaluate copy buttons for useful repeatable values such as code snippets, URLs, or public contact information. Copy only the intended value on a user action, announce success only after the clipboard operation succeeds, and give usable failure or manual-copy feedback when access is unavailable. A console log is not completion; ask whether an unfinished feature should be implemented, disabled with explanation, or removed.
- **Control states.** Check hover states alongside pressed, focus, disabled, loading, success, warning, and error states as applicable. Hover styling should preserve contrast and layout, with equivalent keyboard focus feedback and no hover-only functionality on touch devices. Prevent duplicate submissions while preserving a recovery path after failure. Server-side idempotency may be necessary where disabling a button cannot prevent duplicate effects.
- **Feedback placement.** Choose inline feedback, status text, spinners, skeletons, or toasts according to the action. Avoid overlays that cover essential content, repeated announcements, and timers that hide important errors. Auto-dismiss noncritical messages only when users can still understand the result.
- **Confirmation and undo.** For destructive or otherwise consequential operations, evaluate confirmation modals and practical undo behavior. Name the action and affected resource clearly, offer an unambiguous cancel path, and perform no mutation before confirmation. Verify dialog semantics, initial focus, modal focus containment, cancellation, and focus restoration; avoid unnecessary confirmation for routine reversible actions. Do not claim an irreversible operation can be undone when its side effects cannot be restored. Explain disabled actions when the reason is unclear.

#### Forms and uploads

- **Labels and input types.** Check real labels and associations, required indicators, useful input types/autocomplete, helpful placeholders, and accessible descriptions. Placeholders are not labels. Remove demo values only after distinguishing examples from actual saved data.
- **Validation.** Verify client-side feedback and authoritative server-side validation. Use context-appropriate normalization, validation, output encoding, and safe storage; do not indiscriminately strip legitimate characters as a substitute for injection protection.
- **Success and error states.** Verify form success and error states against the actual submission result. Make success clear, announce it appropriately, and provide a useful next step when needed; never show success merely because the submit handler ran. Keep entered values after failures where appropriate, avoid retaining sensitive values unnecessarily, link errors to fields, and focus/scroll to a useful first error or summary.
- **Password visibility toggle.** Evaluate a password visibility toggle on password fields when useful. Use a labeled, keyboard-accessible non-submit button with a clear show/hide action or state. Start masked, preserve the entered value and password-manager/autofill behavior when toggling, and avoid unexpected focus loss or accidental submission. Do not copy, log, persist, or send the password through analytics as part of this control.
- **Input extremes.** Test empty, extremely long, Unicode, emoji, special-character, and malformed values; meaningful character limits/counts; email, international phone, URL, and date constraints; autofill and password managers. Ask about business constraints instead of adding arbitrary limits or restrictive validation.
- **Uploads.** Verify upload type and size enforcement, server-side content validation, progress when available, cancellation, retry, and failed/partial upload cleanup. Client-supplied MIME types or filename extensions alone do not establish safety.
- **Slow, failed, and abusive submissions.** Exercise delayed responses, disconnection, server rejection, retries, and repeated clicks. Public-form anti-spam controls should match observed risk; evaluate rate limiting or honeypots and the accessibility/privacy cost of CAPTCHA before introducing it.
- **Multi-step forms.** Show progress and the current step, allow going back without losing entries, validate each step before advancing, and resume or save a draft where the form's length warrants it. Check refresh, the back button, and direct links into a later step.
- **Unsaved changes.** Where users edit substantial content, check that navigating away, closing a dialog, or refreshing either warns about or preserves unsaved work. Do not prompt on pages with nothing to lose, and clear the warning after a successful save.

#### Loading, error, and empty states

- **State coverage.** Check initial loading, empty content, zero search results, network failure, permission denial, expired sessions, rate limits, server errors, and offline behavior where applicable. Avoid confusing an empty result with a failed request.
- **Loading indicators.** Evaluate loading animations, spinners, or skeletons for real pending work. Pair them with an understandable accessible status, respect reduced motion, preserve layout, and stop on success or failure. Do not delay ready content for a decorative animation or show a fabricated percentage for work whose progress is unknown.
- **Error pages and recovery.** Provide understandable status, retry or navigation when useful, and useful 404/500 handling; evaluate 401/403 and maintenance pages where the product or platform needs them. Do not add static pages that the deployed server never uses.
- **Error detail.** Do not expose stack traces, raw database errors, or internal identifiers unnecessarily. A retry must be safe and preserve enough context to recover.

#### Search and client state

- **Site search.** Evaluate site search when the content volume and discovery journeys warrant it. Clarify which content is searchable and how results should rank or filter before choosing an implementation. Return real, current results with useful titles and destinations; enforce permissions so private pages and snippets cannot leak through results or a client-side search index. Do not ship a decorative search field with no working search.
- **Search edge cases.** Exercise blank/whitespace searches, special characters, keyboard interaction, loading/error/no-result states, results paging, and optional match highlighting. Preserve a query in the URL when shareability is intended.
- **Request timing.** Check whether debouncing reduces unnecessary requests without breaking submit behavior. Cancel or ignore stale requests so old results cannot overwrite newer queries; cancellation alone may not prevent a completed stale response from applying.
- **Client state.** Examine duplicated or stale state, settings persistence, refresh behavior, multi-tab changes, session expiry, sensitive-state cleanup on logout, and navigation away during requests. Preserve essential state only according to its sensitivity and intended lifetime.
- **Optimistic updates.** Test optimistic updates under rejection, out-of-order responses, concurrent changes, and unmount/navigation. Roll back or reconcile failed operations without losing unrelated user changes.

#### Expandable information

Evaluate expandable FAQs when genuine questions and answers benefit from progressive disclosure. Prefer native disclosure controls where suitable, or correctly labeled buttons with an accurate expanded state and associated answer. Test keyboard/touch activation, focus, open/close behavior, links inside answers, and supported deep-link or find-in-page behavior. Essential answers should remain available in the document instead of being missing until an inaccessible interaction; coordinate print output so intended answers are not silently omitted. Ask for approved answers rather than inventing claims to populate an accordion.

#### Evidence and verification

Use observable journey outcomes, network/server results, URL/back-button behavior, and focused regression tests for important state transitions. Verify both the successful path and the failure that motivated each fix. A toast alone does not prove a record was saved, email delivered, or payment completed.

## Checklist: website-content-branding

### Content, footer, and branding

Quick pass: Placeholder and unsupported content; Factual claims; Purpose and CTA; Footer and contact; Legal links.

Severity examples: critical — a false claim with legal or safety consequences, or another company's legal text presented as the site's own; high — invented testimonials, statistics, or prices; medium — placeholder text, an inconsistent brand name, or wrong contact details; low — typos and formatting inconsistencies.

#### Establish authoritative content

Identify the business/product name, audience, brand assets, tone, contact channels, and sources for factual claims. Ask for missing facts or a decision to remove unsupported content. Do not invent pricing, statistics, testimonials, customer logos, registration details, policies, addresses, or social profiles.

Treat suspicious sample content as needing investigation. Distinguish approved examples and demonstration sites from accidentally shipped production fixtures. Check how content is supplied before replacing hardcoded values or suggesting a CMS.

#### Copy and information structure

- **Placeholder and unsupported content.** Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- **Language quality.** Correct spelling, grammar, capitalization, punctuation, and unnecessary filler while preserving intended meaning and voice. Avoid turning concise factual content into generic promotional claims.
- **Formats.** Check locale-appropriate dates, currencies, prices, phone numbers, and number formatting. Resolve audience/currency ambiguity before changing meaning; display formatting must agree with authoritative commerce values.
- **Translations.** For each supported language, look for untranslated strings, mixed-language pages, truncated or overflowing translated text, text baked into images, and untranslated metadata, emails, and error messages. Check plural forms and interpolated values. Report gaps for the owner to translate; do not present machine-translated legal, pricing, or policy text as approved copy.
- **Last updated date.** Evaluate a visible last updated date for time-sensitive articles, documentation, policies, or other content where freshness matters. Use a verified substantive content update from the editorial/CMS source, distinguish it from publication date, and keep visible dates and relevant metadata consistent. Do not label every page as updated today or substitute a build/deploy timestamp; ask for a trustworthy source when it is missing.
- **Factual claims.** Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- **FAQs.** Evaluate FAQs around real user questions, with concise, verified answers. Use expandable FAQs only when the interaction helps readability; preserve accessible answers and coordinate discovery/print behavior. Do not invent policies, guarantees, prices, or questions solely to fill a section or obtain structured-data markup.
- **Purpose and CTA.** Assess whether each important page has a clear purpose and appropriate next action. Check for a single clear primary CTA per page or section, with secondary actions visually subordinate; competing CTAs of equal emphasis obscure the intended next step. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.

#### Conversion and clarity

- **Value proposition.** Check that the first screen of each landing page says what the product is, who it is for, and what to do next, without scrolling or prior knowledge. Report vague or missing statements and ask the owner for the intended message; do not invent positioning.
- **Pricing clarity.** Check that prices, billing period, what each plan includes, limits, trials, and extra fees are stated where a visitor decides, and that they agree with checkout. Unclear or missing pricing is a finding to raise, not copy to make up.
- **Signup friction.** Walk the signup or lead form as a new visitor. Report fields that are not needed at that step, forced account creation before any value is shown, unclear password rules, and dead ends after submission.
- **First-run experience.** Check what a new account sees first. An empty dashboard needs guidance toward the first useful action, and sample data must be clearly labeled as sample.
- **AI-generated content disclosure.** Where the site publishes AI-generated text, images, or chat responses, check whether the owner's policy or the applicable rules call for disclosure and whether it is present and accurate. Ask instead of assuming an obligation.

#### Footer and identity surfaces

- **Footer and contact.** Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- **Ownership and copyright.** Check company name and copyright notice against site ownership and publishing practice. If a current-year notice is intended, implement it without unnecessary rendering or hydration errors; do not invent the first-publication year or owner.
- **Legal links.** Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.
- **Logo and brand.** Verify logo use, spacing, aspect ratio, colors, fonts, supported light/dark variants, and consistency across pages. Request approved assets when absent; creating a new identity is a separate product decision.
- **Icons.** Inspect favicon clarity at small sizes, Apple touch icon, relevant web app icons, and social sharing artwork. Check files, declared sizes/formats, paths, and actual response types. Do not create an entire app-icon set when the site has no relevant surface.
- **Sharing artwork.** Verify Open Graph and Twitter/X image references use the intended artwork. Coordinate metadata with the discoverability audit and font/media delivery with performance.
- **Asset licensing.** Check that images, fonts, icons, illustrations, audio, and video are licensed for this use, including attribution and seat or pageview limits where they apply. Ask the owner for license records for assets of unknown origin. Do not assume stock, AI-generated, or hotlinked media is cleared, and do not replace assets without approval.

#### Evidence and verification

Show material copy changes with their factual source or unresolved question. Check that approved changes are consistent across templates, locales, content sources, and metadata. Inspect relevant visual assets in context and test every changed destination. Mark unverified business information as unverified, not as corrected.

## Checklist: website-seo-discoverability

### SEO, sharing, and AI discoverability

Quick pass: Titles and descriptions; Canonicals and indexing directives; Missing pages; Sitemap; Robots and crawler access.

Severity examples: critical — the whole production site is blocked from indexing by mistake; high — key pages cannot be fetched or rendered by a crawler, or canonicals point at another host; medium — duplicate or missing titles and descriptions, or stale sitemap entries; low — missing optional structured data.

#### Establish publishing intent

Identify the production origin, canonical URL convention, public/private routes, localized versions, and which environments should be indexable. Ask about these when missing. Ask which AI crawlers and uses the owner intends to allow; do not assume public web search indexing means consent to every AI crawler or purpose.

Work from the rendered HTML, HTTP responses, route configuration, sitemap, robots rules, and actual metadata. Use current official search-engine and crawler documentation for platform-specific behavior. Do not promise rankings, rich results, AI citations, or crawler compliance.

#### Page structure and metadata

- **Titles and descriptions.** Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- **Headings and language.** Check semantic landmarks, document language and correct language codes, meaningful heading hierarchy, descriptive anchors, and a meaningful primary heading for normal page layouts. Avoid empty headings and unnecessary skipped levels; do not misrepresent a single H1 as a universal ranking requirement.
- **Rendered content.** Ensure important content and internal links are available in rendered HTML without requiring a click to reveal their existence. Check server/rendered output according to the site's architecture; investigate actual discoverability before proposing a rendering rewrite.
- **Orphans and duplicates.** Find orphaned public pages, accidental duplicates, broken internal links, and unclear information hierarchy. Keep substantive content available as text rather than only in canvas or images.
- **Sharing metadata.** Check accurate Open Graph and Twitter/X card values, absolute asset URLs where required, image availability, and preview rendering. Metadata declarations alone do not prove a remote preview was refreshed.

#### URLs, crawlability, and indexing

- **Canonicals and indexing directives.** Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- **Redirects.** Check trailing-slash and host conventions, HTTPS redirects, old-to-new mappings, chains, and loops. Preserve useful deep links and query semantics. Do not change DNS or hosting rules on a live environment without scope for that action.
- **Missing pages.** Find internal links, sitemap entries, canonicals, and previously published URLs that return 404. Restore the page, redirect to a genuinely equivalent one, or remove the reference; missing pages should return a real 404 status, not a success page or a blanket redirect to the homepage.
- **Sitemap.** Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- **Robots and crawler access.** Check robots rules and relevant response headers at the intended origin. Confirm that crawlers the owner intends to allow are not blocked on public pages by robots rules, firewall or bot-protection settings, or authentication. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.
- **Multilingual.** For multilingual sites, check actual equivalents, language/region codes, canonical interactions, and reciprocal `hreflang` relationships where applicable. Do not invent translations or regional pages.
- **Parameter and pagination URLs.** Check faceted filters, sort orders, session or tracking parameters, calendars, and paginated lists for unbounded crawlable URL combinations and duplicate content. Decide deliberately which variants are indexable, keep paginated pages reachable through real links, and avoid canonicalizing every page of a series to the first.
- **Internal search results.** Keep on-site search result pages out of the index unless they are deliberately curated landing pages, and make sure user-entered queries cannot generate indexable pages containing arbitrary text.
- **Webmaster tools.** Ask whether the site is verified in search engine webmaster tools such as Google Search Console and Bing Webmaster Tools. With access, review indexing errors, manual actions, sitemap status, and crawl anomalies as evidence; without access, record this as not verified. Do not remove verification files or tags accidentally.
- **Site migration.** For a redesign, platform change, or domain move, check that every existing indexed URL maps to an equivalent new URL with a single permanent redirect, that canonicals, the sitemap, and internal links use the new URLs, and that the old sitemap and tracking stay in place until the move is verified. Changing live redirects or DNS needs scope for that action.
- **Image and video search.** Where images or video matter for discovery, check descriptive file names and alternative text, crawlable image and video URLs, captions or transcripts, and video structured data that matches the visible content.
- **Local business listings.** For a business with a physical location or service area, check that the name, address, phone number, and opening hours on the site agree with its LocalBusiness markup and with the business profiles the owner controls. Ask the owner to confirm the authoritative details; do not edit external listings.

#### Structured data and credibility

- **Structured data.** Add or correct structured data only when it represents visible, accurate content and fits the site: Organization, LocalBusiness, Product, Article, Breadcrumb, or other justified types. Obtain real business/product/author details before populating them.
- **FAQ markup.** Evaluate FAQ markup against current eligibility and the actual page rather than adding it everywhere. Validate syntax and applicable provider requirements, and report eligibility separately from a guarantee of display.
- **Credibility.** Check clear company/about information, relevant authorship, descriptive headings, direct answers in real FAQs, clean internal linking, and discoverable public documentation. Do not manufacture expertise, authors, or facts.
- **Freshness.** When a last updated date is shown, verify it against actual substantive content changes and applicable `dateModified` or sitemap modification values. Do not manufacture freshness from the current date or each deployment. Expandable FAQ answers should remain available in the rendered document and agree with any eligible structured data.

#### AI-specific access

- **Crawler policy.** Review each relevant crawler's documented user agent, purpose, directives, and current policy behavior. Identify conflicts with the user's intended access; do not blanket-allow every crawler or broadly expose private paths.
- **llms.txt.** Consider `llms.txt` only when it supports the owner's publishing strategy. Ask before adopting that strategy. Treat it as optional publishing guidance with uncertain adoption, not an indexing requirement or access-control mechanism.
- **llms.txt contents.** If used, link only intended public, authoritative material, keep descriptions accurate, and establish how it stays synchronized with the site. Never include credentials, private endpoints, or unpublished documents for supposed discoverability benefits.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js metadata.** Check that each indexable route sets its own title, description, canonical, and Open Graph values through the Metadata API or the document head, that `metadataBase` is the production origin so generated URLs do not point at localhost or a preview host, and that client-only rendering does not leave metadata or primary content out of the server HTML.
- **Next.js and Vercel hostnames.** Check generated `sitemap` and `robots` routes against the production origin, and that preview deployments and the default `vercel.app` hostname are not indexed, linked, or used as canonicals in place of the custom domain.

#### Evidence and verification

Record affected URLs and observed status, canonical, robots/indexing directives, rendered content, and structured-data results. Recheck both production-intended and staging configurations after changes. Validate preview assets and available preview tools while noting cache limits. Separate local configuration correctness from actual search-index or AI-crawler observations that require external access and time.

## Checklist: website-performance

### Performance, media, and installability

Quick pass: Image delivery; Loading priority; Bundle contents; Caching; Server response time.

Severity examples: critical — a key page is unusable on a typical phone or connection; high — a multi-megabyte asset or blocking script delays the main content on every visit; medium — avoidable bundle weight, layout shift, or missing caching; low — a minor unoptimized asset below the fold.

#### Measure the actual problem

Identify the slow route, interaction, asset, or device condition and the user impact. Gather an available baseline from browser traces, network waterfalls, bundle reports, field data, or lab tools. Record device/viewport, connection and CPU throttling, cache state, build mode, and sample count. Distinguish field and lab evidence and review current definitions of LCP, CLS, and INP when using them.

Use a production build where possible. Test both cold and warm cache behavior and representative slower mobile/network conditions. Run Lighthouse or an equivalent available tool as evidence, not as a requirement to maximize a score. A single score change does not justify an architectural change.

When the owner sets a load-time target, such as key pages loading in under one second, define the metric, pages, device, network, and cache state it applies to and report measurements against it. Treat the target as a budget to work toward with evidence, not a guarantee for every device and connection.

#### Images, video, and embeds

- **Image delivery.** Check broken images, remote-domain configuration, hotlinks, actual transfer dimensions, compression, and rendered aspect ratios. Use responsive candidates and `sizes` matching layout so mobile clients avoid unnecessary desktop payloads.
- **Formats.** Evaluate WebP/AVIF or other appropriate formats against quality, transparency, browser support, and the existing image pipeline. Preserve meaningful detail rather than compressing solely to hit an arbitrary size.
- **Layout stability and alt text.** Reserve image/video dimensions or aspect ratios to prevent layout shift. Keep informative alternative text and decorative empty alternatives appropriate to the image's role; compression does not replace accessibility checks.
- **Loading priority.** Lazy-load below-the-fold media and noncritical embeds when beneficial. Do not lazy-load the primary LCP image. Preload or prioritize the actual critical image only when evidence supports it; avoid duplicate downloads and competing preloads.
- **SVG.** Inspect SVG metadata and complexity; optimize without breaking IDs, references, scripts/security expectations, accessibility, or scaling. Untrusted SVG handling belongs to the security boundary as well.
- **Video and embeds.** Evaluate video size, delivery, poster images, and deferred video/YouTube/maps loading. Avoid autoplay with sound and preserve captions, controls, and useful fallback content. Ask about licensed/approved replacement assets instead of substituting imagery silently.

#### JavaScript, CSS, fonts, and runtime

- **Bundle contents.** Inspect bundle composition, unused code/styles/dependencies, render-blocking resources, and third-party scripts. Verify runtime/dynamic use before removal; consent-required trackers also need privacy review.
- **Splitting and deferral.** Split routes or components and defer noncritical work when it improves actual loading or interaction. Preserve rendering/execution order and avoid introducing excessive request waterfalls or chunk-loading failures.
- **Fonts.** Optimize font format, subsets, weight count, preload choices, and fallback metrics. Check text visibility and layout stability. Self-host only when licensing, delivery, privacy, and maintenance support the choice.
- **Runtime work.** Inspect unnecessary rerenders, costly calculations, expensive input/scroll/resize handlers, and long main-thread tasks. Debounce, throttle, memoize, virtualize, or use workers only for an evidenced bottleneck, with behavior and accessibility intact.
- **Animation cost.** Check loading animations and hover transitions for repeated layout work, excessive repainting, layout shifts, or unnecessary runtime dependencies. Honor reduced motion and end loading effects when work resolves; do not hold back usable content to complete an animation.
- **Resource hints.** Review preload/preconnect and asynchronous/deferred third-party execution for demonstrated critical origins and assets. Do not connect to optional or consent-gated services before intended access/consent.

#### Delivery and data volume

- **Caching.** Inspect static caching, hashed asset names, deployment invalidation, compression, and origin/CDN behavior. Avoid caching private/personalized responses publicly or making HTML stale across deployments.
- **Delivery infrastructure.** Consider CDN adoption, Brotli/Gzip, API payload compression, field selection, pagination, or cursor pagination only where measured payloads, traffic, consistency requirements, and deployment capabilities justify them.
- **Backend coordination.** Coordinate slow queries, API response limits, and repeated expensive requests with backend reliability. A cache must have an explicit key, scope, lifetime, and invalidation approach before implementation.
- **Server response time.** Measure time to first byte for key documents and API calls from a relevant location, separating network, cold-start, rendering, and data-access cost. Coordinate a slow origin with backend reliability before adding client-side workarounds.
- **Back/forward cache.** Check whether pages are eligible for the browser's back/forward cache and what blocks it, such as `unload` handlers or `Cache-Control: no-store` on pages that do not need it. Keep `no-store` where sensitive pages require it.

#### Existing or requested PWA behavior

Do not add a service worker or installability solely because an audit tool suggests it. First establish whether installation or offline use is part of the product.

For a relevant PWA, inspect the manifest, icons, theme/background colors, intended navigation scope, and install behavior on supported platforms. Verify service-worker lifecycle and update activation, cache versioning/cleanup, stale app recovery, logout/sensitive-data handling, and a useful offline fallback where intended. Test first visit, returning visit, update, offline use, and recovery. Do not claim a manifest alone makes the app work offline.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js rendering and caching.** Check which routes are static, dynamic, or revalidated against what the content needs. Reading cookies or headers, or an uncached data fetch, can make a whole route dynamic by accident. Verify that revalidation actually refreshes content and that personalized responses are never cached and shared.
- **Next.js client bundle.** Check how much of the component tree is marked `use client`. A client boundary near the root pulls its imports into the browser bundle; move interactivity to leaf components where that reduces shipped JavaScript, and confirm the effect with the bundle analyzer when available.
- **Next.js images and fonts.** Check `next/image` usage: `sizes` that match the layout, `priority` only on the LCP image, and explicit dimensions or `fill` inside a sized container. Check that fonts load through `next/font` or an equivalent that avoids render-blocking external CSS.

#### Evidence and verification

Repeat comparable measurements after each meaningful change and inspect affected interactions, visual quality, layout stability, cache correctness, and production output. Explain the measured improvement and its variability. If tools, field access, or hardware are unavailable, report code-based hypotheses and proposed measurements separately from confirmed gains.

Where the project has CI, consider a performance budget for bundle size or key lab metrics so accepted gains do not silently regress. Set thresholds from measured baselines with tolerance for run-to-run variance. A new CI dependency or a merge-blocking gate is the owner's decision.

## Checklist: website-backend-reliability

### Backend, code quality, and testing reliability

Quick pass: Validation and errors; Timeouts and retries; Concurrency; Query cost; Type and lint errors.

Severity examples: critical — data loss or corruption under normal use; high — an unhandled failure that takes down a core endpoint, or a race that duplicates writes; medium — wrong status codes, missing validation that produces bad records, or N+1 queries on a main page; low — dead code and minor lint warnings.

#### Establish architecture and contracts

Map the existing request/data path, background work, storage, API consumers, critical invariants, and current tests/build checks. If no backend exists, mark backend-specific checks not applicable while still reviewing relevant code and tests. Ask about ambiguous business rules and compatibility expectations before changing contracts.

#### API behavior and data safety

- **Validation and errors.** Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- **Timeouts and retries.** Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- **Concurrency.** Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- **Rate limits.** Evaluate rate limits and protections for expensive operations using the application's callers, proxy model, identities, and workload. Avoid arbitrary limits that block legitimate use.
- **Resource leaks.** Inspect connection/resource cleanup and signs of connection or memory leaks. Distinguish application faults from missing services, exhausted test environments, or local setup failures.
- **Background jobs and queues.** Inspect scheduled tasks, queues, and workers for bounded retries with backoff, idempotent handlers, dead-letter or failed-job handling, timeouts, overlapping runs of the same schedule, and visibility into stuck work. A job that fails silently is a finding even when the request that queued it succeeded.
- **Upstream dependencies.** For each third-party API the site depends on, check timeouts, behavior when it is slow, unavailable, or rate-limiting, quota headroom, and whether users see a useful degraded state. Do not exhaust a paid or shared quota to test this; use mocks or sandbox limits.

#### Database and caching

- **Query cost.** Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- **Indexes and pooling.** Propose indexes based on access patterns and plans, including write/storage cost. Do not add indexes or pools universally; inspect driver, serverless/runtime constraints, deployment limits, and measured connection behavior.
- **Caching.** Evaluate caching only for repeated expensive work with understood freshness requirements. Specify cache key, tenant/user boundaries, expiration, invalidation, and behavior on misses/failures; test that sensitive results cannot cross users.
- **Migrations.** For schema changes, prepare compatible migrations and explain rollout/rollback effects. Test with isolated data. Production migrations, destructive data operations, backup deletion, and restores need specific authorization.

#### Code quality tied to behavior

- **Unused code.** Find dead/unused code, imports, dependencies, commented-out experiments, debug panels/logs, and stale experimental components. Inspect dynamic imports, routes, build tooling, and external consumers before removal.
- **TODOs.** Review unresolved TODOs as evidence of unfinished behavior; do not delete comments merely to make the count zero. Remove or replace a TODO when its underlying concern is resolved or deliberately retired.
- **Type and lint errors.** Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.
- **Structure.** Examine duplicated components/logic, oversized components, naming, constants/configuration, environment-specific values, hardcoded domains, and appropriate error boundaries. Extract only when repeated behavior or maintenance risk warrants it.
- **Hardcoded secrets.** Identify hardcoded secrets without printing them. Preserve validated environment configuration and separate public configuration from server-only secrets. Security remediation owns exposed credentials and trust-boundary failures.

#### Meaningful test coverage

Build coverage around the site's actual journeys and rules: in-scope page smoke checks, CTAs, navigation, forms, happy/failure paths, empty states, unauthorized access, expired sessions, slow/offline behavior where supported, invalid/very long input, special characters, emoji, and supported languages.

Use unit tests for important isolated logic, integration tests for service/data contracts, and end-to-end tests for critical journeys. Prefer the existing test framework and fixtures. Add regression tests for meaningful discovered bugs; do not introduce a framework or cosmetic assertions to increase coverage numbers.

Run the relevant production build as well as appropriate existing lint, type, and test checks. Where feasible, exercise the built application, not just the development server. Prevent tests from sending real notifications, charging accounts, corrupting shared data, or relying on production credentials.

Check whether the existing tests run automatically on changes, for example in CI, and whether a failure blocks merging; tests that only run on one machine protect little. Identify flaky tests, which pass and fail without a code change, and fix their cause, such as timing, shared state, order dependence, or network access, or quarantine them visibly. Do not retry until green or delete them silently. Adding CI is a proposal for the owner.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Supabase database access.** Check that serverless or edge code connects through the connection pooler instead of exhausting direct connections, that schema changes live as migrations in the repository and not only as dashboard edits, and that database functions and triggers are reviewed like application code.
- **Firebase data access.** Check queries for unbounded collection reads, listeners left attached after a view closes, multi-document writes without a batch or transaction, and missing composite indexes. Reads are billed per document, so an inefficient query is a cost problem as well as a speed problem.

#### Evidence and verification

Capture a reproducible failure or query/trace before a fix and an observable outcome after it. Test failure and concurrency cases where the defect requires them. Report command outcomes, remaining warnings/failures, environment constraints, and untested contracts. Do not report a successful build as proof that database migrations, authorization, or external integrations work.

## Checklist: website-security-auth

### Security, authentication, and prototype leaks

Quick pass: Exposure sweep; Authorization; Row-level security; Data-store and cloud permissions; Injection; Token storage and JWTs.

Severity examples: critical — an anonymous visitor or any signed-in user can read or change other users' data, or a live privileged credential is exposed; high — injection, stored XSS, or account takeover that needs some precondition; medium — missing hardening such as security headers, rate limits, or enumeration protection; low — version disclosure and minor information leaks.

#### Establish the trust boundaries

Map public, authenticated, administrative, tenant-specific, storage, and server-only surfaces. Identify the session/auth provider and actual authorization model. Inspect source and configuration and use controlled test accounts for runtime checks. Review each entry point as an attacker would: consider what an anonymous visitor, an ordinary account, and a tampered client could attempt, and record confirmed defects separately from potential weaknesses that still need evidence. Active attack probes against a live site require an authorized target and scope; prefer local/test environments. Missing credentials or inaccessible code means not verified, not secure.

#### Secrets and prototype artifacts

- **Exposure sweep.** Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- **Served files and history.** Check that the deployed site does not serve `.env` files, backups, database dumps, or repository metadata, and look for database credentials or connection strings in client code, logs, and committed configuration. Where history is in scope, scan it with an available secret scanner; a clean working tree does not show what earlier commits contain.
- **Public versus privileged configuration.** Distinguish intentionally public client configuration from privileged material. Firebase/Supabase-style client configuration is not automatically a leaked secret; evaluate server/service keys, key restrictions, data rules, and effective permissions. `NEXT_PUBLIC_*` and equivalent variables reach the browser and must not carry server credentials.
- **Prototype leftovers.** Look for demo/placeholder keys, default or seed credentials, hardcoded admin identities, localhost/example domains and contacts, fake search/login/checkout/newsletter flows, mock API responses, fixture arrays, sample avatars, debug panels, unprotected admin pages, remote image mistakes, permissive CORS, and wildcard OAuth/redirect rules.
- **AI tooling leftovers.** Look for files left behind by AI coding tools and agents: committed agent or editor configuration that contains tokens, tool or MCP server settings with credentials, prompt and conversation logs, generated scratch files, and local environment files. Check that instruction files do not disclose internal URLs or secrets, and that none of this is served by the site.
- **Intended behavior.** Confirm intended production behavior before replacing mocks, deleting fixtures, removing unsupported claims, or changing identity providers. Content authenticity belongs to content review; nonfunctional actions to interactions; exploitable exposure to this audit.
- **Exposed credentials.** If a real credential is exposed, identify the affected system without revealing the value, recommend revocation/rotation, and prepare scoped source/configuration fixes. Deleting the current source value does not revoke a credential or erase history. Live rotation and history rewrites require scope for those actions and coordination of dependent services.
- **Secret rotation.** Check whether there is a known procedure for rotating each credential the site depends on, who can perform it, and which services must be updated together. A secret that cannot be rotated without downtime or guesswork is a finding even when it is not exposed. Do not rotate live credentials as a test.

#### Server-side access and injection defenses

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

#### Transport, cookies, and browser policy

- **HTTPS and cookies.** Check HTTPS and redirects, TLS evidence where available, and secure cookie flags suited to the session: Secure, HttpOnly where script access is unnecessary, and intentional SameSite behavior. Test login, embedded flows, and cross-site callbacks affected by changes.
- **Token storage and JWTs.** Check where session and refresh tokens are held. Tokens in `localStorage` or `sessionStorage` are readable by any injected script; prefer HttpOnly cookies when the architecture allows, and review CSRF protection together with any change of token transport. Where JWTs are used, verify signature, algorithm, expiry, and audience checks, and that the signing secret is strong, server-only, and not a default or example value.
- **HSTS.** Evaluate HSTS deliberately, especially long lifetimes, `includeSubDomains`, and preload implications. Do not enable irreversible/broad transport commitments before verifying affected hosts and operational intent.
- **Browser policy headers.** Review Content Security Policy, content-type sniffing protection, frame/embed controls, and referrer policy against actual resource/embed needs. Develop and verify policy changes without blindly breaking scripts, login, payments, or intentional embedding.
- **Third-party scripts.** Inventory scripts loaded from other origins. Use Subresource Integrity for fixed-version files where the provider supports it, prefer self-hosted or pinned versions over mutable URLs, and remove scripts that are no longer used. Integrity hashes break deliberately mutable scripts such as tag managers; do not add them blindly.
- **Disclosure.** Reduce unnecessary server/version disclosure and raw internal errors where practical. Hiding a header does not remediate an underlying vulnerable component.
- **Disclosure contact.** Check whether the site offers a way to report a vulnerability, such as a `security.txt` file under `/.well-known/` with a monitored contact. Propose one where the site has accounts or sensitive data; the contact address and policy are the owner's to choose.

#### Account and session journeys

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

#### AI and LLM features

Apply this section only when the site calls a language model or similar AI service. Test with safe fixtures and low volume; do not run abusive load against a paid API.

- **Keys and cost.** Model API keys must stay server-side. Check that model endpoints require the intended authentication and have per-user and overall rate and spend limits, so an anonymous caller cannot run up cost or use the site as a free proxy.
- **Prompt injection.** Treat user input and any retrieved content, such as web pages, documents, emails, and other users' data, as untrusted instructions. Check what the model can reach through tools, retrieval, or function calls: its privileges should not exceed the requesting user's, and consequential actions need server-side authorization or confirmation, not the model's judgment.
- **Output handling.** Treat model output as untrusted. Encode it before rendering, do not pass it unchecked into HTML, SQL, shell commands, URLs, or file paths, and validate structured output before acting on it.
- **Data exposure.** Check that system prompts hold no secrets, that retrieval respects per-user and per-tenant permissions, and that prompts, uploads, and conversation logs are stored, retained, and shared with providers as the privacy policy states.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js public variables.** Variables prefixed `NEXT_PUBLIC_` are inlined into the client bundle at build time. Check that none carries a secret, and that server-only values are not passed to client components as props or imported into client modules.
- **Next.js server entry points.** Treat every Server Action, Route Handler, and API route as a public endpoint. Each must authenticate and authorize the caller and validate its input itself; a check in middleware, a layout, or the page that renders the form does not protect the action or handler behind it.
- **Next.js data sent to the client.** Check what Server Components pass to Client Components and what route handlers return. Whole database records often carry fields the user should not receive.
- **Next.js images and redirects.** Check `images.remotePatterns` or the older `domains` setting for wildcards, and `redirects`, `rewrites`, and any post-login redirect parameter for open-redirect or open-proxy risk.
- **Vercel environments and previews.** Check which variables are exposed to the Preview and Development environments, whether preview deployments are publicly reachable, and whether they read or write production data.
- **Supabase row-level security.** Every table reachable through the API needs RLS enabled with a policy for each operation; a table with RLS disabled is readable and writable with the public key. Look for policies whose condition is always true, insert and update policies without a `WITH CHECK` clause, and views or `SECURITY DEFINER` functions that bypass RLS. Test with the public key and with two user sessions.
- **Supabase keys.** The anon or publishable key is meant to be public. The service-role or secret key bypasses RLS and must exist only on a server; search the client bundle, public environment variables, and browser-executed code for it.
- **Supabase storage.** Check bucket visibility and storage policies. A public bucket serves every object to anyone with the URL; a private bucket needs policies that scope upload, read, and delete to the owner.
- **Supabase auth settings.** Check the Site URL and redirect allow list for wildcards, email confirmation and password requirements, and any authorization decision that reads user-editable metadata, which a signed-in user can change for themselves.
- **Firebase security rules.** Check Firestore, Realtime Database, and Storage rules for test-mode or expiring open rules, rules that allow all reads or writes, rules that only require a signed-in user where per-user ownership is needed, and missing validation of written fields. Test with the emulator or rules unit tests, not against production data.
- **Firebase config and admin credentials.** The web app config, including its API key, is public by design; protection comes from security rules and App Check. Service-account keys and Admin SDK credentials must never reach the client or the repository. Check API key restrictions in the cloud console where they apply.
- **Firebase functions and App Check.** Check that callable and HTTP functions verify authentication and authorization themselves and validate input, that App Check is enforced where the owner intends it, and that custom claims used for roles are set only by trusted server code.
- **Clerk sessions.** Verify the session on the server, with the provider's server helpers, for every protected page, route handler, and server action. Check which routes the middleware actually protects, since hiding UI in client components or relying on middleware alone is not enforcement. Organization and role checks must read verified session claims, and webhooks must verify their signature.
- **Auth.js sessions.** Check that the auth secret is a strong server-only value in every environment, that IDs or roles added in the `jwt` and `session` callbacks come from the database and not from client input, that protected routes and handlers check the session on the server, and that automatic account linking by email is not enabled for providers that do not verify email addresses.
- **Auth0 tokens.** Check that APIs validate the access token's signature, issuer, audience, and expiry, not only its presence; that allowed callback, logout, and web-origin URLs carry no broader wildcard than needed; that roles and permissions come from verified token claims set by a trusted Action; and that ID tokens are not used to authorize API calls.
- **Better Auth configuration.** Check that the secret and base URL are set per environment, that trusted origins are listed explicitly, that protected routes and handlers check the session on the server, that email verification and rate limiting are enabled where the product needs them, and that role or admin checks are enforced server-side.

#### Dependencies and verification

Use the existing ecosystem's audit tools and current primary advisories to assess affected versions, reachable code, and available fixes. Explain breaking changes before major updates; remove packages only after verifying they are unused.

For each fix, verify both denied and allowed behavior: unauthorized access is rejected and legitimate users can still finish their journey. Add targeted tests for trust boundaries where practical. Report the tested roles, endpoints, environment, and remaining unknowns; do not certify the entire site as secure from a limited scan.

## Checklist: website-commerce

### Payments and commerce

Quick pass: Server-side totals; Idempotency; Confirmation integrity; Card data handling; Signatures.

Severity examples: critical — a customer can pay less than the price or obtain goods without paying, or the site handles or stores card data itself; high — duplicate charges or orders, or stock that can be oversold; medium — a misleading confirmation or missing pre-purchase information; low — receipt formatting.

#### Confirm the commercial rules and test environment

Establish the provider/integration, one-time versus subscription billing, order states, currencies, authoritative prices, discounts, tax/shipping rules, inventory rules, and entitlement lifecycle. Ask about missing business rules; do not invent refund policy, tax rates, subscription behavior, or prices.

Use provider-supported test mode, isolated orders, test payment instruments, and sandbox webhooks. Never make a real purchase, refund, cancellation, customer notification, or inventory change just to complete an audit unless that exact live action is authorized. With no safe test access, inspect code and document the runtime gap.

#### Checkout and order integrity

- **Checkout outcomes.** Exercise successful, declined, cancelled, abandoned, expired-session, and duplicate/retried checkout. Check recoverability, visible status, retained basket data, and appropriate error handling.
- **Server-side totals.** Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- **Idempotency.** Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- **Inventory.** Check out-of-stock behavior, concurrent inventory changes, reservation expiry where used, and overselling protections consistent with the product's fulfillment model. Do not impose stock reservations on products that do not need them.
- **Confirmation integrity.** Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.
- **Card data handling.** Check that card numbers and security codes go directly to the payment provider through its hosted fields, redirect, or SDK, and never pass through or get stored or logged by the site's own servers, analytics, error tracking, or session replay. Handling raw card data changes the site's PCI obligations and is the owner's decision, not an implementation detail.
- **Additional authentication.** Exercise payments that require strong customer authentication or 3-D Secure using the provider's test instruments: completed, failed, and abandoned challenges, and off-session renewals that need the customer to return.
- **Promotion and trial abuse.** Check server-side enforcement of coupon eligibility, single use, stacking, expiry, and minimum spend; negative or fractional quantities and manipulated line items; and repeated free trials or sign-up credits through new accounts. Match controls to observed risk, and ask before adding friction for legitimate customers.
- **Pre-purchase information.** Check that the total price including taxes, shipping, and fees, the delivery estimate, and the returns, cancellation, and renewal terms are shown before the customer commits, and that they agree with what is charged. Legal requirements vary by market; ask the owner which apply instead of asserting compliance.

#### Webhooks and delayed outcomes

- **Signatures.** Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.
- **Event ordering.** Test duplicate, delayed, retried, and out-of-order events. Processing should be idempotent at the business-effect boundary, with durable handling of concurrent deliveries.
- **Reconciliation.** Check reconciliation after partial failure: provider success followed by a database failure, delayed confirmation, repeated fulfillment, or missing events. Avoid acknowledging events before required durable handling unless a reliable queueing design makes that safe.
- **Authoritative state.** Validate state transitions against authoritative provider data when needed. Do not grant access or ship goods solely from an unverified browser callback.

#### Post-purchase behavior

Exercise test-mode refunds, partial refunds where supported, subscription cancellation and its effective date, expiry, and resulting entitlements/order status. Check receipts, approved test delivery destinations, links, amounts/currency, and correspondence with the actual payment state. Ask about ambiguous proration, renewal, cancellation, or fulfillment behavior before changing it.

For subscriptions, check failed-renewal handling: the retry schedule, customer notification, grace period, and when access is actually removed and restored. Check that dispute and chargeback events update the order and its entitlements as the owner intends. Ask for the intended dunning and grace rules instead of inventing them.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Stripe keys and modes.** Check that only the publishable key reaches the browser, that the secret key is server-only and preferably a restricted key scoped to what the integration needs, and that test and live keys, webhook secrets, and price IDs are not mixed between environments.
- **Stripe prices and sessions.** Create Checkout Sessions and Payment Intents on the server from server-held price IDs or amounts. Do not accept an amount, price ID, or success flag from the browser without checking it against the catalog, and fulfill from the verified event or a server-side retrieval of the session, not from the success URL.
- **Stripe webhooks.** Verify the signature against the raw request body with the endpoint's signing secret. Handle the events the integration depends on, such as completed, failed, refunded, and disputed payments and subscription changes; record processed event IDs so retries are idempotent; and return success only after the work is durably recorded.
- **Stripe portal and subscriptions.** Check that portal sessions and subscription changes are created only for the signed-in customer's own Stripe customer ID, and that entitlements follow the subscription status delivered by webhooks instead of a value stored at signup.

#### Evidence and verification

Record redacted test event/order references, expected and observed state transitions, and outcomes for successful and failed paths. Add focused integration/regression tests for price trust, duplicate processing, and access to paid resources. Report gaps in provider test coverage and any live validation still awaiting authorization. Never use a test checkout result to claim a real settlement or payout succeeded.

## Checklist: website-privacy-analytics

### Privacy, consent, and analytics

Quick pass: Inventory; Consent states; Working controls; Sensitive data; Policy accuracy.

Severity examples: critical — sensitive personal or payment data is sent to third parties or written to logs; high — tracking runs before required consent, or a policy misstates actual practice; medium — unnecessary data collection or missing user controls; low — minor wording gaps in a notice.

#### Establish data practices and goals

Identify the business/operator, intended markets, relevant jurisdiction information, personal-data flows, providers/processors, cookies and storage, tracking purpose, and existing approved policies. Ask for missing material inputs rather than assuming obligations or copying another business's policies.

Determine whether analytics is needed and which decisions or conversions it should support. Choosing a new provider, adopting tracking, or materially expanding collected data needs a user decision. Where legal interpretation is required, consult current authoritative sources and distinguish technical findings, draft wording, and questions requiring qualified review. Do not assert compliance from the presence of a banner or policy page.

#### Consent behavior and tracking controls

- **Inventory.** Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- **Cookie banner.** Evaluate a simple cookie banner only when actual data practices and applicable requirements call for one. Keep the copy clear, link the relevant policy, and provide usable accept/reject/preferences controls as needed. Support keyboard and touch use, readable contrast, mobile layouts, and reopening preferences without unnecessarily obscuring the site. Simplicity must not reduce consent to a cosmetic dismiss button: wire choices to real script/storage behavior, and do not treat dismissal as consent when consent is required.
- **Consent states.** Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- **Working controls.** Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- **Persistence.** Check consent persistence and expiry/version handling against the applicable policy. Do not fabricate retention periods or assume withdrawal can retroactively erase data already sent to a provider.
- **Dependencies.** Avoid bundling consent changes into a silent analytics implementation. Identify dependencies on embeds, ads, personalization, and essential flows before blocking scripts.
- **Third-party embeds.** Check whether video, map, font, social, and chat embeds contact third parties on page load before a required choice. Where consent applies, consider click-to-load placeholders or privacy-enhanced modes, and verify in the network log that nothing loads early.
- **Session replay and heatmaps.** Where recording tools are used, verify that passwords, payment fields, and personal form content are masked or excluded at capture, not just hidden in the dashboard, and that recording follows consent choices.
- **Browser privacy signals.** Check whether Global Privacy Control or similar signals are honored where the applicable rules or the site's own policy say they are. Do not claim to honor a signal the implementation ignores.

#### Analytics accuracy and minimization

- **Event accuracy.** Verify intended page views and core conversions actually fire, with no duplicates from SPA routing, rerenders, multiple installations, or retry behavior. Define event meaning before adding CTA or form error events.
- **Attribution.** Check campaign/UTM handling and whether approved attribution survives the relevant navigation/conversion flow. Do not persist identifiers indefinitely or append tracking parameters to unrelated links without a defined need.
- **Internal traffic.** Exclude development/internal traffic where practical and remove debug analytics. Use test properties, debug facilities, or clearly identified synthetic events to avoid polluting production reporting.
- **Sensitive data.** Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- **Receipt.** Validate both sending and observed receipt where access permits. A network request or console message alone does not prove the provider processed the correct event.

#### Policies and user controls

- **Policy accuracy.** Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.
- **Links and requests.** Verify links from relevant forms and site surfaces, consent preference access, and applicable contact/data-deletion mechanisms. A link or button must reach a working, appropriate process; do not submit a real deletion request as a test.
- **Drafts.** Prepare factual policy corrections or clearly marked drafts based on supplied information. Obtain the user's decisions for missing practices and jurisdiction-dependent requirements before representing text as final legal policy.
- **Account deletion.** Where users have accounts, check that they can find and start account deletion or a data request without contacting support when the applicable rules or platform policies require it, and that the outcome matches what the policy says about retained data. Use a test account; do not delete real user data.
- **Data export.** Where users have accounts and the applicable rules or the site's policy promise it, check that users can obtain a copy of their data in a usable format, and that an export contains only the requesting user's data.
- **Age restrictions.** Where the product is aimed at or likely to attract children, or sells age-restricted goods, check whether an age gate or parental-consent flow is required and whether it actually restricts the experience. Ask the owner about the intended audience; do not invent an age rule.

#### Evidence and verification

Record observed storage and requests for relevant consent states, redacted event examples, and policy-to-implementation mismatches. Recheck analytics after changes to routing, scripts, or consent. Report which provider dashboards, jurisdictions, data systems, and user-request workflows were not verified. Technical checks support review; they do not provide a legal certification.

## Checklist: website-operations

### Deployment, observability, and email operations

Quick pass: Environments; Backups; Operator access; Cost controls; Error tracking and logs; Form delivery.

Severity examples: critical — there is no usable backup of production data, or production secrets are reachable by the public; high — a deploy cannot be rolled back, or an outage would go unnoticed; medium — missing health checks, noisy or sensitive logs, or undelivered contact email; low — documentation gaps.

#### Establish environments and operational ownership

Map the current development, staging, and production environments, deployment path, runtime/services, storage, email provider, monitoring, and access. Inspect existing configuration before proposing infrastructure. Ask about reliability goals, environment exposure, retention, delivery destinations, and live-action authority only where they affect the requested work.

Audit with read-only evidence. Code/configuration preparation is distinct from changing DNS, deploying, rotating keys, applying production migrations, sending email, or restoring/deleting data. Use isolated environments for operational exercises unless the user has authorized a specific live operation.

#### Deployment and delivery

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

#### Observability

- **Error tracking and logs.** Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- **Monitoring.** Check visibility into uptime, API/frontend errors, latency, database performance, queues, failed jobs, and payment webhook failures as applicable. Use existing systems before introducing a provider.
- **Alerts.** Verify that critical alerts reach the intended operator and have actionable context using authorized test channels. Ask about alert recipients and thresholds if missing; do not send unsolicited alerts or configure noisy blanket alarms.
- **Log retention.** Review searchability, access, retention, and deletion behavior against operational needs and approved data practices, including audit records of security-relevant actions, which should not be alterable by the accounts they describe. Do not invent log retention durations or silently change provider billing plans.
- **Incident readiness.** Check whether there is a short written procedure for the likely failures, such as the site being down, a bad deploy, data loss, or a leaked credential, naming who is contacted, how to roll back, and where status is communicated. Its absence is a finding for a site with real users; drafting one needs the owner's inputs.
- **Status communication.** Check whether the owner and users can tell when the site is down: an external uptime check, and a status page or agreed channel for announcing incidents. Propose one in proportion to the site's audience.

#### Contact and email delivery

- **Contact links.** Check approved email/phone values and `mailto:`/`tel:` behavior. Avoid exposing a private mailbox where a public contact route is intended.
- **Form delivery.** Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
- **Sender authentication.** Inspect sender domain verification and SPF, DKIM, and DMARC against provider guidance and actual DNS. Distinguish application configuration, DNS publication, authentication results, and inbox delivery; none alone proves all the others.
- **Transactional messages.** Review contact, receipt, password-reset, verification, and other relevant transactional messages in authorized test delivery. Check mobile readability, link origins, HTTPS, deep links, expected token expiration/single use, and absence of leaked tokens in reports.
- **Unsubscribe.** Check unsubscribe and communication preferences where required by the message type and applicable rules. Do not automatically add marketing behavior to transactional flows or invent mailing-list membership.
- **Bounces and complaints.** Check that hard bounces and spam complaints are processed and suppress further sending, and that the provider's reputation or bounce-rate signals are visible to someone. Do not generate bounces against real addresses to test this.
- **Email rendering.** Check transactional emails in dark mode, in common clients, with images blocked, and with a screen reader: meaningful alternative text, readable contrast, a plain-text part, and links that are distinguishable without color.

#### Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Vercel deployment settings.** Check environment variables per environment, deployment protection for previews, the function region relative to the database, function duration and memory limits against real workloads, cron job configuration, and spend alerts or limits.
- **Supabase project operations.** Check backup availability on the plan in use and whether point-in-time recovery is needed, whether a free-tier project can be paused after inactivity, separate projects or branches for development and production, and who holds owner access.
- **Firebase project operations.** Check the billing plan and budget alerts, remembering that an alert does not cap spend; separate projects for development and production; scheduled database backups or exports; and the roles granted on the underlying cloud project.

#### Evidence and verification

Prefer production-like builds, isolated restore/rollback exercises, test inboxes, controlled health failures, and observable log/alert receipt. Report exactly what was inspected versus exercised, including environment, access, and delivery limits. Provide prepared configuration and outstanding actions when live access or authorization is absent; do not describe an unexecuted deployment or recovery plan as complete.

## Short checklist

Every check in the ten domain checklists, by label and in checklist order. Use it for a fast scan of what an audit covers, or at the end of an audit to confirm that each applicable check was reported as passed, failed, not verified, or not applicable. The domain checklists explain how to carry out each check and when not to change anything.

### website-ui-accessibility

- Viewports
- Overflow and clipping
- Content extremes
- Visual consistency
- Sticky and layered elements
- Mobile viewport and keyboards
- Zoom and font scaling
- Text direction
- Keyboard operation
- Skip link and semantics
- Menus and dialogs
- Route changes
- Form errors and announcements
- Contrast and targets
- Motion and media
- Time limits
- Accessible authentication
- Dragging alternatives
- Dark mode toggle
- Custom scrollbars
- Print stylesheet
- Documents and downloads
- Accessibility statement

### website-interactions

- Links and destinations
- Mobile menu
- Progressive navigation
- Direct loads and missing routes
- URL design and state
- Returning position
- Back to top
- Button actions
- Control states
- Feedback placement
- Confirmation and undo
- Labels and input types
- Validation
- Success and error states
- Password visibility toggle
- Input extremes
- Uploads
- Slow, failed, and abusive submissions
- Multi-step forms
- Unsaved changes
- State coverage
- Loading indicators
- Error pages and recovery
- Error detail
- Site search
- Search edge cases
- Request timing
- Client state
- Optimistic updates

### website-content-branding

- Placeholder and unsupported content
- Language quality
- Formats
- Translations
- Last updated date
- Factual claims
- FAQs
- Purpose and CTA
- Value proposition
- Pricing clarity
- Signup friction
- First-run experience
- AI-generated content disclosure
- Footer and contact
- Ownership and copyright
- Legal links
- Logo and brand
- Icons
- Sharing artwork
- Asset licensing

### website-seo-discoverability

- Titles and descriptions
- Headings and language
- Rendered content
- Orphans and duplicates
- Sharing metadata
- Canonicals and indexing directives
- Redirects
- Missing pages
- Sitemap
- Robots and crawler access
- Multilingual
- Parameter and pagination URLs
- Internal search results
- Webmaster tools
- Site migration
- Image and video search
- Local business listings
- Structured data
- FAQ markup
- Credibility
- Freshness
- Crawler policy
- llms.txt
- llms.txt contents
- Next.js metadata
- Next.js and Vercel hostnames

### website-performance

- Image delivery
- Formats
- Layout stability and alt text
- Loading priority
- SVG
- Video and embeds
- Bundle contents
- Splitting and deferral
- Fonts
- Runtime work
- Animation cost
- Resource hints
- Caching
- Delivery infrastructure
- Backend coordination
- Server response time
- Back/forward cache
- Next.js rendering and caching
- Next.js client bundle
- Next.js images and fonts

### website-backend-reliability

- Validation and errors
- Timeouts and retries
- Concurrency
- Rate limits
- Resource leaks
- Background jobs and queues
- Upstream dependencies
- Query cost
- Indexes and pooling
- Caching
- Migrations
- Unused code
- TODOs
- Type and lint errors
- Structure
- Hardcoded secrets
- Supabase database access
- Firebase data access

### website-security-auth

- Exposure sweep
- Served files and history
- Public versus privileged configuration
- Prototype leftovers
- AI tooling leftovers
- Intended behavior
- Exposed credentials
- Secret rotation
- Authorization
- Field tampering
- Row-level security
- Data-store and cloud permissions
- Dangling DNS
- Injection
- SSRF
- Uploads
- CSRF and CORS
- GraphQL and real-time channels
- Business-logic abuse
- HTTPS and cookies
- Token storage and JWTs
- HSTS
- Browser policy headers
- Third-party scripts
- Disclosure
- Disclosure contact
- Account journeys
- Password visibility
- Redirects and enumeration
- Rate limits and tokens
- Automated abuse
- Password handling
- MFA and roles
- OAuth and SSO
- Sensitive changes
- Audit records
- Keys and cost
- Prompt injection
- Output handling
- Data exposure
- Next.js public variables
- Next.js server entry points
- Next.js data sent to the client
- Next.js images and redirects
- Vercel environments and previews
- Supabase row-level security
- Supabase keys
- Supabase storage
- Supabase auth settings
- Firebase security rules
- Firebase config and admin credentials
- Firebase functions and App Check
- Clerk sessions
- Auth.js sessions
- Auth0 tokens
- Better Auth configuration

### website-commerce

- Checkout outcomes
- Server-side totals
- Idempotency
- Inventory
- Confirmation integrity
- Card data handling
- Additional authentication
- Promotion and trial abuse
- Pre-purchase information
- Signatures
- Event ordering
- Reconciliation
- Authoritative state
- Stripe keys and modes
- Stripe prices and sessions
- Stripe webhooks
- Stripe portal and subscriptions

### website-privacy-analytics

- Inventory
- Cookie banner
- Consent states
- Working controls
- Persistence
- Dependencies
- Third-party embeds
- Session replay and heatmaps
- Browser privacy signals
- Event accuracy
- Attribution
- Internal traffic
- Sensitive data
- Receipt
- Policy accuracy
- Links and requests
- Drafts
- Account deletion
- Data export
- Age restrictions

### website-operations

- Environments
- Source maps
- Delivery configuration
- Health and shutdown
- Rollout and rollback
- Backups
- Domain and certificate expiry
- Pipeline permissions
- Operator access
- Cost controls
- Load testing
- Dependency updates
- Error tracking and logs
- Monitoring
- Alerts
- Log retention
- Incident readiness
- Status communication
- Contact links
- Form delivery
- Sender authentication
- Transactional messages
- Unsubscribe
- Bounces and complaints
- Email rendering
- Vercel deployment settings
- Supabase project operations
- Firebase project operations
