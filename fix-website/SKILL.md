---
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
