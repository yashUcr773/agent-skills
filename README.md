# Agent Skills

Reusable, framework-agnostic and agent-agnostic workflows for maintaining repositories and improving websites. This repository contains **14 independently installable skills**, each with a matching standalone prompt.

## Which skill should I use?

- Use **`modernize-old-repo`** when reviving an old or neglected repository: setup, dependencies, architecture, maintenance, and project health are the starting point. It also applies to projects that are not websites.
- Use **`improve-website`** when assessing a whole website, preparing for launch, or investigating problems across several areas. It coordinates one combined audit and review.
- Use **`fix-website`** when you want the original unabridged general website checklist in one standalone installable skill.
- Use a **focused `website-*` skill** when you already know the problem area and want a narrower audit or fix.
- Use **`review-changes`** when reviewing uncommitted changes, staged changes, a commit, a branch, or a PR for regressions across security, accessibility, performance, correctness, and other affected areas.

### Skill catalog

| Installable skill | When to use it | Standalone prompt |
| --- | --- | --- |
| [modernize-old-repo](modernize-old-repo/SKILL.md) | A stale repository may no longer install, run, or build; dependencies, code, tests, and documentation need a maintenance audit before incremental improvements. | [Prompt](prompts/modernize-old-repo.md) |
| [improve-website](improve-website/SKILL.md) | You need a whole-site assessment, a prioritized improvement plan, or final pre-launch checks spanning multiple domains. | [Prompt](prompts/improve-website.md) |
| [fix-website](fix-website/SKILL.md) | You want a broad website audit using the original complete checklist in one installable skill. | [Prompt](prompts/fix-website.md) |
| [website-ui-accessibility](website-ui-accessibility/SKILL.md) | Pages overflow or overlap, mobile layouts break, styling is inconsistent, or keyboard, screen-reader, zoom, and browser behavior need review. | [Prompt](prompts/website-ui-accessibility.md) |
| [website-interactions](website-interactions/SKILL.md) | Links, menus, buttons, forms, deep links, or search fail; loading/error feedback is missing; client state becomes stale or inconsistent. | [Prompt](prompts/website-interactions.md) |
| [website-content-branding](website-content-branding/SKILL.md) | The site contains placeholder or unsupported copy, inconsistent branding, missing icons, unclear CTAs, or incorrect footer/contact details. | [Prompt](prompts/website-content-branding.md) |
| [website-seo-discoverability](website-seo-discoverability/SKILL.md) | Intended public pages are hard to discover, metadata or sharing previews are wrong, or indexing, canonicals, sitemaps, structured data, and AI crawler policy need review. | [Prompt](prompts/website-seo-discoverability.md) |
| [website-performance](website-performance/SKILL.md) | Pages load slowly, interactions lag, layout shifts occur, assets are oversized, or existing/requested PWA behavior needs investigation using measurements. | [Prompt](prompts/website-performance.md) |
| [website-backend-reliability](website-backend-reliability/SKILL.md) | APIs or queries are slow/unreliable, concurrent writes race, errors are inconsistent, or code quality and critical regression coverage need improvement. | [Prompt](prompts/website-backend-reliability.md) |
| [website-security-auth](website-security-auth/SKILL.md) | Accounts, sessions, access controls, uploads, exposed secrets, vulnerable dependencies, or accidentally shipped prototype/debug behavior need a security review. | [Prompt](prompts/website-security-auth.md) |
| [website-commerce](website-commerce/SKILL.md) | Checkout, prices, orders, inventory, subscriptions, refunds, or payment webhooks need validation in a safe test environment. | [Prompt](prompts/website-commerce.md) |
| [website-privacy-analytics](website-privacy-analytics/SKILL.md) | Tracking events are missing/duplicated, consent choices do not control trackers, sensitive data reaches analytics, or policies do not match actual practices. | [Prompt](prompts/website-privacy-analytics.md) |
| [website-operations](website-operations/SKILL.md) | Deployment, environment configuration, backups, recovery, monitoring, DNS/TLS, contact delivery, or transactional email needs operational review. | [Prompt](prompts/website-operations.md) |
| [review-changes](review-changes/SKILL.md) | You need an evidence-based review of current/staged changes, a commit, a branch, or a PR before fixing or merging it. | [Prompt](prompts/review-changes.md) |

### Common website feature checks

These features are covered where relevant. Existing controls are checked for defects; missing optional features are evaluated against the site's needs and the selected review mode. The checklists do not require every site to add every feature.

| Features | Primary skill and matching prompt |
| --- | --- |
| Dark mode toggle, custom scrollbar styling, print stylesheet, sticky headers, skip-to-content link | [website-ui-accessibility](website-ui-accessibility/SKILL.md) · [Prompt](prompts/website-ui-accessibility.md) |
| Site search, back-to-top button, mobile menu, loading animations, hover states, copy buttons, password visibility toggle, form success/error states, confirmation modals, expandable FAQs | [website-interactions](website-interactions/SKILL.md) · [Prompt](prompts/website-interactions.md) |
| Truthful last updated date, verified FAQ answers, visible and accurate contact information | [website-content-branding](website-content-branding/SKILL.md) · [Prompt](prompts/website-content-branding.md) |
| Simple cookie banner with functional consent choices when applicable | [website-privacy-analytics](website-privacy-analytics/SKILL.md) · [Prompt](prompts/website-privacy-analytics.md) |

