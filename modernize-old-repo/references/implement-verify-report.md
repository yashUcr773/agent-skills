# Implement, verify, and report

Read this after the audit phases are complete.

## Phase 18 — Implement improvements

In review-first mode, present the audit and wait for the user's selection before this phase. In audit-only mode, skip to the final report.

Implement in this order, limited to the selected or in-scope findings:

1. Fix critical issues.
2. Fix obvious bugs.
3. Fix security issues.
4. Fix broken setup/build/test functionality.
5. Remove safe dead code.
6. Improve important code-quality problems.
7. Improve documentation.
8. Improve tests.
9. Apply worthwhile dependency upgrades.
10. Apply reasonable UX/performance improvements.

Keep changes focused.

Before refactoring behavior that has no tests, add characterization tests that capture what the code does today, so the refactor can be checked against them.

Do not:

- Rewrite the whole application
- Replace the framework without justification
- Introduce unnecessary architecture
- Add dependencies unnecessarily
- Convert everything to a different language/framework
- Remove features simply because they are old
- Change behavior without documenting it

## Phase 19 — Verify everything

After making changes, run as many of these as applicable:

- Install dependencies
- Type checking
- Lint
- Formatting check
- Unit tests
- Integration tests
- Build
- Production build
- Application startup
- Database migrations
- API tests
- End-to-end tests

If browser access is available, launch the application and manually inspect the major user flows.

Test:

- happy paths
- invalid inputs
- empty states
- loading states
- error states
- responsive layouts
- authentication
- authorization
- important CRUD operations
- destructive operations

Fix regressions discovered during verification.

## Phase 20 — Final report

At the end, provide a concise but comprehensive report with these sections.

### Project health

Overall rating:

- Broken
- Poor
- Needs maintenance
- Healthy
- Very healthy

### What this project does

Brief summary.

### Current stack

List major technologies and versions.

### Problems found

Group by:

- Critical
- Security
- Bugs
- Dependencies
- Code quality
- Performance
- Testing
- UX/UI
- Documentation
- Infrastructure
- Repository hygiene

For every important issue include:

- Finding ID and severity
- Problem
- Why it matters
- File/location
- Recommended fix
- Whether you fixed it

### Changes made

List every meaningful change made.

### Dependencies

Show important dependency changes and explain why.

### Tests

Show:

- Tests before
- Tests after
- Tests added
- Tests fixed
- Tests still failing

### Security

State whether any security issues were found and what was done.

Do not print secrets.

### Remaining issues

List things that should still be addressed, including anything that could not be verified.

### Not worth fixing

Explicitly identify things that are technically outdated but not worth spending time on.

### Project recommendation

Choose one:

- Keep
- Keep and modernize
- Keep as archive
- Rewrite
- Delete

Explain why.

### Suggested next steps

Give the 5–10 highest-value things to do next.
