# Agent Skills

Reusable, framework-agnostic and agent-agnostic workflows for maintaining repositories and improving websites. This repository contains **13 independently installable skills**, each written from a standalone prompt that can also be pasted into any agent.

## Which skill should I use?

- Use **`fix-website`** when assessing a whole website, preparing for launch, running a quick whole-site scan, or investigating problems across several areas. It coordinates one combined audit and review.
- Use a **focused `website-*` skill** when you already know the problem area and want a narrower audit or fix.
- Use **`review-changes`** when reviewing uncommitted changes, staged changes, a commit, a branch, or a PR for regressions across security, accessibility, performance, correctness, and other affected areas.
- Use **`modernize-old-repo`** when reviving an old or neglected repository: setup, dependencies, architecture, maintenance, and project health are the starting point. It also applies to projects that are not websites.

### Skill catalog

| Installable skill | When to use it | Standalone prompt |
| --- | --- | --- |
| [fix-website](fix-website/SKILL.md) | You need a whole-site assessment, a prioritized improvement plan, a quick scan, a re-audit of saved findings, or final pre-launch checks spanning multiple areas. | [Light](prompts/fix-website.md) · [Full](prompts/fix-website-full.md) |
| [website-ui-accessibility](website-ui-accessibility/SKILL.md) | Pages overflow or overlap, mobile or right-to-left layouts break, styling is inconsistent, or keyboard, screen-reader, zoom, focus, and browser behavior need review. | [Prompt](prompts/website-ui-accessibility.md) |
| [website-interactions](website-interactions/SKILL.md) | Links, menus, buttons, forms, multi-step flows, deep links, or search fail; loading/error feedback is missing; client state becomes stale or inconsistent. | [Prompt](prompts/website-interactions.md) |
| [website-content-branding](website-content-branding/SKILL.md) | The site contains placeholder or unsupported copy, unclear CTAs or pricing, incomplete translations, unlicensed assets, inconsistent branding, or incorrect footer/contact details. | [Prompt](prompts/website-content-branding.md) |
| [website-seo-discoverability](website-seo-discoverability/SKILL.md) | Intended public pages are hard to discover, metadata or sharing previews are wrong, or indexing, canonicals, redirects, 404s, sitemaps, structured data, migrations, and crawler policy need review. | [Prompt](prompts/website-seo-discoverability.md) |
| [website-performance](website-performance/SKILL.md) | Pages load slowly or miss a load-time target, interactions lag, layout shifts occur, assets are oversized, or existing/requested PWA behavior needs investigation using measurements. | [Prompt](prompts/website-performance.md) |
| [website-backend-reliability](website-backend-reliability/SKILL.md) | APIs or queries are slow/unreliable, concurrent writes race, background jobs or upstream APIs fail, errors are inconsistent, or code quality and regression coverage need improvement. | [Prompt](prompts/website-backend-reliability.md) |
| [website-security-auth](website-security-auth/SKILL.md) | Accounts, sessions, access controls, user isolation, uploads, exposed secrets, database or storage permissions, AI features, vulnerable dependencies, or shipped prototype/debug behavior need a security review. | [Prompt](prompts/website-security-auth.md) |
| [website-commerce](website-commerce/SKILL.md) | Checkout, prices, card handling, orders, inventory, promotions, subscriptions, refunds, disputes, or payment webhooks need validation in a safe test environment. | [Prompt](prompts/website-commerce.md) |
| [website-privacy-analytics](website-privacy-analytics/SKILL.md) | Tracking events are missing/duplicated, consent choices do not control trackers or embeds, sensitive data reaches analytics or session replay, or policies and account controls do not match actual practices. | [Prompt](prompts/website-privacy-analytics.md) |
| [website-operations](website-operations/SKILL.md) | Deployment, environment configuration, CI/CD and operator access, cost controls, backups, recovery, monitoring, DNS/TLS, contact delivery, or transactional email needs operational review. | [Prompt](prompts/website-operations.md) |
| [review-changes](review-changes/SKILL.md) | You need an evidence-based review of current/staged changes, a commit, a branch, or a PR before fixing or merging it. | [Prompt](prompts/review-changes.md) |
| [modernize-old-repo](modernize-old-repo/SKILL.md) | A stale repository may no longer install, run, or build; dependencies, code, tests, and documentation need a maintenance audit before incremental improvements. | [Prompt](prompts/modernize-old-repo.md) |

Versions and what changed in each are in the [changelog](CHANGELOG.md).

### Common website feature checks

These features are covered where relevant. Existing controls are checked for defects; missing optional features are evaluated against the site's needs and the selected review mode. The checklists do not require every site to add every feature.

