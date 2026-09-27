# SEO, sharing, and AI discoverability

Source checklist sections: 10 (SEO), 11 (AI / LLM discoverability).

## Establish publishing intent

Identify the production origin, canonical URL convention, public/private routes, localized versions, and which environments should be indexable. Ask about these when missing. Ask which AI crawlers and uses the owner intends to allow; do not assume public web search indexing means consent to every AI crawler or purpose.

Work from the rendered HTML, HTTP responses, route configuration, sitemap, robots rules, and actual metadata. Use current official search-engine and crawler documentation for platform-specific behavior. Do not promise rankings, rich results, AI citations, or crawler compliance.

## Page structure and metadata

- Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- Check semantic landmarks, document language and correct language codes, meaningful heading hierarchy, descriptive anchors, and a meaningful primary heading for normal page layouts. Avoid empty headings and unnecessary skipped levels; do not misrepresent a single H1 as a universal ranking requirement.
- Ensure important content and internal links are available in rendered HTML without requiring a click to reveal their existence. Check server/rendered output according to the site's architecture; investigate actual discoverability before proposing a rendering rewrite.
- Find orphaned public pages, accidental duplicates, broken internal links, and unclear information hierarchy. Keep substantive content available as text rather than only in canvas or images.
- Check accurate Open Graph and Twitter/X card values, absolute asset URLs where required, image availability, and preview rendering. Metadata declarations alone do not prove a remote preview was refreshed.

## URLs, crawlability, and indexing

- Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- Check trailing-slash and host conventions, HTTPS redirects, old-to-new mappings, chains, and loops. Preserve useful deep links and query semantics. Do not change DNS or hosting rules on a live environment without scope for that action.
- Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- Check robots rules and relevant response headers at the intended origin. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.
- For multilingual sites, check actual equivalents, language/region codes, canonical interactions, and reciprocal `hreflang` relationships where applicable. Do not invent translations or regional pages.

## Structured data and credibility

- Add or correct structured data only when it represents visible, accurate content and fits the site: Organization, LocalBusiness, Product, Article, Breadcrumb, or other justified types. Obtain real business/product/author details before populating them.
- Evaluate FAQ markup against current eligibility and the actual page rather than adding it everywhere. Validate syntax and applicable provider requirements, and report eligibility separately from a guarantee of display.
- Check clear company/about information, relevant authorship, descriptive headings, direct answers in real FAQs, clean internal linking, and discoverable public documentation. Do not manufacture expertise, authors, or facts.
- When a last updated date is shown, verify it against actual substantive content changes and applicable `dateModified` or sitemap modification values. Do not manufacture freshness from the current date or each deployment. Expandable FAQ answers should remain available in the rendered document and agree with any eligible structured data.

## AI-specific access

- Review each relevant crawler's documented user agent, purpose, directives, and current policy behavior. Identify conflicts with the user's intended access; do not blanket-allow every crawler or broadly expose private paths.
- Consider `llms.txt` only when it supports the owner's publishing strategy. Ask before adopting that strategy. Treat it as optional publishing guidance with uncertain adoption, not an indexing requirement or access-control mechanism.
- If used, link only intended public, authoritative material, keep descriptions accurate, and establish how it stays synchronized with the site. Never include credentials, private endpoints, or unpublished documents for supposed discoverability benefits.

## Evidence and verification

Record affected URLs and observed status, canonical, robots/indexing directives, rendered content, and structured-data results. Recheck both production-intended and staging configurations after changes. Validate preview assets and available preview tools while noting cache limits. Separate local configuration correctness from actual search-index or AI-crawler observations that require external access and time.
