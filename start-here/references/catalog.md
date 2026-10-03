# Catalog

The skills `start-here` chooses from. Entries from this collection come from `yashUcr773/agent-skills`. External entries are maintained by their authors under the license shown; the sources table gives each one's install command.

## Sources

| Source | License | Install one skill |
| --- | --- | --- |
| This collection, `yashUcr773/agent-skills` | MIT | `npx skills add yashUcr773/agent-skills --skill <name>` |
| `obra/superpowers` | MIT | Claude Code: `/plugin install superpowers@claude-plugins-official`, which installs all its skills. Other agents: `npx skills add obra/superpowers --skill <name>` |
| `addyosmani/agent-skills` | MIT | `npx skills add addyosmani/agent-skills --skill <name>` |
| `pbakaus/impeccable` | Apache-2.0 | `npx impeccable install` from the project root, then `/impeccable init` in the agent. Claude Code: `/plugin marketplace add pbakaus/impeccable` |
| `nextlevelbuilder/ui-ux-pro-max-skill` | MIT | Claude Code: `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`, then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`. Other agents: see the repository |
| `Leonxlnx/taste-skill` | MIT | `npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend` |
| `jakubkrehel/make-interfaces-feel-better` | MIT | `npx skills add jakubkrehel/make-interfaces-feel-better` |
| `emilkowalski/skills` | MIT | `npx skills add emilkowalski/skills --skill <name>` |
| `kylezantos/design-motion-principles` | MIT | `npx skills add kylezantos/design-motion-principles` |
| `greensock/gsap-skills` | MIT | `npx skills add https://github.com/greensock/gsap-skills --skill <name>`. Claude Code: `/plugin marketplace add greensock/gsap-skills` |
| `DietrichGebert/ponytail` | MIT | Claude Code: `/plugin marketplace add DietrichGebert/ponytail`, then `/plugin install ponytail@ponytail`. Other agents: `npx skills add DietrichGebert/ponytail --skill <name>` |
| `affaan-m/ECC` | MIT | `npx skills add affaan-m/ECC --skill <name>`. The full ECC setup installs a whole agent harness; install single skills unless that is wanted |
| `cloudflare/security-audit-skill` | MIT | `npx skills add https://github.com/cloudflare/security-audit-skill` |
| `usestrix/strix` | Apache-2.0 | Skills: `npx skills add usestrix/strix --skill <name>`. The Strix tool itself has its own installer script; see the repository, and review the script before running it |
| `cathrynlavery/diagram-design` | MIT | Claude Code: `/plugin marketplace add cathrynlavery/diagram-design`, then `/plugin install diagram-design@diagram-design`. Other agents: `npx skills add cathrynlavery/diagram-design` |
| `Graphify-Labs/graphify` | Apache-2.0 | `pip install graphifyy && graphify install`, or `pipx install graphifyy` where pip is externally managed |
| `VoltAgent/awesome-design-md`, `VoltAgent/awesome-claude-design` | MIT | Not skills. Copy a DESIGN.md from the repository or getdesign.md into the project |
| Refero Styles, styles.refero.design | Site terms | Not a skill. Connects to agents over MCP; see the site for setup |
| Watermelon UI, ui.watermelon.sh | MIT (`WatermelonCorp/watermelon-platform`) | Not a skill. Offers an MCP server and llms.txt; see the site for setup |
| transitions.dev | Site terms | A transition library and a local command-line agent; see the site for setup |

## Plan and clarify

- **brainstorming.** `obra/superpowers`. Explores intent, requirements, and design through questions before any feature or component is built.
- **interview-me.** `addyosmani/agent-skills`. Asks one question at a time until the real intent behind an underspecified request is clear.
- **spec-driven-development.** `addyosmani/agent-skills`. Writes a specification before coding when none exists.
- **writing-plans.** `obra/superpowers`. Turns a specification into a step-by-step implementation plan before code is touched.
- **planning-and-task-breakdown.** `addyosmani/agent-skills`. Breaks clear requirements into ordered, sized tasks.

## Build or redesign an interface