| Features | Primary skill and matching prompt |
| --- | --- |
| Dark mode toggle, custom scrollbar styling, print stylesheet, sticky headers, skip-to-content link | [website-ui-accessibility](website-ui-accessibility/SKILL.md) · [Prompt](prompts/website-ui-accessibility.md) |
| Site search, back-to-top button, mobile menu, loading animations, hover states, copy buttons, password visibility toggle, form success/error states, confirmation modals, expandable FAQs | [website-interactions](website-interactions/SKILL.md) · [Prompt](prompts/website-interactions.md) |
| Truthful last updated date, verified FAQ answers, visible and accurate contact information | [website-content-branding](website-content-branding/SKILL.md) · [Prompt](prompts/website-content-branding.md) |
| Simple cookie banner with functional consent choices when applicable | [website-privacy-analytics](website-privacy-analytics/SKILL.md) · [Prompt](prompts/website-privacy-analytics.md) |

`fix-website` includes these checks, and [Review Changes](prompts/review-changes.md) examines them when a change touches them.

### Stack-specific checks

Six checklists end with checks for a particular stack or provider. They apply only when the site uses it, and in the skills they are a separate reference that is read only then.

| Stack or provider | Checklists |
| --- | --- |
| Next.js and Vercel | Security, performance, SEO, operations |
| Supabase | Security, backend, operations |
| Firebase | Security, backend, operations |
| Clerk, Auth.js (NextAuth), Auth0, Better Auth | Security |
| Stripe | Commerce |

### Whole-site versus focused skills

Install `fix-website` by itself for the full website workflow. All ten domain checklists are bundled inside its folder, so it works without the focused skills. Install any focused skill independently for narrower work. Installing `fix-website` does not install the focused skills, and a focused skill does not require `fix-website`.

Choose by the problem you want investigated. For example, an inaccessible menu belongs to `website-ui-accessibility`, a menu linking to the wrong route to `website-interactions`, and an admin route accessible without authorization to `website-security-auth`. Use `fix-website` when these concerns overlap substantially. No skill requires multiple-agent execution.

## Install a skill

### With `npx skills`

List the available skills:

```bash
npx skills add yashUcr773/agent-skills --list
```

Choose the command for the skill you want; you do not need to run all of them:

```bash
npx skills add yashUcr773/agent-skills --skill fix-website
npx skills add yashUcr773/agent-skills --skill review-changes
npx skills add yashUcr773/agent-skills --skill website-ui-accessibility
npx skills add yashUcr773/agent-skills --skill modernize-old-repo
```

Replace the name after `--skill` with any name in the catalog. Select your agent and installation scope through the installer. For example, this installs `fix-website` globally for Codex:

```bash
npx skills add yashUcr773/agent-skills --skill fix-website --agent codex --global --yes
```

You can also install from a skill's GitHub folder URL:

```bash
npx skills add https://github.com/yashUcr773/agent-skills/tree/master/fix-website
```

GitHub installation uses the published repository contents. For unpublished local changes, copy the local skill folder using the manual method below.

### With the Codex installer helper

If your environment provides `install-skill-from-github.py`, point it at the selected folder:

```bash
install-skill-from-github.py --repo yashUcr773/agent-skills --path fix-website
```

Or ask your agent to install it using its supported installation workflow:

```text
Install the fix-website skill from https://github.com/yashUcr773/agent-skills/tree/master/fix-website
```

### Manual installation

Copy the selected skill's entire folder, including any `references/` directory, into your agent's supported skills directory. For example, using the default personal Codex skills location:

```bash
git clone https://github.com/yashUcr773/agent-skills.git
mkdir -p ~/.codex/skills
cp -R agent-skills/fix-website ~/.codex/skills/
```

If you already have a local checkout, use that folder instead of cloning again. Adjust the destination for your agent or configured skills directory, and restart or refresh skill discovery as your agent requires. The prompts, linter, maintenance prompt, and benchmark are not needed inside an installed skill folder.

## How to use a skill

1. Open the target repository in your agent, or provide the website URL for an observable audit. Source access is needed to implement code fixes.
2. Select the installed skill using your agent's skill picker/invocation mechanism, or explicitly name it in your request.
3. Describe the outcome, affected pages or journeys, known problems, and constraints. Include the local run instructions or safe test environment when available.
4. For website skills, choose a mode and depth below. If you do not specify them, the agent runs a standard audit and waits for your review before editing.

Use this request template with any website skill, replacing the bracketed values:

