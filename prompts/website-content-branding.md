# Website Content and Branding — reusable prompt

Version: 1.1.0

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the request details below and anything else supplied in this conversation: the repository, URL, goals, constraints, and prior decisions. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings. If I ask for a re-audit, re-check the saved findings instead of starting over.

Use `CONTENT-001`, `CONTENT-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

## Request details

Replace the bracketed values with what you know. Where a line is left unfilled, inspect first and ask me only if the answer changes the result.

- Target: [repository path or website URL]
- Goal: [what should improve]
- Scope: [pages, components, or journeys]
- Mode: [review first / audit only / audit and fix / re-audit]
- Depth: [quick / standard / deep]
- Constraints: [behavior, design, or integrations to preserve]

## Website improvement workflow

Use the actual repository, site, and conversation as evidence. The checklist identifies things to examine; it is not a requirement to add every feature. Preserve established product behavior and visual identity unless a requested correction changes them.

### Choose the operating mode

- **Review first — default:** audit, present findings and proposed fixes, get the user's review, then implement the selected fixes with their corrections and verify them. During the audit, do not change application source, dependency/lock files, configuration, or hosted settings. Non-mutating inspection and existing diagnostic checks with ordinary temporary outputs are appropriate.
- **Audit and fix — explicit option:** when the user explicitly requests auditing and fixing without an intermediate review, gather evidence and implement unambiguous fixes within the requested scope, then verify and report. This mode does not answer unresolved product questions or authorize unrelated live-system changes.
- **Audit only — when requested:** report findings and stop. Do not turn an audit request into implementation.
- **Re-audit — when requested:** when a findings file from an earlier audit exists and the user asks to re-check it, test each recorded finding against the current site and mark it fixed and verified, still open, regressed, or not verified, with the evidence. Do not repeat the whole audit or change application files. Record a new problem met along the way as a new finding.

Use the mode requested in the conversation; no exact invocation phrase is required. Honor earlier review decisions and authorization. Do not ask again for approval already given for the same concrete scope. A later instruction to pause or narrow the task takes precedence.

### Choose the depth

Depth is separate from mode and defaults to standard.

- **Quick:** a time-boxed pass over the critical journeys, shared layouts, and the checks named on each selected checklist's quick-pass line. Report it as a partial audit and list what was skipped.
- **Standard — default:** the selected checklists across the agreed scope, sampling large sites as described below.
- **Deep:** every in-scope route and state, repeated measurements, and adversarial or edge-case testing where it applies. Use it when requested or before a high-stakes launch.

A quick pass can still surface a critical finding, but it cannot support a readiness claim.

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

Finding IDs must stay stable across the whole engagement. When the work will continue in a later session, or the user asks, offer to save the findings to `website-audit-findings.md` in a location the user chooses. Writing that file is not an application change, but ask before adding it to the repository, and keep secrets and personal data out of it. When the file already exists, read it first, keep its IDs and decisions, update statuses, and number new findings after the highest existing ID.

Use this layout for the findings file so any later session can read it:

```markdown
# Website audit findings

- Target: <repository or URL>
- Last updated: <date>
- Mode and depth: <mode>, <depth>
- Scope: <routes, journeys, or areas covered>
- Not covered: <areas skipped or not verified>

| ID | Severity | Status | Location | Problem | Proposed change | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | high | open | `server/orders.js` | Any signed-in user can read any order | Check ownership on the server | fix |

## SEC-001

