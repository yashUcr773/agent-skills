# Core audit

These phases apply to every project. Phases 7, 8, 9, and 13 are in separate references and apply only to projects that have a frontend, a backend or database, or infrastructure.

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

Attempt to run the project, following the safety rules in `SKILL.md`.

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

To find unused dependencies, search the source and scripts for each package's imports, requires, and command-line use; a package with none is unused. To check classification, flag build, test, and type-checking tools listed as runtime dependencies.

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

Rate every proposed change critical, high, medium, low, or optional using the scale under "Record findings" in `SKILL.md`, with a rough effort estimate. Mark changes that are technically possible but not worth the effort as not worth doing, and say why.

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
