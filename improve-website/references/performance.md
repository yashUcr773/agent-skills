# Performance, media, and installability

Source checklist sections: 8 (images/media), 14 (performance), 26 (PWA/installability).

## Measure the actual problem

Identify the slow route, interaction, asset, or device condition and the user impact. Gather an available baseline from browser traces, network waterfalls, bundle reports, field data, or lab tools. Record device/viewport, connection and CPU throttling, cache state, build mode, and sample count. Distinguish field and lab evidence and review current definitions of LCP, CLS, and INP when using them.

Use a production build where possible. Test both cold and warm cache behavior and representative slower mobile/network conditions. Run Lighthouse or an equivalent available tool as evidence, not as a requirement to maximize a score. A single score change does not justify an architectural change.

## Images, video, and embeds

- Check broken images, remote-domain configuration, hotlinks, actual transfer dimensions, compression, and rendered aspect ratios. Use responsive candidates and `sizes` matching layout so mobile clients avoid unnecessary desktop payloads.
- Evaluate WebP/AVIF or other appropriate formats against quality, transparency, browser support, and the existing image pipeline. Preserve meaningful detail rather than compressing solely to hit an arbitrary size.
- Reserve image/video dimensions or aspect ratios to prevent layout shift. Keep informative alternative text and decorative empty alternatives appropriate to the image's role; compression does not replace accessibility checks.
- Lazy-load below-the-fold media and noncritical embeds when beneficial. Do not lazy-load the primary LCP image. Preload or prioritize the actual critical image only when evidence supports it; avoid duplicate downloads and competing preloads.
- Inspect SVG metadata and complexity; optimize without breaking IDs, references, scripts/security expectations, accessibility, or scaling. Untrusted SVG handling belongs to the security boundary as well.
- Evaluate video size, delivery, poster images, and deferred video/YouTube/maps loading. Avoid autoplay with sound and preserve captions, controls, and useful fallback content. Ask about licensed/approved replacement assets instead of substituting imagery silently.

## JavaScript, CSS, fonts, and runtime

- Inspect bundle composition, unused code/styles/dependencies, render-blocking resources, and third-party scripts. Verify runtime/dynamic use before removal; consent-required trackers also need privacy review.
- Split routes or components and defer noncritical work when it improves actual loading or interaction. Preserve rendering/execution order and avoid introducing excessive request waterfalls or chunk-loading failures.
- Optimize font format, subsets, weight count, preload choices, and fallback metrics. Check text visibility and layout stability. Self-host only when licensing, delivery, privacy, and maintenance support the choice.
- Inspect unnecessary rerenders, costly calculations, expensive input/scroll/resize handlers, and long main-thread tasks. Debounce, throttle, memoize, virtualize, or use workers only for an evidenced bottleneck, with behavior and accessibility intact.
- Check loading animations and hover transitions for repeated layout work, excessive repainting, layout shifts, or unnecessary runtime dependencies. Honor reduced motion and end loading effects when work resolves; do not hold back usable content to complete an animation.
- Review preload/preconnect and asynchronous/deferred third-party execution for demonstrated critical origins and assets. Do not connect to optional or consent-gated services before intended access/consent.

## Delivery and data volume

- Inspect static caching, hashed asset names, deployment invalidation, compression, and origin/CDN behavior. Avoid caching private/personalized responses publicly or making HTML stale across deployments.
- Consider CDN adoption, Brotli/Gzip, API payload compression, field selection, pagination, or cursor pagination only where measured payloads, traffic, consistency requirements, and deployment capabilities justify them.
- Coordinate slow queries, API response limits, and repeated expensive requests with backend reliability. A cache must have an explicit key, scope, lifetime, and invalidation approach before implementation.

## Existing or requested PWA behavior

Do not add a service worker or installability solely because an audit tool suggests it. First establish whether installation or offline use is part of the product.

For a relevant PWA, inspect the manifest, icons, theme/background colors, intended navigation scope, and install behavior on supported platforms. Verify service-worker lifecycle and update activation, cache versioning/cleanup, stale app recovery, logout/sensitive-data handling, and a useful offline fallback where intended. Test first visit, returning visit, update, offline use, and recovery. Do not claim a manifest alone makes the app work offline.

## Evidence and verification

Repeat comparable measurements after each meaningful change and inspect affected interactions, visual quality, layout stability, cache correctness, and production output. Explain the measured improvement and its variability. If tools, field access, or hardware are unavailable, report code-based hypotheses and proposed measurements separately from confirmed gains.
