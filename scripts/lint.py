#!/usr/bin/env python3
"""Check that prompts and skills in this repository follow its conventions.

Read-only. Prompts are the hand-maintained sources; each skill is written from
its prompt (see maintenance/update-skill-from-prompt.md). This linter does not
generate anything. It reports where a prompt or skill has drifted:

    python3 scripts/lint.py            # check everything
    python3 scripts/lint.py NAME ...   # check only the named skills
    python3 scripts/lint.py --hash NAME   # print the prompt hash to record in that skill

Exit status is 1 when any error is found. No dependencies.
"""

import hashlib
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PROMPTS = ROOT / "prompts"
CHANGELOG = ROOT / "CHANGELOG.md"

# A skill is written from one prompt. fix-website has a second, lighter prompt.
SOURCE_PROMPT = {"fix-website": "fix-website-full.md"}
LIGHT_PROMPT = "fix-website.md"
FULL_PROMPT = "fix-website-full.md"
WORKFLOW_HEADING = "Website improvement workflow"
QUICK_HEADING = "Quick-pass checks"
SHORT_HEADING = "Short checklist"
STACK_HEADING = "Stack-specific checks"

# Sections whose plain bullets must also survive verbatim in the skill.
VERBATIM_SECTIONS = {
    "modernize-old-repo": ("Phase ",),
}

LABELED = re.compile(r"^- \*\*(.+?)\.\*\* \S")
SEMVER = re.compile(r"^\d+\.\d+\.\d+$")
LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
BRITISH = re.compile(
    r"\b(licen[c]e[sd]?|behaviour\w*|colour\w*|favour\w*|organis(?:e[sd]?|ing|ations?)|"
    r"optimis(?:e[sd]?|ing|ations?)|analyse[sd]?|centre[sd]?|labelled|catalogue[sd]?|programme[sd]?|"
    r"defence|artefacts?)\b",
    re.I,
)
REMOVED_NAMES = ("improve-website", "build_website_assets")

errors = []


def error(where, message):
    errors.append(f"{where}: {message}")


def read(path):
    return path.read_text(encoding="utf-8")


def outline(text):
    """Yield (line_number, heading_level or 0, line), ignoring headings inside code fences."""
    fenced = False
    for number, line in enumerate(text.split("\n"), 1):
        if line.startswith("```"):
            fenced = not fenced
            yield number, 0, line
            continue
        match = None if fenced else re.match(r"(#{1,6}) ", line)
        yield number, (len(match[1]) if match else 0), line


def block(text, heading, prefix=False):
    """Return the lines under the first heading with this title, up to the next heading of the same or a higher level."""
    lines, level = None, 0
    for _, depth, line in outline(text):
        title = line[depth + 1:] if depth else None
        if lines is None:
            if depth and (title.startswith(heading) if prefix else title == heading):
                lines, level = [line], depth
        elif depth and depth <= level:
            break
        else:
            lines.append(line)
    return lines


def blocks(text, heading_prefix):
    """Return every block whose heading starts with the prefix."""
    found, current, level = [], None, 0
    for _, depth, line in outline(text):
        if current is not None and depth and depth <= level:
            found.append(current)
            current = None
        if current is None and depth and line[depth + 1:].startswith(heading_prefix):
            current, level = [line], depth
        elif current is not None:
            current.append(line)
    if current is not None:
        found.append(current)
    return found


def normalize(lines):
    """Make a block comparable across files by shifting its shallowest heading to level 1."""
    text = "\n".join(lines).strip()
    depths = [depth for _, depth, _ in outline(text) if depth]
    shift = min(depths) - 1 if depths else 0
    out = []
    for _, depth, line in outline(text):
        out.append(line[shift:] if depth else line.rstrip())
    return "\n".join(out)


def labeled_bullets(lines):
    """Labeled check bullets outside code fences."""
    return [line for _, _, line in outline("\n".join(lines)) if LABELED.match(line)]


def plain_bullets(lines):
    fenced, found = False, []
    for line in lines:
        if line.startswith("```"):
            fenced = not fenced
        elif not fenced and line.lstrip().startswith("- "):
            found.append(line.strip())
    return found


def without(lines, heading):
    """Drop the block under this heading, so two copies that package it differently can be compared."""
    text = "\n".join(lines)
    removed = block(text, heading)
    if removed is None:
        return lines
    return text.replace("\n".join(removed), "").split("\n")


def prompt_hash(path):
    """A short fingerprint of a prompt, recorded in its skill when the skill is brought up to date."""
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]


def prompt_version(path):
    for line in read(path).split("\n")[:6]:
        if line.startswith("Version: "):
            return line[len("Version: "):].strip()
    return None


