# Website UI and Accessibility — reusable prompt

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the repository, URL, goals, constraints, and prior decisions supplied in this conversation. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings.

Use `UI-001`, `UI-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## UI, accessibility, and browser compatibility

Source checklist sections: 1 (visual QA), 12 (accessibility), 13 (mobile UX), 19 (browser compatibility).

### Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

### Layout and responsiveness

- Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.

### Keyboard, focus, and semantics

- Traverse meaningful journeys using the keyboard. Interactive controls must be reachable in a logical order, have a visible focus indicator, and work without pointer gestures. Do not make static elements focusable merely to satisfy a blanket rule.
- Check skip-to-content behavior and provide a skip link where repeated navigation needs a bypass. It must become visible on focus, reach a real main-content target, and move keyboard navigation to that content without hiding it under a sticky header. Check semantic landmarks, meaningful headings, table header associations, native controls, accessible names for icon buttons, and appropriate alternate text. Use ARIA only to express semantics native HTML cannot supply; remove misleading or contradictory ARIA.
- Check menu/dropdown keyboard behavior, Escape dismissal where expected, focus entry/restoration, and proper dialog names and semantics. Modal dialogs must contain focus while open without trapping users after closure; nonmodal popovers need behavior suited to their role.
- Verify form labels and programmatic errors, first-error navigation, and announcements of asynchronous outcomes. Live regions and toasts should announce important changes without repeatedly interrupting the user.
- Check contrast in actual themes and interaction states. Information must not rely on color alone. Evaluate touch target size and spacing, including close buttons and adjacent links.
- Respect reduced motion, avoid flashing content, and test accessible carousel controls. Important video/audio needs usable captions or transcripts appropriate to the content.

### Theme controls, scrollbars, and print output

- Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

### Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

### Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.
