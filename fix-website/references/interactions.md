# Navigation, interactions, forms, and state

Quick pass: Links and destinations; Direct loads and missing routes; Button actions; Validation; Success and error states.

Severity examples: critical — the primary conversion, such as signup, checkout, or contact, silently fails or loses the user's data; high — a main route cannot be loaded directly, or a form reports success when it failed; medium — dead links, missing loading or error states, or input lost after an error; low — a missing active state or minor feedback gap.

## Establish real journeys

Inventory routes, navigation items, CTAs, forms, search, and stateful actions. Trace each important action from UI to destination or backend result. Evaluate missing optional controls against actual content and user journeys, proposing applicable additions through the selected review workflow rather than adding every feature. Ask what an unfinished or placeholder control should do before deleting it or inventing behavior. Test with fixtures or safe accounts when an action submits data, sends a message, or changes a resource.

## Navigation and routing

- **Links and destinations.** Detect broken destinations, meaningless `#` links, unused navigation, and fake links/buttons. Use anchors for navigation and buttons for actions. Check logo-to-home behavior, active navigation, external/new-tab links, anchor targets, and appropriate `rel` protections without assuming every link needs `noreferrer`.
- **Mobile menu.** Evaluate a mobile menu when the existing navigation does not fit. Check its labeled toggle and expanded state, opening/dismissal, Escape handling where appropriate, closing after navigation, breakpoint changes, and restoration of focus/scroll state. Prevent background scrolling for an overlay that requires it, and reliably restore scrolling after closure. Keyboard behavior must match the control semantics.
- **Progressive navigation.** Verify meaningful navigation without JavaScript where the architecture promises it; do not impose a framework rewrite. Breadcrumbs and extra navigation are optional when they help users locate themselves.
- **Direct loads and missing routes.** Open in-scope routes directly and refresh them. Check SPA server fallbacks, genuine 404 responses, deleted/renamed resources, redirects, back/forward behavior, encoded path/query values, malformed parameters, and safe normalization. A catch-all success page must not conceal missing routes.
- **URL design and state.** Check readable URLs, route parameters, filter/search sharing, necessary query parameters, and preserved navigation state. Do not remove identifiers, change stable URLs, or discard campaign parameters without understanding their consumers; plan redirects for approved URL changes.
- **Returning position.** On back/forward navigation, check that scroll position, loaded pages of a list or infinite scroll, selected tabs, and applied filters are restored as users would expect. A new navigation should start at the top unless it targets an anchor.
- **Back to top.** Evaluate a back-to-top button or link on long pages where it helps users. Give it a clear accessible name and keyboard/touch behavior; use a real destination and ensure subsequent keyboard navigation follows the intended top-of-page context. Respect reduced motion, avoid covering content or controls, and keep hidden instances out of the tab order.

## Buttons and feedback

- **Button actions.** Confirm that buttons perform their advertised action, including copy, share, and download. Evaluate copy buttons for useful repeatable values such as code snippets, URLs, or public contact information. Copy only the intended value on a user action, announce success only after the clipboard operation succeeds, and give usable failure or manual-copy feedback when access is unavailable. A console log is not completion; ask whether an unfinished feature should be implemented, disabled with explanation, or removed.
- **Control states.** Check hover states alongside pressed, focus, disabled, loading, success, warning, and error states as applicable. Hover styling should preserve contrast and layout, with equivalent keyboard focus feedback and no hover-only functionality on touch devices. Prevent duplicate submissions while preserving a recovery path after failure. Server-side idempotency may be necessary where disabling a button cannot prevent duplicate effects.
- **Feedback placement.** Choose inline feedback, status text, spinners, skeletons, or toasts according to the action. Avoid overlays that cover essential content, repeated announcements, and timers that hide important errors. Auto-dismiss noncritical messages only when users can still understand the result.
- **Confirmation and undo.** For destructive or otherwise consequential operations, evaluate confirmation modals and practical undo behavior. Name the action and affected resource clearly, offer an unambiguous cancel path, and perform no mutation before confirmation. Verify dialog semantics, initial focus, modal focus containment, cancellation, and focus restoration; avoid unnecessary confirmation for routine reversible actions. Do not claim an irreversible operation can be undone when its side effects cannot be restored. Explain disabled actions when the reason is unclear.

## Forms and uploads

