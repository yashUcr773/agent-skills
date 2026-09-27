---
name: website-seo-discoverability
description: Audit and improve website metadata, indexing, canonicals, sitemaps, structured data, sharing previews, and intended AI crawler access. Review before fixes unless audit-and-fix is explicitly requested; preserve private content boundaries.
---

# Website SEO and Discoverability

This skill is self-contained, framework agnostic, and agent agnostic. Default to audit, user review, then selected fixes and verification. Use audit-and-fix only when explicitly requested.

Use `SEO-001`, `SEO-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## SEO, sharing, and AI discoverability

Source checklist sections: 10 (SEO), 11 (AI / LLM discoverability).

### Establish publishing intent

Identify the production origin, canonical URL convention, public/private routes, localized versions, and which environments should be indexable. Ask about these when missing. Ask which AI crawlers and uses the owner intends to allow; do not assume public web search indexing means consent to every AI crawler or purpose.

Work from the rendered HTML, HTTP responses, route configuration, sitemap, robots rules, and actual metadata. Use current official search-engine and crawler documentation for platform-specific behavior. Do not promise rankings, rich results, AI citations, or crawler compliance.

### Page structure and metadata

- Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- Check semantic landmarks, document language and correct language codes, meaningful heading hierarchy, descriptive anchors, and a meaningful primary heading for normal page layouts. Avoid empty headings and unnecessary skipped levels; do not misrepresent a single H1 as a universal ranking requirement.
- Ensure important content and internal links are available in rendered HTML without requiring a click to reveal their existence. Check server/rendered output according to the site's architecture; investigate actual discoverability before proposing a rendering rewrite.
- Find orphaned public pages, accidental duplicates, broken internal links, and unclear information hierarchy. Keep substantive content available as text rather than only in canvas or images.
- Check accurate Open Graph and Twitter/X card values, absolute asset URLs where required, image availability, and preview rendering. Metadata declarations alone do not prove a remote preview was refreshed.

### URLs, crawlability, and indexing

- Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- Check trailing-slash and host conventions, HTTPS redirects, old-to-new mappings, chains, and loops. Preserve useful deep links and query semantics. Do not change DNS or hosting rules on a live environment without scope for that action.
- Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- Check robots rules and relevant response headers at the intended origin. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.
- For multilingual sites, check actual equivalents, language/region codes, canonical interactions, and reciprocal `hreflang` relationships where applicable. Do not invent translations or regional pages.

### Structured data and credibility

- Add or correct structured data only when it represents visible, accurate content and fits the site: Organization, LocalBusiness, Product, Article, Breadcrumb, or other justified types. Obtain real business/product/author details before populating them.
- Evaluate FAQ markup against current eligibility and the actual page rather than adding it everywhere. Validate syntax and applicable provider requirements, and report eligibility separately from a guarantee of display.
- Check clear company/about information, relevant authorship, descriptive headings, direct answers in real FAQs, clean internal linking, and discoverable public documentation. Do not manufacture expertise, authors, or facts.
- When a last updated date is shown, verify it against actual substantive content changes and applicable `dateModified` or sitemap modification values. Do not manufacture freshness from the current date or each deployment. Expandable FAQ answers should remain available in the rendered document and agree with any eligible structured data.

### AI-specific access

- Review each relevant crawler's documented user agent, purpose, directives, and current policy behavior. Identify conflicts with the user's intended access; do not blanket-allow every crawler or broadly expose private paths.
- Consider `llms.txt` only when it supports the owner's publishing strategy. Ask before adopting that strategy. Treat it as optional publishing guidance with uncertain adoption, not an indexing requirement or access-control mechanism.
- If used, link only intended public, authoritative material, keep descriptions accurate, and establish how it stays synchronized with the site. Never include credentials, private endpoints, or unpublished documents for supposed discoverability benefits.

### Evidence and verification

Record affected URLs and observed status, canonical, robots/indexing directives, rendered content, and structured-data results. Recheck both production-intended and staging configurations after changes. Validate preview assets and available preview tools while noting cache limits. Separate local configuration correctness from actual search-index or AI-crawler observations that require external access and time.
