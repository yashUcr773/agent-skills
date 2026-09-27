# Website Content and Branding — reusable prompt

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the repository, URL, goals, constraints, and prior decisions supplied in this conversation. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings.

Use `CONTENT-001`, `CONTENT-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Content, footer, and branding

Source checklist sections: 6 (content cleanup), 7 (footer), 9 (branding).

### Establish authoritative content

Identify the business/product name, audience, brand assets, tone, contact channels, and sources for factual claims. Ask for missing facts or a decision to remove unsupported content. Do not invent pricing, statistics, testimonials, customer logos, registration details, policies, addresses, or social profiles.

Treat suspicious sample content as needing investigation. Distinguish approved examples and demonstration sites from accidentally shipped production fixtures. Check how content is supplied before replacing hardcoded values or suggesting a CMS.

### Copy and information structure

- Find lorem ipsum, placeholder/sample data, unsupported testimonials/reviews/logos/statistics, duplicate or unused sections, outdated information, and contradictions across pages. Confirm what should replace or be removed before making a material content decision.
- Correct spelling, grammar, capitalization, punctuation, and unnecessary filler while preserving intended meaning and voice. Avoid turning concise factual content into generic promotional claims.
- Check locale-appropriate dates, currencies, prices, phone numbers, and number formatting. Resolve audience/currency ambiguity before changing meaning; display formatting must agree with authoritative commerce values.
- Evaluate a visible last updated date for time-sensitive articles, documentation, policies, or other content where freshness matters. Use a verified substantive content update from the editorial/CMS source, distinguish it from publication date, and keep visible dates and relevant metadata consistent. Do not label every page as updated today or substitute a build/deploy timestamp; ask for a trustworthy source when it is missing.
- Verify addresses, contact details, prices, plan names, feature promises, and quantitative claims against user-provided or authoritative sources. A broken page or failed lookup does not prove the business fact is false.
- Evaluate FAQs around real user questions, with concise, verified answers. Use expandable FAQs only when the interaction helps readability; preserve accessible answers and coordinate discovery/print behavior. Do not invent policies, guarantees, prices, or questions solely to fill a section or obtain structured-data markup.
- Assess whether each important page has a clear purpose and appropriate next action. Make approved CTA labels specific to their outcome; do not fabricate conversion goals or remove useful informational pages because they lack a sales CTA.

### Footer and identity surfaces

- Inspect footer layout at relevant widths, link destinations, contact links, social links, and dead or misleading links. Make approved contact information easy to find in the footer or a suitable contact page; include relevant public email, phone, address, or support channels without inventing details or publishing private contacts. Check `mailto:` and `tel:` values against the visible details, and trace any contact form to its intended delivery route.
- Check company name and copyright notice against site ownership and publishing practice. If a current-year notice is intended, implement it without unnecessary rendering or hydration errors; do not invent the first-publication year or owner.
- Identify missing or broken privacy, terms, cookie, accessibility, and legal/company information where relevant. Policy content and jurisdiction-specific obligations require real business inputs; route those questions to the privacy work rather than generating claims from an unrelated site's policy.
- Verify logo use, spacing, aspect ratio, colors, fonts, supported light/dark variants, and consistency across pages. Request approved assets when absent; creating a new identity is a separate product decision.
- Inspect favicon clarity at small sizes, Apple touch icon, relevant web app icons, and social sharing artwork. Check files, declared sizes/formats, paths, and actual response types. Do not create an entire app-icon set when the site has no relevant surface.
- Verify Open Graph and Twitter/X image references use the intended artwork. Coordinate metadata with the discoverability audit and font/media delivery with performance.

### Evidence and verification

Show material copy changes with their factual source or unresolved question. Check that approved changes are consistent across templates, locales, content sources, and metadata. Inspect relevant visual assets in context and test every changed destination. Mark unverified business information as unverified, not as corrected.
