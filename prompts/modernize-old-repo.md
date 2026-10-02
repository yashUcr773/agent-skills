# Modernize Old Repo — reusable prompt

Version: 2.0.0

Perform a complete modernization and maintenance audit of an old software repository: a test, hobby, experimental, or personal project that has not been actively opened or maintained for a long time. This prompt is self-contained, framework agnostic, and agent agnostic. Use the repository, goals, and constraints supplied in this conversation, and ask about consequential missing information instead of guessing.

Your goal is to determine:

1. Whether the project still works.
2. What is broken or outdated.
3. What can be safely improved.
4. What should be removed.
5. What should be modernized.
6. Whether the project is secure, maintainable, performant, and production-quality.
7. Whether the project is still worth keeping.

## Request details

Replace the bracketed values with what you know. Where a line is left unfilled, inspect first and ask me only if the answer changes the result.

- Target: [repository path]
- Goal: [what I want from this project, such as running it again, publishing it, or archiving it]
- Mode: [review first / audit only / audit and fix]
- Depth: [quick / full]
- Constraints: [behavior to preserve, upgrades to avoid, services that must not be touched]

## Ground rules

- Understand the existing architecture and intent first. Do not blindly rewrite the project.
- Preserve the original functionality unless there is a clear reason to change it.
- Prefer small, incremental, well-justified improvements.
- Do not introduce unnecessary dependencies.
- Do not upgrade everything just because newer versions exist.
- Before making changes, create an audit/findings summary.
- After changes, verify that the project still works.
- If something cannot be verified, explicitly state that.
- Skip checks that do not fit the project type. Items marked for a particular stack, such as JavaScript or frontend items, apply only when the project uses it. Phases 7, 8, 9, and 13 apply only when the project has a frontend, a backend or API, a database, or deployment infrastructure.
- When the project is a website, keep Phases 7 to 10 at the level of this audit. A dedicated website audit goes deeper on accessibility, SEO, performance, security, payments, and privacy; recommend it as a next step instead of expanding this audit.

## Operating mode

- **Review first — default:** complete the audit in Phases 1–17, present the findings and proposed changes, and wait for my selection before editing. Then implement only the selected findings, with my corrections, and verify them.
- **Audit and fix — explicit option:** when I explicitly ask for the audit and fixes without an intermediate review, audit, implement the unambiguous improvements in the Phase 18 order, verify, and report. Still ask about unresolved decisions such as major upgrades, removed features, or behavior changes.
- **Audit only — when requested:** report the findings and stop. Do not turn an audit request into implementation.

Use the mode requested in the conversation; no exact phrase is required. A later instruction to pause or narrow the task takes precedence.

## Depth

- **Full — default:** every applicable phase.
- **Quick — when requested:** answer one question, "does it still install, build, and run, and what stops it?" Do Phases 1 and 2, the end-of-life and lock-file items of Phase 3, and the secrets items of Phase 6, then report with a recommendation on whether a full audit is worth doing. Do not change files in a quick pass.

## Work safely in an old repository

- Record the starting state and work on a new branch so every change is reviewable and reversible. Do not rewrite git history unless explicitly instructed.
- Before running anything, read the install, build, start, and test scripts, lifecycle hooks such as post-install scripts, Makefiles, Docker files, and migration or seed scripts. Old projects can contain scripts that delete data or call live services, and packages that have since changed owners.
- Check `.env` files and configuration for live credentials and production endpoints before starting the application. Run against local or disposable services only.
- Do not run migrations, seeds, or destructive scripts against a database that was not created for this audit.
- Prefer an isolated environment, such as a container or a pinned runtime in a throwaway directory, so an old toolchain does not alter the system setup.
- Do not deploy, publish packages, send real messages, or rotate credentials unless that specific action is authorized.

## Record findings

Give each finding a stable ID (`MOD-001`, `MOD-002`, and so on), a severity, the file or location, why it matters, the recommended fix, a rough effort estimate, and its status.

