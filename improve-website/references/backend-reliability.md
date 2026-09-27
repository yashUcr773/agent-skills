# Backend, code quality, and testing reliability

Source checklist sections: 15 (backend/API), 29 (code quality), 30 (testing).

## Establish architecture and contracts

Map the existing request/data path, background work, storage, API consumers, critical invariants, and current tests/build checks. If no backend exists, mark backend-specific checks not applicable while still reviewing relevant code and tests. Ask about ambiguous business rules and compatibility expectations before changing contracts.

## API behavior and data safety

- Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- Evaluate rate limits and protections for expensive operations using the application's callers, proxy model, identities, and workload. Avoid arbitrary limits that block legitimate use.
- Inspect connection/resource cleanup and signs of connection or memory leaks. Distinguish application faults from missing services, exhausted test environments, or local setup failures.

## Database and caching

- Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- Propose indexes based on access patterns and plans, including write/storage cost. Do not add indexes or pools universally; inspect driver, serverless/runtime constraints, deployment limits, and measured connection behavior.
- Evaluate caching only for repeated expensive work with understood freshness requirements. Specify cache key, tenant/user boundaries, expiration, invalidation, and behavior on misses/failures; test that sensitive results cannot cross users.
- For schema changes, prepare compatible migrations and explain rollout/rollback effects. Test with isolated data. Production migrations, destructive data operations, backup deletion, and restores need specific authorization.

## Code quality tied to behavior

- Find dead/unused code, imports, dependencies, commented-out experiments, debug panels/logs, and stale experimental components. Inspect dynamic imports, routes, build tooling, and external consumers before removal.
- Review unresolved TODOs as evidence of unfinished behavior; do not delete comments merely to make the count zero. Remove or replace a TODO when its underlying concern is resolved or deliberately retired.
- Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.
- Examine duplicated components/logic, oversized components, naming, constants/configuration, environment-specific values, hardcoded domains, and appropriate error boundaries. Extract only when repeated behavior or maintenance risk warrants it.
- Identify hardcoded secrets without printing them. Preserve validated environment configuration and separate public configuration from server-only secrets. Security remediation owns exposed credentials and trust-boundary failures.

## Meaningful test coverage

Build coverage around the site's actual journeys and rules: in-scope page smoke checks, CTAs, navigation, forms, happy/failure paths, empty states, unauthorized access, expired sessions, slow/offline behavior where supported, invalid/very long input, special characters, emoji, and supported languages.

Use unit tests for important isolated logic, integration tests for service/data contracts, and end-to-end tests for critical journeys. Prefer the existing test framework and fixtures. Add regression tests for meaningful discovered bugs; do not introduce a framework or cosmetic assertions to increase coverage numbers.

Run the relevant production build as well as appropriate existing lint, type, and test checks. Where feasible, exercise the built application, not just the development server. Prevent tests from sending real notifications, charging accounts, corrupting shared data, or relying on production credentials.

## Evidence and verification

Capture a reproducible failure or query/trace before a fix and an observable outcome after it. Test failure and concurrency cases where the defect requires them. Report command outcomes, remaining warnings/failures, environment constraints, and untested contracts. Do not report a successful build as proof that database migrations, authorization, or external integrations work.
