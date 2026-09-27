# Improve Website — reusable master prompt

Audit and improve this website using the repository, URL, goals, constraints, and previous decisions supplied in this conversation. Ask about consequential missing information rather than guessing. This prompt contains the complete workflow and domain checklists and requires no installed skills or particular agent/framework.

Default to audit → user review → selected fixes → verification. Use audit-and-fix when I explicitly request it, or audit only when requested. Apply one combined review checkpoint across the website. Checklist/reference links below point to sections in this prompt; no separate files need to be opened.

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

## Establish the website and its scope

Inspect the repository instructions, entry points, route definitions, package/build configuration, environment examples, existing tests, and any supplied URL or brief. Record what the site actually does, the critical visitor journeys, the available environments, and the limits of your access. With URL-only access, audit what is observable; request source access only when implementation needs it.

Resolve material gaps with the user: the primary conversion or business goal, intended audience, important routes, intended public/private content, supported languages and browsers, and access to a safe test environment when needed. Do not ask for facts already established by the repository or conversation. Uncertain intent is an open question, not a defect.

Map public, authenticated, administrative, and error routes plus shared layouts. Start with critical journeys and shared components, then extend to the agreed scope. For large sites, propose a representative sample and document its limits; do not claim every page was checked from a sample.

## Select relevant checklists

Use this routing table to assess applicability. Read only the references relevant to the current scope, then read each selected reference before its domain audit. A full-site audit must account for every domain as audited, partially audited, not verified, or not applicable with a reason. Do not infer that a missing optional feature is a bug.