def frontmatter(path):
    text = read(path)
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        error(path.relative_to(ROOT), "missing YAML frontmatter")
        return {}
    data, parent = {}, None
    for line in text[4:text.index("\n---\n", 4)].split("\n"):
        if not line.strip():
            continue
        key, _, value = line.strip().partition(":")
        if line.startswith("  ") and parent:
            data[f"{parent}.{key}"] = value.strip().strip('"')
        else:
            parent = key if not value.strip() else None
            data[key] = value.strip()
    return data


def skill_names():
    return sorted(path.parent.name for path in ROOT.glob("*/SKILL.md"))


def skill_text(name):
    return {path: read(path) for path in sorted((ROOT / name).rglob("*.md"))}


def check_pairing(names):
    prompt_files = {path.name for path in PROMPTS.glob("*.md")}
    expected = {SOURCE_PROMPT.get(name, f"{name}.md") for name in names} | {LIGHT_PROMPT}
    for missing in sorted(expected - prompt_files):
        error("prompts", f"{missing} is missing")
    for extra in sorted(prompt_files - expected):
        error("prompts", f"{extra} has no matching skill folder")


def check_prompt_header(path):
    where = path.relative_to(ROOT)
    first = read(path).split("\n", 1)[0]
    if not (first.startswith("# ") and "reusable prompt" in first):
        error(where, "first line must be a '# ... — reusable prompt' title")
    version = prompt_version(path)
    if not version or not SEMVER.match(version):
        error(where, "needs a 'Version: X.Y.Z' line directly under the title")


def check_frontmatter(name, version, expected_hash):
    path = ROOT / name / "SKILL.md"
    where = path.relative_to(ROOT)
    data = frontmatter(path)
    if not data:
        return
    if data.get("name") != name:
        error(where, f"frontmatter name is {data.get('name')!r}, expected {name!r}")
    description = data.get("description", "")
    if not description:
        error(where, "frontmatter description is missing")
    if len(description) > 1024:
        error(where, f"description is {len(description)} characters; the limit is 1024")
    if ": " in description or " #" in description or description[:1] in "\"'[{>|*&!%@`":
        error(where, "description is not a safe plain YAML value (avoid ': ', ' #', and a leading quote or symbol)")
    if data.get("metadata.version") != version:
        error(where, f"metadata.version is {data.get('metadata.version')!r} but its prompt is at {version!r}; "
                     "update the skill from the prompt")
    recorded = data.get("metadata.prompt-hash")
    if recorded != expected_hash and recorded and data.get("metadata.version") == version:
        error(where, f"its prompt changed after version {version} was recorded (hash {recorded} is now "
                     f"{expected_hash}) but the prompt's Version line was not raised. Raise the version and add a "
                     "changelog entry, then update the skill from the prompt")
    elif recorded != expected_hash:
        error(where, f"metadata.prompt-hash is {recorded!r} but its prompt hashes to {expected_hash!r}. Update the "
                     "skill from the prompt, then record the new hash")
    if len(read(path).split("\n")) > 500:
        error(where, "SKILL.md is over 500 lines; move conditional material into references/")


def check_changelog(name, version):
    if not CHANGELOG.is_file():
        error("CHANGELOG.md", "is missing")
        return
    section = block(read(CHANGELOG), name)
    if section is None:
        error("CHANGELOG.md", f"has no '## {name}' section")
    elif not any(line.startswith(f"### {version}") for line in section):
        error("CHANGELOG.md", f"section '{name}' has no entry for version {version}")


def check_coverage(name, prompt_path):
    """Every check in the prompt must survive verbatim in the skill, and the skill must not add checks."""
    prompt = read(prompt_path)
    files = skill_text(name)
    skill_lines = {line.strip() for text in files.values() for line in text.split("\n")}
    where = f"{name}/"
    wanted = labeled_bullets(prompt.split("\n"))
    for prefix in VERBATIM_SECTIONS.get(name, ()):
        for section in blocks(prompt, prefix):
            wanted += plain_bullets(section[1:])
    for bullet in dict.fromkeys(wanted):
        if bullet.strip() not in skill_lines:
            error(where, f"missing or reworded check from {prompt_path.name}: {bullet.strip()[:90]}")
    prompt_lines = {line.strip() for line in prompt.split("\n")}
    for path, text in files.items():
        for bullet in labeled_bullets(text.split("\n")):
            if bullet.strip() not in prompt_lines:
                error(path.relative_to(ROOT), f"check is not in {prompt_path.name}: {bullet.strip()[:90]}")


