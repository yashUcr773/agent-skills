# Stack-specific performance checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js rendering and caching.** Check which routes are static, dynamic, or revalidated against what the content needs. Reading cookies or headers, or an uncached data fetch, can make a whole route dynamic by accident. Verify that revalidation actually refreshes content and that personalized responses are never cached and shared.
- **Next.js client bundle.** Check how much of the component tree is marked `use client`. A client boundary near the root pulls its imports into the browser bundle; move interactivity to leaf components where that reduces shipped JavaScript, and confirm the effect with the bundle analyzer when available.
- **Next.js images and fonts.** Check `next/image` usage: `sizes` that match the layout, `priority` only on the LCP image, and explicit dimensions or `fill` inside a sized container. Check that fonts load through `next/font` or an equivalent that avoids render-blocking external CSS.