- **impeccable.** `pbakaus/impeccable`. Designs, redesigns, critiques, audits, and polishes frontend interfaces, with commands for each kind of change.
- **ui-ux-pro-max.** `nextlevelbuilder/ui-ux-pro-max-skill`. Design guidance for web, mobile, and desktop: styles, palettes, typography, charts, and accessibility, matched to the kind of product.
- **design-taste-frontend.** `Leonxlnx/taste-skill`. Reads the brief, infers a design direction, and avoids generic templated interfaces.
- **frontend-ui-engineering.** `addyosmani/agent-skills`. Builds production-quality, accessible, responsive interfaces and components.
- **prototype.** `emilkowalski/skills`. Builds several genuinely different versions of a piece of interface behind a live picker. Runs only when invoked by name.
- **pick-ui-library.** `emilkowalski/skills`. Picks a library for a frontend task, such as charts, command menus, or drag and drop. Runs only when invoked by name.

## Design references

- **awesome-design-md.** `VoltAgent/awesome-design-md`. DESIGN.md files describing the design systems of well-known brands, for a design skill to follow.
- **awesome-claude-design.** `VoltAgent/awesome-claude-design`. Ready-made design-system starting points in DESIGN.md format.
- **Refero Styles.** styles.refero.design. Over 2,000 design systems extracted from product websites, as DESIGN.md files over MCP.
- **Watermelon UI.** ui.watermelon.sh. Animated React components, page blocks, dashboards, and templates, with an MCP server.

## Polish the look and feel

- **make-interfaces-feel-better.** `jakubkrehel/make-interfaces-feel-better`. Design-engineering details that make an interface feel polished: hover states, shadows, borders, typography, icons, and micro-interactions.
- **emil-design-eng.** `emilkowalski/skills`. Emil Kowalski's approach to interface polish, component design, and animation decisions.
- **break-ui.** `emilkowalski/skills`. Renders an interface with worst-case data, such as long names, empty lists, huge counts, and non-Latin text, to find where it breaks.
- **mobile-native.** `emilkowalski/skills`. CSS and meta-tag fixes that make a web app feel native on a phone.

## Motion and animation

- **animate.** `emilkowalski/skills`. Builds an animation from scratch, deciding whether it should animate, which tool, which properties, and which curve and duration.
- **animate-expo.** `emilkowalski/skills`. Builds animations in React Native and Expo.
- **find-animation-opportunities.** `emilkowalski/skills`. Read-only search for places that should animate and do not, with exact values proposed.
- **improve-animations.** `emilkowalski/skills`. Read-only audit of existing motion code that produces a prioritized plan.
- **review-animations.** `emilkowalski/skills`. Strict review of animation and motion code.
- **design-motion-principles.** `kylezantos/design-motion-principles`. Builds components with purposeful motion, or audits existing animation for generic patterns.
- **gsap-skills.** `greensock/gsap-skills`. The official GSAP skills: core, React, other frameworks, ScrollTrigger, timelines, plugins, performance, and utilities. Install the ones the project needs, such as `gsap-react` or `gsap-scrolltrigger`.
- **transitions.dev.** transitions.dev. A library of interface transitions and a local agent that scores motion quality and proposes fixes.

## Website audits

- **fix-website.** This collection. Whole-site audit and improvement across all website areas, with review before fixes.
- **website-ui-accessibility.** This collection. Layout, responsive behavior, accessibility, and browser compatibility.
- **website-interactions.** This collection. Navigation, buttons, forms, loading and error states, search, and client state.
- **website-content-branding.** This collection. Copy, factual claims, calls to action, branding, footer, and contact details.
- **website-seo-discoverability.** This collection. Indexing, metadata, sitemaps, structured data, sharing previews, and crawler policy.
- **website-performance.** This collection. Loading, interaction speed, media, caching, and measured performance targets.
- **website-backend-reliability.** This collection. APIs, data access, concurrency, failures, and regression tests.
- **website-security-auth.** This collection. Authentication, authorization, data exposure, secrets, and dependencies.
- **website-commerce.** This collection. Checkout, prices, orders, inventory, promotions, and payment webhooks.
- **website-privacy-analytics.** This collection. Tracking, consent, data minimization, and policy accuracy.
- **website-operations.** This collection. Environments, deployment, backups, monitoring, and email delivery.
- **performance-optimization.** `addyosmani/agent-skills`. Frontend, backend, and database performance, including Core Web Vitals and query patterns.
- **browser-testing-with-devtools.** `addyosmani/agent-skills`. Tests in a real browser through Chrome DevTools: DOM, console errors, network requests, and performance.

## Review changes and code quality

