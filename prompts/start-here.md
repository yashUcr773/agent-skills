# Start Here — reusable prompt

Version: 1.0.0

Find out what I want done, then choose and run the right skills for it, from this collection and from a curated set of external skills. This prompt routes work to other skills; it does not do the work itself. It is self-contained and agent agnostic: the interview and the plan need no installed skill, but each step of the work needs its chosen skill to be available.

## Request details

Replace the bracketed values with what you know. Where a line is left unfilled, inspect first and ask me only if the answer changes the plan.

- Target: [repository path, website URL, pull request, or files]
- Goal: [what you want done, in your own words]
- Constraints: [what must not change, and which live systems or accounts may be used]
- Installing skills: [allowed after asking / not allowed]

## 1. Interview

Read the request and inspect the target before asking, so the questions are specific, and skip any question the request, the repository, or the conversation already answers. Ask the essential questions in one round, offering choices where possible:

1. **What to do.** Offer these choices; more than one may apply:
   - Plan or clarify an idea before building
   - Build or redesign an interface
   - Polish how an interface looks and feels
   - Add, fix, or review motion and animation
   - Audit a website, all of it or chosen areas
   - Review a change, commit, branch, or pull request
   - Write or fix code with a disciplined workflow: planning, tests first, debugging, simplifying
   - Revive or modernize an old repository
   - Test security beyond reviewing code
   - Understand or visualize a codebase
   - Prepare to ship
   - Something else
2. **Target.** The repository, URL, pull request, or files. Learn the stack by inspecting it; ask only what cannot be found.
3. **How far to go.** Report only; report, then fix what I select; or fix directly. Where a chosen skill has a depth setting, offer it.
4. **Limits.** What must not change, which live systems or accounts may be used, and whether missing skills may be installed.

Then ask only the follow-ups for the tasks I chose:

| Task | Follow-up questions |
| --- | --- |
| Build or redesign an interface | A new design or a refinement of the current one; a brand, style, or DESIGN.md to follow; the framework and component library in use |
| Motion and animation | Build new motion or review what exists; the animation library in use or wanted, such as CSS, Motion, GSAP, or React Native |
| Website audit | The whole site or chosen areas; quick, standard, or deep |
| Security testing | Code review only, or active testing of a running target. Active testing needs my explicit authorization for that target and should use a non-production copy |
| Understand or visualize | For people, such as diagrams or a guided tour, or for agents, such as a queryable map of the code |
| Old repository | Assess only, or also start upgrading |

An unanswered question that would not change the plan is not worth asking.

## 2. Choose the skills

Choose from the catalog at the end of this prompt. For each task, pick the fewest skills that cover it: usually one, at most three.

- Match the project. Choose a skill tied to a framework or platform, such as GSAP, React Native, or shadcn/ui, only when the project uses it or I chose it.
- Use this collection's skills where they cover the task. External skills fill what this collection does not: interface design, motion, development workflow, active security testing, and visualization.
- When the catalog lists skills under the same need in "Overlaps", do not choose silently. Show me the options with one line on how each differs, and let me pick.
- Within this collection, use `fix-website` when several website areas are in scope and a focused `website-*` skill when one is. That is a choice of scope, not an overlap to ask about.
- Order the steps so each feeds the next: understand, plan, build or fix, review or audit, verify. For example, map an unfamiliar codebase before modernizing it, and review changes after building them.
- Treat reference libraries, such as DESIGN.md collections and component libraries, as inputs to a step, not as steps.

## 3. Propose the plan

Before running anything, show the plan:

| Step | Skill | Source | Why | Installed | Changes files |
| --- | --- | --- | --- | --- | --- |
| 1 | [name] | [this collection, or owner/repo] | [one line] | [yes / no] | [yes / no] |

Ask me to confirm, drop, swap, or reorder steps, and wait for my answer. When one installed skill covers the request, a one-line confirmation is enough.

## 4. Check and install

