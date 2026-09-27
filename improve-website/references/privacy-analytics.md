# Privacy, consent, and analytics

Source checklist sections: 21 (analytics/tracking), 22 (privacy/legal).

## Establish data practices and goals

Identify the business/operator, intended markets, relevant jurisdiction information, personal-data flows, providers/processors, cookies and storage, tracking purpose, and existing approved policies. Ask for missing material inputs rather than assuming obligations or copying another business's policies.

Determine whether analytics is needed and which decisions or conversions it should support. Choosing a new provider, adopting tracking, or materially expanding collected data needs a user decision. Where legal interpretation is required, consult current authoritative sources and distinguish technical findings, draft wording, and questions requiring qualified review. Do not assert compliance from the presence of a banner or policy page.

## Consent behavior and tracking controls

- Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- Evaluate a simple cookie banner only when actual data practices and applicable requirements call for one. Keep the copy clear, link the relevant policy, and provide usable accept/reject/preferences controls as needed. Support keyboard and touch use, readable contrast, mobile layouts, and reopening preferences without unnecessarily obscuring the site. Simplicity must not reduce consent to a cosmetic dismiss button: wire choices to real script/storage behavior, and do not treat dismissal as consent when consent is required.
- Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- Check consent persistence and expiry/version handling against the applicable policy. Do not fabricate retention periods or assume withdrawal can retroactively erase data already sent to a provider.
- Avoid bundling consent changes into a silent analytics implementation. Identify dependencies on embeds, ads, personalization, and essential flows before blocking scripts.

## Analytics accuracy and minimization

- Verify intended page views and core conversions actually fire, with no duplicates from SPA routing, rerenders, multiple installations, or retry behavior. Define event meaning before adding CTA or form error events.
- Check campaign/UTM handling and whether approved attribution survives the relevant navigation/conversion flow. Do not persist identifiers indefinitely or append tracking parameters to unrelated links without a defined need.
- Exclude development/internal traffic where practical and remove debug analytics. Use test properties, debug facilities, or clearly identified synthetic events to avoid polluting production reporting.
- Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- Validate both sending and observed receipt where access permits. A network request or console message alone does not prove the provider processed the correct event.

## Policies and user controls

- Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.
- Verify links from relevant forms and site surfaces, consent preference access, and applicable contact/data-deletion mechanisms. A link or button must reach a working, appropriate process; do not submit a real deletion request as a test.
- Prepare factual policy corrections or clearly marked drafts based on supplied information. Obtain the user's decisions for missing practices and jurisdiction-dependent requirements before representing text as final legal policy.

## Evidence and verification

Record observed storage and requests for relevant consent states, redacted event examples, and policy-to-implementation mismatches. Recheck analytics after changes to routing, scripts, or consent. Report which provider dashboards, jurisdictions, data systems, and user-request workflows were not verified. Technical checks support review; they do not provide a legal certification.
