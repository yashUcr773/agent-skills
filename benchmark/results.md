# Benchmark results

Add one row per run, newest first, using the score produced with `score-run.md`. Record the control, a plain "audit this site" request with no skill or prompt, alongside the skill runs: the difference between the two is what the skill adds. One run is a small sample; repeat a run before concluding that a change to a prompt helped.

In the Found column, partly found defects are counted separately: "85 of 95 (7 partly)" means 85 found, 7 partly found, and the rest missed.

## 2026-10-04: second run, after the fixes

The same 21 runs, again with Sonnet 5.5, after the changes the first run prompted:

- **Skills:** fix-website 2.1.0, the website-* skills 1.2.0, review-changes 1.2.0, and modernize-old-repo 2.1.0.
- **Fixtures:** eight subtle defects added (`B-SUB-01` to `08`), scored separately so the first run stays comparable.
- **Scoring:** the stricter `score-run.md`. Quoting any credential now fails the secrets check, and two behavior checks were added: runtime probes, and the coverage section.
- **Run setup:**
  - Every agent, skill or control, was told to confirm problems with one harmless request and not to write exploit scripts.
  - The shared stack data was reset between the two stack runs.

| Comparison | With the skill | Control, no skill | First run (skill / control) |
| --- | --- | --- | --- |
| Whole site (r01, r03) | 90 of 95, 37 of 37 critical and high, subtle 5 of 5, 0 false positives | 79 of 95, 36 of 37, subtle 5 of 5, 0 false positives | 85 / 82 |
| Bad change (r14, r16) | 9 of 10, 0 false positives | 9 of 10, 1 false positive | 10 / 9 |
| Clean change (r15) | 1 of 3 outcomes, 1 false positive | not run | 2 of 3 |
| Stack site, security rows (r20, r21) | 13 of 14 (1 partly), subtle 3 of 3 | 13 of 14, subtle 3 of 3 | 14 / 13 |
| Old repository (r17, r18) | 27 of 29 (B-MOD 8 of 10, B-SEC 19 of 19) | 26 of 29 (B-MOD 8 of 10, B-SEC 18 of 19) | 19 / blocked |
| Re-audit (r19) | 8 of 8, and the fix's side effect raised as a new finding | not run | 8 of 8, side effect missed |

What changed:

- **Report quality improved most.** The complete-findings check failed in 4 of the 14 skill audits, down from 10 of 14 (now r01, r02, r05, r17). Secrets were kept out in 12 of 14 skill audits; r01 and r11 still quoted the hardcoded JWT fallback. All four controls failed the secrets check. Every website skill at standard depth produced the new coverage section.
- **Runtime probes are fixed.** The stack security run left the shared data as it found it and listed what it touched. In the first run it left probe data and changed a member's role.
- **Focused skills found nearly everything in their own area.** Nine of ten found every planted defect in their section, including the two that missed one last time: backend-reliability 10 of 10 and security-auth 19 of 19. Operations dropped from 6 of 6 to 4 of 6, with 2 partly found: two sub-items (the server ignoring `.env`, the missing lock file) went unmentioned. They also found every subtle defect that names their area.
- **modernize-old-repo improved the most:** 27 of 29, up from 19. It now finds every security defect and gives dependency and test problems IDs. The control, which was not blocked this time, found 26.
- **The subtle defects did not separate skill from control.** Both the whole-site control and the stack control found every one. On this fixture the skills' advantage shows in breadth (fix-website 90 against 79), in report quality, and in focused depth, not in catching hard defects.
- **The clean-change review got worse.** With the new plain verdict, r15 committed to "the change introduces a low-severity defect": the newly disabled button has no disabled styling. The key counts any defect named in the changed lines as a false positive. The styling gap is real, so either the key should accept it as an optional suggestion, or the skill should say that polish on correct changed lines is a suggestion, not a defect.
- **Skills cost more.**
  - fix-website used 2.2 times the tokens of its control and took 3.8 times as long: 166k against 76k tokens, 7.7 against 2.0 minutes.
  - The other skill runs used 1.3 to 1.4 times the tokens of their controls.
- **One run each is still a small sample.** r14 dismissed the N+1 notes fetch as not change-induced, although the change adds it, and so lost a point it scored last time.

