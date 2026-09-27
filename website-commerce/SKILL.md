---
name: website-commerce
description: Audit and improve existing website checkout, payments, orders, inventory, subscriptions, and webhook integrity using safe test environments. Review before fixes unless audit-and-fix is explicitly requested; do not assume live transaction authority.
---

# Website Payments and Commerce

This skill is self-contained, framework agnostic, and agent agnostic. Default to audit, user review, then selected fixes and verification. Use audit-and-fix only when explicitly requested.

Use `PAY-001`, `PAY-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Payments and commerce

Source checklist section: 18 (payments/ecommerce).

### Confirm the commercial rules and test environment

Establish the provider/integration, one-time versus subscription billing, order states, currencies, authoritative prices, discounts, tax/shipping rules, inventory rules, and entitlement lifecycle. Ask about missing business rules; do not invent refund policy, tax rates, subscription behavior, or prices.

Use provider-supported test mode, isolated orders, test payment instruments, and sandbox webhooks. Never make a real purchase, refund, cancellation, customer notification, or inventory change just to complete an audit unless that exact live action is authorized. With no safe test access, inspect code and document the runtime gap.

### Checkout and order integrity

- Exercise successful, declined, cancelled, abandoned, expired-session, and duplicate/retried checkout. Check recoverability, visible status, retained basket data, and appropriate error handling.
- Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- Check out-of-stock behavior, concurrent inventory changes, reservation expiry where used, and overselling protections consistent with the product's fulfillment model. Do not impose stock reservations on products that do not need them.
- Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.

### Webhooks and delayed outcomes

- Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.
- Test duplicate, delayed, retried, and out-of-order events. Processing should be idempotent at the business-effect boundary, with durable handling of concurrent deliveries.
- Check reconciliation after partial failure: provider success followed by a database failure, delayed confirmation, repeated fulfillment, or missing events. Avoid acknowledging events before required durable handling unless a reliable queueing design makes that safe.
- Validate state transitions against authoritative provider data when needed. Do not grant access or ship goods solely from an unverified browser callback.

### Post-purchase behavior

Exercise test-mode refunds, partial refunds where supported, subscription cancellation and its effective date, expiry, and resulting entitlements/order status. Check receipts, approved test delivery destinations, links, amounts/currency, and correspondence with the actual payment state. Ask about ambiguous proration, renewal, cancellation, or fulfillment behavior before changing it.

### Evidence and verification

Record redacted test event/order references, expected and observed state transitions, and outcomes for successful and failed paths. Add focused integration/regression tests for price trust, duplicate processing, and access to paid resources. Report gaps in provider test coverage and any live validation still awaiting authorization. Never use a test checkout result to claim a real settlement or payout succeeded.