Use one severity scale throughout: **critical** for demonstrated severe exposure or loss, **high** for major security or reliability failures or a project that cannot run, **medium** for meaningful degradation, and **low** for minor defects. Mark preference-driven improvements **optional** instead of assigning them a severity.

If I ask, or the work will continue in a later session, save the findings to a file I name so the IDs persist. Ask before adding that file to the repository, and keep secrets out of it.

## Phase 1 — Understand the project

First inspect the entire repository.

Determine:

- What the project does
- Original purpose/use case
- Main features
- Application type
  - frontend
  - backend
  - full-stack
  - CLI
  - library
  - script
  - experiment
  - infrastructure
  - other
- Main technologies/frameworks
- Runtime/language versions
- Package manager
- Build system
- Database
- External services/APIs
- Authentication/authorization
- Deployment strategy
- Testing strategy
- CI/CD
- Environment/configuration requirements
- Repository structure
- Entry points
- Important architectural decisions
- Project license

Read:

- README
- package manifests
- lock files
- configuration files
- environment examples
- Docker files
- CI/CD configuration
- source code
- tests
- scripts
- database migrations
- infrastructure files

Do not assume the README is correct.

Compare documentation against the actual implementation.

For each external service or API the project depends on, check whether it still exists, which version is current, and whether its authentication, quotas, or pricing changed since the project was last active.

## Phase 2 — Determine current health

Attempt to run the project, following the safety rules above.

Identify:

- Does dependency installation work?
- Does the project build?
- Does it start?
- Does the application run?
- Do tests run?
- Do lint/type checks run?
- Do database migrations work?
- Do development scripts work?
- Do production builds work?

Record every failure.

Distinguish between:

- Environment/setup problems
- Dependency problems
- Deprecated APIs
- Actual application bugs
- Missing services
- Retired or changed external services
- Missing environment variables
- Broken tests
- Incorrect documentation

Do not "fix" failures before understanding their cause.

## Phase 3 — Dependency audit

Inspect all dependencies.

Check for:

- Runtime, language, or framework versions that have reached end of life
- Container base images or OS versions that have reached end of life
- Missing or stale lock files
- Outdated dependencies
- Deprecated packages
- Abandoned packages
- Unmaintained libraries
- Packages that changed owners or run install scripts
- Duplicate libraries solving the same problem
- Unnecessary dependencies
- Unused dependencies
- Incorrect dependency classification
- Security vulnerabilities
- Dependency licenses that conflict with the project's license or intended use
- Deprecated framework APIs
- Deprecated runtime or platform APIs, such as Node or browser APIs in JavaScript projects

For every significant dependency upgrade, determine:

- Current version
- Recommended version
- Breaking changes
- Compatibility concerns
- Whether the upgrade is actually worthwhile

Avoid unnecessary major-version upgrades if they provide little value.

When upgrades are worthwhile, plan them in order: the runtime and toolchain first, then build and test tooling, then frameworks one major version at a time, then the remaining dependencies. Verify between steps so a failure points to one change.

Remove clearly unused dependencies where safe.

## Phase 4 — Code quality audit

Review the codebase for:

- Dead code
- Unused files
- Unused functions
- Unused variables
- Duplicate code
- Copy/paste implementations
- Overly complex functions
- Large components/modules
- Poor separation of concerns
- Tight coupling
- Incorrect abstractions
- Premature abstractions
- Inconsistent naming
- Inconsistent coding patterns
- Magic numbers
- Magic strings
- Hardcoded configuration
- Poor error handling
- Swallowed errors
- Incorrect async handling
- Race conditions
- Promise or other async-primitive misuse
- Resource leaks
- Memory leaks
- Incorrect state management
- Unnecessary re-renders in UI frameworks
- Poor data flow
- Difficult-to-test code
- Poor module boundaries

Look for places where the original implementation was probably written quickly as a hobby/test project and improve them only when the improvement provides meaningful value.

## Phase 5 — Bug audit

Look for functional bugs including:

