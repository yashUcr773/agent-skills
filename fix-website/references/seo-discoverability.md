# SEO, sharing, and AI discoverability

Quick pass: Titles and descriptions; Canonicals and indexing directives; Missing pages; Sitemap; Robots and crawler access.

Severity examples: critical — the whole production site is blocked from indexing by mistake; high — key pages cannot be fetched or rendered by a crawler, or canonicals point at another host; medium — duplicate or missing titles and descriptions, or stale sitemap entries; low — missing optional structured data.

## Establish publishing intent

Identify the production origin, canonical URL convention, public/private routes, localized versions, and which environments should be indexable. Ask about these when missing. Ask which AI crawlers and uses the owner intends to allow; do not assume public web search indexing means consent to every AI crawler or purpose.

Work from the rendered HTML, HTTP responses, route configuration, sitemap, robots rules, and actual metadata. Use current official search-engine and crawler documentation for platform-specific behavior. Do not promise rankings, rich results, AI citations, or crawler compliance.

## Page structure and metadata

- **Titles and descriptions.** Check meaningful, distinct titles and descriptions on indexable pages. Do not apply one global description everywhere or demand unique SEO metadata on every internal application state.
- **Headings and language.** Check semantic landmarks, document language and correct language codes, meaningful heading hierarchy, descriptive anchors, and a meaningful primary heading for normal page layouts. Avoid empty headings and unnecessary skipped levels; do not misrepresent a single H1 as a universal ranking requirement.
- **Rendered content.** Ensure important content and internal links are available in rendered HTML without requiring a click to reveal their existence. Check server/rendered output according to the site's architecture; investigate actual discoverability before proposing a rendering rewrite.
- **Orphans and duplicates.** Find orphaned public pages, accidental duplicates, broken internal links, and unclear information hierarchy. Keep substantive content available as text rather than only in canvas or images.
- **Sharing metadata.** Check accurate Open Graph and Twitter/X card values, absolute asset URLs where required, image availability, and preview rendering. Metadata declarations alone do not prove a remote preview was refreshed.

## URLs, crawlability, and indexing

- **Canonicals and indexing directives.** Check canonicals against intended production routes, sitemap entries, redirects, and actual content. Look for staging origins, conflicting canonical tags, accidental `noindex` or `nofollow`, and missing indexing restrictions on nonproduction content.
- **Redirects.** Check trailing-slash and host conventions, HTTPS redirects, old-to-new mappings, chains, and loops. Preserve useful deep links and query semantics. Do not change DNS or hosting rules on a live environment without scope for that action.
- **Missing pages.** Find internal links, sitemap entries, canonicals, and previously published URLs that return 404. Restore the page, redirect to a genuinely equivalent one, or remove the reference; missing pages should return a real 404 status, not a success page or a blanket redirect to the homepage.
- **Sitemap.** Validate an appropriate XML sitemap and its update mechanism. Entries should match the intended canonical, indexable pages and truthful modification information; avoid private, error, redirected, or deliberately excluded routes.
- **Robots and crawler access.** Check robots rules and relevant response headers at the intended origin. Confirm that crawlers the owner intends to allow are not blocked on public pages by robots rules, firewall or bot-protection settings, or authentication. Robots directives guide cooperating crawlers; they do not protect private/admin/API data. Authentication and authorization remain necessary. Blocking crawl can also prevent a crawler from seeing a page's `noindex` directive.
- **Multilingual.** For multilingual sites, check actual equivalents, language/region codes, canonical interactions, and reciprocal `hreflang` relationships where applicable. Do not invent translations or regional pages.
- **Parameter and pagination URLs.** Check faceted filters, sort orders, session or tracking parameters, calendars, and paginated lists for unbounded crawlable URL combinations and duplicate content. Decide deliberately which variants are indexable, keep paginated pages reachable through real links, and avoid canonicalizing every page of a series to the first.
- **Internal search results.** Keep on-site search result pages out of the index unless they are deliberately curated landing pages, and make sure user-entered queries cannot generate indexable pages containing arbitrary text.
- **Webmaster tools.** Ask whether the site is verified in search engine webmaster tools such as Google Search Console and Bing Webmaster Tools. With access, review indexing errors, manual actions, sitemap status, and crawl anomalies as evidence; without access, record this as not verified. Do not remove verification files or tags accidentally.
- **Site migration.** For a redesign, platform change, or domain move, check that every existing indexed URL maps to an equivalent new URL with a single permanent redirect, that canonicals, the sitemap, and internal links use the new URLs, and that the old sitemap and tracking stay in place until the move is verified. Changing live redirects or DNS needs scope for that action.
- **Image and video search.** Where images or video matter for discovery, check descriptive file names and alternative text, crawlable image and video URLs, captions or transcripts, and video structured data that matches the visible content.
- **Local business listings.** For a business with a physical location or service area, check that the name, address, phone number, and opening hours on the site agree with its LocalBusiness markup and with the business profiles the owner controls. Ask the owner to confirm the authoritative details; do not edit external listings.

## Structured data and credibility

- **Structured data.** Add or correct structured data only when it represents visible, accurate content and fits the site: Organization, LocalBusiness, Product, Article, Breadcrumb, or other justified types. Obtain real business/product/author details before populating them.
- **FAQ markup.** Evaluate FAQ markup against current eligibility and the actual page rather than adding it everywhere. Validate syntax and applicable provider requirements, and report eligibility separately from a guarantee of display.
- **Credibility.** Check clear company/about information, relevant authorship, descriptive headings, direct answers in real FAQs, clean internal linking, and discoverable public documentation. Do not manufacture expertise, authors, or facts.
- **Freshness.** When a last updated date is shown, verify it against actual substantive content changes and applicable `dateModified` or sitemap modification values. Do not manufacture freshness from the current date or each deployment. Expandable FAQ answers should remain available in the rendered document and agree with any eligible structured data.

## AI-specific access

- **Crawler policy.** Review each relevant crawler's documented user agent, purpose, directives, and current policy behavior. Identify conflicts with the user's intended access; do not blanket-allow every crawler or broadly expose private paths.
- **llms.txt.** Consider `llms.txt` only when it supports the owner's publishing strategy. Ask before adopting that strategy. Treat it as optional publishing guidance with uncertain adoption, not an indexing requirement or access-control mechanism.
- **llms.txt contents.** If used, link only intended public, authoritative material, keep descriptions accurate, and establish how it stays synchronized with the site. Never include credentials, private endpoints, or unpublished documents for supposed discoverability benefits.

## Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js metadata.** Check that each indexable route sets its own title, description, canonical, and Open Graph values through the Metadata API or the document head, that `metadataBase` is the production origin so generated URLs do not point at localhost or a preview host, and that client-only rendering does not leave metadata or primary content out of the server HTML.
- **Next.js and Vercel hostnames.** Check generated `sitemap` and `robots` routes against the production origin, and that preview deployments and the default `vercel.app` hostname are not indexed, linked, or used as canonicals in place of the custom domain.

## Evidence and verification

Record affected URLs and observed status, canonical, robots/indexing directives, rendered content, and structured-data results. Recheck both production-intended and staging configurations after changes. Validate preview assets and available preview tools while noting cache limits. Separate local configuration correctness from actual search-index or AI-crawler observations that require external access and time.
