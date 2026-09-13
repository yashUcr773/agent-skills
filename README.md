# Agent Skills

Reusable LLM agent skills.

## Available Skills

- `modernize-old-repo` - Audit and carefully modernize old, stale, hobby, experimental, or personal software repositories without blindly rewriting them.

## Install with `npx skills`

List the skills in this repo:

```bash
npx skills add yashUcr773/agent-skills --list
```

Install `modernize-old-repo` interactively:

```bash
npx skills add yashUcr773/agent-skills --skill modernize-old-repo
```

Install it globally for Codex:

```bash
npx skills add yashUcr773/agent-skills --skill modernize-old-repo --agent codex --global --yes
```

You can also install directly from the GitHub folder URL:

```bash
npx skills add https://github.com/yashUcr773/agent-skills/tree/main/modernize-old-repo
```

## Install with Codex Helper

For Codex-compatible agents, install a skill from this GitHub repo by pointing the installer at the skill folder path:

```bash
install-skill-from-github.py --repo yashUcr773/agent-skills --path modernize-old-repo
```

Or ask Codex:

```text
Install the modernize-old-repo skill from https://github.com/yashUcr773/agent-skills/tree/main/modernize-old-repo
```

Installed skills are copied into:

```text
~/.codex/skills/<skill-name>
```

## Manual Install

Clone the repo and copy the skill folder:

```bash
git clone https://github.com/yashUcr773/agent-skills.git
mkdir -p ~/.codex/skills
cp -R agent-skills/modernize-old-repo ~/.codex/skills/
```

Restart the agent session after installing so the new skill is discovered.