- Null/undefined handling
- Empty states
- Invalid inputs
- Boundary conditions
- Incorrect assumptions
- Race conditions
- Concurrency issues
- State synchronization issues
- Error states
- Retry behavior
- Timeout handling
- Partial failures
- Incorrect caching
- Stale data
- Incorrect pagination
- Incorrect sorting/filtering
- Date/time bugs
- Timezone bugs
- Number/precision issues
- File handling issues
- Network failures
- Browser compatibility issues

Pay special attention to bugs that would only appear after long periods of inactivity or under unusual conditions, such as expired certificates or tokens, hardcoded years or dates, and retired external endpoints.

## Phase 6 — Security audit

Perform a security review.

Check for:

- Hardcoded secrets
- API keys
- Passwords
- Tokens
- Private keys
- Sensitive data committed to git
- Secrets exposed in frontend code or bundles
- Exposed database credentials
- Publicly served .env files
- Default credentials
- Dangerous environment variables
- Authentication bypasses
- Authorization issues
- Unprotected admin or authenticated routes
- Client-only security checks
- IDOR
- Broken access control
- Cross-user or cross-tenant data access
- Field tampering / mass assignment
- XSS
- CSRF
- SSRF
- SQL injection
- NoSQL injection
- Command injection
- Path traversal
- Prototype pollution
- Unsafe deserialization
- Insecure file uploads
- Open redirects
- CORS problems
- Cookie security
- Session security
- Session tokens stored in localStorage
- JWT problems
- Weak password handling
- Broken password reset
- Missing rate limiting
- Sensitive information leakage
- Verbose production errors
- Missing security headers
- Missing audit logs
- Excessive permissions
- Open or excessive database permissions
- Missing row-level security where the stack relies on it
- Public storage buckets
- Cloud service misconfiguration
- Unsafe dependencies
- Dependency vulnerabilities
- Debug endpoints
- Development-only functionality exposed in production

Check both application code and infrastructure/configuration.

Also review the application as an attacker would and record both confirmed and potential issues. Run active attack tests only against a local or otherwise authorized environment.

Do not expose or reproduce real secrets if found.

If secrets are discovered:

- identify their location
- recommend rotation
- remove them from source where appropriate
- update examples/documentation safely
- do not assume deleting them from the latest commit removes them from git history

## Phase 7 — Frontend audit

If this is a frontend application, inspect:

### UI

- Broken layouts
- Missing loading states
- Missing empty states
- Missing error states
- Inconsistent spacing
- Inconsistent typography
- Poor visual hierarchy
- Accessibility problems
- Keyboard navigation
- Focus states
- Mobile responsiveness
- Tablet responsiveness
- Desktop responsiveness
- Overflow problems
- Broken interactions
- Poor forms
- Poor validation
- Unclear error messages
- Missing confirmation for destructive actions

### UX

Check whether the application feels like an old prototype.

Improve:

- navigation
- onboarding
- feedback
- loading behavior
- error handling
- empty states
- form usability
- responsive behavior
- accessibility
- consistency

Do not redesign the entire application unless necessary.

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

## Phase 10 — Performance audit

Look for:

Frontend:

- Large bundles
- Unnecessary dependencies
- Excessive JavaScript
- Unnecessary renders
- Large images
- Missing lazy loading
- Blocking resources
- Poor caching
- Inefficient data fetching

Backend:

- Slow queries
- N+1 queries
- Excessive network calls
- Missing caching
- Inefficient algorithms
- Memory-heavy operations
- Blocking operations
- Poor concurrency

Only optimize where there is a reasonable bottleneck or clear improvement.

## Phase 11 — Testing audit

Inspect existing tests.

Determine:

- What is tested?
- What is not tested?
- Are tests still valid?
- Are tests flaky?
- Are tests testing implementation details?
- Are important business rules untested?
- Are edge cases missing?
- Are integration tests missing?
- Are critical API paths untested?
- Are UI flows untested?

Improve the test suite where valuable.

Prioritize:

1. Core business logic
2. Critical user flows
3. API behavior
4. Security-sensitive behavior
5. Important edge cases
6. Regression tests for bugs discovered during this audit
7. Characterization tests for untested code that will be refactored

