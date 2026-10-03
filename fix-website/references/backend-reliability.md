# Backend, code quality, and testing reliability

Quick pass: Validation and errors; Timeouts and retries; Concurrency; Query cost; Type and lint errors.

Severity examples: critical — data loss or corruption under normal use; high — an unhandled failure that takes down a core endpoint, or a race that duplicates writes; medium — wrong status codes, missing validation that produces bad records, or N+1 queries on a main page; low — dead code and minor lint warnings.

## Establish architecture and contracts

Map the existing request/data path, background work, storage, API consumers, critical invariants, and current tests/build checks. If no backend exists, mark backend-specific checks not applicable while still reviewing relevant code and tests. Ask about ambiguous business rules and compatibility expectations before changing contracts.

## API behavior and data safety

- **Validation and errors.** Check authoritative payload validation, context-appropriate input handling, request/upload/response size limits, meaningful HTTP status codes, consistent errors, and absence of leaked internals. Do not silently change an API format consumed elsewhere.
- **Timeouts and retries.** Examine request timeouts, cancellation, bounded retries, and appropriate backoff. Retry only transient failures with safe semantics; protect non-idempotent writes from duplicate effects. Version APIs only when compatibility needs justify it.
- **Concurrency.** Check concurrent requests, conflicting writes, race conditions, idempotency boundaries, transactions, uniqueness constraints, and partial failures. UI button disabling is not server-side concurrency protection.
- **Rate limits.** Evaluate rate limits and protections for expensive operations using the application's callers, proxy model, identities, and workload. Avoid arbitrary limits that block legitimate use.
- **Resource leaks.** Inspect connection/resource cleanup and signs of connection or memory leaks. Distinguish application faults from missing services, exhausted test environments, or local setup failures.
- **Background jobs and queues.** Inspect scheduled tasks, queues, and workers for bounded retries with backoff, idempotent handlers, dead-letter or failed-job handling, timeouts, overlapping runs of the same schedule, and visibility into stuck work. A job that fails silently is a finding even when the request that queued it succeeded.
- **Upstream dependencies.** For each third-party API the site depends on, check timeouts, behavior when it is slow, unavailable, or rate-limiting, quota headroom, and whether users see a useful degraded state. Do not exhaust a paid or shared quota to test this; use mocks or sandbox limits.

## Database and caching

- **Query cost.** Inspect observed slow queries and plans, N+1 access, large unbounded queries, payload overfetching, and pagination behavior. Check consistency under concurrent insertion/update where it matters.
- **Indexes and pooling.** Propose indexes based on access patterns and plans, including write/storage cost. Do not add indexes or pools universally; inspect driver, serverless/runtime constraints, deployment limits, and measured connection behavior.
- **Caching.** Evaluate caching only for repeated expensive work with understood freshness requirements. Specify cache key, tenant/user boundaries, expiration, invalidation, and behavior on misses/failures; test that sensitive results cannot cross users.
- **Migrations.** For schema changes, prepare compatible migrations and explain rollout/rollback effects. Test with isolated data. Production migrations, destructive data operations, backup deletion, and restores need specific authorization.

## Code quality tied to behavior

- **Unused code.** Find dead/unused code, imports, dependencies, commented-out experiments, debug panels/logs, and stale experimental components. Inspect dynamic imports, routes, build tooling, and external consumers before removal.
- **TODOs.** Review unresolved TODOs as evidence of unfinished behavior; do not delete comments merely to make the count zero. Remove or replace a TODO when its underlying concern is resolved or deliberately retired.
- **Type and lint errors.** Resolve relevant type/lint errors and build warnings. Avoid disabling checks, weakening types, blanket `any`, or silencing failures to obtain a clean command result.
- **Structure.** Examine duplicated components/logic, oversized components, naming, constants/configuration, environment-specific values, hardcoded domains, and appropriate error boundaries. Extract only when repeated behavior or maintenance risk warrants it.
- **Hardcoded secrets.** Identify hardcoded secrets without printing them. Preserve validated environment configuration and separate public configuration from server-only secrets. Security remediation owns exposed credentials and trust-boundary failures.

## Meaningful test coverage

Build coverage around the site's actual journeys and rules: in-scope page smoke checks, CTAs, navigation, forms, happy/failure paths, empty states, unauthorized access, expired sessions, slow/offline behavior where supported, invalid/very long input, special characters, emoji, and supported languages.

Use unit tests for important isolated logic, integration tests for service/data contracts, and end-to-end tests for critical journeys. Prefer the existing test framework and fixtures. Add regression tests for meaningful discovered bugs; do not introduce a framework or cosmetic assertions to increase coverage numbers.

Run the relevant production build as well as appropriate existing lint, type, and test checks. Where feasible, exercise the built application, not just the development server. Prevent tests from sending real notifications, charging accounts, corrupting shared data, or relying on production credentials.

Check whether the existing tests run automatically on changes, for example in CI, and whether a failure blocks merging; tests that only run on one machine protect little. Identify flaky tests, which pass and fail without a code change, and fix their cause, such as timing, shared state, order dependence, or network access, or quarantine them visibly. Do not retry until green or delete them silently. Adding CI is a proposal for the owner.

## Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Supabase database access.** Check that serverless or edge code connects through the connection pooler instead of exhausting direct connections, that schema changes live as migrations in the repository and not only as dashboard edits, and that database functions and triggers are reviewed like application code.
- **Firebase data access.** Check queries for unbounded collection reads, listeners left attached after a view closes, multi-document writes without a batch or transaction, and missing composite indexes. Reads are billed per document, so an inefficient query is a cost problem as well as a speed problem.

## Evidence and verification

Capture a reproducible failure or query/trace before a fix and an observable outcome after it. Test failure and concurrency cases where the defect requires them. Report command outcomes, remaining warnings/failures, environment constraints, and untested contracts. Do not report a successful build as proof that database migrations, authorization, or external integrations work.
