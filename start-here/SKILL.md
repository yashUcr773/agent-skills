---
name: start-here
description: Interview the user about what they want done, then choose, install with permission, and run the right skills for it, from this collection and from curated external skills for interface design, motion, development workflow, security testing, and codebase visualization. Use when unsure which skill fits, when a request spans several kinds of work, or to plan a sequence of skills before running them.
metadata:
  version: "1.0.0"
  prompt-hash: "967f47576baf"
---

# Start Here

Find out what the user wants done, then choose and run the right skills for it, from this collection and from a curated set of external skills. This skill routes work to other skills; it does not do the work itself. The interview and the plan need no other installed skill, but each step of the work needs its chosen skill to be available.

Take the target, goal, constraints, and whether installing skills is allowed from the conversation. Inspect first, and ask only where a missing answer changes the plan.

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
3. **How far to go.** Report only; report, then fix what the user selects; or fix directly. Where a chosen skill has a depth setting, offer it.
4. **Limits.** What must not change, which live systems or accounts may be used, and whether missing skills may be installed.

Then ask only the follow-ups for the tasks the user chose:

| Task | Follow-up questions |
| --- | --- |
| Build or redesign an interface | A new design or a refinement of the current one; a brand, style, or DESIGN.md to follow; the framework and component library in use |
| Motion and animation | Build new motion or review what exists; the animation library in use or wanted, such as CSS, Motion, GSAP, or React Native |
| Website audit | The whole site or chosen areas; quick, standard, or deep |
| Security testing | Code review only, or active testing of a running target. Active testing needs the user's explicit authorization for that target and should use a non-production copy |
| Understand or visualize | For people, such as diagrams or a guided tour, or for agents, such as a queryable map of the code |
| Old repository | Assess only, or also start upgrading |

An unanswered question that would not change the plan is not worth asking.

## 2. Choose the skills

Read [references/catalog.md](references/catalog.md) and choose from it. For each task, pick the fewest skills that cover it: usually one, at most three.

- Match the project. Choose a skill tied to a framework or platform, such as GSAP, React Native, or shadcn/ui, only when the project uses it or the user chose it.
- Use this collection's skills where they cover the task. External skills fill what this collection does not: interface design, motion, development workflow, active security testing, and visualization.
- When the catalog lists skills under the same need in "Overlaps", do not choose silently. Show the user the options with one line on how each differs, and let the user pick.
- Within this collection, use `fix-website` when several website areas are in scope and a focused `website-*` skill when one is. That is a choice of scope, not an overlap to ask about.
- Order the steps so each feeds the next: understand, plan, build or fix, review or audit, verify. For example, map an unfamiliar codebase before modernizing it, and review changes after building them.
- Treat reference libraries, such as DESIGN.md collections and component libraries, as inputs to a step, not as steps.

## 3. Propose the plan

Before running anything, show the plan:

| Step | Skill | Source | Why | Installed | Changes files |
| --- | --- | --- | --- | --- | --- |
| 1 | [name] | [this collection, or owner/repo] | [one line] | [yes / no] | [yes / no] |

Ask the user to confirm, drop, swap, or reorder steps, and wait for the answer. When one installed skill covers the request, a one-line confirmation is enough.

## 4. Check and install

Check whether each chosen skill is available. It is available when it appears in the agent's list of skills, or when a folder with its name and a SKILL.md exists in the agent's project or personal skills directory, such as `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, or `~/.codex/skills/`.

For a missing skill, show the install command from the sources table in the catalog, the source repository, and its license. Installing runs third-party code and adds instructions the agent will follow, so ask before every install and prefer installing the one skill over a whole collection. If the user declines, offer an alternative from the catalog or drop the step. After an install, tell the user if the agent must reload or restart to see the new skill.

This skill does not vouch for external skills. Their authors maintain them, and they can change between versions.

## 5. Run the steps

- Invoke each skill by name if the agent supports skills; otherwise read its SKILL.md and follow it.
- Pass on what the user already answered, such as the target, goal, mode, depth, and limits, so the skill does not ask again. Let it ask only what it still needs.
- Keep each skill's own modes and review checkpoints. When a skill pauses for the user's review, pause.
- Carry results forward: findings, finding IDs, specs, and plans go to the next step that needs them.
- When two steps would edit the same files, finish and verify one before starting the other.
- If a step fails or a skill is unavailable, stop and tell the user, then offer to skip, replace, or retry it.

## 6. Finish

Summarize which skills ran, what each produced or changed, what was verified, and what is still open. When several skills produced findings, list them in one place without duplicates. Suggest next skills from the catalog only where the work calls for them.

## Safety

- Run active security testing, such as Strix, only with the user's explicit authorization for the named target, on a non-production environment, and never against systems the user does not control.
- Do not make live payments, send real messages, deploy, change DNS, or change production data unless the user authorizes that specific action.
- Keep secrets and personal data out of plans, summaries, and findings.
