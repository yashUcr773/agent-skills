# Changelog

Each skill and the prompt it is written from share one version number. The prompt's `Version:` line is the source; the skill's `metadata.version` must match it, and the skill's `metadata.prompt-hash` records which state of the prompt it was last updated from. Versions follow the usual three-part scheme: the first number changes when something is removed, renamed, or a default changes; the second when checks or options are added; the third for wording fixes.

## fix-website

### 2.1.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.
- Added the Response contents check and put it on the quick-pass line. Password handling now also covers passwords and tokens written to the console, logs, or error tracking.

### 2.0.0 — 2026-10-03

- Merged `improve-website` into this skill. It now carries the shared workflow, the routing table, and the ten labeled domain checklists.
- Replaced the 32-area short checklist with a list of every check label by domain, which the linter verifies.
- Split the prompt in two: `fix-website.md` is the light version with the workflow, routing table, and quick-pass checks; `fix-website-full.md` contains every checklist.
- Added a re-audit mode, the quick/standard/deep depth setting, a fixed findings-file layout, and a request-details block.
- Added fix-phase rules (one finding at a time, verify before the next) and an Owner actions list at the end of every report.
- Added severity examples to every domain checklist.
- Added checks specific to Next.js and Vercel, Supabase, Firebase, Stripe, Clerk, Auth.js, Auth0, and Better Auth.

### 1.0.0

- Initial release: the general website checklist packaged as a skill.

## improve-website

### Removed — 2026-10-03

- Merged into `fix-website` 2.0.0. Install `fix-website` instead.

## website-ui-accessibility

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: conformance target, text direction, route changes, time limits, accessible authentication, dragging alternatives, documents and downloads, accessibility statement.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-interactions

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: returning position, multi-step forms, unsaved changes.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-content-branding

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: single primary CTA, translations, asset licensing, and a conversion and clarity section covering value proposition, pricing clarity, signup friction, first-run experience, and AI-generated content disclosure.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-seo-discoverability

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: missing pages, intended crawler access, parameter and pagination URLs, internal search results, webmaster tools, site migration, image and video search, local business listings.
- Added stack-specific checks for Next.js and Vercel.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-performance

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: load-time targets, server response time, back/forward cache, and a performance budget as a regression guard.
- Added stack-specific checks for Next.js.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-backend-reliability

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: background jobs and queues, upstream dependencies, flaky tests, and whether tests run automatically.
- Added stack-specific checks for Supabase and Firebase.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-security-auth

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.
- Added the Response contents check and put it on the quick-pass line. Password handling now also covers passwords and tokens written to the console, logs, or error tracking.

### 1.1.0 — 2026-10-03

- Added checks: served files and history, AI tooling leftovers, field tampering, data-store and cloud permissions, dangling DNS, SSRF, GraphQL and real-time channels, business-logic abuse, token storage and JWTs, third-party scripts, disclosure contact, password handling, automated abuse, OAuth and SSO, sensitive changes, audit records, secret rotation.
- Added an AI and LLM features section.
- Added stack-specific checks for Next.js and Vercel, Supabase, Firebase, Clerk, Auth.js, Auth0, and Better Auth.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-commerce

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: card data handling, additional authentication, promotion and trial abuse, pre-purchase information, failed renewals, and disputes.
- Added stack-specific checks for Stripe.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-privacy-analytics

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: third-party embeds, session replay and heatmaps, browser privacy signals, account deletion, data export, age restrictions.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## website-operations

### 1.2.0 — 2026-10-03

- Findings: the full record at every severity, one finding per distinct defect, severity by the harm demonstrated, and no credential values, including test and seed accounts. Summary counts come from the final findings list.
- Audits at standard and deep depth end with a coverage section naming each check label not verified or not applicable. Runtime probes should change nothing, or use test records and be undone.
- Re-audits check what each fix changed around it and do not search for unrelated problems.

### 1.1.0 — 2026-10-03

- Added checks: domain and certificate expiry, pipeline permissions, operator access, cost controls, load testing, dependency updates, incident readiness, status communication, bounces and complaints, email rendering, and audit-record retention.
- Added stack-specific checks for Vercel, Supabase, and Firebase.
- Added check labels, a quick-pass line, severity examples, a re-audit mode, the depth setting, the findings-file layout, fix-phase rules, an Owner actions list, and a request-details block.

### 1.0.0

- Initial release.

## review-changes

### 1.2.0 — 2026-10-03

- The recommendation now says plainly whether the change introduces defects. Pre-existing issues and suggestions are never conditions on the change.
- Every finding needs the full record at every severity, distinct defects get their own findings, and the report quotes no credentials, including test and seed accounts.

### 1.1.0 — 2026-10-03

- Added depth scaling by the size and risk of the change, with no reduction on trust boundaries.
- Grouped the website-specific checks into one conditional block and added blocks for command-line tools, libraries, mobile apps, and infrastructure as code.
- Added a section on generated and AI-assisted code: invented dependencies and APIs, hollow tests, swallowed failures, duplicated helpers.
- Added checks: field tampering, data-store and cloud access, leftovers and scope, dependency licenses, and handling of existing pull-request comments.
- Added check labels, a request-details block, and an option to save the report to a file.

### 1.0.0

- Initial release.

## modernize-old-repo

### 2.1.0 — 2026-10-03

- Every finding gets an ID and severity, including dependency, testing, and documentation problems. An item with no recommended fix is an open question.
- Added a severity example for a misleading README, a method for finding unused and misclassified dependencies, and a rule against quoting any part of a credential.

### 2.0.0 — 2026-10-03

- Changed the default to review first: the audit is presented and the user selects changes before any edit. Audit-and-fix and audit-only are available on request.
- Added a quick depth that only answers whether the project still installs, builds, and runs.
- Added rules for running an old project safely, stable `MOD-` finding IDs, and a single severity scale.
- Added checks: end-of-life runtimes and base images, lock files, packages that changed owners, dependency licenses, retired external services, upgrade order, characterization tests, and additional security items.
- Marked the frontend, backend, database, and infrastructure phases as conditional, and split the skill into references loaded when they apply.
- Rewrote the prompt in plain markdown headings.

### 1.0.0

- Initial release.