def check_workflow(names):
    """The shared workflow must be identical in every website prompt and skill."""
    website_prompts = [LIGHT_PROMPT, FULL_PROMPT] + sorted(p.name for p in PROMPTS.glob("website-*.md"))
    reference = None
    for file_name in website_prompts:
        path = PROMPTS / file_name
        if not path.is_file():
            continue
        found = block(read(path), WORKFLOW_HEADING)
        if found is None:
            error(path.relative_to(ROOT), f"has no '{WORKFLOW_HEADING}' section")
            continue
        if reference is None:
            reference = (file_name, normalize(found))
        elif normalize(found) != reference[1]:
            error(path.relative_to(ROOT), f"workflow section differs from the one in {reference[0]}")
    if reference is None:
        return
    for name in names:
        if name != "fix-website" and not name.startswith("website-"):
            continue
        copies = [found for text in skill_text(name).values() if (found := block(text, WORKFLOW_HEADING))]
        if not copies:
            error(f"{name}/", f"has no '{WORKFLOW_HEADING}' section")
        elif normalize(copies[0]) != reference[1]:
            error(f"{name}/", f"workflow section differs from the one in prompts/{reference[0]}")


def check_website_skills(names):
    """Beyond individual checks, the surrounding checklist text of each website skill must match its prompt."""
    full_path = PROMPTS / FULL_PROMPT
    for name in names:
        if name.startswith("website-"):
            prompt_path = PROMPTS / f"{name}.md"
            focused = domain_block(prompt_path) if prompt_path.is_file() else None
            if focused is None:
                continue
            title = focused[0].lstrip("#").strip()
            in_skill = block(read(ROOT / name / "SKILL.md"), title)
            if in_skill is None:
                error(f"{name}/SKILL.md", f"has no '{title}' section")
            elif normalize(without(in_skill, STACK_HEADING)) != normalize(without(focused, STACK_HEADING)):
                error(f"{name}/SKILL.md", f"the '{title}' section differs from prompts/{name}.md "
                                          "outside the stack-specific checks")
        elif name == "fix-website" and full_path.is_file():
            full = read(full_path)
            references = ROOT / name / "references"
            for found in blocks(full, "Checklist: website-"):
                reference = references / (found[0].split("website-", 1)[1].strip() + ".md")
                if not reference.is_file():
                    error(f"{name}/references", f"{reference.name} is missing")
                elif normalize(found[1:]) != normalize(read(reference).split("\n")):
                    error(reference.relative_to(ROOT), f"differs from its section of {FULL_PROMPT}")
            short = block(full, SHORT_HEADING)
            reference = references / "short-checklist.md"
            if short and (not reference.is_file() or normalize(short) != normalize(read(reference).split("\n"))):
                error(f"{name}/references/short-checklist.md", f"differs from the short checklist in {FULL_PROMPT}")


def check_short_checklist():
    """The short checklist must list exactly the labels of each domain checklist, in order."""
    full_path = PROMPTS / FULL_PROMPT
    if not full_path.is_file():
        return
    full = read(full_path)
    short = block(full, SHORT_HEADING)
    if short is None:
        error(FULL_PROMPT, f"has no '{SHORT_HEADING}' section")
        return
    for found in blocks(full, "Checklist: website-"):
        name = "website-" + found[0].split("website-", 1)[1].strip()
        labels = [LABELED.match(line)[1] for line in labeled_bullets(found)]
        listed = block("\n".join(short), name)
        listed = [line[2:].strip() for line in plain_bullets(listed[1:])] if listed else []
        if listed != labels:
            missing = [label for label in labels if label not in listed]
            extra = [label for label in listed if label not in labels]
            detail = "; ".join(filter(None, [
                f"missing {missing}" if missing else "",
                f"not in the checklist {extra}" if extra else "",
                "order differs" if not missing and not extra else "",
            ]))
            error(FULL_PROMPT, f"short checklist for {name} does not match its checks: {detail}")


def domain_block(path):
    """The checklist in a focused website prompt: everything after the workflow section."""
    text = read(path)
    tops = [line for _, depth, line in outline(text) if depth == 2]
    if len(tops) < 3:
        error(path.relative_to(ROOT), "expected Request details, the workflow, and one checklist section")
        return None
    return block(text, tops[-1][3:])


