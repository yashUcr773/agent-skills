# UI, accessibility, and browser compatibility

Quick pass: Viewports; Overflow and clipping; Keyboard operation; Form errors and announcements; Contrast and targets.

Severity examples: critical — a core journey cannot be completed at all on a supported device or with a keyboard; high — content or controls are cut off, overlapped, or unreachable at common phone widths, or focus is invisible across the site; medium — contrast failures, missing labels or alternative text, or zoom disabled; low — spacing or alignment inconsistencies.

## Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

Ask which accessibility conformance target applies, for example WCAG 2.2 AA. Without a stated target, use that commonly adopted level as the reference and say so. A partial check does not establish conformance.

## Layout and responsiveness

- **Viewports.** Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- **Overflow and clipping.** Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- **Content extremes.** Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- **Visual consistency.** Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- **Sticky and layered elements.** Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- **Mobile viewport and keyboards.** Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- **Zoom and font scaling.** Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.
- **Text direction.** For supported right-to-left languages, check the `dir` attribute, mirrored layout and directional icons, logical CSS properties, and mixed-direction text such as numbers and URLs. Do not add right-to-left support for languages the site does not offer.

## Keyboard, focus, and semantics

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

## Theme controls, scrollbars, and print output

- **Dark mode toggle.** Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- **Custom scrollbars.** Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- **Print stylesheet.** Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

## Documents and accessibility statement

- **Documents and downloads.** Check that important PDFs and downloadable documents are tagged, have a logical reading order, real text instead of scanned images, and alternative text, or that the same content is available as an accessible page.
- **Accessibility statement.** Where the owner publishes or is required to publish an accessibility statement, check that it names the conformance target, known limitations, and a working contact route, and that its claims match the audit findings. Do not draft claims of conformance the evidence does not support.

## Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

## Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.
