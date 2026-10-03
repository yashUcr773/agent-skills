# Update a skill from its prompt — maintenance prompt

Give this prompt to an AI agent working in this repository, and name the skill to update. It is not an installable skill and has no skill folder.

- Skill to update: [skill name, such as `website-security-auth`, or `all`]

For `all`, run `python3 scripts/lint.py` with no arguments and follow the steps below for each skill it names, one at a time.

## What you are doing

In this repository the prompts in `prompts/` are the source of truth. Each installable skill is written from one prompt by reading it and deciding how the same instructions are best packaged as a skill. No script produces the skills. Your job is to bring the named skill up to date with its prompt.

| Skill folder | Written from |
| --- | --- |
| `fix-website/` | `prompts/fix-website-full.md` |
| every other `<name>/` | `prompts/<name>.md` |

`prompts/fix-website.md` is the light whole-site prompt. It has no skill of its own; keep it consistent with the full prompt as described under "When the prompt itself changes".

## Steps

1. Read the whole prompt and every file in the skill folder. Run `python3 scripts/lint.py <name>` and read what it reports.
2. Check the prompt's version. If the linter says the prompt changed but its `Version:` was not raised, the prompt is missing its version bump. Raise it and add the changelog entry as described under "When the prompt itself changes". If you were told not to edit prompts, stop and report this instead.
3. List what differs between the prompt and the skill: checks added, removed, or reworded; changed or new headings, paragraphs, tables, and lists; a new version number. Do not rely on the linter for this list. Compare the two yourself, for example with `git diff -- prompts/<name>.md` and by reading the prompt and the skill side by side.
4. Edit the skill so it says what the prompt says, following the rules below. Change only what the difference requires; do not rewrite sections that already match.
5. Confirm that `CHANGELOG.md` has an entry for the prompt's version under this skill that describes the change. Add or extend it if not.
6. Set `metadata.version` in the skill's frontmatter to the prompt's `Version:` value. Then set `metadata.prompt-hash`: run `python3 scripts/lint.py --hash <name>`, which prints the skill name followed by twelve hex characters, and write those characters, quoted, on the line after `version`. Do this last. The hash covers the prompt file exactly as it is on disk, so any later edit to the prompt, even to whitespace, invalidates it. Setting the hash is your statement that you compared the whole prompt with the skill.
7. Run `python3 scripts/lint.py <name>` again and fix everything it reports. Then run it with no arguments. Report problems it shows in skills you were not asked to update; do not fix them.
8. Report what you changed, anything in the prompt you could not carry over, and anything that looks wrong in the prompt itself. Do not stage, commit, or push unless asked.

## What the linter does and does not check

A clean lint is necessary, not sufficient.

- It checks every labeled check bullet, `- **Label.** ...`, in both directions: each must exist word for word in the prompt and in the skill.
- For the website skills it also checks that the workflow section and the whole checklist section match the prompt, and that the short checklist lists exactly the check labels.
- For `modernize-old-repo` it checks that every bullet inside a phase survives in the skill.
- It checks versions, the prompt hash, a changelog heading for the version, links, description format, and spelling.
- It does not check headings, introductions, paragraphs, tables, or numbered lists in `review-changes`, `modernize-old-repo`, and `start-here`, and it cannot tell whether a changelog entry describes the change. Those are yours to compare. For `start-here`, it does check every catalog entry, because each is a labeled bullet.

## How a skill differs from its prompt

A prompt is pasted into a conversation by the person who wants the work done. A skill is discovered and loaded by an agent. Keep the substance identical and adapt the packaging:

- **Frontmatter.** `name` matches the folder. `description` is one line that starts with a verb, as the existing ones do ("Audit and improve…", "Review…"), uses neither "I" nor "you", and says what the skill does and when to use it. Keep it under 1024 characters, do not start it with a quote or symbol, and keep it free of `: ` and ` #` so it stays valid YAML. When the prompt gains a section or topic a user might name when asking for help, add that topic to the description; otherwise leave the description alone. Under `metadata`, `version` holds the version and `prompt-hash` the fingerprint of the prompt the skill was last updated from.
- **Voice.** A prompt says "I" and "me" for the person asking. A skill says "the user". Rewrite instructions accordingly: "wait for my selection" becomes "wait for the user's selection", and "this prompt" becomes "this skill".
- **Request details.** A prompt has a fill-in "Request details" block. A skill does not; it tells the agent to take those details from the conversation, inspect first, and ask only where a missing answer changes the result.
- **Checks stay verbatim.** Every check in the prompt, meaning each `- **Label.** ...` bullet and each item in a plain checklist such as the modernization phases, must appear in the skill word for word. Do not merge, summarize, reorder within a section without reason, or drop them. This rule wins over the voice rule: if a check itself says "I" or "my", leave it and report that the prompt should be reworded.
- **Website checklists and workflow stay verbatim.** In the website skills, the "Website improvement workflow" section and the whole checklist section, including its paragraphs, quick-pass line, and severity examples, must match the prompt exactly. Only the "Stack-specific checks" part is packaged differently, as described below.
- **Nothing extra.** Do not add checks, tools, or rules that are not in the prompt. If something seems missing, say so in your report so the prompt can be changed first.

## Where content goes

Keep `SKILL.md` to what the agent needs every time the skill runs, and under 500 lines. Put material that is needed only in some situations into `references/`, one level deep, and say in `SKILL.md` exactly when to read each file.

A new section in the prompt goes into `SKILL.md`, in the prompt's order, unless it applies only to some project types, stacks, or providers. In that case it goes into the matching reference file.

- **Focused website skills (`website-*`).** `SKILL.md` holds the introduction, the workflow, and the domain checklist. Where the checklist has a "Stack-specific checks" section, its bullets go to `references/stack-checks.md`, and a short pointer naming the stacks and providers is left in its place under the same heading.
- **`fix-website`.** `SKILL.md` holds the introduction, scoping, the routing table, and the combine and verify sections. The workflow is `references/workflow.md`, each "Checklist: website-…" section is its own reference file with identical text, and the short checklist is `references/short-checklist.md`.
- **`review-changes`.** `SKILL.md` holds the six numbered sections, including every review dimension that applies to any change. "Website feature checks" and "Checks for other project types" move to `references/project-types.md`: the website block keeps its introduction, and each other project type becomes its own `##` block under a short introduction that replaces the prompt's. In `SKILL.md`, a single `### Project-type checks` pointer is left at the end of section 4, naming the project types and when to read the file.
- **`modernize-old-repo`.** `SKILL.md` holds the goals, ground rules, modes, depth, safety rules, findings format, and operating principles, with a table of phases. The phases live in references: the core audit, the frontend phase, the backend and database phases, the infrastructure phase, and the implement, verify, and report phases.

- **`start-here`.** `SKILL.md` holds the interview, the rules for choosing skills, the plan, installing, running, finishing, and safety. The prompt's "Catalog" section, meaning the sources table, every entry, and the overlaps table, is `references/catalog.md`, which `SKILL.md` says to read before choosing. The catalog names external skills; when you update it, confirm their install commands and licenses against their repositories, because those change outside this repository.

For a new skill, follow the closest existing one.

## When the prompt itself changes

These are edits to prompts, not skills, but they belong to the same job:

- **Version and changelog.** Any change to a prompt needs its `Version:` raised: the last number for wording fixes, the middle for added checks or options, the first for removed or renamed things or a changed default. Add an entry under that skill in `CHANGELOG.md` that says what changed. The linter reports a prompt that changed after its skill recorded a hash for the same version, and a version with no changelog heading. It cannot judge whether the entry is complete.
- **Shared workflow.** The "Website improvement workflow" section is repeated in `fix-website.md`, `fix-website-full.md`, and every `website-*.md`. Change all copies together.
- **Domain checklists.** Each focused prompt's checklist is repeated in `fix-website-full.md` under "Checklist: website-…". Change both. The short checklist at the end of `fix-website-full.md` lists every check label in order, so add, rename, or remove the label there too.
- **Quick pass.** Each domain checklist starts with a `Quick pass:` line naming the labels used at quick depth. The "Quick-pass checks" section of `fix-website.md` repeats those bullets; keep it in step.

The linter reports drift in the shared workflow, the domain checklists, the short checklist, and the quick pass.

## Do not

- Do not write or run a script that produces skill files. Read and edit.
- Do not edit a prompt to make a skill pass, unless the prompt is actually wrong; if it is, say so.
- Do not touch `benchmark/`.
