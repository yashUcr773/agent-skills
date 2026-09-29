#!/usr/bin/env python3
"""Build portable, self-contained website skills/prompts from the master references.

Run with --check for a read-only drift check, --write to regenerate, or --json
to return the generated file map for patch-based editing tools. No dependencies.
"""

import argparse
import json
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "improve-website"
REFERENCES = MASTER / "references"
FIX_WEBSITE_PROMPT = ROOT / "prompts" / "fix-website.md"
REVIEW_CHANGES_PROMPT = ROOT / "prompts" / "review-changes.md"

# name suffix, title, source reference, finding prefix, discovery description
DOMAINS = (
    (
        "ui-accessibility", "Website UI and Accessibility", "ui-accessibility.md", "UI",
        "Audit and improve website layouts, responsive/mobile behavior, accessibility, "
        "and browser compatibility. Use for visual or access problems; review findings "
        "with the user before fixes unless audit-and-fix is explicitly requested.",
    ),
    (
        "interactions", "Website Interactions and Forms", "interactions.md", "UX",
        "Audit and improve website navigation, routes, buttons, forms, loading/error "
        "states, search, and client state. Use for broken or confusing user journeys; "
        "review before fixes unless audit-and-fix is explicitly requested.",
    ),
    (
        "content-branding", "Website Content and Branding", "content-branding.md", "CONTENT",
        "Audit and improve existing website copy, factual claims, footer, contact "
        "information, logos, icons, and brand consistency. Review before fixes unless "
        "audit-and-fix is explicitly requested; do not invent business facts or identity.",
    ),
    (
        "seo-discoverability", "Website SEO and Discoverability", "seo-discoverability.md", "SEO",
        "Audit and improve website metadata, indexing, canonicals, sitemaps, structured "
        "data, sharing previews, and intended AI crawler access. Review before fixes "
        "unless audit-and-fix is explicitly requested; preserve private content boundaries.",
    ),
    (
        "performance", "Website Performance and Media", "performance.md", "PERF",
        "Measure and improve website loading and interaction performance, media, "
        "asset/data delivery, and existing or requested PWA behavior. Review findings "
        "before fixes unless audit-and-fix is explicitly requested; avoid speculative optimization.",
    ),
    (
        "backend-reliability", "Website Backend and Reliability", "backend-reliability.md", "REL",
        "Audit and improve website APIs, database access, concurrency, code quality, "
        "and meaningful regression coverage. Use for application reliability and "
        "maintainability; review before fixes unless audit-and-fix is explicitly requested.",
    ),
    (
        "security-auth", "Website Security and Authentication", "security-auth.md", "SEC",
        "Audit and harden website trust boundaries, sessions, authentication, "
        "authorization, dependencies, and accidental prototype/secret exposure. "
        "Review findings before fixes unless audit-and-fix is explicitly requested.",
    ),
    (
        "commerce", "Website Payments and Commerce", "commerce.md", "PAY",
        "Audit and improve existing website checkout, payments, orders, inventory, "
        "subscriptions, and webhook integrity using safe test environments. Review "
        "before fixes unless audit-and-fix is explicitly requested; do not assume live transaction authority.",
    ),
    (
        "privacy-analytics", "Website Privacy and Analytics", "privacy-analytics.md", "PRIV",
        "Audit and improve website tracking accuracy, data minimization, consent "
        "behavior, privacy controls, and policy consistency. Review before fixes "
        "unless audit-and-fix is explicitly requested; clarify actual business and jurisdiction inputs.",
    ),
    (
        "operations", "Website Operations and Email", "operations.md", "OPS",
        "Audit and improve website environment/deployment configuration, observability, "
        "backup/recovery readiness, contact delivery, and transactional email. Review "
        "before fixes unless audit-and-fix is explicitly requested; distinguish preparation from live operations.",
    ),
)


def nest_headings(markdown, levels=1):
    """Nest these prose-only source documents under their enclosing heading."""
    return re.sub(r"^(#{1,5})(?= )", lambda match: "#" * levels + match[1], markdown, flags=re.M)


