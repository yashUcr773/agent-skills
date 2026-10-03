# Benchmark results

Add one row per run, newest first, using the score produced with `score-run.md`. Record the control, a plain "audit this site" request with no skill or prompt, alongside the skill runs: the difference between the two is what the skill adds. One run is a small sample; repeat a run before concluding that a change to a prompt helped.

In the Found column, partly found defects are counted separately: "85 of 95 (7 partly)" means 85 found, 7 partly found, and the rest missed.

## 2026-10-03: first full run

All runs used Sonnet 5.5. Each agent worked on its own throwaway copy made with `setup.sh` and was allowed to install, build, and run it. A separate agent scored each report with `score-run.md`. The agents could not write files, so each returned its report as text. Scorers were told not to count that against them.

| Comparison | With the skill | Control, no skill |
| --- | --- | --- |
| Whole site (r01, r03) | `fix-website`: 85 of 95, all 37 critical and high, no false positives, 6 of 6 questions | 82 of 95, 36 of 37 critical and high, 1 false positive (a decoy), 4 of 6 questions |
| Bad change (r14, r16) | `review-changes`: 10 of 10, no false positives | 9 of 10 (1 partly), no false positives |
| Stack site, security rows (r20, r21) | `website-security-auth`: 14 of 14 | 13 of 14 (missed B-STACK-05) |
| Old repository (r17, r18) | `modernize-old-repo`: 19 of 29 | Blocked, not scored |

The ten focused skills found every defect in their own section, except `website-backend-reliability` (9 of 10, 1 partly) and `website-security-auth` (18 of 19, 1 partly). On the same sections the whole-site control found fewer in eight of ten: UI 10 of 12, interactions 10 of 11, content 8 of 9, SEO 5 of 6, backend 7 of 10, commerce 8 of 9, privacy 5 of 7, operations 5 of 6. It matched them on security (18 of 19) and performance (6 of 6).

Problems that recurred across skill runs:

- **Incomplete findings.** Medium and low findings often had no evidence or no proposed change, usually because they were put in a short table. This failed a behavior check in ten of the fourteen skill audits: r01, r02, r04, r05, r09, r11, r12, r13, r17, and r20.
- **Severity inflated by bundling.** Several defects were merged into one finding, which then took the highest severity among them. Most severity differences were one level higher than the key.
- **Seeded credentials quoted.** r14 and r16 repeated the test password from the comment they flagged.
- **Clean change not called clean.** r15 said "no blocking findings" and listed two gaps to settle "before this is called done", instead of stating plainly that the change introduced no defect.
- **Writes to shared services during an audit.** r20 left a probe document in Firestore and a probe upload in Storage, changed a member's role and then reverted it, and logged that member out. The local services were reset afterwards.
- **Re-audit side effect not filed.** r19 described the new "unknown paths return 200" problem as evidence but did not raise it as a new finding. Its summary line also miscounted the statuses.
- **Modernize gaps.** r17 rated the wrong README low (the key says high), gave dependency and testing items no IDs or severities, and missed that `axios` is unused and that build tools are runtime dependencies.

Notes on the environment:

- r18, the modernize control, was stopped by the model's safeguards while it was writing up its exploit checks. Its report ends after about 340 words, so it was not scored.
- r03 and r16, both controls, stopped servers with a broad `pkill`, which could have stopped servers from other runs in progress. The skill runs stopped only their own process IDs.
- r09 found a server left running by an earlier failed attempt on its own copy and tested against it. The code was the same, so the findings stand.

