# Privacy, consent, and analytics

Quick pass: Inventory; Consent states; Working controls; Sensitive data; Policy accuracy.

Severity examples: critical — sensitive personal or payment data is sent to third parties or written to logs; high — tracking runs before required consent, or a policy misstates actual practice; medium — unnecessary data collection or missing user controls; low — minor wording gaps in a notice.

## Establish data practices and goals

Identify the business/operator, intended markets, relevant jurisdiction information, personal-data flows, providers/processors, cookies and storage, tracking purpose, and existing approved policies. Ask for missing material inputs rather than assuming obligations or copying another business's policies.

Determine whether analytics is needed and which decisions or conversions it should support. Choosing a new provider, adopting tracking, or materially expanding collected data needs a user decision. Where legal interpretation is required, consult current authoritative sources and distinguish technical findings, draft wording, and questions requiring qualified review. Do not assert compliance from the presence of a banner or policy page.

## Consent behavior and tracking controls

- **Inventory.** Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- **Cookie banner.** Evaluate a simple cookie banner only when actual data practices and applicable requirements call for one. Keep the copy clear, link the relevant policy, and provide usable accept/reject/preferences controls as needed. Support keyboard and touch use, readable contrast, mobile layouts, and reopening preferences without unnecessarily obscuring the site. Simplicity must not reduce consent to a cosmetic dismiss button: wire choices to real script/storage behavior, and do not treat dismissal as consent when consent is required.
- **Consent states.** Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- **Working controls.** Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- **Persistence.** Check consent persistence and expiry/version handling against the applicable policy. Do not fabricate retention periods or assume withdrawal can retroactively erase data already sent to a provider.
- **Dependencies.** Avoid bundling consent changes into a silent analytics implementation. Identify dependencies on embeds, ads, personalization, and essential flows before blocking scripts.
- **Third-party embeds.** Check whether video, map, font, social, and chat embeds contact third parties on page load before a required choice. Where consent applies, consider click-to-load placeholders or privacy-enhanced modes, and verify in the network log that nothing loads early.
- **Session replay and heatmaps.** Where recording tools are used, verify that passwords, payment fields, and personal form content are masked or excluded at capture, not just hidden in the dashboard, and that recording follows consent choices.
- **Browser privacy signals.** Check whether Global Privacy Control or similar signals are honored where the applicable rules or the site's own policy say they are. Do not claim to honor a signal the implementation ignores.

## Analytics accuracy and minimization

- **Event accuracy.** Verify intended page views and core conversions actually fire, with no duplicates from SPA routing, rerenders, multiple installations, or retry behavior. Define event meaning before adding CTA or form error events.
- **Attribution.** Check campaign/UTM handling and whether approved attribution survives the relevant navigation/conversion flow. Do not persist identifiers indefinitely or append tracking parameters to unrelated links without a defined need.
- **Internal traffic.** Exclude development/internal traffic where practical and remove debug analytics. Use test properties, debug facilities, or clearly identified synthetic events to avoid polluting production reporting.
- **Sensitive data.** Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- **Receipt.** Validate both sending and observed receipt where access permits. A network request or console message alone does not prove the provider processed the correct event.

## Policies and user controls

- **Policy accuracy.** Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.
- **Links and requests.** Verify links from relevant forms and site surfaces, consent preference access, and applicable contact/data-deletion mechanisms. A link or button must reach a working, appropriate process; do not submit a real deletion request as a test.
- **Drafts.** Prepare factual policy corrections or clearly marked drafts based on supplied information. Obtain the user's decisions for missing practices and jurisdiction-dependent requirements before representing text as final legal policy.
- **Account deletion.** Where users have accounts, check that they can find and start account deletion or a data request without contacting support when the applicable rules or platform policies require it, and that the outcome matches what the policy says about retained data. Use a test account; do not delete real user data.
- **Data export.** Where users have accounts and the applicable rules or the site's policy promise it, check that users can obtain a copy of their data in a usable format, and that an export contains only the requesting user's data.
- **Age restrictions.** Where the product is aimed at or likely to attract children, or sells age-restricted goods, check whether an age gate or parental-consent flow is required and whether it actually restricts the experience. Ask the owner about the intended audience; do not invent an age rule.

## Evidence and verification

Record observed storage and requests for relevant consent states, redacted event examples, and policy-to-implementation mismatches. Recheck analytics after changes to routing, scripts, or consent. Report which provider dashboards, jurisdictions, data systems, and user-request workflows were not verified. Technical checks support review; they do not provide a legal certification.
