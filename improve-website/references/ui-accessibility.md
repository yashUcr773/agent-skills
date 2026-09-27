# UI, accessibility, and browser compatibility

Source checklist sections: 1 (visual QA), 12 (accessibility), 13 (mobile UX), 19 (browser compatibility).

## Establish the intended interface

Inspect shared layouts, design tokens, components, and supported themes. Ask about intended visual changes or support requirements when unclear. Correct accidental inconsistency against the established design; a stylistic preference alone is not a defect. Include representative pages and unusually dense or sparse content.

## Layout and responsiveness

- Inspect at 320, 375, 390, and 430 CSS pixels, representative tablet and desktop sizes, ultrawide widths, and mobile landscape where supported. Record actual viewport dimensions and distinguish emulation from a physical device.
- Locate the element causing unintended horizontal scrolling, vertical overflow, clipping, overlap, broken grids, or nested scrollbars. Do not hide overflow globally to conceal a layout problem or cut off content and focus rings. Preserve intentional scrolling, especially wide data tables.
- Test long titles/names, long unbroken strings, empty or very short content, unequal card lengths, and supported languages. Check wrapping, alignment, grid sizing, and truncation with access to the full value when needed.
- Compare spacing, typography, weights, line heights, button styles, radii, and shadows against shared tokens. Check dark mode when supported and image aspect ratios, stretching, and reserved dimensions.
- Exercise sticky headers, fixed controls, mobile menus, dialogs, dropdowns, tooltips, and stacking contexts. Evaluate adding a sticky header when persistent navigation helps the intended journeys; verify that it does not obscure anchor destinations, keyboard focus, or too much of a short mobile viewport. Content and dismissal controls must remain reachable, and overlays must not fall behind unrelated elements.
- Check safe areas, dynamic browser bars, virtual keyboards, sticky CTA bars, and scrolling forms. Choose viewport units based on intended behavior; do not replace every height with `100dvh`. Ensure focused inputs remain visible and address unwanted iOS input zoom without disabling user zoom.
- Test 125%, 150%, and 200% browser zoom and available OS font scaling. Record whether true zoom/font scaling was tested; changing a viewport alone is different. Avoid tiny text, fixed-width containers that break reflow, and hover-only access.

## Keyboard, focus, and semantics

- Traverse meaningful journeys using the keyboard. Interactive controls must be reachable in a logical order, have a visible focus indicator, and work without pointer gestures. Do not make static elements focusable merely to satisfy a blanket rule.
- Check skip-to-content behavior and provide a skip link where repeated navigation needs a bypass. It must become visible on focus, reach a real main-content target, and move keyboard navigation to that content without hiding it under a sticky header. Check semantic landmarks, meaningful headings, table header associations, native controls, accessible names for icon buttons, and appropriate alternate text. Use ARIA only to express semantics native HTML cannot supply; remove misleading or contradictory ARIA.
- Check menu/dropdown keyboard behavior, Escape dismissal where expected, focus entry/restoration, and proper dialog names and semantics. Modal dialogs must contain focus while open without trapping users after closure; nonmodal popovers need behavior suited to their role.
- Verify form labels and programmatic errors, first-error navigation, and announcements of asynchronous outcomes. Live regions and toasts should announce important changes without repeatedly interrupting the user.
- Check contrast in actual themes and interaction states. Information must not rely on color alone. Evaluate touch target size and spacing, including close buttons and adjacent links.
- Respect reduced motion, avoid flashing content, and test accessible carousel controls. Important video/audio needs usable captions or transcripts appropriate to the content.

## Theme controls, scrollbars, and print output

- Evaluate a dark mode toggle when theme choice fits the site's design and user needs. Confirm supported choices such as light/dark or light/dark/system before adding them. Check an accessible name and state, keyboard/touch activation, system preference when no override exists, and persistence of an explicit choice across navigation/reload. Verify both themes across text, controls, logos, focus/hover/error states, and initial rendering without a disruptive theme flash; do not introduce a half-themed control.
- Evaluate custom scrollbar styling where it fits the design. Keep the thumb distinguishable from the track, preserve usable thickness and native scrolling behavior, and check page and nested scroll containers in supported light/dark themes and forced-colors/high-contrast modes. Use supported CSS with a usable native fallback; respect platform/OS scrollbar behavior, do not hide scrollbars as a cosmetic fix, and verify mouse, keyboard, wheel, and touch scrolling remain usable.
- Evaluate a print stylesheet for printable content such as articles, documentation, receipts, or records. In print preview, preserve meaningful content and useful contact/link information; adjust dark backgrounds, fixed/sticky positioning, page breaks, tables, and images. Hide irrelevant navigation, cookie banners, back-to-top controls, and decorative indicators without hiding the document itself. Include intended FAQ answers when printing the complete FAQ, and never reveal masked passwords or intentionally protected data. Check paper/PDF output rather than inferring print behavior from the screen layout.

## Compatibility

Exercise the supported combinations of Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome when available. Ask before expanding the support commitment. Test date/file inputs, sticky/fixed positioning, viewport units, fonts, animations, clipboard, and native sharing behavior. Check current support for implicated CSS/web APIs and provide a purposeful fallback when needed. Do not equate a desktop browser with its mobile counterpart.

## Evidence and verification

Pair screenshots at the failing and corrected dimensions with interaction checks. Use available automated accessibility tools plus manual keyboard, zoom, and appropriate screen-reader checks; distinguish automated results from manual evidence. Pass criteria should describe reachable content, correct reading/focus order, usable controls, and absence of the reported visual failure. Report untested device/browser and assistive-technology combinations.

Interaction destinations and state transitions belong to the interactions audit; media delivery cost belongs to performance. Link shared findings rather than duplicating them.
