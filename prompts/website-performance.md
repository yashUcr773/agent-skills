# Website Performance and Media — reusable prompt

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the repository, URL, goals, constraints, and prior decisions supplied in this conversation. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings.

Use `PERF-001`, `PERF-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Performance, media, and installability

Source checklist sections: 8 (images/media), 14 (performance), 26 (PWA/installability).

### Measure the actual problem

Identify the slow route, interaction, asset, or device condition and the user impact. Gather an available baseline from browser traces, network waterfalls, bundle reports, field data, or lab tools. Record device/viewport, connection and CPU throttling, cache state, build mode, and sample count. Distinguish field and lab evidence and review current definitions of LCP, CLS, and INP when using them.

Use a production build where possible. Test both cold and warm cache behavior and representative slower mobile/network conditions. Run Lighthouse or an equivalent available tool as evidence, not as a requirement to maximize a score. A single score change does not justify an architectural change.

### Images, video, and embeds

- Check broken images, remote-domain configuration, hotlinks, actual transfer dimensions, compression, and rendered aspect ratios. Use responsive candidates and `sizes` matching layout so mobile clients avoid unnecessary desktop payloads.
- Evaluate WebP/AVIF or other appropriate formats against quality, transparency, browser support, and the existing image pipeline. Preserve meaningful detail rather than compressing solely to hit an arbitrary size.
- Reserve image/video dimensions or aspect ratios to prevent layout shift. Keep informative alternative text and decorative empty alternatives appropriate to the image's role; compression does not replace accessibility checks.
- Lazy-load below-the-fold media and noncritical embeds when beneficial. Do not lazy-load the primary LCP image. Preload or prioritize the actual critical image only when evidence supports it; avoid duplicate downloads and competing preloads.
- Inspect SVG metadata and complexity; optimize without breaking IDs, references, scripts/security expectations, accessibility, or scaling. Untrusted SVG handling belongs to the security boundary as well.
- Evaluate video size, delivery, poster images, and deferred video/YouTube/maps loading. Avoid autoplay with sound and preserve captions, controls, and useful fallback content. Ask about licensed/approved replacement assets instead of substituting imagery silently.

### JavaScript, CSS, fonts, and runtime

- Inspect bundle composition, unused code/styles/dependencies, render-blocking resources, and third-party scripts. Verify runtime/dynamic use before removal; consent-required trackers also need privacy review.
- Split routes or components and defer noncritical work when it improves actual loading or interaction. Preserve rendering/execution order and avoid introducing excessive request waterfalls or chunk-loading failures.
- Optimize font format, subsets, weight count, preload choices, and fallback metrics. Check text visibility and layout stability. Self-host only when licensing, delivery, privacy, and maintenance support the choice.
- Inspect unnecessary rerenders, costly calculations, expensive input/scroll/resize handlers, and long main-thread tasks. Debounce, throttle, memoize, virtualize, or use workers only for an evidenced bottleneck, with behavior and accessibility intact.
- Check loading animations and hover transitions for repeated layout work, excessive repainting, layout shifts, or unnecessary runtime dependencies. Honor reduced motion and end loading effects when work resolves; do not hold back usable content to complete an animation.
- Review preload/preconnect and asynchronous/deferred third-party execution for demonstrated critical origins and assets. Do not connect to optional or consent-gated services before intended access/consent.

### Delivery and data volume

- Inspect static caching, hashed asset names, deployment invalidation, compression, and origin/CDN behavior. Avoid caching private/personalized responses publicly or making HTML stale across deployments.
- Consider CDN adoption, Brotli/Gzip, API payload compression, field selection, pagination, or cursor pagination only where measured payloads, traffic, consistency requirements, and deployment capabilities justify them.
- Coordinate slow queries, API response limits, and repeated expensive requests with backend reliability. A cache must have an explicit key, scope, lifetime, and invalidation approach before implementation.

### Existing or requested PWA behavior

Do not add a service worker or installability solely because an audit tool suggests it. First establish whether installation or offline use is part of the product.

For a relevant PWA, inspect the manifest, icons, theme/background colors, intended navigation scope, and install behavior on supported platforms. Verify service-worker lifecycle and update activation, cache versioning/cleanup, stale app recovery, logout/sensitive-data handling, and a useful offline fallback where intended. Test first visit, returning visit, update, offline use, and recovery. Do not claim a manifest alone makes the app work offline.

### Evidence and verification

Repeat comparable measurements after each meaningful change and inspect affected interactions, visual quality, layout stability, cache correctness, and production output. Explain the measured improvement and its variability. If tools, field access, or hardware are unavailable, report code-based hypotheses and proposed measurements separately from confirmed gains.