- Confidence: <high / medium / low>
- Evidence: <redacted reproduction or code path>
- Impact: <who is affected and how>
- Pass criteria: <observable result that proves the fix>
- Verification: <what was re-checked, when, and the result>
```

Status is one of `open`, `fixed and verified`, `changed but not verified`, `deferred`, `not applicable`, or `regressed`. Decision records the user's choice: `fix`, `defer`, `change`, or `undecided`.

### Present the review

In review-first mode, give a concise prioritized findings list and an actionable proposed scope before changing application files. Separate confirmed defects from options and questions. Ask the user which finding IDs to fix, defer, or change, and ask any concrete questions needed for that choice. Then pause implementation until their response. This review is the user checkpoint required by this workflow.

Apply the response as the implementation brief. If the user selects only some findings, implement only those and their necessary supporting changes. If a requested alternative has a concrete drawback, explain the evidence and resolve it with the user. Do not silently revert to your original recommendation. Record deferred findings and reasons. If new unrelated issues emerge while fixing, add them to the report rather than silently expanding the accepted scope.

### Implement within the agreed scope

Use small, coherent changes and existing project conventions. Do not replace frameworks, add major dependencies, delete apparently unused features, introduce infrastructure, or rewrite copy based on guesswork. Check callers and runtime use before removing code or assets. Treat optional additions such as caching, analytics, service workers, CAPTCHAs, load balancers, and new tests as choices driven by a demonstrated need.

Fix one finding at a time. Keep each finding's change separate enough to review and revert on its own, verify it against its pass criteria before starting the next, and update the findings file when one exists. Commit or push only when the user has asked; when they have, make one commit per finding or small related group and name the finding IDs in the message.

Use isolated fixtures, test accounts, sandbox payments, and test email destinations where applicable. Do not send real messages, charge/refund money, rotate live credentials, change DNS, deploy, apply production migrations, or alter retention/data without that action being in the user's authorized scope. Read-only access is not authorization to mutate a live service. Prepare reviewable code/configuration and ask for the specific missing authority only when the next step needs it.

Consult current authoritative documentation when a fix depends on changing platform behavior, security advisories, browser support, search/crawler rules, or legal requirements. If current guidance is unavailable, record that limit rather than inventing a rule. Do not promise legal compliance, search rankings, or complete security from these checks.

### Verify and hand off

Reproduce the original failure, check the fix against its pass criteria, and exercise affected adjacent behavior. Use existing builds, lint/type checks, tests, and browser checks in proportion to the change. Add regression tests for meaningful logic, trust boundaries, or critical journeys when they improve confidence; avoid tests that simply repeat implementation or assert cosmetic wording.

Check the production build when relevant. A screenshot does not prove an interaction, an automated accessibility scan does not prove full accessibility, a configured integration does not prove delivery, and a single performance run does not prove a stable improvement.

Report what changed and why, what was verified and where, what still fails, and what was deferred or needs user input. Keep **fixed and verified**, **changed but not verified**, **unfixed**, and **not applicable** distinct. Describe unavailable browsers, devices, accounts, network conditions, or infrastructure evidence explicitly. Stop when the agreed scope is complete and report any remaining work without implying it was done.

End every report with an **Owner actions** list: the things only the owner can do or confirm. Typical items are DNS and registrar changes, credential rotation, legal and policy sign-off, switching payments to live mode, settings in a hosting or provider dashboard, and product decisions left open. For each, say what to do, where, and why it could not be done or verified here.

## Content, footer, and branding

Quick pass: Placeholder and unsupported content; Factual claims; Purpose and CTA; Footer and contact; Legal links.

Severity examples: critical — a false claim with legal or safety consequences, or another company's legal text presented as the site's own; high — invented testimonials, statistics, or prices; medium — placeholder text, an inconsistent brand name, or wrong contact details; low — typos and formatting inconsistencies.

### Establish authoritative content

Identify the business/product name, audience, brand assets, tone, contact channels, and sources for factual claims. Ask for missing facts or a decision to remove unsupported content. Do not invent pricing, statistics, testimonials, customer logos, registration details, policies, addresses, or social profiles.

Treat suspicious sample content as needing investigation. Distinguish approved examples and demonstration sites from accidentally shipped production fixtures. Check how content is supplied before replacing hardcoded values or suggesting a CMS.

### Copy and information structure

- **Placeholder and unsupported content.** Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- **Language quality.** Correct spelling, grammar, capitalization, punctuation, and unnecessary filler while preserving intended meaning and voice. Avoid turning concise factual content into generic promotional claims.
- **Formats.** Check locale-appropriate dates, currencies, prices, phone numbers, and number formatting. Resolve audience/currency ambiguity before changing meaning; display formatting must agree with authoritative commerce values.
- **Translations.** For each supported language, look for untranslated strings, mixed-language pages, truncated or overflowing translated text, text baked into images, and untranslated metadata, emails, and error messages. Check plural forms and interpolated values. Report gaps for the owner to translate; do not present machine-translated legal, pricing, or policy text as approved copy.
- **Last updated date.** Evaluate a visible last updated date for time-sensitive articles, documentation, policies, or other content where freshness matters. Use a verified substantive content update from the editorial/CMS source, distinguish it from publication date, and keep visible dates and relevant metadata consistent. Do not label every page as updated today or substitute a build/deploy timestamp; ask for a trustworthy source when it is missing.
- **Factual claims.** Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- **FAQs.** Evaluate FAQs around real user questions, with concise, verified answers. Use expandable FAQs only when the interaction helps readability; preserve accessible answers and coordinate discovery/print behavior. Do not invent policies, guarantees, prices, or questions solely to fill a section or obtain structured-data markup.
- **Purpose and CTA.** Assess whether each important page has a clear purpose and appropriate next action. Check for a single clear primary CTA per page or section, with secondary actions visually subordinate; competing CTAs of equal emphasis obscure the intended next step. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.

### Conversion and clarity

- **Value proposition.** Check that the first screen of each landing page says what the product is, who it is for, and what to do next, without scrolling or prior knowledge. Report vague or missing statements and ask the owner for the intended message; do not invent positioning.
- **Pricing clarity.** Check that prices, billing period, what each plan includes, limits, trials, and extra fees are stated where a visitor decides, and that they agree with checkout. Unclear or missing pricing is a finding to raise, not copy to make up.
- **Signup friction.** Walk the signup or lead form as a new visitor. Report fields that are not needed at that step, forced account creation before any value is shown, unclear password rules, and dead ends after submission.
- **First-run experience.** Check what a new account sees first. An empty dashboard needs guidance toward the first useful action, and sample data must be clearly labeled as sample.
- **AI-generated content disclosure.** Where the site publishes AI-generated text, images, or chat responses, check whether the owner's policy or the applicable rules call for disclosure and whether it is present and accurate. Ask instead of assuming an obligation.

### Footer and identity surfaces

- **Footer and contact.** Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- **Ownership and copyright.** Check company name and copyright notice against site ownership and publishing practice. If a current-year notice is intended, implement it without unnecessary rendering or hydration errors; do not invent the first-publication year or owner.
- **Legal links.** Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.
- **Logo and brand.** Verify logo use, spacing, aspect ratio, colors, fonts, supported light/dark variants, and consistency across pages. Request approved assets when absent; creating a new identity is a separate product decision.
- **Icons.** Inspect favicon clarity at small sizes, Apple touch icon, relevant web app icons, and social sharing artwork. Check files, declared sizes/formats, paths, and actual response types. Do not create an entire app-icon set when the site has no relevant surface.
- **Sharing artwork.** Verify Open Graph and Twitter/X image references use the intended artwork. Coordinate metadata with the discoverability audit and font/media delivery with performance.
- **Asset licensing.** Check that images, fonts, icons, illustrations, audio, and video are licensed for this use, including attribution and seat or pageview limits where they apply. Ask the owner for license records for assets of unknown origin. Do not assume stock, AI-generated, or hotlinked media is cleared, and do not replace assets without approval.

### Evidence and verification

Show material copy changes with their factual source or unresolved question. Check that approved changes are consistent across templates, locales, content sources, and metadata. Inspect relevant visual assets in context and test every changed destination. Mark unverified business information as unverified, not as corrected.
