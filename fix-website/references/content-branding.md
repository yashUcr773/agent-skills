# Content, footer, and branding

Quick pass: Placeholder and unsupported content; Factual claims; Purpose and CTA; Footer and contact; Legal links.

Severity examples: critical — a false claim with legal or safety consequences, or another company's legal text presented as the site's own; high — invented testimonials, statistics, or prices; medium — placeholder text, an inconsistent brand name, or wrong contact details; low — typos and formatting inconsistencies.

## Establish authoritative content

Identify the business/product name, audience, brand assets, tone, contact channels, and sources for factual claims. Ask for missing facts or a decision to remove unsupported content. Do not invent pricing, statistics, testimonials, customer logos, registration details, policies, addresses, or social profiles.

Treat suspicious sample content as needing investigation. Distinguish approved examples and demonstration sites from accidentally shipped production fixtures. Check how content is supplied before replacing hardcoded values or suggesting a CMS.

## Copy and information structure

- **Placeholder and unsupported content.** Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- **Language quality.** Correct spelling, grammar, capitalization, punctuation, and unnecessary filler while preserving intended meaning and voice. Avoid turning concise factual content into generic promotional claims.
- **Formats.** Check locale-appropriate dates, currencies, prices, phone numbers, and number formatting. Resolve audience/currency ambiguity before changing meaning; display formatting must agree with authoritative commerce values.
- **Translations.** For each supported language, look for untranslated strings, mixed-language pages, truncated or overflowing translated text, text baked into images, and untranslated metadata, emails, and error messages. Check plural forms and interpolated values. Report gaps for the owner to translate; do not present machine-translated legal, pricing, or policy text as approved copy.
- **Last updated date.** Evaluate a visible last updated date for time-sensitive articles, documentation, policies, or other content where freshness matters. Use a verified substantive content update from the editorial/CMS source, distinguish it from publication date, and keep visible dates and relevant metadata consistent. Do not label every page as updated today or substitute a build/deploy timestamp; ask for a trustworthy source when it is missing.
- **Factual claims.** Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- **FAQs.** Evaluate FAQs around real user questions, with concise, verified answers. Use expandable FAQs only when the interaction helps readability; preserve accessible answers and coordinate discovery/print behavior. Do not invent policies, guarantees, prices, or questions solely to fill a section or obtain structured-data markup.
- **Purpose and CTA.** Assess whether each important page has a clear purpose and appropriate next action. Check for a single clear primary CTA per page or section, with secondary actions visually subordinate; competing CTAs of equal emphasis obscure the intended next step. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.

## Conversion and clarity

- **Value proposition.** Check that the first screen of each landing page says what the product is, who it is for, and what to do next, without scrolling or prior knowledge. Report vague or missing statements and ask the owner for the intended message; do not invent positioning.
- **Pricing clarity.** Check that prices, billing period, what each plan includes, limits, trials, and extra fees are stated where a visitor decides, and that they agree with checkout. Unclear or missing pricing is a finding to raise, not copy to make up.
- **Signup friction.** Walk the signup or lead form as a new visitor. Report fields that are not needed at that step, forced account creation before any value is shown, unclear password rules, and dead ends after submission.
- **First-run experience.** Check what a new account sees first. An empty dashboard needs guidance toward the first useful action, and sample data must be clearly labeled as sample.
- **AI-generated content disclosure.** Where the site publishes AI-generated text, images, or chat responses, check whether the owner's policy or the applicable rules call for disclosure and whether it is present and accurate. Ask instead of assuming an obligation.

## Footer and identity surfaces

- **Footer and contact.** Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- **Ownership and copyright.** Check company name and copyright notice against site ownership and publishing practice. If a current-year notice is intended, implement it without unnecessary rendering or hydration errors; do not invent the first-publication year or owner.
- **Legal links.** Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.
- **Logo and brand.** Verify logo use, spacing, aspect ratio, colors, fonts, supported light/dark variants, and consistency across pages. Request approved assets when absent; creating a new identity is a separate product decision.
- **Icons.** Inspect favicon clarity at small sizes, Apple touch icon, relevant web app icons, and social sharing artwork. Check files, declared sizes/formats, paths, and actual response types. Do not create an entire app-icon set when the site has no relevant surface.
- **Sharing artwork.** Verify Open Graph and Twitter/X image references use the intended artwork. Coordinate metadata with the discoverability audit and font/media delivery with performance.
- **Asset licensing.** Check that images, fonts, icons, illustrations, audio, and video are licensed for this use, including attribution and seat or pageview limits where they apply. Ask the owner for license records for assets of unknown origin. Do not assume stock, AI-generated, or hotlinked media is cleared, and do not replace assets without approval.

## Evidence and verification

Show material copy changes with their factual source or unresolved question. Check that approved changes are consistent across templates, locales, content sources, and metadata. Inspect relevant visual assets in context and test every changed destination. Mark unverified business information as unverified, not as corrected.