Check whether each chosen skill is available. It is available when it appears in the agent's list of skills, or when a folder with its name and a SKILL.md exists in the agent's project or personal skills directory, such as `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, or `~/.codex/skills/`.

For a missing skill, show the install command from the sources table, the source repository, and its license. Installing runs third-party code and adds instructions the agent will follow, so ask before every install and prefer installing the one skill over a whole collection. If I decline, offer an alternative from the catalog or drop the step. After an install, tell me if the agent must reload or restart to see the new skill.

This prompt does not vouch for external skills. Their authors maintain them, and they can change between versions.

## 5. Run the steps

- Invoke each skill by name if the agent supports skills; otherwise read its SKILL.md and follow it.
- Pass on what I already answered, such as the target, goal, mode, depth, and limits, so the skill does not ask again. Let it ask only what it still needs.
- Keep each skill's own modes and review checkpoints. When a skill pauses for my review, pause.
- Carry results forward: findings, finding IDs, specs, and plans go to the next step that needs them.
- When two steps would edit the same files, finish and verify one before starting the other.
- If a step fails or a skill is unavailable, stop and tell me, then offer to skip, replace, or retry it.

## 6. Finish

Summarize which skills ran, what each produced or changed, what was verified, and what is still open. When several skills produced findings, list them in one place without duplicates. Suggest next skills from the catalog only where the work calls for them.

## Safety

- Run active security testing, such as Strix, only with my explicit authorization for the named target, on a non-production environment, and never against systems I do not control.
- Do not make live payments, send real messages, deploy, change DNS, or change production data unless I authorize that specific action.
- Keep secrets and personal data out of plans, summaries, and findings.

## Catalog

### Sources

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

### Plan and clarify

- **brainstorming.** `obra/superpowers`. Explores intent, requirements, and design through questions before any feature or component is built.
- **interview-me.** `addyosmani/agent-skills`. Asks one question at a time until the real intent behind an underspecified request is clear.
- **spec-driven-development.** `addyosmani/agent-skills`. Writes a specification before coding when none exists.
- **writing-plans.** `obra/superpowers`. Turns a specification into a step-by-step implementation plan before code is touched.
- **planning-and-task-breakdown.** `addyosmani/agent-skills`. Breaks clear requirements into ordered, sized tasks.

### Build or redesign an interface

- **impeccable.** `pbakaus/impeccable`. Designs, redesigns, critiques, audits, and polishes frontend interfaces, with commands for each kind of change.
- **ui-ux-pro-max.** `nextlevelbuilder/ui-ux-pro-max-skill`. Design guidance for web, mobile, and desktop: styles, palettes, typography, charts, and accessibility, matched to the kind of product.
- **design-taste-frontend.** `Leonxlnx/taste-skill`. Reads the brief, infers a design direction, and avoids generic templated interfaces.
- **frontend-ui-engineering.** `addyosmani/agent-skills`. Builds production-quality, accessible, responsive interfaces and components.
- **prototype.** `emilkowalski/skills`. Builds several genuinely different versions of a piece of interface behind a live picker. Runs only when invoked by name.
- **pick-ui-library.** `emilkowalski/skills`. Picks a library for a frontend task, such as charts, command menus, or drag and drop. Runs only when invoked by name.

### Design references

- **awesome-design-md.** `VoltAgent/awesome-design-md`. DESIGN.md files describing the design systems of well-known brands, for a design skill to follow.
- **awesome-claude-design.** `VoltAgent/awesome-claude-design`. Ready-made design-system starting points in DESIGN.md format.
- **Refero Styles.** styles.refero.design. Over 2,000 design systems extracted from product websites, as DESIGN.md files over MCP.
- **Watermelon UI.** ui.watermelon.sh. Animated React components, page blocks, dashboards, and templates, with an MCP server.

### Polish the look and feel

- **make-interfaces-feel-better.** `jakubkrehel/make-interfaces-feel-better`. Design-engineering details that make an interface feel polished: hover states, shadows, borders, typography, icons, and micro-interactions.
- **emil-design-eng.** `emilkowalski/skills`. Emil Kowalski's approach to interface polish, component design, and animation decisions.
- **break-ui.** `emilkowalski/skills`. Renders an interface with worst-case data, such as long names, empty lists, huge counts, and non-Latin text, to find where it breaks.
- **mobile-native.** `emilkowalski/skills`. CSS and meta-tag fixes that make a web app feel native on a phone.

### Motion and animation

- **animate.** `emilkowalski/skills`. Builds an animation from scratch, deciding whether it should animate, which tool, which properties, and which curve and duration.
- **animate-expo.** `emilkowalski/skills`. Builds animations in React Native and Expo.
- **find-animation-opportunities.** `emilkowalski/skills`. Read-only search for places that should animate and do not, with exact values proposed.
- **improve-animations.** `emilkowalski/skills`. Read-only audit of existing motion code that produces a prioritized plan.
- **review-animations.** `emilkowalski/skills`. Strict review of animation and motion code.
- **design-motion-principles.** `kylezantos/design-motion-principles`. Builds components with purposeful motion, or audits existing animation for generic patterns.
- **gsap-skills.** `greensock/gsap-skills`. The official GSAP skills: core, React, other frameworks, ScrollTrigger, timelines, plugins, performance, and utilities. Install the ones the project needs, such as `gsap-react` or `gsap-scrolltrigger`.
- **transitions.dev.** transitions.dev. A library of interface transitions and a local agent that scores motion quality and proposes fixes.

### Website audits

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

### Review changes and code quality

- **review-changes.** This collection. Evidence-based review of uncommitted changes, a commit, a branch, or a pull request.
- **code-review-and-quality.** `addyosmani/agent-skills`. Reviews code on several axes before merging.
- **requesting-code-review.** `obra/superpowers`. Requests and runs a review when a task or feature is complete.
- **ponytail-review.** `DietrichGebert/ponytail`. Reviews a diff for over-engineering only: what to delete or replace with the standard library.
- **ponytail-audit.** `DietrichGebert/ponytail`. Audits a whole repository for over-engineering, ranked by what to delete or simplify.
- **code-simplification.** `addyosmani/agent-skills`. Simplifies working code for clarity without changing what it does.

### Write and fix code

- **test-driven-development (superpowers).** `obra/superpowers`. Writes a failing test before implementation code for every feature or fix.
- **test-driven-development (agent-skills).** `addyosmani/agent-skills`. Drives changes with a red-green-refactor loop.
- **systematic-debugging.** `obra/superpowers`. Finds the root cause of a bug or failing test before proposing a fix.
- **debugging-and-error-recovery.** `addyosmani/agent-skills`. Systematic root-cause debugging when tests fail, builds break, or behavior changes.
- **verification-before-completion.** `obra/superpowers`. Runs the verification commands and checks their output before claiming work is done.
- **ponytail.** `DietrichGebert/ponytail`. A working mode that forces the simplest solution that works.
- **finishing-a-development-branch.** `obra/superpowers`. Decides how to integrate a finished branch once its tests pass.
- **git-workflow-and-versioning.** `addyosmani/agent-skills`. Commits, branches, conflict resolution, and splitting messy work into clean commits.

### Revive an old repository

- **modernize-old-repo.** This collection. Checks whether an old project still installs, builds, and runs, then audits it before careful upgrades.
- **inherit-legacy-style.** `affaan-m/ECC`. Records a legacy project's implicit conventions as enforceable rules, so new code matches them.
- **deprecation-and-migration.** `addyosmani/agent-skills`. Removes old systems and migrates users and data without downtime.

### Security testing

- **security-audit.** `cloudflare/security-audit-skill`. A multi-phase security audit whose findings are independently verified and machine readable.
- **security-and-hardening.** `addyosmani/agent-skills`. Hardens code that handles user input, authentication, stored data, and external integrations.
- **strix.** `usestrix/strix`. Autonomous penetration testing that exploits and proves vulnerabilities in a sandbox. Its skills cover code review, web apps, APIs, CI scanning, and fixing what it finds. Needs Docker and a model API key, or its paid cloud service.

### Understand or visualize a codebase

- **codebase-onboarding.** `affaan-m/ECC`. Writes an onboarding guide for an unfamiliar codebase: architecture map, entry points, and conventions.
- **code-tour.** `affaan-m/ECC`. Creates step-by-step walkthroughs anchored to real files and lines.
- **graphify.** `Graphify-Labs/graphify`. Turns a codebase, with its docs, schemas, and configuration, into a queryable knowledge graph.
- **diagram-design.** `cathrynlavery/diagram-design`. Draws architecture, flow, sequence, data-model, and other diagrams as self-contained HTML and SVG.

### Prepare to ship

- **shipping-and-launch.** `addyosmani/agent-skills`. A pre-launch checklist, staged rollout, monitoring, and a rollback plan.

### Overlaps

Ask me to choose when the plan needs one of these and more than one option fits:

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
