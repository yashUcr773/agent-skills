# Website Privacy and Analytics — reusable prompt

Version: 1.1.0

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the request details below and anything else supplied in this conversation: the repository, URL, goals, constraints, and prior decisions. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings. If I ask for a re-audit, re-check the saved findings instead of starting over.

Use `PRIV-001`, `PRIV-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Privacy, consent, and analytics

Quick pass: Inventory; Consent states; Working controls; Sensitive data; Policy accuracy.

Severity examples: critical — sensitive personal or payment data is sent to third parties or written to logs; high — tracking runs before required consent, or a policy misstates actual practice; medium — unnecessary data collection or missing user controls; low — minor wording gaps in a notice.

### Establish data practices and goals

Identify the business/operator, intended markets, relevant jurisdiction information, personal-data flows, providers/processors, cookies and storage, tracking purpose, and existing approved policies. Ask for missing material inputs rather than assuming obligations or copying another business's policies.

Determine whether analytics is needed and which decisions or conversions it should support. Choosing a new provider, adopting tracking, or materially expanding collected data needs a user decision. Where legal interpretation is required, consult current authoritative sources and distinguish technical findings, draft wording, and questions requiring qualified review. Do not assert compliance from the presence of a banner or policy page.

### Consent behavior and tracking controls

- **Inventory.** Inventory network requests, scripts, cookies, local storage, server-side collection, and embedded services actually used. Distinguish necessary functionality from optional tracking using real purpose and applicable requirements, not vendor labels alone.
- **Cookie banner.** Evaluate a simple cookie banner only when actual data practices and applicable requirements call for one. Keep the copy clear, link the relevant policy, and provide usable accept/reject/preferences controls as needed. Support keyboard and touch use, readable contrast, mobile layouts, and reopening preferences without unnecessarily obscuring the site. Simplicity must not reduce consent to a cosmetic dismiss button: wire choices to real script/storage behavior, and do not treat dismissal as consent when consent is required.
- **Consent states.** Check initial load, no choice, accept, reject, granular changes, withdrawal, returning visits, and cross-page navigation. Where prior consent is required, verify optional tracking does not fire before it, including tag managers, pixels, preconnects, and deferred scripts.
- **Working controls.** Verify required rejection and preference controls are usable and that stored choices affect real loading and event behavior. A cosmetic banner that leaves trackers running is a finding; an intentionally tracker-free site may not need a banner.
- **Persistence.** Check consent persistence and expiry/version handling against the applicable policy. Do not fabricate retention periods or assume withdrawal can retroactively erase data already sent to a provider.
- **Dependencies.** Avoid bundling consent changes into a silent analytics implementation. Identify dependencies on embeds, ads, personalization, and essential flows before blocking scripts.
- **Third-party embeds.** Check whether video, map, font, social, and chat embeds contact third parties on page load before a required choice. Where consent applies, consider click-to-load placeholders or privacy-enhanced modes, and verify in the network log that nothing loads early.
- **Session replay and heatmaps.** Where recording tools are used, verify that passwords, payment fields, and personal form content are masked or excluded at capture, not just hidden in the dashboard, and that recording follows consent choices.
- **Browser privacy signals.** Check whether Global Privacy Control or similar signals are honored where the applicable rules or the site's own policy say they are. Do not claim to honor a signal the implementation ignores.

### Analytics accuracy and minimization

- **Event accuracy.** Verify intended page views and core conversions actually fire, with no duplicates from SPA routing, rerenders, multiple installations, or retry behavior. Define event meaning before adding CTA or form error events.
- **Attribution.** Check campaign/UTM handling and whether approved attribution survives the relevant navigation/conversion flow. Do not persist identifiers indefinitely or append tracking parameters to unrelated links without a defined need.
- **Internal traffic.** Exclude development/internal traffic where practical and remove debug analytics. Use test properties, debug facilities, or clearly identified synthetic events to avoid polluting production reporting.
- **Sensitive data.** Inspect URLs, query strings, event names/properties, user IDs, and error payloads for passwords, tokens, payment details, personal form fields, and unnecessary identifiers. Avoid copying sensitive payloads into findings.
- **Receipt.** Validate both sending and observed receipt where access permits. A network request or console message alone does not prove the provider processed the correct event.

### Policies and user controls

- **Policy accuracy.** Check relevant privacy, terms, cookie, company/legal, and processor information for accuracy against actual business and data practices. Flag contradictory or unrelated boilerplate and unsupported commitments.
- **Links and requests.** Verify links from relevant forms and site surfaces, consent preference access, and applicable contact/data-deletion mechanisms. A link or button must reach a working, appropriate process; do not submit a real deletion request as a test.
- **Drafts.** Prepare factual policy corrections or clearly marked drafts based on supplied information. Obtain the user's decisions for missing practices and jurisdiction-dependent requirements before representing text as final legal policy.
- **Account deletion.** Where users have accounts, check that they can find and start account deletion or a data request without contacting support when the applicable rules or platform policies require it, and that the outcome matches what the policy says about retained data. Use a test account; do not delete real user data.
- **Data export.** Where users have accounts and the applicable rules or the site's policy promise it, check that users can obtain a copy of their data in a usable format, and that an export contains only the requesting user's data.
- **Age restrictions.** Where the product is aimed at or likely to attract children, or sells age-restricted goods, check whether an age gate or parental-consent flow is required and whether it actually restricts the experience. Ask the owner about the intended audience; do not invent an age rule.

### Evidence and verification

Record observed storage and requests for relevant consent states, redacted event examples, and policy-to-implementation mismatches. Recheck analytics after changes to routing, scripts, or consent. Report which provider dashboards, jurisdictions, data systems, and user-request workflows were not verified. Technical checks support review; they do not provide a legal certification.
