---
name: modernize-old-repo
description: Audit and carefully modernize old, stale, hobby, experimental, or personal software repositories without blindly rewriting them. Use to check whether a neglected project still installs, runs, and is safe to keep, covering dependencies, end-of-life runtimes, security, tests, and documentation; review findings before changes unless audit-and-fix is explicitly requested.
metadata:
  version: "2.0.0"
  prompt-hash: "080c27ff5db9"
---

# Modernize Old Repo

Perform a complete modernization and maintenance audit of an old software repository: a test, hobby, experimental, or personal project that has not been actively opened or maintained for a long time. This skill is self-contained, framework agnostic, and agent agnostic.

Take the target, goal, mode, depth, and constraints from the conversation. Inspect first, and ask about consequential missing information instead of guessing.

The goal is to determine:

1. Whether the project still works.
2. What is broken or outdated.
3. What can be safely improved.
4. What should be removed.
5. What should be modernized.
6. Whether the project is secure, maintainable, performant, and production-quality.
7. Whether the project is still worth keeping.

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

- **Review first — default:** complete the audit in Phases 1–17, present the findings and proposed changes, and wait for the user's selection before editing. Then implement only the selected findings, with their corrections, and verify them.
- **Audit and fix — explicit option:** when the user explicitly asks for the audit and fixes without an intermediate review, audit, implement the unambiguous improvements in the Phase 18 order, verify, and report. Still ask about unresolved decisions such as major upgrades, removed features, or behavior changes.
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

If the user asks, or the work will continue in a later session, save the findings to a file they name so the IDs persist. Ask before adding that file to the repository, and keep secrets out of it.

## Run the phases

Work through the phases in order. Read each reference when you reach it, and skip a conditional reference when the project has nothing it applies to.

| Phases | Read | When |
| --- | --- | --- |
| 1–6, 10–12, 14–17: understand, health, dependencies, code quality, bugs, security, performance, testing, dev experience, repository hygiene, documentation, modernization, cleanup | [references/audit-core.md](references/audit-core.md) | Always |
| 7: frontend | [references/audit-frontend.md](references/audit-frontend.md) | The project has a user interface |
| 8–9: backend/API and database | [references/audit-backend-database.md](references/audit-backend-database.md) | The project has a backend, an API, or a database |
| 13: infrastructure and deployment | [references/audit-infrastructure.md](references/audit-infrastructure.md) | The project has deployment or infrastructure configuration |
| 18–20: implement, verify, report | [references/implement-verify-report.md](references/implement-verify-report.md) | After the audit: before implementing in review-first or audit-and-fix mode, and for the final report in every mode |

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