def generate():
    workflow = (REFERENCES / "workflow.md").read_text(encoding="utf-8").strip()
    files = {}
    sections = []
    for suffix, title, reference, prefix, description in DOMAINS:
        name = f"website-{suffix}"
        checks = (REFERENCES / reference).read_text(encoding="utf-8").strip()
        identity = (
            f"Use `{prefix}-001`, `{prefix}-002`, and so on for stable finding IDs. "
            "Apply the workflow below only to the requested domain and scope. "
            "Other domains mentioned in the checklist are related concerns, not required installed skills."
        )
        body = f"{identity}\n\n{nest_headings(workflow)}\n\n{nest_headings(checks)}\n"
        files[f"{name}/SKILL.md"] = (
            f"---\nname: {name}\ndescription: {description}\n---\n\n# {title}\n\n"
            "This skill is self-contained, framework agnostic, and agent agnostic. "
            "Default to audit, user review, then selected fixes and verification. "
            "Use audit-and-fix only when explicitly requested.\n\n" + body
        )
        files[f"prompts/{name}.md"] = (
            f"# {title} — reusable prompt\n\n"
            "Audit and improve this website within the domain below. This prompt is "
            "self-contained and requires no installed skill or particular framework/agent. "
            "Use the repository, URL, goals, constraints, and prior decisions supplied in "
            "this conversation. Ask about consequential missing information.\n\n"
            "Default to audit → user review → selected fixes → verification. If I explicitly "
            "request audit-and-fix, use that mode. If I request audit only, stop after the findings.\n\n"
            + body
        )
        sections.append(f"## Checklist: {name}\n\n{nest_headings(checks, 2)}")

    master = (MASTER / "SKILL.md").read_text(encoding="utf-8")
    marker = "## Establish the website and its scope"
    if marker not in master:
        raise ValueError("Master skill is missing its coordination entry heading")
    coordination = marker + master.split(marker, 1)[1]
    for suffix, _, reference, _, _ in DOMAINS:
        coordination = coordination.replace(
            f"(references/{reference})", f"(#checklist-website-{suffix})"
        )
    if re.search(r"\]\(references/", coordination):
        raise ValueError("Master prompt contains an unmapped external reference")
    files["prompts/improve-website.md"] = (
        "# Improve Website — reusable master prompt\n\n"
        "Audit and improve this website using the repository, URL, goals, constraints, "
        "and previous decisions supplied in this conversation. Ask about consequential "
        "missing information rather than guessing. This prompt contains the complete "
        "workflow and domain checklists and requires no installed skills or particular agent/framework.\n\n"
        "Default to audit → user review → selected fixes → verification. Use audit-and-fix "
        "when I explicitly request it, or audit only when requested. Apply one combined "
        "review checkpoint across the website. Checklist/reference links below point to "
        "sections in this prompt; no separate files need to be opened.\n\n"
        + nest_headings(workflow) + "\n\n" + coordination.strip() + "\n\n"
        + "\n\n".join(sections) + "\n"
    )

    checklist = FIX_WEBSITE_PROMPT.read_text(encoding="utf-8").strip()
    files["fix-website/references/workflow.md"] = workflow + "\n"
    files["fix-website/references/checklist.md"] = checklist + "\n"
    files["fix-website/SKILL.md"] = """---
name: fix-website
description: Audit and improve an existing website with an unabridged, general website checklist. Use when the complete checklist is wanted in one installable skill; default to user review before fixes unless audit-and-fix is explicitly requested.
---

# Fix Website

This skill is self-contained, framework agnostic, and agent agnostic. Use it for broad website audit and improvement work. It includes the original unabridged checklist and does not require the focused website skills.

Read [references/workflow.md](references/workflow.md) first. It defines the default **audit → user review → selected fixes → verification** workflow, the explicit **audit-and-fix** option, audit-only operation, and the evidence/verification standard.

Then read [references/checklist.md](references/checklist.md) and select the areas that apply to the site's actual features, routes, users, and agreed scope. The checklist directs what to investigate; it does not require adding every item. Treat optional features and infrastructure as proposals that need a demonstrated need and any relevant product decision.

Establish the critical journeys, public/private boundaries, authoritative business content, safe test environment, and available access before auditing. Ask targeted questions when answers materially affect intended behavior, branding, pricing, legal/privacy choices, crawler policy, or live-service actions. Do not invent missing answers.

For each actionable finding, record a stable ID, severity, confidence, affected location, evidence, impact, proposed change, decision/open question, and observable pass criteria. Separate confirmed defects, optional improvements, questions, and checks not verified or not applicable. Do not expose secrets or personal data in findings.

In review-first mode, present prioritized findings and proposed changes, then wait for the user's selected scope before editing. In audit-and-fix mode, make unambiguous in-scope corrections and verify them, pausing only when a material decision or specific live-system authority is needed. Do not deploy, send real messages, make payments, rotate credentials, alter DNS, or execute production data operations unless separately authorized.

After accepted work, reproduce the original issue, verify each pass criterion, and exercise affected adjacent behavior. Report changes, checks actually run, remaining risks, deferred items, and verification limits. Do not treat a checklist, successful build, or a single scan as proof of complete security, accessibility, performance, or compliance.
"""

    review_prompt = REVIEW_CHANGES_PROMPT.read_text(encoding="utf-8").strip()
    review_heading = "# Review Changes — reusable prompt\n\n"
    if not review_prompt.startswith(review_heading):
        raise ValueError("Review Changes prompt is missing its expected title")
    files["review-changes/SKILL.md"] = (
        "---\n"
        "name: review-changes\n"
        "description: Review current changes, staged changes, commits, branches, or pull requests for correctness, security, accessibility, performance, and other applicable regressions. Default to review only; use when the change set and comparison baseline matter.\n"
        "---\n\n"
        "# Review Changes\n\n"
        "This installable skill packages the standalone review prompt. It is framework and agent agnostic, and defaults to review only.\n\n"
        + review_prompt.removeprefix(review_heading) + "\n"
    )
    return files


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true", help="Report missing or stale generated files")
    mode.add_argument("--write", action="store_true", help="Regenerate only the known output files")
    mode.add_argument("--json", action="store_true", help="Print the generated path-to-content map")
    parser.add_argument(
        "--skill", choices=["improve-website", "fix-website", "review-changes"] + [f"website-{item[0]}" for item in DOMAINS],
        help="Limit output to one skill's generated files",
    )
    args = parser.parse_args()
    files = generate()
    if args.skill:
        files = {
            path: content for path, content in files.items()
            if path.startswith(f"{args.skill}/") or path == f"prompts/{args.skill}.md"
        }
    if args.json:
        print(json.dumps(files, ensure_ascii=False))
        return 0
    stale = []
    for relative_path, content in files.items():
        target = ROOT / relative_path
        if args.write:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding="utf-8")
        elif not target.is_file() or target.read_text(encoding="utf-8") != content:
            stale.append(relative_path)
    if stale:
        print("Generated files are missing or stale:", file=sys.stderr)
        print("\n".join(stale), file=sys.stderr)
        return 1
    print(f"{'Generated' if args.write else 'Verified'} {len(files)} website skill/prompt files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