```text
Use [skill-name] for [repository or website URL].
Goal: [what should improve].
Scope: [pages, components, or journeys].
Mode: [review first / audit only / audit and fix / re-audit].
Depth: [quick / standard / deep].
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
| **Re-audit** | Re-check each finding in a saved findings file and mark it fixed, still open, regressed, or not verified. | An earlier audit was saved and you want to know what changed without repeating it. |

All modes ask about unresolved business or product decisions. Review-first fixes follow your selected finding IDs, corrections, and deferrals. Audit-and-fix does not authorize unrelated redesigns, deployment, real messages, payments, or production data operations.

### Depth

Depth is separate from mode.

| Depth | What it covers |
| --- | --- |
| **Quick** | A time-boxed pass over critical journeys and the checks named on each checklist's quick-pass line. Reported as a partial audit. |
| **Standard — default** | The selected checklists across the agreed scope, sampling large sites. |
| **Deep** | Every in-scope route and state, repeated measurements, and adversarial testing where it applies. |

### Findings file

Finding IDs stay stable across the engagement. When the work will continue in a later session, ask the agent to save the findings. It writes `website-audit-findings.md` in a fixed layout: a header with target, date, mode, depth, and scope; one summary table; and a short section per finding with evidence, pass criteria, and verification. A later session reads that file, keeps the IDs and your decisions, and continues from there. Re-audit mode works from this file.

### Other skills

`modernize-old-repo` uses the review-first, audit-and-fix, and audit-only modes with its own repository-wide phases, and adds rules for running an old project safely. Its quick depth answers only "does it still install, build, and run, and what stops it?". `review-changes` defaults to review only and scales its depth to the size and risk of the change.

### Example: assess a whole website before launch

```text
Use fix-website to audit this repository and its local website before launch.
Prioritize mobile usability, the signup journey, and accidental production leftovers.
Present findings and proposed changes for my review before editing.
Ask questions where the intended behavior or business information is unclear.
```

### Example: quick scan, then re-audit later

```text
Use fix-website at quick depth on this repository. Audit only.
Save the findings to website-audit-findings.md in the repository root.
```

After fixing some of them yourself:

```text
Use fix-website in re-audit mode with website-audit-findings.md.
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

After supplying the [Review Changes prompt](prompts/review-changes.md) or selecting the skill, choose a target. For current changes:

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

Open the **Prompt** link beside the skill in the catalog, copy the complete contents into your agent, and fill in the **Request details** block near the top. Website prompts support the modes and depths above.

`fix-website` has two prompts. The [light prompt](prompts/fix-website.md) carries the workflow, the routing table, and the quick-pass checks for each area, at about a quarter of the length. The [full prompt](prompts/fix-website-full.md) carries every checklist in one paste.

Each prompt is self-contained. Installation adds discoverable skill packaging; copying the prompt gives you the workflow directly without installing a skill.

### What to expect from a website audit

The agent should provide prioritized findings with stable IDs, affected locations, evidence, proposed changes, and pass criteria. It should separate confirmed defects from optional improvements, open questions, and checks it could not perform. After implementation, it should report what changed, what was verified, and what remains unresolved or deferred. Every report ends with an **Owner actions** list: the things only you can do or confirm, such as DNS changes, credential rotation, legal sign-off, and switching payments to live mode.

## Benchmark websites

[benchmark/](benchmark/README.md) contains two deliberately flawed sites for testing the skills:

- a React, Express, and SQLite shop with defects planted in every area the skills cover, stale project details for `modernize-old-repo`, a bad change and a correct change for `review-changes`, and a re-audit fixture;
- a Next.js app on Supabase and Firebase, run against local Docker services, for the stack-specific checks.

An answer key lists each planted defect, a set of decoys that look wrong but are not, and the questions a good audit should ask. A scoring prompt compares a report with the key, and a results log records runs. No runs have been recorded yet. Both sites are insecure on purpose: run them only locally and never deploy them.

## Maintaining the skills

The prompts in `prompts/` are the source of truth. Each skill is written from its prompt by an AI agent that reads the prompt and packages the same instructions as a skill; no script generates skills.

1. Edit the prompt, raise its `Version:` line, and add an entry under that skill in [CHANGELOG.md](CHANGELOG.md).
2. Give an agent the [maintenance prompt](maintenance/update-skill-from-prompt.md) and name the skill. It reads the prompt, updates the skill folder, and records the prompt's version and a short hash of the prompt in the skill's `metadata`.
3. Run the linter until it reports no problems.

```bash
python3 scripts/lint.py                   # everything
python3 scripts/lint.py website-commerce  # one skill
python3 scripts/lint.py --hash website-commerce  # the hash to record in that skill
```

[The linter](scripts/lint.py) uses only Python's standard library and changes nothing. It reports:

- a prompt that changed after its skill was last updated, and a prompt that changed without its version being raised;
- a skill whose version differs from its prompt, or a version with no changelog entry;
- a check in a prompt that is missing or reworded in its skill, and a check in a skill that is not in its prompt;
- a website skill whose workflow or checklist text differs from its prompt, and copies of the shared workflow that differ between prompts;
- a focused checklist that differs from its copy in `fix-website-full.md`, quick-pass checks in `fix-website.md` that are out of step, and a [short checklist](fix-website/references/short-checklist.md) that does not list exactly the check labels;
- checks without a label, descriptions that are not valid YAML or are too long, broken links, and British spellings.

A clean lint is necessary, not sufficient. For `review-changes` and `modernize-old-repo` the linter checks only the individual checks, not the surrounding instructions, and it cannot tell whether an audit was actually performed on a website.

Some text is repeated on purpose so every prompt and skill works on its own: the website workflow appears in each website prompt and skill, and each focused checklist appears again in `fix-website-full.md`. Change all copies together; the linter names any that drift.