The master includes these checks, and [Review Changes](prompts/review-changes.md) examines them when affected by a change. Related performance, security, and SEO checklists cover animation cost, password exposure, and accurate modification dates.

### Change-review skill

[review-changes](review-changes/SKILL.md) provides a comprehensive review of a specific change set. It establishes the comparison baseline, traces effects beyond the diff, and reports prioritized findings with evidence, locations, proposed corrections, and verification gaps. It distinguishes introduced regressions from pre-existing issues and covers security, privacy, accessibility, UI/browser behavior, performance, APIs/data integrity, integrations, SEO, operations, tests, and maintainability where applicable.

The skill defaults to review only. Fixes follow your selected findings, or an explicit request to review and fix. Its matching prompt can still be copied directly into an agent without installation.

### Master versus focused skills

Install `improve-website` by itself for the full website workflow. All ten domain checklists are bundled inside its folder, so it works without the focused skills. Install any focused skill independently for narrower work. Installing the master does not install the specialists; installing a specialist does not require the master.

Choose by the problem you want investigated. For example, an inaccessible menu belongs to `website-ui-accessibility`, a menu linking to the wrong route to `website-interactions`, and an admin route accessible without authorization to `website-security-auth`. Use the master when these concerns overlap substantially. No skill requires multiple-agent execution.

## Install a skill

### With `npx skills`

List the available skills:

```bash
npx skills add yashUcr773/agent-skills --list
```

Choose the command for the skill you want; you do not need to run all three:

```bash
npx skills add yashUcr773/agent-skills --skill improve-website
npx skills add yashUcr773/agent-skills --skill fix-website
npx skills add yashUcr773/agent-skills --skill review-changes
npx skills add yashUcr773/agent-skills --skill website-ui-accessibility
npx skills add yashUcr773/agent-skills --skill modernize-old-repo
```

Replace the name after `--skill` with any name in the catalog. Select your agent and installation scope through the installer. For example, this installs the master globally for Codex:

```bash
npx skills add yashUcr773/agent-skills --skill improve-website --agent codex --global --yes
```

You can also install from a skill's GitHub folder URL:

```bash
npx skills add https://github.com/yashUcr773/agent-skills/tree/main/improve-website
```

GitHub installation uses the published repository contents. For unpublished local changes, copy the local skill folder using the manual method below.

### With the Codex installer helper

If your environment provides `install-skill-from-github.py`, point it at the selected folder:

```bash
install-skill-from-github.py --repo yashUcr773/agent-skills --path improve-website
```

Or ask your agent to install it using its supported installation workflow:

```text
Install the improve-website skill from https://github.com/yashUcr773/agent-skills/tree/main/improve-website
```

### Manual installation

Copy the selected skill's entire folder, including any `references/` directory, into your agent's supported skills directory. For example, using the default personal Codex skills location:

```bash
git clone https://github.com/yashUcr773/agent-skills.git
mkdir -p ~/.codex/skills
cp -R agent-skills/improve-website ~/.codex/skills/
```

If you already have a local checkout, use that folder instead of cloning again. Adjust the destination for your agent or configured skills directory, and restart or refresh skill discovery as your agent requires. The standalone prompts and maintenance generator are not needed inside an installed skill folder.

## How to use a skill

1. Open the target repository in your agent, or provide the website URL for an observable audit. Source access is needed to implement code fixes.
2. Select the installed skill using your agent's skill picker/invocation mechanism, or explicitly name it in your request.
3. Describe the outcome, affected pages or journeys, known problems, and constraints. Include the local run instructions or safe test environment when available.
4. For website skills, choose a mode below. If you do not specify one, the agent audits and waits for your review before editing.

Use this request template with any website skill, replacing the bracketed values:

```text
Use [skill-name] for [repository or website URL].
Goal: [what should improve].
Scope: [pages, components, or journeys].
Mode: [review first / audit only / audit and fix].
Constraints: [behavior, design, or integrations to preserve].
Ask about consequential missing information instead of assuming.
```

Supply what you know. The agent should inspect the project and ask targeted questions where missing information affects the result. You do not need to choose a framework, test runner, or hosting provider just to use a skill.

### Website operating modes

| Mode | What happens | Use when |
| --- | --- | --- |
| **Review first — default** | Audit → findings and proposed changes → your review → selected fixes → verification. | You want to choose priorities, correct assumptions, or approve the proposed implementation scope before edits. |
| **Audit only** | Inspect and report findings; stop without implementing changes. | You need an assessment, second opinion, or improvement backlog. |
| **Audit and fix — explicit** | Audit → fix unambiguous issues within scope → verify and report, without an intermediate review. | You already know the scope and want the agent to act on demonstrated defects. |

All three modes ask about unresolved business or product decisions. Review-first fixes follow your selected finding IDs, corrections, and deferrals. Audit-and-fix does not authorize unrelated redesigns, deployment, real messages, payments, or production data operations.