| Date | Skill or prompt | Version | Model | Mode, depth | Fixture | Found | Critical and high found | False positives | Questions asked | Behavior | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-03 | no skill (control) | — | Sonnet 5.5 | audit only | stack site | 16 of 17 | 10 of 11 | 0 | not applicable | 3 of 4 | r21. Security rows 13 of 14; missed B-STACK-05. L5, L7, L8 have no location or fix. Found a real Next.js middleware bypass not in the key. |
| 2026-10-03 | website-security-auth | 1.1.0 | Sonnet 5.5 | audit only, standard | stack site | 14 of 14 (rows 01–14) | 11 of 11 | 0 | not applicable | 2 of 4 | r20. All three stack decoys correctly called fine. Wrote to the shared Supabase and Firestore services; four findings have no proposed change. |
| 2026-10-03 | fix-website | 2.0.0 | Sonnet 5.5 | re-audit, standard | re-audit | 8 of 8 statuses | 7 of 7 | 0 | not applicable | 5 of 5 | r19. Original IDs kept and new ones numbered correctly. UX-001 side effect not raised as a new finding; summary line miscounts. |
| 2026-10-03 | no skill (control) | — | Sonnet 5.5 | audit only | site | not scored | — | — | — | — | r18, modernize control. Stopped by the model's safeguards; the report ends after about 340 words. |
| 2026-10-03 | modernize-old-repo | 2.0.0 | Sonnet 5.5 | audit only, full | site | 19 of 29 (5 partly) | 13 of 16 | 0 | 1 of 1 | 3 of 4 | r17. B-MOD 6 of 10 (3 partly), B-SEC 13 of 19 (2 partly). README rated low against the key's high. |
| 2026-10-03 | no skill (control) | — | Sonnet 5.5 | review only | change 001 | 9 of 10 (1 partly) | 6 of 6 | 0 | not applicable | 2 of 4 | r16. Missed the unlabeled notes field. Quoted the test password and the JWT default. |
| 2026-10-03 | review-changes | 1.1.0 | Sonnet 5.5 | review only | change 002 | 2 of 3 outcomes (1 partly) | not applicable | 0 | not applicable | 3 of 5 | r15. Did not say plainly that the change introduced no defect. |
| 2026-10-03 | review-changes | 1.1.0 | Sonnet 5.5 | review only | change 001 | 10 of 10 | 6 of 6 | 0 | not applicable | 3 of 4 | r14. Both critical defects rated high. Quoted the test password from the comment it flagged. |
| 2026-10-03 | website-operations | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 6 of 6 | 3 of 3 | 0 | not applicable | 3 of 4 | r13. Two findings have no location or proposed change. Reproduced a crash with no restart that is not in the key. |
| 2026-10-03 | website-privacy-analytics | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 7 of 7 | 4 of 4 | 1 | 1 of 1 | 3 of 4 | r12. False positive is borderline (PRIV-014, reset token in analytics URLs). Two findings have no location. |
| 2026-10-03 | website-commerce | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 9 of 9 | 7 of 7 | 0 | 1 of 1 | 3 of 4 | r11. Eight of nine severities exact. PAY-013 groups about ten issues with no real proposed change. |
| 2026-10-03 | website-security-auth | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 18 of 19 (1 partly) | 13 of 13 | 0 | not applicable | 4 of 4 | r10. Partly: the login form logging credentials to the console. Nine high defects rated critical. |
| 2026-10-03 | website-backend-reliability | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 9 of 10 (1 partly) | none planted | 0 | not applicable | 3 of 4 | r09. Missed the exposed `cost_price`. Six of nine severities one level high. |
| 2026-10-03 | website-performance | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 6 of 6 | 1 of 1 | 0 | not applicable | 4 of 4 | r08. |
| 2026-10-03 | website-seo-discoverability | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 6 of 6 | 2 of 2 | 0 | 1 of 1 | 4 of 4 | r07. |
| 2026-10-03 | website-content-branding | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 9 of 9 | 2 of 2 | 1 (a decoy) | 3 of 3 | 4 of 4 | r06. The decoy appears only in its list of issues outside the audit; 0 false positives among numbered findings. |
| 2026-10-03 | website-interactions | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 11 of 11 | 2 of 2 | 0 | not applicable | 3 of 4 | r05. Proposed changes only for two findings. Heavy bundling; one severity two levels off. |
| 2026-10-03 | website-ui-accessibility | 1.1.0 | Sonnet 5.5 | audit only, standard | site | 12 of 12 | 3 of 3 | 0 | not applicable | 3 of 4 | r04. Medium and low findings have no proposed change. Eight of twelve severities one level off. |
| 2026-10-03 | no skill (control) | — | Sonnet 5.5 | audit only | site | 82 of 95 (9 partly) | 36 of 37 | 1 (a decoy) | 4 of 6 (1 partly) | 2 of 4 | r03. Missed B-REL-01, B-REL-06, B-CON-01, B-PRIV-07. Quoted seeded passwords. |
| 2026-10-03 | fix-website | 2.0.0 | Sonnet 5.5 | audit only, quick | site | 79 of 95 (9 partly) | 37 of 37 | 0 | 6 of 6 (2 partly) | 3 of 4 | r02. Missed seven, including B-REL-02, B-REL-04, B-UI-09, B-PRIV-07. |
| 2026-10-03 | fix-website | 2.0.0 | Sonnet 5.5 | audit only, standard | site | 85 of 95 (7 partly) | 37 of 37 | 0 | 6 of 6 | 3 of 4 | r01. Missed B-REL-01, B-REL-06, B-REL-10. Medium and low tables have no evidence or proposed change. |

## Planted totals

| Fixture and section | Planted | Of which critical or high |
| --- | --- | --- |
| Site: `B-SEC` | 19 | 13 |
| Site: `B-PAY` | 9 | 7 |
| Site: `B-REL` | 10 | 0 |
| Site: `B-UX` | 11 | 2 |
| Site: `B-UI` | 12 | 3 |
| Site: `B-CON` | 9 | 2 |
| Site: `B-SEO` | 6 | 2 |
| Site: `B-PERF` | 6 | 1 |
| Site: `B-PRIV` | 7 | 4 |
| Site: `B-OPS` | 6 | 3 |
| Site: `B-MOD` | 10 | 3 |
| Change 001: `B-REV` | 10 | 6 |
| Stack site: `B-STACK` | 17 | 11 |
| Shop: `B-SUB-01` to `05` | 5 | 4 |
| Stack site: `B-SUB-06` to `08` | 3 | 2 |
| Decoys | 9 | not applicable |
| Questions | 6 | not applicable |
| Re-audit findings | 8 | not applicable |