def check_website_prompts():
    full_path, light_path = PROMPTS / FULL_PROMPT, PROMPTS / LIGHT_PROMPT
    if not full_path.is_file() or not light_path.is_file():
        return
    full, quick_expected = read(full_path), []
    for path in sorted(PROMPTS.glob("website-*.md")):
        where = path.relative_to(ROOT)
        focused = domain_block(path)
        if focused is None:
            continue
        in_full = block(full, f"Checklist: {path.stem}")
        if in_full is None:
            error(FULL_PROMPT, f"has no 'Checklist: {path.stem}' section")
        elif normalize(in_full[1:]) != normalize(focused):
            error(where, f"checklist differs from the 'Checklist: {path.stem}' section of {FULL_PROMPT}")
        bullets = {LABELED.match(line)[1]: line for line in labeled_bullets(focused)}
        if len(bullets) != len(labeled_bullets(focused)):
            error(where, "two checks share the same label")
        for line in plain_bullets(focused):
            if not LABELED.match(line):
                error(where, f"check has no '**Label.**' prefix: {line[:70]}")
        quick = [line for line in focused if line.startswith("Quick pass:")]
        if len(quick) != 1:
            error(where, "needs exactly one 'Quick pass:' line listing check labels separated by semicolons")
            continue
        for label in quick[0][len("Quick pass:"):].strip().rstrip(".").split(";"):
            if label.strip() not in bullets:
                error(where, f"quick-pass label {label.strip()!r} does not match a check")
            else:
                quick_expected.append(bullets[label.strip()])
    quick_section = block(read(light_path), QUICK_HEADING)
    if quick_section is None:
        error(LIGHT_PROMPT, f"has no '{QUICK_HEADING}' section")
        return
    present = set(labeled_bullets(quick_section))
    for bullet in quick_expected:
        if bullet not in present:
            error(LIGHT_PROMPT, f"quick-pass check missing or reworded: {bullet[:90]}")
    for bullet in present - set(quick_expected):
        error(LIGHT_PROMPT, f"check is not on a quick-pass line in its focused prompt: {bullet[:90]}")


def slug(heading):
    return re.sub(r"\s", "-", re.sub(r"[^\w\s-]", "", heading.lower()).strip())


def check_links_and_spelling():
    files = [ROOT / "README.md", CHANGELOG, *PROMPTS.glob("*.md"), *(ROOT / "maintenance").glob("*.md")]
    for name in skill_names():
        files += (ROOT / name).rglob("*.md")
    for path in files:
        if not path.is_file():
            continue
        where, text = path.relative_to(ROOT), read(path)
        anchors = {slug(line[depth + 1:]) for _, depth, line in outline(text) if depth}
        for number, _, line in outline(text):
            for target in LINK.findall(line):
                if re.match(r"[a-z]+:", target):
                    continue
                file_part, _, anchor = target.partition("#")
                if file_part and not (path.parent / file_part).exists():
                    error(f"{where}:{number}", f"link target does not exist: {target}")
                elif not file_part and anchor not in anchors:
                    error(f"{where}:{number}", f"no heading matches the link #{anchor}")
            match = BRITISH.search(line)
            if match:
                error(f"{where}:{number}", f"use American spelling in place of {match[0]!r}")
            if path != CHANGELOG:
                for removed in REMOVED_NAMES:
                    if removed in line:
                        error(f"{where}:{number}", f"refers to {removed}, which no longer exists")


def main():
    arguments = sys.argv[1:]
    names = skill_names()
    show_hash = "--hash" in arguments
    wanted = [argument for argument in arguments if argument != "--hash"]
    for name in wanted:
        if name not in names:
            print(f"Unknown skill: {name}", file=sys.stderr)
            return 2
    if show_hash:
        for name in wanted or names:
            print(name, prompt_hash(PROMPTS / SOURCE_PROMPT.get(name, f"{name}.md")))
        return 0
    check_pairing(names)
    for path in sorted(PROMPTS.glob("*.md")):
        check_prompt_header(path)
    for name in wanted or names:
        prompt_path = PROMPTS / SOURCE_PROMPT.get(name, f"{name}.md")
        if not prompt_path.is_file():
            continue
        version = prompt_version(prompt_path)
        check_frontmatter(name, version, prompt_hash(prompt_path))
        check_changelog(name, version)
        check_coverage(name, prompt_path)
    light, full = PROMPTS / LIGHT_PROMPT, PROMPTS / FULL_PROMPT
    if light.is_file() and full.is_file() and prompt_version(light) != prompt_version(full):
        error(LIGHT_PROMPT, f"version differs from {FULL_PROMPT}")
    check_workflow(wanted or names)
    check_website_prompts()
    check_website_skills(wanted or names)
    check_short_checklist()
    check_links_and_spelling()
    if errors:
        print(f"{len(errors)} problem(s):", file=sys.stderr)
        print("\n".join(f"  {message}" for message in errors), file=sys.stderr)
        return 1
    print(f"Checked {len(wanted or names)} skill(s) and {len(list(PROMPTS.glob('*.md')))} prompt(s): no problems.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