- **Labels and input types.** Check real labels and associations, required indicators, useful input types/autocomplete, helpful placeholders, and accessible descriptions. Placeholders are not labels. Remove demo values only after distinguishing examples from actual saved data.
- **Validation.** Verify client-side feedback and authoritative server-side validation. Use context-appropriate normalization, validation, output encoding, and safe storage; do not indiscriminately strip legitimate characters as a substitute for injection protection.
- **Success and error states.** Verify form success and error states against the actual submission result. Make success clear, announce it appropriately, and provide a useful next step when needed; never show success merely because the submit handler ran. Keep entered values after failures where appropriate, avoid retaining sensitive values unnecessarily, link errors to fields, and focus/scroll to a useful first error or summary.
- **Password visibility toggle.** Evaluate a password visibility toggle on password fields when useful. Use a labeled, keyboard-accessible non-submit button with a clear show/hide action or state. Start masked, preserve the entered value and password-manager/autofill behavior when toggling, and avoid unexpected focus loss or accidental submission. Do not copy, log, persist, or send the password through analytics as part of this control.
- **Input extremes.** Test empty, extremely long, Unicode, emoji, special-character, and malformed values; meaningful character limits/counts; email, international phone, URL, and date constraints; autofill and password managers. Ask about business constraints instead of adding arbitrary limits or restrictive validation.
- **Uploads.** Verify upload type and size enforcement, server-side content validation, progress when available, cancellation, retry, and failed/partial upload cleanup. Client-supplied MIME types or filename extensions alone do not establish safety.
- **Slow, failed, and abusive submissions.** Exercise delayed responses, disconnection, server rejection, retries, and repeated clicks. Public-form anti-spam controls should match observed risk; evaluate rate limiting or honeypots and the accessibility/privacy cost of CAPTCHA before introducing it.
- **Multi-step forms.** Show progress and the current step, allow going back without losing entries, validate each step before advancing, and resume or save a draft where the form's length warrants it. Check refresh, the back button, and direct links into a later step.
- **Unsaved changes.** Where users edit substantial content, check that navigating away, closing a dialog, or refreshing either warns about or preserves unsaved work. Do not prompt on pages with nothing to lose, and clear the warning after a successful save.

## Loading, error, and empty states

- **State coverage.** Check initial loading, empty content, zero search results, network failure, permission denial, expired sessions, rate limits, server errors, and offline behavior where applicable. Avoid confusing an empty result with a failed request.
- **Loading indicators.** Evaluate loading animations, spinners, or skeletons for real pending work. Pair them with an understandable accessible status, respect reduced motion, preserve layout, and stop on success or failure. Do not delay ready content for a decorative animation or show a fabricated percentage for work whose progress is unknown.
- **Error pages and recovery.** Provide understandable status, retry or navigation when useful, and useful 404/500 handling; evaluate 401/403 and maintenance pages where the product or platform needs them. Do not add static pages that the deployed server never uses.
- **Error detail.** Do not expose stack traces, raw database errors, or internal identifiers unnecessarily. A retry must be safe and preserve enough context to recover.

## Search and client state

- **Site search.** Evaluate site search when the content volume and discovery journeys warrant it. Clarify which content is searchable and how results should rank or filter before choosing an implementation. Return real, current results with useful titles and destinations; enforce permissions so private pages and snippets cannot leak through results or a client-side search index. Do not ship a decorative search field with no working search.
- **Search edge cases.** Exercise blank/whitespace searches, special characters, keyboard interaction, loading/error/no-result states, results paging, and optional match highlighting. Preserve a query in the URL when shareability is intended.
- **Request timing.** Check whether debouncing reduces unnecessary requests without breaking submit behavior. Cancel or ignore stale requests so old results cannot overwrite newer queries; cancellation alone may not prevent a completed stale response from applying.
- **Client state.** Examine duplicated or stale state, settings persistence, refresh behavior, multi-tab changes, session expiry, sensitive-state cleanup on logout, and navigation away during requests. Preserve essential state only according to its sensitivity and intended lifetime.
- **Optimistic updates.** Test optimistic updates under rejection, out-of-order responses, concurrent changes, and unmount/navigation. Roll back or reconcile failed operations without losing unrelated user changes.

## Expandable information

Evaluate expandable FAQs when genuine questions and answers benefit from progressive disclosure. Prefer native disclosure controls where suitable, or correctly labeled buttons with an accurate expanded state and associated answer. Test keyboard/touch activation, focus, open/close behavior, links inside answers, and supported deep-link or find-in-page behavior. Essential answers should remain available in the document instead of being missing until an inaccessible interaction; coordinate print output so intended answers are not silently omitted. Ask for approved answers rather than inventing claims to populate an accordion.

## Evidence and verification

Use observable journey outcomes, network/server results, URL/back-button behavior, and focused regression tests for important state transitions. Verify both the successful path and the failure that motivated each fix. A toast alone does not prove a record was saved, email delivered, or payment completed.