| Date | Skill or prompt | Version | Model | Mode, depth | Fixture | Found | Subtle found | Critical and high found | False positives | Questions asked | Behavior | Tokens | Minutes | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-04 | no skill (control) | — | Sonnet 5.5 | audit only | stack site | 15 of 17 (1 partly) | 3 of 3 | 10 of 11 | 0 | not applicable | 3 of 5 | 61k | 1.7 | r21. Security rows 13 of 14; missed B-STACK-05. Quoted the seeded admin password. |
| 2026-10-04 | website-security-auth | 1.2.0 | Sonnet 5.5 | audit only, standard | stack site | 13 of 14 (1 partly) | 3 of 3 | 10 of 11 | 0 | not applicable | 6 of 6 | 83k | 3.5 | r20. B-STACK-05 partly: the internal notes seen, but blamed on the middleware. Probes undone and listed. |
| 2026-10-04 | fix-website | 2.1.0 | Sonnet 5.5 | re-audit, standard | re-audit | 8 of 8 statuses | not applicable | 7 of 7 | 0 | not applicable | 6 of 7 | 88k | 2.6 | r19. Raised the UX-001 side effect as UX-003. SEO-002 has no proposed change. First attempt hit the usage limit and was rerun on a fresh copy. |
| 2026-10-04 | no skill (control) | — | Sonnet 5.5 | audit only | site | 26 of 29 (2 partly) | not applicable | 16 of 16 | 0 | 1 of 1 | 4 of 5 | 72k | 1.9 | r18, modernize control. B-MOD 8 of 10, B-SEC 18 of 19. Quoted seeded and default credentials. |
| 2026-10-04 | modernize-old-repo | 2.1.0 | Sonnet 5.5 | audit only, full | site | 27 of 29 (2 partly) | not applicable | 16 of 16 | 0 | 1 of 1 | 4 of 5 | 96k | 3.2 | r17. B-MOD 8 of 10, B-SEC 19 of 19. Seven findings have no proposed change. |
| 2026-10-04 | no skill (control) | — | Sonnet 5.5 | review only | change 001 | 9 of 10 | not applicable | 6 of 6 | 1 | not applicable | 4 of 5 | 55k | 1.4 | r16. Missed B-REV-08. Quoted the test password. |
| 2026-10-04 | review-changes | 1.2.0 | Sonnet 5.5 | review only | change 002 | 1 of 3 outcomes | not applicable | not applicable | 1 | not applicable | 5 of 6 | 64k | 1.3 | r15. Called the missing disabled-button styling a change-induced low defect. |
| 2026-10-04 | review-changes | 1.2.0 | Sonnet 5.5 | review only | change 001 | 9 of 10 | not applicable | 6 of 6 | 0 | not applicable | 5 of 5 | 79k | 2.3 | r14. Saw the N+1 notes fetch but did not report it. No credentials quoted. |
| 2026-10-04 | website-operations | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 4 of 6 (2 partly) | not applicable | 2 of 3 | 0 | not applicable | 6 of 6 | 73k | 2.4 | r13. Partly: never said the server ignores `.env`, and never flagged the missing lock file. 6 of 6 in the first run. |
| 2026-10-04 | website-privacy-analytics | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 7 of 7 | not applicable | 4 of 4 | 0 | 1 of 1 | 6 of 6 | 80k | 2.4 | r12. Also found B-SUB-03. |
| 2026-10-04 | website-commerce | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 9 of 9 | 2 of 2 | 7 of 7 | 0 | 1 of 1 | 5 of 6 | 78k | 2.4 | r11. Quoted the hardcoded JWT fallback. |
| 2026-10-04 | website-security-auth | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 19 of 19 | 3 of 3 | 13 of 13 | 0 | not applicable | 6 of 6 | 118k | 5.4 | r10. |
| 2026-10-04 | website-backend-reliability | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 10 of 10 | 1 of 1 | none planted | 0 | not applicable | 6 of 6 | 89k | 5.8 | r09. |
| 2026-10-04 | website-performance | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 6 of 6 | not applicable | 1 of 1 | 0 | not applicable | 6 of 6 | 82k | 2.6 | r08. |
| 2026-10-04 | website-seo-discoverability | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 6 of 6 | not applicable | 2 of 2 | 0 | 1 of 1 | 6 of 6 | 72k | 1.8 | r07. |
| 2026-10-04 | website-content-branding | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 9 of 9 | not applicable | 2 of 2 | 0 | 3 of 3 | 6 of 6 | 86k | 2.6 | r06. |
| 2026-10-04 | website-interactions | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 11 of 11 | not applicable | 2 of 2 | 0 | not applicable | 5 of 6 | 113k | 6.5 | r05. Many short findings without evidence or a proposed change. Found B-SUB-01, 02, 03, 05 as extras. |
| 2026-10-04 | website-ui-accessibility | 1.2.0 | Sonnet 5.5 | audit only, standard | site | 12 of 12 | not applicable | 3 of 3 | 0 | not applicable | 5 of 5 | 87k | 3.4 | r04. |
| 2026-10-04 | no skill (control) | — | Sonnet 5.5 | audit only | site | 79 of 95 (8 partly) | 5 of 5 | 36 of 37 | 0 | 3 of 6 | 3 of 5 | 76k | 2.0 | r03. Quoted seeded passwords and default secrets. |
| 2026-10-04 | fix-website | 2.1.0 | Sonnet 5.5 | audit only, quick | site | 83 of 95 (9 partly) | 5 of 5 | 37 of 37 | 0 | 6 of 6 | 4 of 5 | 118k | 5.0 | r02. Missed B-REL-01, B-UI-09, B-PERF-06. |
| 2026-10-04 | fix-website | 2.1.0 | Sonnet 5.5 | audit only, standard | site | 90 of 95 (2 partly) | 5 of 5 | 37 of 37 | 0 | 5 of 6 | 4 of 6 | 166k | 7.7 | r01. Missed B-REL-01, B-CON-05, B-PRIV-07. Quoted the hardcoded JWT fallback. |

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
