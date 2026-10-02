---
name: website-ui-accessibility
description: Audit and improve website layouts, responsive/mobile behavior, accessibility, right-to-left layouts, and browser compatibility. Use for visual or access problems, including keyboard and focus handling, route-change announcements, and session time limits; review findings with the user before fixes unless audit-and-fix is explicitly requested.
metadata:
  version: "1.1.0"
  prompt-hash: "37d23c696198"
---

# Website UI and Accessibility

This skill is self-contained, framework agnostic, and agent agnostic. Default to audit, user review, then selected fixes and verification. Use audit-and-fix or audit only when the user asks for it, and re-audit when they ask to re-check saved findings.

Take the target, goal, scope, mode, depth, and constraints from the conversation. Inspect first, and ask only where a missing answer changes the result.

Use `UI-001`, `UI-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## UI, accessibility, and browser compatibility

Quick pass: Viewports; Overflow and clipping; Keyboard operation; Form errors and announcements; Contrast and targets.

Severity examples: critical — a core journey cannot be completed at all on a supported device or with a keyboard; high — content or controls are cut off, overlapped, or unreachable at common phone widths, or focus is invisible across the site; medium — contrast failures, missing labels or alternative text, or zoom disabled; low — spacing or alignment inconsistencies.

### Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

Ask which accessibility conformance target applies, for example WCAG 2.2 AA. Without a stated target, use that commonly adopted level as the reference and say so. A partial check does not establish conformance.

### Layout and responsiveness

- **Viewports.** Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- **Overflow and clipping.** Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- **Content extremes.** Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- **Visual consistency.** Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- **Sticky and layered elements.** Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- **Mobile viewport and keyboards.** Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- **Zoom and font scaling.** Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.
- **Text direction.** For supported right-to-left languages, check the `dir` attribute, mirrored layout and directional icons, logical CSS properties, and mixed-direction text such as numbers and URLs. Do not add right-to-left support for languages the site does not offer.

### Keyboard, focus, and semantics

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

### Theme controls, scrollbars, and print output

- **Dark mode toggle.** Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- **Custom scrollbars.** Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- **Print stylesheet.** Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

### Documents and accessibility statement

- **Documents and downloads.** Check that important PDFs and downloadable documents are tagged, have a logical reading order, real text instead of scanned images, and alternative text, or that the same content is available as an accessible page.
- **Accessibility statement.** Where the owner publishes or is required to publish an accessibility statement, check that it names the conformance target, known limitations, and a working contact route, and that its claims match the audit findings. Do not draft claims of conformance the evidence does not support.

### Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

### Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.