- **review-changes.** This collection. Evidence-based review of uncommitted changes, a commit, a branch, or a pull request.
- **code-review-and-quality.** `addyosmani/agent-skills`. Reviews code on several axes before merging.
- **requesting-code-review.** `obra/superpowers`. Requests and runs a review when a task or feature is complete.
- **ponytail-review.** `DietrichGebert/ponytail`. Reviews a diff for over-engineering only: what to delete or replace with the standard library.
- **ponytail-audit.** `DietrichGebert/ponytail`. Audits a whole repository for over-engineering, ranked by what to delete or simplify.
- **code-simplification.** `addyosmani/agent-skills`. Simplifies working code for clarity without changing what it does.

## Write and fix code

- **test-driven-development (superpowers).** `obra/superpowers`. Writes a failing test before implementation code for every feature or fix.
- **test-driven-development (agent-skills).** `addyosmani/agent-skills`. Drives changes with a red-green-refactor loop.
- **systematic-debugging.** `obra/superpowers`. Finds the root cause of a bug or failing test before proposing a fix.
- **debugging-and-error-recovery.** `addyosmani/agent-skills`. Systematic root-cause debugging when tests fail, builds break, or behavior changes.
- **verification-before-completion.** `obra/superpowers`. Runs the verification commands and checks their output before claiming work is done.
- **ponytail.** `DietrichGebert/ponytail`. A working mode that forces the simplest solution that works.
- **finishing-a-development-branch.** `obra/superpowers`. Decides how to integrate a finished branch once its tests pass.
- **git-workflow-and-versioning.** `addyosmani/agent-skills`. Commits, branches, conflict resolution, and splitting messy work into clean commits.

## Revive an old repository

- **modernize-old-repo.** This collection. Checks whether an old project still installs, builds, and runs, then audits it before careful upgrades.
- **inherit-legacy-style.** `affaan-m/ECC`. Records a legacy project's implicit conventions as enforceable rules, so new code matches them.
- **deprecation-and-migration.** `addyosmani/agent-skills`. Removes old systems and migrates users and data without downtime.

## Security testing

- **security-audit.** `cloudflare/security-audit-skill`. A multi-phase security audit whose findings are independently verified and machine readable.
- **security-and-hardening.** `addyosmani/agent-skills`. Hardens code that handles user input, authentication, stored data, and external integrations.
- **strix.** `usestrix/strix`. Autonomous penetration testing that exploits and proves vulnerabilities in a sandbox. Its skills cover code review, web apps, APIs, CI scanning, and fixing what it finds. Needs Docker and a model API key, or its paid cloud service.

## Understand or visualize a codebase

- **codebase-onboarding.** `affaan-m/ECC`. Writes an onboarding guide for an unfamiliar codebase: architecture map, entry points, and conventions.
- **code-tour.** `affaan-m/ECC`. Creates step-by-step walkthroughs anchored to real files and lines.
- **graphify.** `Graphify-Labs/graphify`. Turns a codebase, with its docs, schemas, and configuration, into a queryable knowledge graph.
- **diagram-design.** `cathrynlavery/diagram-design`. Draws architecture, flow, sequence, data-model, and other diagrams as self-contained HTML and SVG.

## Prepare to ship

- **shipping-and-launch.** `addyosmani/agent-skills`. A pre-launch checklist, staged rollout, monitoring, and a rollback plan.

## Overlaps

Ask the user to choose when the plan needs one of these and more than one option fits:

| Need | Options |
| --- | --- |
| Clarify before building | brainstorming, interview-me, spec-driven-development |
| Implementation plan | writing-plans, planning-and-task-breakdown |
| Design direction | impeccable, ui-ux-pro-max, design-taste-frontend |
| Build interface code | frontend-ui-engineering, impeccable |
| Audit interface quality | website-ui-accessibility, impeccable, make-interfaces-feel-better |
| Audit motion | improve-animations, review-animations, design-motion-principles, transitions.dev |
| Website performance | website-performance, performance-optimization |
| Security code review | website-security-auth, security-audit, security-and-hardening |
| Review a change | review-changes, code-review-and-quality, requesting-code-review, ponytail-review |
| Tests first | test-driven-development (superpowers), test-driven-development (agent-skills) |
| Debugging | systematic-debugging, debugging-and-error-recovery |
| Simplify code | ponytail-audit, code-simplification |
| Finish a branch | finishing-a-development-branch, git-workflow-and-versioning |
| Explain a codebase | codebase-onboarding, code-tour, graphify, diagram-design |