| Area | Read when | Checklist | Finding prefix |
| --- | --- | --- | --- |
| UI and accessibility | Visual layout, responsive behavior, keyboard/screen-reader access, or browser compatibility is in scope | [UI and accessibility](#checklist-website-ui-accessibility) | UI |
| Interactions and forms | Navigation, routing, buttons, forms, search, or client state exists | [Interactions](#checklist-website-interactions) | UX |
| Content and branding | Public copy, identity, contact details, footer, or media branding is in scope | [Content and branding](#checklist-website-content-branding) | CONTENT |
| SEO and AI discoverability | Search indexing, sharing previews, or intended AI access is relevant | [SEO and discoverability](#checklist-website-seo-discoverability) | SEO |
| Performance and media | Loading, responsiveness, images/video, caching, or an existing/requested PWA is in scope | [Performance](#checklist-website-performance) | PERF |
| Backend and code reliability | Application code, APIs, data access, maintainability, or automated tests are available | [Backend and reliability](#checklist-website-backend-reliability) | REL |
| Security and authentication | Sensitive data, accounts, trust boundaries, dependencies, or prototype leftovers are in scope | [Security and authentication](#checklist-website-security-auth) | SEC |
| Commerce | Checkout, payments, orders, inventory, subscriptions, or refunds exist | [Commerce](#checklist-website-commerce) | PAY |
| Privacy and analytics | Personal data, cookies, tracking, consent, or policies are relevant | [Privacy and analytics](#checklist-website-privacy-analytics) | PRIV |
| Operations and email | Deployment, environments, email, monitoring, backups, or infrastructure is in scope | [Operations](#checklist-website-operations) | OPS |

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

## Checklist: website-ui-accessibility

### UI, accessibility, and browser compatibility

Source checklist sections: 1 (visual QA), 12 (accessibility), 13 (mobile UX), 19 (browser compatibility).

#### Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

#### Layout and responsiveness

- Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.

#### Keyboard, focus, and semantics

- Traverse meaningful journeys using the keyboard. Interactive controls must be reachable in a logical order, have a visible focus indicator, and work without pointer gestures. Do not make static elements focusable merely to satisfy a blanket rule.
- Check skip-to-content behavior and provide a skip link where repeated navigation needs a bypass. It must become visible on focus, reach a real main-content target, and move keyboard navigation to that content without hiding it under a sticky header. Check semantic landmarks, meaningful headings, table header associations, native controls, accessible names for icon buttons, and appropriate alternate text. Use ARIA only to express semantics native HTML cannot supply; remove misleading or contradictory ARIA.
- Check menu/dropdown keyboard behavior, Escape dismissal where expected, focus entry/restoration, and proper dialog names and semantics. Modal dialogs must contain focus while open without trapping users after closure; nonmodal popovers need behavior suited to their role.
- Verify form labels and programmatic errors, first-error navigation, and announcements of asynchronous outcomes. Live regions and toasts should announce important changes without repeatedly interrupting the user.
- Check contrast in actual themes and interaction states. Information must not rely on color alone. Evaluate touch target size and spacing, including close buttons and adjacent links.
- Respect reduced motion, avoid flashing content, and test accessible carousel controls. Important video/audio needs usable captions or transcripts appropriate to the content.

#### Theme controls, scrollbars, and print output

- Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

#### Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

#### Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.

## Checklist: website-interactions

### Navigation, interactions, forms, and state

Source checklist sections: 2 (navigation), 3 (buttons), 4 (forms), 5 (empty/loading/error states), 20 (routing), 27 (search), 28 (state management).

#### Establish real journeys

Inventory routes, navigation items, CTAs, forms, search, and stateful actions. Trace each important action from UI to destination or backend result. Evaluate missing optional controls against actual content and user journeys, proposing applicable additions through the selected review workflow rather than adding every feature. Ask what an unfinished or placeholder control should do before deleting it or inventing behavior. Test with fixtures or safe accounts when an action submits data, sends a message, or changes a resource.

#### Navigation and routing

- Detect broken destinations, meaningless `#` links, unused navigation, and fake links/buttons. Use anchors for navigation and buttons for actions. Check logo-to-home behavior, active navigation, external/new-tab links, anchor targets, and appropriate `rel` protections without assuming every link needs `noreferrer`.
- Evaluate a mobile menu when the existing navigation does not fit. Check its labeled toggle and expanded state, opening/dismissal, Escape handling where appropriate, closing after navigation, breakpoint changes, and restoration of focus/scroll state. Prevent background scrolling for an overlay that requires it, and reliably restore scrolling after closure. Keyboard behavior must match the control semantics.
- Verify meaningful navigation without JavaScript where the architecture promises it; do not impose a framework rewrite. Breadcrumbs and extra navigation are optional when they help users locate themselves.
- Open in-scope routes directly and refresh them. Check SPA server fallbacks, genuine 404 responses, deleted/renamed resources, redirects, back/forward behavior, encoded path/query values, malformed parameters, and safe normalization. A catch-all success page must not conceal missing routes.
- Check readable URLs, route parameters, filter/search sharing, necessary query parameters, and preserved navigation state. Do not remove identifiers, change stable URLs, or discard campaign parameters without understanding their consumers; plan redirects for approved URL changes.
- Evaluate a back-to-top button or link on long pages where it helps users. Give it a clear accessible name and keyboard/touch behavior; use a real destination and ensure subsequent keyboard navigation follows the intended top-of-page context. Respect reduced motion, avoid covering content or controls, and keep hidden instances out of the tab order.

#### Buttons and feedback

- Confirm that buttons perform their advertised action, including copy, share, and download. Evaluate copy buttons for useful repeatable values such as code snippets, URLs, or public contact information. Copy only the intended value on a user action, announce success only after the clipboard operation succeeds, and give usable failure or manual-copy feedback when access is unavailable. A console log is not completion; ask whether an unfinished feature should be implemented, disabled with explanation, or removed.
- Check hover states alongside pressed, focus, disabled, loading, success, warning, and error states as applicable. Hover styling should preserve contrast and layout, with equivalent keyboard focus feedback and no hover-only functionality on touch devices. Prevent duplicate submissions while preserving a recovery path after failure. Server-side idempotency may be necessary where disabling a button cannot prevent duplicate effects.
- Choose inline feedback, status text, spinners, skeletons, or toasts according to the action. Avoid overlays that cover essential content, repeated announcements, and timers that hide important errors. Auto-dismiss noncritical messages only when users can still understand the result.
- For destructive or otherwise consequential operations, evaluate confirmation modals and practical undo behavior. Name the action and affected resource clearly, offer an unambiguous cancel path, and perform no mutation before confirmation. Verify dialog semantics, initial focus, modal focus containment, cancellation, and focus restoration; avoid unnecessary confirmation for routine reversible actions. Do not claim an irreversible operation can be undone when its side effects cannot be restored. Explain disabled actions when the reason is unclear.

#### Forms and uploads

- Check real labels and associations, required indicators, useful input types/autocomplete, helpful placeholders, and accessible descriptions. Placeholders are not labels. Remove demo values only after distinguishing examples from actual saved data.
- Verify client-side feedback and authoritative server-side validation. Use context-appropriate normalization, validation, output encoding, and safe storage; do not indiscriminately strip legitimate characters as a substitute for injection protection.
- Verify form success and error states against the actual submission result. Make success clear, announce it appropriately, and provide a useful next step when needed; never show success merely because the submit handler ran. Keep entered values after failures where appropriate, avoid retaining sensitive values unnecessarily, link errors to fields, and focus/scroll to a useful first error or summary.
- Evaluate a password visibility toggle on password fields when useful. Use a labeled, keyboard-accessible non-submit button with a clear show/hide action or state. Start masked, preserve the entered value and password-manager/autofill behavior when toggling, and avoid unexpected focus loss or accidental submission. Do not copy, log, persist, or send the password through analytics as part of this control.
- Test empty, extremely long, Unicode, emoji, special-character, and malformed values; meaningful character limits/counts; email, international phone, URL, and date constraints; autofill and password managers. Ask about business constraints instead of adding arbitrary limits or restrictive validation.
- Verify upload type and size enforcement, server-side content validation, progress when available, cancellation, retry, and failed/partial upload cleanup. Client-supplied MIME types or filename extensions alone do not establish safety.
- Exercise delayed responses, disconnection, server rejection, retries, and repeated clicks. Public-form anti-spam controls should match observed risk; evaluate rate limiting or honeypots and the accessibility/privacy cost of CAPTCHA before introducing it.

#### Loading, error, and empty states

- Check initial loading, empty content, zero search results, network failure, permission denial, expired sessions, rate limits, server errors, and offline behavior where applicable. Avoid confusing an empty result with a failed request.
- Evaluate loading animations, spinners, or skeletons for real pending work. Pair them with an understandable accessible status, respect reduced motion, preserve layout, and stop on success or failure. Do not delay ready content for a decorative animation or show a fabricated percentage for work whose progress is unknown.
- Provide understandable status, retry or navigation when useful, and useful 404/500 handling; evaluate 401/403 and maintenance pages where the product or platform needs them. Do not add static pages that the deployed server never uses.
- Do not expose stack traces, raw database errors, or internal identifiers unnecessarily. A retry must be safe and preserve enough context to recover.

#### Search and client state

- Evaluate site search when the content volume and discovery journeys warrant it. Clarify which content is searchable and how results should rank or filter before choosing an implementation. Return real, current results with useful titles and destinations; enforce permissions so private pages and snippets cannot leak through results or a client-side search index. Do not ship a decorative search field with no working search.
- Exercise blank/whitespace searches, special characters, keyboard interaction, loading/error/no-result states, results paging, and optional match highlighting. Preserve a query in the URL when shareability is intended.
- Check whether debouncing reduces unnecessary requests without breaking submit behavior. Cancel or ignore stale requests so old results cannot overwrite newer queries; cancellation alone may not prevent a completed stale response from applying.
- Examine duplicated or stale state, settings persistence, refresh behavior, multi-tab changes, session expiry, sensitive-state cleanup on logout, and navigation away during requests. Preserve essential state only according to its sensitivity and intended lifetime.
- Test optimistic updates under rejection, out-of-order responses, concurrent changes, and unmount/navigation. Roll back or reconcile failed operations without losing unrelated user changes.

#### Expandable information

Evaluate expandable FAQs when genuine questions and answers benefit from progressive disclosure. Prefer native disclosure controls where suitable, or correctly labeled buttons with an accurate expanded state and associated answer. Test keyboard/touch activation, focus, open/close behavior, links inside answers, and supported deep-link or find-in-page behavior. Essential answers should remain available in the document instead of being missing until an inaccessible interaction; coordinate print output so intended answers are not silently omitted. Ask for approved answers rather than inventing claims to populate an accordion.

#### Evidence and verification

Use observable journey outcomes, network/server results, URL/back-button behavior, and focused regression tests for important state transitions. Verify both the successful path and the failure that motivated each fix. A toast alone does not prove a record was saved, email delivered, or payment completed.

## Checklist: website-content-branding

### Content, footer, and branding

Source checklist sections: 6 (content cleanup), 7 (footer), 9 (branding).

#### Establish authoritative content

Identify the business/product name, audience, brand assets, tone, contact channels, and sources for factual claims. Ask for missing facts or a decision to remove unsupported content. Do not invent pricing, statistics, testimonials, customer logos, registration details, policies, addresses, or social profiles.

Treat suspicious sample content as needing investigation. Distinguish approved examples and demonstration sites from accidentally shipped production fixtures. Check how content is supplied before replacing hardcoded values or suggesting a CMS.

#### Copy and information structure

- Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- Correct spelling, grammar, capitalization, punctuation, and unnecessary filler while preserving intended meaning and voice. Avoid turning concise factual content into generic promotional claims.
- Check locale-appropriate dates, currencies, prices, phone numbers, and number formatting. Resolve audience/currency ambiguity before changing meaning; display formatting must agree with authoritative commerce values.
- Evaluate a visible last updated date for time-sensitive articles, documentation, policies, or other content where freshness matters. Use a verified substantive content update from the editorial/CMS source, distinguish it from publication date, and keep visible dates and relevant metadata consistent. Do not label every page as updated today or substitute a build/deploy timestamp; ask for a trustworthy source when it is missing.
- Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- Evaluate FAQs around real user questions, with concise, verified answers. Use expandable FAQs only when the interaction helps readability; preserve accessible answers and coordinate discovery/print behavior. Do not invent policies, guarantees, prices, or questions solely to fill a section or obtain structured-data markup.
- Assess whether each important page has a clear purpose and appropriate next action. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.

#### Footer and identity surfaces

- Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- Check company name and copyright notice against site ownership and publishing practice. If a current-year notice is intended, implement it without unnecessary rendering or hydration errors; do not invent the first-publication year or owner.
- Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.
- Verify logo use, spacing, aspect ratio, colors, fonts, supported light/dark variants, and consistency across pages. Request approved assets when absent; creating a new identity is a separate product decision.
- Inspect favicon clarity at small sizes, Apple touch icon, relevant web app icons, and social sharing artwork. Check files, declared sizes/formats, paths, and actual response types. Do not create an entire app-icon set when the site has no relevant surface.
- Verify Open Graph and Twitter/X image references use the intended artwork. Coordinate metadata with the discoverability audit and font/media delivery with performance.

#### Evidence and verification

Show material copy changes with their factual source or unresolved question. Check that approved changes are consistent across templates, locales, content sources, and metadata. Inspect relevant visual assets in context and test every changed destination. Mark unverified business information as unverified, not as corrected.

## Checklist: website-seo-discoverability

### SEO, sharing, and AI discoverability

Source checklist sections: 10 (SEO), 11 (AI / LLM discoverability).

#### Establish publishing intent

Identify the production origin, canonical URL convention, public/private routes, localized versions, and which environments should be indexable. Ask about these when missing. Ask which AI crawlers and uses the owner intends to allow; do not assume public web search indexing means consent to every AI crawler or purpose.

Work from the rendered HTML, HTTP responses, route configuration, sitemap, robots rules, and actual metadata. Use current official search-engine and crawler documentation for platform-specific behavior. Do not promise rankings, rich results, AI citations, or crawler compliance.

#### Page structure and metadata

- Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- Check semantic landmarks, document language and correct language codes, meaningful heading hierarchy, descriptive anchors, and a meaningful primary heading for normal page layouts. Avoid empty headings and unnecessary skipped levels; do not misrepresent a single H1 as a universal ranking requirement.
- Ensure important content and internal links are available in rendered HTML without requiring a click to reveal their existence. Check server/rendered output according to the site's architecture; investigate actual discoverability before proposing a rendering rewrite.
- Find orphaned public pages, accidental duplicates, broken internal links, and unclear information hierarchy. Keep substantive content available as text rather than only in canvas or images.
- Check accurate Open Graph and Twitter/X card values, absolute asset URLs where required, image availability, and preview rendering. Metadata declarations alone do not prove a remote preview was refreshed.

#### URLs, crawlability, and indexing

- Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- Check trailing-slash and host conventions, HTTPS redirects, old-to-new mappings, chains, and loops. Preserve useful deep links and query semantics. Do not change DNS or hosting rules on a live environment without scope for that action.
- Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- Check robots rules and relevant response headers at the intended origin. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.
- For multilingual sites, check actual equivalents, language/region codes, canonical interactions, and reciprocal `hreflang` relationships where applicable. Do not invent translations or regional pages.

#### Structured data and credibility

- Add or correct structured data only when it represents visible, accurate content and fits the site: Organization, LocalBusiness, Product, Article, Breadcrumb, or other justified types. Obtain real business/product/author details before populating them.
- Evaluate FAQ markup against current eligibility and the actual page rather than adding it everywhere. Validate syntax and applicable provider requirements, and report eligibility separately from a guarantee of display.
- Check clear company/about information, relevant authorship, descriptive headings, direct answers in real FAQs, clean internal linking, and discoverable public documentation. Do not manufacture expertise, authors, or facts.
- When a last updated date is shown, verify it against actual substantive content changes and applicable `dateModified` or sitemap modification values. Do not manufacture freshness from the current date or each deployment. Expandable FAQ answers should remain available in the rendered document and agree with any eligible structured data.

#### AI-specific access

- Review each relevant crawler's documented user agent, purpose, directives, and current policy behavior. Identify conflicts with the user's intended access; do not blanket-allow every crawler or broadly expose private paths.
- Consider `llms.txt` only when it supports the owner's publishing strategy. Ask before adopting that strategy. Treat it as optional publishing guidance with uncertain adoption, not an indexing requirement or access-control mechanism.
- If used, link only intended public, authoritative material, keep descriptions accurate, and establish how it stays synchronized with the site. Never include credentials, private endpoints, or unpublished documents for supposed discoverability benefits.

#### Evidence and verification

Record affected URLs and observed status, canonical, robots/indexing directives, rendered content, and structured-data results. Recheck both production-intended and staging configurations after changes. Validate preview assets and available preview tools while noting cache limits. Separate local configuration correctness from actual search-index or AI-crawler observations that require external access and time.

## Checklist: website-performance

### Performance, media, and installability

Source checklist sections: 8 (images/media), 14 (performance), 26 (PWA/installability).

#### Measure the actual problem

Identify the slow route, interaction, asset, or device condition and the user impact. Gather an available baseline from browser traces, network waterfalls, bundle reports, field data, or lab tools. Record device/viewport, connection and CPU throttling, cache state, build mode, and sample count. Distinguish field and lab evidence and review current definitions of LCP, CLS, and INP when using them.

Use a production build where possible. Test both cold and warm cache behavior and representative slower mobile/network conditions. Run Lighthouse or an equivalent available tool as evidence, not as a requirement to maximize a score. A single score change does not justify an architectural change.

#### Images, video, and embeds

- Check broken images, remote-domain configuration, hotlinks, actual transfer dimensions, compression, and rendered aspect ratios. Use responsive candidates and `sizes` matching layout so mobile clients avoid unnecessary desktop payloads.
- Evaluate WebP/AVIF or other appropriate formats against quality, transparency, browser support, and the existing image pipeline. Preserve meaningful detail rather than compressing solely to hit an arbitrary size.
- Reserve image/video dimensions or aspect ratios to prevent layout shift. Keep informative alternative text and decorative empty alternatives appropriate to the image's role; compression does not replace accessibility checks.
- Lazy-load below-the-fold media and noncritical embeds when beneficial. Do not lazy-load the primary LCP image. Preload or prioritize the actual critical image only when evidence supports it; avoid duplicate downloads and competing preloads.
- Inspect SVG metadata and complexity; optimize without breaking IDs, references, scripts/security expectations, accessibility, or scaling. Untrusted SVG handling belongs to the security boundary as well.
- Evaluate video size, delivery, poster images, and deferred video/YouTube/maps loading. Avoid autoplay with sound and preserve captions, controls, and useful fallback content. Ask about licensed/approved replacement assets instead of substituting imagery silently.

#### JavaScript, CSS, fonts, and runtime

- Inspect bundle composition, unused code/styles/dependencies, render-blocking resources, and third-party scripts. Verify runtime/dynamic use before removal; consent-required trackers also need privacy review.
- Split routes or components and defer noncritical work when it improves actual loading or interaction. Preserve rendering/execution order and avoid introducing excessive request waterfalls or chunk-loading failures.
- Optimize font format, subsets, weight count, preload choices, and fallback metrics. Check text visibility and layout stability. Self-host only when licensing, delivery, privacy, and maintenance support the choice.
- Inspect unnecessary rerenders, costly calculations, expensive input/scroll/resize handlers, and long main-thread tasks. Debounce, throttle, memoize, virtualize, or use workers only for an evidenced bottleneck, with behavior and accessibility intact.
- Check loading animations and hover transitions for repeated layout work, excessive repainting, layout shifts, or unnecessary runtime dependencies. Honor reduced motion and end loading effects when work resolves; do not hold back usable content to complete an animation.
- Review preload/preconnect and asynchronous/deferred third-party execution for demonstrated critical origins and assets. Do not connect to optional or consent-gated services before intended access/consent.

#### Delivery and data volume

- Inspect static caching, hashed asset names, deployment invalidation, compression, and origin/CDN behavior. Avoid caching private/personalized responses publicly or making HTML stale across deployments.
- Consider CDN adoption, Brotli/Gzip, API payload compression, field selection, pagination, or cursor pagination only where measured payloads, traffic, consistency requirements, and deployment capabilities justify them.
- Coordinate slow queries, API response limits, and repeated expensive requests with backend reliability. A cache must have an explicit key, scope, lifetime, and invalidation approach before implementation.

#### Existing or requested PWA behavior

Do not add a service worker or installability solely because an audit tool suggests it. First establish whether installation or offline use is part of the product.

For a relevant PWA, inspect the manifest, icons, theme/background colors, intended navigation scope, and install behavior on supported platforms. Verify service-worker lifecycle and update activation, cache versioning/cleanup, stale app recovery, logout/sensitive-data handling, and a useful offline fallback where intended. Test first visit, returning visit, update, offline use, and recovery. Do not claim a manifest alone makes the app work offline.

#### Evidence and verification

Repeat comparable measurements after each meaningful change and inspect affected interactions, visual quality, layout stability, cache correctness, and production output. Explain the measured improvement and its variability. If tools, field access, or hardware are unavailable, report code-based hypotheses and proposed measurements separately from confirmed gains.

## Checklist: website-backend-reliability

### Backend, code quality, and testing reliability

Source checklist sections: 15 (backend/API), 29 (code quality), 30 (testing).

#### Establish architecture and contracts

Map the existing request/data path, background work, storage, API consumers, critical invariants, and current tests/build checks. If no backend exists, mark backend-specific checks not applicable while still reviewing relevant code and tests. Ask about ambiguous business rules and compatibility expectations before changing contracts.

#### API behavior and data safety

- Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- Evaluate rate limits and protections for expensive operations using the application's callers, proxy model, identities, and workload. Avoid arbitrary limits that block legitimate use.
- Inspect connection/resource cleanup and signs of connection or memory leaks. Distinguish application faults from missing services, exhausted test environments, or local setup failures.

#### Database and caching

- Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- Propose indexes based on access patterns and plans, including write/storage cost. Do not add indexes or pools universally; inspect driver, serverless/runtime constraints, deployment limits, and measured connection behavior.
- Evaluate caching only for repeated expensive work with understood freshness requirements. Specify cache key, tenant/user boundaries, expiration, invalidation, and behavior on misses/failures; test that sensitive results cannot cross users.
- For schema changes, prepare compatible migrations and explain rollout/rollback effects. Test with isolated data. Production migrations, destructive data operations, backup deletion, and restores need specific authorization.

#### Code quality tied to behavior

- Find dead/unused code, imports, dependencies, commented-out experiments, debug panels/logs, and stale experimental components. Inspect dynamic imports, routes, build tooling, and external consumers before removal.
- Review unresolved TODOs as evidence of unfinished behavior; do not delete comments merely to make the count zero. Remove or replace a TODO when its underlying concern is resolved or deliberately retired.
- Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.
- Examine duplicated components/logic, oversized components, naming, constants/configuration, environment-specific values, hardcoded domains, and appropriate error boundaries. Extract only when repeated behavior or maintenance risk warrants it.
- Identify hardcoded secrets without printing them. Preserve validated environment configuration and separate public configuration from server-only secrets. Security remediation owns exposed credentials and trust-boundary failures.

#### Meaningful test coverage

Build coverage around the site's actual journeys and rules: in-scope page smoke checks, CTAs, navigation, forms, happy/failure paths, empty states, unauthorized access, expired sessions, slow/offline behavior where supported, invalid/very long input, special characters, emoji, and supported languages.

Use unit tests for important isolated logic, integration tests for service/data contracts, and end-to-end tests for critical journeys. Prefer the existing test framework and fixtures. Add regression tests for meaningful discovered bugs; do not introduce a framework or cosmetic assertions to increase coverage numbers.

Run the relevant production build as well as appropriate existing lint, type, and test checks. Where feasible, exercise the built application, not just the development server. Prevent tests from sending real notifications, charging accounts, corrupting shared data, or relying on production credentials.

#### Evidence and verification

Capture a reproducible failure or query/trace before a fix and an observable outcome after it. Test failure and concurrency cases where the defect requires them. Report command outcomes, remaining warnings/failures, environment constraints, and untested contracts. Do not report a successful build as proof that database migrations, authorization, or external integrations work.

## Checklist: website-security-auth

### Security, authentication, and prototype leaks

Source checklist sections: 16 (security), 17 (authentication), 31 (common prototype/vibe-coded leaks).

#### Establish the trust boundaries

Map public, authenticated, administrative, tenant-specific, storage, and server-only surfaces. Identify the session/auth provider and actual authorization model. Inspect source and configuration and use controlled test accounts for runtime checks. Active attack probes against a live site require an authorized target and scope; prefer local/test environments. Missing credentials or inaccessible code means not verified, not secure.

#### Secrets and prototype artifacts

- Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- Distinguish intentionally public client configuration from privileged material. Firebase/Supabase-style client configuration is not automatically a leaked secret; evaluate server/service keys, key restrictions, data rules, and effective permissions. `NEXT_PUBLIC_*` and equivalent variables reach the browser and must not carry server credentials.
- Look for demo/placeholder keys, hardcoded admin identities, localhost/example domains and contacts, fake search/login/checkout/newsletter flows, mock API responses, fixture arrays, sample avatars, debug panels, unprotected admin pages, remote image mistakes, permissive CORS, and wildcard OAuth/redirect rules.
- Confirm intended production behavior before replacing mocks, deleting fixtures, removing unsupported claims, or changing identity providers. Content authenticity belongs to content review; nonfunctional actions to interactions; exploitable exposure to this audit.
- If a real credential is exposed, identify the affected system without revealing the value, recommend revocation/rotation, and prepare scoped source/configuration fixes. Deleting the current source value does not revoke a credential or erase history. Live rotation and history rewrites require scope for those actions and coordination of dependent services.

#### Server-side access and injection defenses

- Verify authentication and object/action authorization on the server for every sensitive operation. Test cross-user and cross-role access with safe fixtures, including IDs supplied by the browser. Hidden buttons are not enforcement.
- Check tenant boundaries and database row-level security when the architecture relies on it. Do not assume every backend requires RLS or that enabling it alone establishes a complete policy.
- Inspect parameterized database access, context-appropriate output encoding, unsafe HTML/DOM operations, shell invocation, path construction, and upload/storage paths for SQL injection, XSS, command injection, and traversal. Do not equate generic input sanitization with protection in every context.
- Verify upload limits and content validation, executable-content handling, storage/serving isolation, and authorization to download private files. Do not trust client MIME/type declarations alone.
- Inspect CSRF protections in the context of the session and credential transport. Review CORS origin/credentials behavior and redirect/callback allowlists; avoid broad wildcards and unvalidated destinations.

#### Transport, cookies, and browser policy

- Check HTTPS and redirects, TLS evidence where available, and secure cookie flags suited to the session: Secure, HttpOnly where script access is unnecessary, and intentional SameSite behavior. Test login, embedded flows, and cross-site callbacks affected by changes.
- Evaluate HSTS deliberately, especially long lifetimes, `includeSubDomains`, and preload implications. Do not enable irreversible/broad transport commitments before verifying affected hosts and operational intent.
- Review Content Security Policy, content-type sniffing protection, frame/embed controls, and referrer policy against actual resource/embed needs. Develop and verify policy changes without blindly breaking scripts, login, payments, or intentional embedding.
- Reduce unnecessary server/version disclosure and raw internal errors where practical. Hiding a header does not remediate an underlying vulnerable component.

#### Account and session journeys

- Test signup, login, incorrect credentials, logout, duplicate signup, email verification, expired verification links, password reset/change, expired reset links, session expiry, refresh behavior, and protected routes where present.
- For password visibility toggles, check that intentional reveal affects only the relevant field, starts masked on a fresh form, preserves password-manager/autofill behavior, and does not submit or duplicate the secret into logs, analytics, clipboard, persistent client state, or print output. Masking is a display choice, not encryption or authorization.
- Verify safe login/logout redirects and intended-destination preservation without open redirects. Check enumeration risk in visible messages, status codes, and materially observable timing without destructive bulk tests.
- Review rate limits for login and reset, secure random reset/verification tokens, appropriate expiry and single use, and session invalidation after relevant password/security changes. Redact tokens in logs and artifacts.
- Evaluate MFA according to account risk and product requirements; adding a new auth capability needs a product decision. Test role changes, concurrent sessions, multi-tab logout, and sensitive-state cleanup.

#### Dependencies and verification

Use the existing ecosystem's audit tools and current primary advisories to assess affected versions, reachable code, and available fixes. Explain breaking changes before major updates; remove packages only after verifying they are unused.

For each fix, verify both denied and allowed behavior: unauthorized access is rejected and legitimate users can still finish their journey. Add targeted tests for trust boundaries where practical. Report the tested roles, endpoints, environment, and remaining unknowns; do not certify the entire site as secure from a limited scan.

## Checklist: website-commerce

### Payments and commerce

Source checklist section: 18 (payments/ecommerce).

#### Confirm the commercial rules and test environment

Establish the provider/integration, one-time versus subscription billing, order states, currencies, authoritative prices, discounts, tax/shipping rules, inventory rules, and entitlement lifecycle. Ask about missing business rules; do not invent refund policy, tax rates, subscription behavior, or prices.

Use provider-supported test mode, isolated orders, test payment instruments, and sandbox webhooks. Never make a real purchase, refund, cancellation, customer notification, or inventory change just to complete an audit unless that exact live action is authorized. With no safe test access, inspect code and document the runtime gap.

#### Checkout and order integrity

- Exercise successful, declined, cancelled, abandoned, expired-session, and duplicate/retried checkout. Check recoverability, visible status, retained basket data, and appropriate error handling.
- Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- Check out-of-stock behavior, concurrent inventory changes, reservation expiry where used, and overselling protections consistent with the product's fulfillment model. Do not impose stock reservations on products that do not need them.
- Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.

#### Webhooks and delayed outcomes

- Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.
- Test duplicate, delayed, retried, and out-of-order events. Processing should be idempotent at the business-effect boundary, with durable handling of concurrent deliveries.
- Check reconciliation after partial failure: provider success followed by a database failure, delayed confirmation, repeated fulfillment, or missing events. Avoid acknowledging events before required durable handling unless a reliable queueing design makes that safe.
- Validate state transitions against authoritative provider data when needed. Do not grant access or ship goods solely from an unverified browser callback.

#### Post-purchase behavior

Exercise test-mode refunds, partial refunds where supported, subscription cancellation and its effective date, expiry, and resulting entitlements/order status. Check receipts, approved test delivery destinations, links, amounts/currency, and correspondence with the actual payment state. Ask about ambiguous proration, renewal, cancellation, or fulfillment behavior before changing it.

#### Evidence and verification

Record redacted test event/order references, expected and observed state transitions, and outcomes for successful and failed paths. Add focused integration/regression tests for price trust, duplicate processing, and access to paid resources. Report gaps in provider test coverage and any live validation still awaiting authorization. Never use a test checkout result to claim a real settlement or payout succeeded.

## Checklist: website-privacy-analytics

### Privacy, consent, and analytics

Source checklist sections: 21 (analytics/tracking), 22 (privacy/legal).

#### Establish data practices and goals

Identify the business/operator, intended markets, relevant jurisdiction information, personal-data flows, providers/processors, cookies and storage, tracking purpose, and existing approved policies. Ask for missing material inputs rather than assuming obligations or copying another business's policies.

Determine whether analytics is needed and which decisions or conversions it should support. Choosing a new provider, adopting tracking, or materially expanding collected data needs a user decision. Where legal interpretation is required, consult current authoritative sources and distinguish technical findings, draft wording, and questions requiring qualified review. Do not assert compliance from the presence of a banner or policy page.

#### Consent behavior and tracking controls

- Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- Evaluate a simple cookie banner only when actual data practices and applicable requirements call for one. Keep the copy clear, link the relevant policy, and provide usable accept/reject/preferences controls as needed. Support keyboard and touch use, readable contrast, mobile layouts, and reopening preferences without unnecessarily obscuring the site. Simplicity must not reduce consent to a cosmetic dismiss button: wire choices to real script/storage behavior, and do not treat dismissal as consent when consent is required.
- Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- Check consent persistence and expiry/version handling against the applicable policy. Do not fabricate retention periods or assume withdrawal can retroactively erase data already sent to a provider.
- Avoid bundling consent changes into a silent analytics implementation. Identify dependencies on embeds, ads, personalization, and essential flows before blocking scripts.

#### Analytics accuracy and minimization

- Verify intended page views and core conversions actually fire, with no duplicates from SPA routing, rerenders, multiple installations, or retry behavior. Define event meaning before adding CTA or form error events.
- Check campaign/UTM handling and whether approved attribution survives the relevant navigation/conversion flow. Do not persist identifiers indefinitely or append tracking parameters to unrelated links without a defined need.
- Exclude development/internal traffic where practical and remove debug analytics. Use test properties, debug facilities, or clearly identified synthetic events to avoid polluting production reporting.
- Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- Validate both sending and observed receipt where access permits. A network request or console message alone does not prove the provider processed the correct event.

#### Policies and user controls

- Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.
- Verify links from relevant forms and site surfaces, consent preference access, and applicable contact/data-deletion mechanisms. A link or button must reach a working, appropriate process; do not submit a real deletion request as a test.
- Prepare factual policy corrections or clearly marked drafts based on supplied information. Obtain the user's decisions for missing practices and jurisdiction-dependent requirements before representing text as final legal policy.

#### Evidence and verification

Record observed storage and requests for relevant consent states, redacted event examples, and policy-to-implementation mismatches. Recheck analytics after changes to routing, scripts, or consent. Report which provider dashboards, jurisdictions, data systems, and user-request workflows were not verified. Technical checks support review; they do not provide a legal certification.

## Checklist: website-operations

### Deployment, observability, and email operations

Source checklist sections: 23 (email/contact), 24 (deployment/infrastructure), 25 (observability).

#### Establish environments and operational ownership

Map the current development, staging, and production environments, deployment path, runtime/services, storage, email provider, monitoring, and access. Inspect existing configuration before proposing infrastructure. Ask about reliability goals, environment exposure, retention, delivery destinations, and live-action authority only where they affect the requested work.

Audit with read-only evidence. Code/configuration preparation is distinct from changing DNS, deploying, rotating keys, applying production migrations, sending email, or restoring/deleting data. Use isolated environments for operational exercises unless the user has authorized a specific live operation.

#### Deployment and delivery

- Check environment separation, server/public variables, actual production API origins, localhost/example URLs, debug mode, excessive console output, and unintended public dev/admin routes. Staging indexing restrictions do not replace access control when the environment should be private.
- Review source-map contents and exposure. Remove public sensitive material where needed while preserving private debugging artifacts when useful; source maps are not automatically secrets, and hiding maps does not protect secrets shipped in a bundle.
- Inspect relevant TLS/certificate, DNS, redirect, caching, CDN, compression, and asset-version behavior using available evidence. Make infrastructure additions only for a demonstrated delivery or capacity need.
- Check health/readiness probes, graceful shutdown, worker/request draining, and failure recovery. Consider load balancing/autoscaling only when traffic, architecture, and measured constraints justify them.
- Review deployment rollback, immutable/versioned artifacts, compatible migrations, environment configuration, and whether downtime requirements are established. Prepare a concrete rollout/rollback plan for risky changes and verify it in a suitable nonproduction environment where possible.
- Inspect backup scope, encryption/access where relevant, freshness, retention, capacity/storage monitoring, and restore evidence. A configured backup job does not prove recoverability. Test restores into isolated targets; never overwrite a live database to demonstrate a backup works.

#### Observability

- Inspect frontend/server error tracking, useful structured logs, and correlation/request IDs where they help diagnose cross-service failures. Avoid passwords, tokens, personal form contents, and unnecessary sensitive data in logs or telemetry.
- Check visibility into uptime, API/frontend errors, latency, database performance, queues, failed jobs, and payment webhook failures as applicable. Use existing systems before introducing a provider.
- Verify that critical alerts reach the intended operator and have actionable context using authorized test channels. Ask about alert recipients and thresholds if missing; do not send unsolicited alerts or configure noisy blanket alarms.
- Review searchability, access, retention, and deletion behavior against operational needs and approved data practices. Do not invent log retention durations or silently change provider billing plans.

#### Contact and email delivery

- Check approved email/phone values and `mailto:`/`tel:` behavior. Avoid exposing a private mailbox where a public contact route is intended.
- Trace contact form submission to actual delivery. Check From, Reply-To, sender identity, address validation, and header-injection prevention; do not put arbitrary user-supplied addresses in a trusted sender header.
- Inspect sender domain verification and SPF, DKIM, and DMARC against provider guidance and actual DNS. Distinguish application configuration, DNS publication, authentication results, and inbox delivery; none alone proves all the others.
- Review contact, receipt, password-reset, verification, and other relevant transactional messages in authorized test delivery. Check mobile readability, link origins, HTTPS, deep links, expected token expiration/single use, and absence of leaked tokens in reports.
- Check unsubscribe and communication preferences where required by the message type and applicable rules. Do not automatically add marketing behavior to transactional flows or invent mailing-list membership.

#### Evidence and verification

Prefer production-like builds, isolated restore/rollback exercises, test inboxes, controlled health failures, and observable log/alert receipt. Report exactly what was inspected versus exercised, including environment, access, and delivery limits. Provide prepared configuration and outstanding actions when live access or authorization is absent; do not describe an unexecuted deployment or recovery plan as complete.
