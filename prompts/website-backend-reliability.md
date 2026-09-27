# Website Backend and Reliability — reusable prompt

Audit and improve this website within the domain below. This prompt is self-contained and requires no installed skill or particular framework/agent. Use the repository, URL, goals, constraints, and prior decisions supplied in this conversation. Ask about consequential missing information.

Default to audit → user review → selected fixes → verification. If I explicitly request audit-and-fix, use that mode. If I request audit only, stop after the findings.

Use `REL-001`, `REL-002`, and so on for stable finding IDs. Apply the workflow below only to the requested domain and scope. Other domains mentioned in the checklist are related concerns, not required installed skills.

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

## Backend, code quality, and testing reliability

Source checklist sections: 15 (backend/API), 29 (code quality), 30 (testing).

### Establish architecture and contracts

Map the existing request/data path, background work, storage, API consumers, critical invariants, and current tests/build checks. If no backend exists, mark backend-specific checks not applicable while still reviewing relevant code and tests. Ask about ambiguous business rules and compatibility expectations before changing contracts.

### API behavior and data safety

- Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- Evaluate rate limits and protections for expensive operations using the application's callers, proxy model, identities, and workload. Avoid arbitrary limits that block legitimate use.
- Inspect connection/resource cleanup and signs of connection or memory leaks. Distinguish application faults from missing services, exhausted test environments, or local setup failures.

### Database and caching

- Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- Propose indexes based on access patterns and plans, including write/storage cost. Do not add indexes or pools universally; inspect driver, serverless/runtime constraints, deployment limits, and measured connection behavior.
- Evaluate caching only for repeated expensive work with understood freshness requirements. Specify cache key, tenant/user boundaries, expiration, invalidation, and behavior on misses/failures; test that sensitive results cannot cross users.
- For schema changes, prepare compatible migrations and explain rollout/rollback effects. Test with isolated data. Production migrations, destructive data operations, backup deletion, and restores need specific authorization.

### Code quality tied to behavior

- Find dead/unused code, imports, dependencies, commented-out experiments, debug panels/logs, and stale experimental components. Inspect dynamic imports, routes, build tooling, and external consumers before removal.
- Review unresolved TODOs as evidence of unfinished behavior; do not delete comments merely to make the count zero. Remove or replace a TODO when its underlying concern is resolved or deliberately retired.
- Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.
- Examine duplicated components/logic, oversized components, naming, constants/configuration, environment-specific values, hardcoded domains, and appropriate error boundaries. Extract only when repeated behavior or maintenance risk warrants it.
- Identify hardcoded secrets without printing them. Preserve validated environment configuration and separate public configuration from server-only secrets. Security remediation owns exposed credentials and trust-boundary failures.

### Meaningful test coverage

Build coverage around the site's actual journeys and rules: in-scope page smoke checks, CTAs, navigation, forms, happy/failure paths, empty states, unauthorized access, expired sessions, slow/offline behavior where supported, invalid/very long input, special characters, emoji, and supported languages.

Use unit tests for important isolated logic, integration tests for service/data contracts, and end-to-end tests for critical journeys. Prefer the existing test framework and fixtures. Add regression tests for meaningful discovered bugs; do not introduce a framework or cosmetic assertions to increase coverage numbers.

Run the relevant production build as well as appropriate existing lint, type, and test checks. Where feasible, exercise the built application, not just the development server. Prevent tests from sending real notifications, charging accounts, corrupting shared data, or relying on production credentials.

### Evidence and verification

Capture a reproducible failure or query/trace before a fix and an observable outcome after it. Test failure and concurrency cases where the defect requires them. Report command outcomes, remaining warnings/failures, environment constraints, and untested contracts. Do not report a successful build as proof that database migrations, authorization, or external integrations work.