Do not add meaningless tests just to increase coverage.

## Phase 12 — Dev experience

Evaluate how easy it is for a developer to clone and run this repository today.

Check:

- README accuracy
- Setup instructions
- Required runtime version
- Package manager
- Environment setup
- .env.example
- Database setup
- Seed data
- Development scripts
- Build scripts
- Test scripts
- Lint scripts
- Formatting
- Type checking
- Git hooks
- Docker setup
- CI setup

The goal should be:

clone → install → configure → run → test

with minimal confusion.

Fix documentation that no longer matches reality.

## Phase 13 — Infrastructure / deployment

If applicable, inspect:

- Dockerfile
- Docker Compose
- Kubernetes
- Terraform
- AWS/GCP/Azure configuration
- Vercel/Netlify/etc.
- CI/CD
- Environment configuration
- Secrets handling
- Health checks
- Graceful shutdown
- Logging
- Monitoring
- Resource limits
- Production configuration

Check for obsolete infrastructure assumptions, such as deprecated CI actions or runner images, retired platform features, and hosting plans or regions that no longer exist.

## Phase 14 — Git / repository hygiene

Inspect repository hygiene.

Check:

- .gitignore
- tracked build artifacts
- dependency directories such as node_modules, vendor, or virtual environments
- generated files
- local databases
- logs
- temporary files
- IDE files
- OS-specific files
- secrets
- stale branches if visible
- huge files
- accidental binaries
- outdated documentation
- missing or unclear project license
- meaningless commits only if history review is useful

Determine whether the repository contains things that should never have been committed.

Do not rewrite git history unless explicitly instructed.

## Phase 15 — Documentation

Update documentation to reflect the actual project.

At minimum, README should explain:

- What the project is
- Features
- Tech stack
- Architecture overview
- Prerequisites
- Installation
- Environment variables
- Running locally
- Running tests
- Building
- Deployment
- Important design decisions
- Known limitations
- Current project status

If this is intentionally a hobby/experimental project, say so rather than pretending it is production software.

## Phase 16 — Modernization

After completing the audit, identify modernization opportunities.

Consider:

- Framework upgrades
- Runtime upgrades
- Dependency upgrades
- Stronger typing where the language supports it, such as stricter TypeScript settings
- Better project structure
- Modern APIs
- Better error handling
- Better testing
- Better security defaults
- Better accessibility
- Better performance
- Better developer experience

Rate every proposed change critical, high, medium, low, or optional using the scale under "Record findings", with a rough effort estimate. Mark changes that are technically possible but not worth the effort as not worth doing, and say why.

Do not modernize for the sake of modernization.

## Phase 17 — Cleanup

Identify things that can safely be removed:

- Dead files
- Unused dependencies
- Unused scripts
- Obsolete configuration
- Old experiments
- Duplicate implementations
- Debug code
- Temporary workarounds
- Deprecated code paths

Before deleting anything, verify that it is actually unused.

## Phase 18 — Implement improvements

In review-first mode, present the audit and wait for my selection before this phase. In audit-only mode, skip to the final report.

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

## Important operating principles

1. Audit before modifying.
2. Understand before refactoring.
3. Verify before deleting.
4. Prefer minimal changes.
5. Preserve behavior.
6. Fix security issues seriously.
7. Don't blindly upgrade dependencies.
8. Don't optimize without a reason.
9. Don't add tests purely for coverage numbers.
10. Don't introduce unnecessary architecture.
11. Treat old documentation as potentially incorrect.
12. Treat old dependencies as potentially vulnerable.
13. Treat environment/configuration as potentially stale.
14. Assume the project may contain forgotten secrets.
15. Verify the final application rather than assuming it works.
16. Clearly distinguish facts from assumptions.
17. If something cannot be tested because an external service/account is unavailable, document that limitation.
18. Never silently ignore a failing test, build, or command.
19. Make changes in logical groups so they are easy to review.
20. The goal is to make this old repository genuinely useful again, not simply make the code look newer.