These modes describe the website skills. `modernize-old-repo` has its own repository-wide audit-first workflow; state any additional review checkpoint in your request.

### Example: assess a whole website before launch

```text
Use improve-website to audit this repository and its local website before launch.
Prioritize mobile usability, the signup journey, and accidental production leftovers.
Present findings and proposed changes for my review before editing.
Ask questions where the intended behavior or business information is unclear.
```

### Example: review a focused problem, then select fixes

Start with:

```text
Use website-interactions to audit the contact form and its submission feedback.
Use test data. Show me the findings and proposed changes before editing.
```

After reviewing the actual finding IDs, respond with your choices. For example:

```text
Fix UX-001 and UX-003. Defer UX-002.
For UX-003, keep entered values after an error and show the error inline.
Verify successful and failed submissions using the existing test setup.
```

### Example: audit and fix a known area

```text
Use website-ui-accessibility in audit-and-fix mode for the homepage and pricing page.
Fix demonstrated mobile overflow, clipped text, and keyboard-focus problems.
Preserve the existing visual identity and verify the affected viewports and controls.
Ask before changing intended product behavior.
```

### Example: audit without implementation

```text
Use website-security-auth in audit-only mode for login, password reset, and admin routes.
Inspect the source and existing local tests. Do not probe the production site.
Report evidence, severity, proposed fixes, and anything you could not verify.
```

### Example: revive an old repository

```text
Use modernize-old-repo to assess this project after a long period of inactivity.
Determine whether it installs, builds, runs, and passes its existing checks.
Review the findings with me before implementing changes.
Preserve its purpose and avoid unnecessary major upgrades or rewrites.
```

### Examples: review current changes, the last commit, or a PR

After supplying the [Review Changes prompt](prompts/review-changes.md), choose a target. For current changes:

```text
Review the current uncommitted changes, including staged, unstaged, and relevant untracked files.
Check every applicable review dimension, especially security, accessibility, and performance.
Report evidence-backed findings and verification gaps. Do not edit files.
```

For the last commit:

```text
Review the last commit against its parent, excluding my uncommitted changes.
Trace affected callers and user journeys, and distinguish new regressions from pre-existing issues.
Ask if the intended baseline or behavior is ambiguous.
```

For a PR, replace the bracketed target:

```text
Review PR [URL or repository and PR number] in full against its intended base.
Record the base/head revisions and review all applicable areas, not only the latest commit.
Report findings here. Do not post comments, submit a PR review, or change code.
```

You can also request staged-only review, a specific commit/range, or a branch comparison. If you want implementation immediately, explicitly request review and fix within a defined scope; unresolved product decisions still require questions.

### Use a standalone prompt without installation

Open the **Prompt** link beside the skill in the catalog, copy the complete contents into your agent, and add your target repository or URL, goal, scope, and constraints. Website prompts also support the modes above. The master prompt contains all ten domain checklists, so it is longer than a focused prompt.

Each prompt is self-contained. Installation adds discoverable skill packaging; copying the prompt gives you the workflow directly without installing a skill.

### What to expect from a website audit

The agent should provide prioritized findings with stable IDs, affected locations, evidence, proposed changes, and pass criteria. It should separate confirmed defects from optional improvements, open questions, and checks it could not perform. After implementation, it should report what changed, what was verified, and what remains unresolved or deferred.

## Maintaining website workflows

The original [todo checklist](prompts/fix-website.md) and [change-review prompt](prompts/review-changes.md) are preserved. The maintained sources are [the master skill](improve-website/SKILL.md), [the shared workflow](improve-website/references/workflow.md), and the ten domain checklists linked from the master. [The generator](scripts/build_website_assets.py) holds the focused skill names and creates the self-contained `fix-website` and `review-changes` skill copies.

Edit these sources, then regenerate the self-contained focused skill/prompt copies and the `fix-website`/`review-changes` skills. Generated copies intentionally repeat the workflow and checklist text so each installation or pasted prompt works on its own. Do not edit generated copies directly.

```bash
python3 scripts/build_website_assets.py --write
python3 scripts/build_website_assets.py --check
```

The generator uses only Python's standard library. `--check` is read-only and exits unsuccessfully if an output is missing or stale. `--skill <name>` limits either operation to one workflow. It never edits the original todo file or the existing modernization skill/prompt. Skill structure validation is a separate check; generated-file consistency does not establish that an audit was actually performed on a website.

### Original checklist coverage

The website workflows group all 32 areas from the source checklist by similarity:

| Workflow | Original sections |
| --- | --- |
| `improve-website` | Coordinates all areas; final checks in 32 |
| `website-ui-accessibility` | 1, 12, 13, 19 |
| `website-interactions` | 2, 3, 4, 5, 20, 27, 28 |
| `website-content-branding` | 6, 7, 9 |
| `website-seo-discoverability` | 10, 11 |
| `website-performance` | 8, 14, 26 |
| `website-backend-reliability` | 15, 29, 30 |
| `website-security-auth` | 16, 17, 31 |
| `website-commerce` | 18 |
| `website-privacy-analytics` | 21, 22 |
| `website-operations` | 23, 24, 25 |
