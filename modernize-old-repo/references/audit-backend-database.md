# Backend, API, and database audit

Read this only when the project has a backend, an API, or a database. Skip the phase that does not apply.

## Phase 8 — Backend/API audit

If there is a backend/API, inspect:

- API design
- HTTP semantics
- Status codes
- Validation
- Error responses
- Authentication
- Authorization
- Rate limiting
- Timeouts
- Retries
- Idempotency
- Pagination
- Filtering
- Sorting
- Logging
- Observability
- Input validation
- Output validation
- API versioning
- Database access
- Connection management
- Transaction handling
- Concurrency
- Background jobs
- Queue handling

Check for APIs that accidentally expose internal implementation details.

## Phase 9 — Database audit

If a database exists, inspect:

- Schema
- Relationships
- Indexes
- Constraints
- Foreign keys
- Unique constraints
- Nullability
- Data types
- Migrations
- Seed scripts
- Query efficiency
- N+1 queries
- Transactions
- Connection handling
- Data validation
- Cascading deletes
- Soft deletes
- Pagination

Identify obvious performance problems.

Do not make destructive schema/data changes without clearly explaining them.
