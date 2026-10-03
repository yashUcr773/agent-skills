# Benchmark websites

Two small sites seeded with defects in every area the skills in this repository cover. Use them to see what a skill finds, what it misses, what it reports wrongly, and whether a change to a prompt makes it better or worse.

**Both sites are deliberately insecure. Run them only on your own machine and never deploy them.** Every credential in them is fake.

## What is here

| Path | Purpose |
| --- | --- |
| `site/` | "Fernway Plants", a React, Express, and SQLite shop that looks like an abandoned prototype. It installs, builds, and runs. |
| `stack-site/` | "Fernway Care Club", a Next.js app on Supabase and Firebase that runs against local Docker services. It exercises the stack-specific checks. |
| `changes/001-order-notes.patch` | A seeded bad change to `site/` for `review-changes`, with the author's description in `001-order-notes.md`. |
| `changes/002-stock-label.patch` | A correct change to `site/`, to see whether a review invents problems. Description in `002-stock-label.md`. |
| `changes/003-partial-fixes.patch`, `reaudit/` | An earlier findings file and the owner's partial fixes, for re-audit mode. |
| `answer-key.md` | Every planted defect with its location and severity, the decoys, the questions a good audit asks, and the expected re-audit statuses. |
| `score-run.md` | A prompt that scores a report against the answer key. |
| `results.md` | The log of scored runs. |
| `setup.sh` | Copies a fixture into a fresh git repository outside this one. |

## Set up a fixture

Always work on a copy, so the agent cannot read the answer key and has a clean baseline:

```bash
benchmark/setup.sh /tmp/fernway                      # the shop, for website skills and modernize-old-repo
benchmark/setup.sh /tmp/fernway-bad --with-change    # the shop with the bad change uncommitted
benchmark/setup.sh /tmp/fernway-ok --clean-change    # the shop with the correct change uncommitted
benchmark/setup.sh /tmp/fernway-again --reaudit      # the shop after partial fixes, with the earlier findings file
benchmark/setup.sh /tmp/fernway-stack --stack        # the Next.js, Supabase, and Firebase site
```

To run the shop in a copy:

```bash
npm install
npm run build
npm start        # http://localhost:4000
```

Seeded accounts: `admin@fernway.test` / `admin123`, `maya@example.test` / `password1`, `leo@example.test` / `password2`. Delete the `data/` folder to reset the database.

The stack site needs Docker; its own `README.md` lists the commands. The first start downloads about 3 GB of Supabase images.

Several stack runs can share one Supabase stack and Firestore emulator, but an agent's probes can change the shared data. Reset it before each run, from a copy of the stack site with the services running:

```bash
npx supabase db reset      # reapplies the migrations and empties the tables
npm run seed               # recreates the three members, notes, and reminders
curl -X DELETE "http://127.0.0.1:8080/emulator/v1/projects/demo-fernway/databases/(default)/documents"
```

## Run a skill

Open the copy in your agent and ask for an audit. Use audit-only mode so runs are comparable:

| Skill | Fixture | Request | Scored against |
| --- | --- | --- | --- |
| `fix-website` | shop | "Use fix-website in audit-only mode on this repository." Repeat at quick depth to test the quick pass. | Every `B-` section for the shop except `B-MOD` and `B-REV`, plus decoys, questions, and `B-SUB-01` to `05` |
| A focused `website-*` skill | shop | "Use website-security-auth in audit-only mode on this repository." | That skill's section, plus decoys and the `B-SUB` rows whose area names the skill |
| `website-security-auth`, `-performance`, `-seo-discoverability`, `-backend-reliability` | stack site | The same request in the stack copy. | `B-STACK`, by the check each row names, and `B-SUB-06` to `08` by area |
| `modernize-old-repo` | shop | "Use modernize-old-repo in audit-only mode on this repository." | `B-MOD`, plus the security section |
| `review-changes` | shop with change 001 | "Use review-changes on the uncommitted changes," followed by the description in `changes/001-order-notes.md`. | `B-REV` |
| `review-changes` | shop with change 002 | The same, with the description in `changes/002-stock-label.md`. | "Clean change" |
| `fix-website` or a focused skill, re-audit mode | shop after partial fixes | "Use fix-website in re-audit mode with website-audit-findings.md." | "Re-audit" |
| No skill (control) | any | "Audit this website and report the problems you find. Do not change any files." | The same sections as the skill it is compared with |

To test a prompt instead of a skill, paste the prompt from `prompts/` and fill in its request details.

Run the control. Without it there is no way to tell what a skill adds over the model on its own.

Practical notes for running several copies at once:

- Give each shop copy its own port with `PORT=41NN benchmark/setup.sh <dir>`, and ask the agent to stop the processes it starts by their process IDs. A broad `pkill` stops other runs' servers.
- Ask the agent to confirm a vulnerability with one harmless request and not to write exploit scripts. Some models' safeguards stop a run that builds exploits; the first run's modernize control was stopped this way.
- Record the tokens and time each run used next to its score, so the cost of a skill can be weighed against what it adds.

## Score a run

Give `score-run.md` to a different agent together with the report and the matching answer-key sections. It reports:

1. **Recall.** The planted defects the report found, partly found, and missed.
2. **Severity.** Whether each found defect was rated within one level of the key.
3. **False positives.** Wrong findings, including any decoy reported as a defect. A real problem that is not in the key is not a false positive.
4. **Questions.** Whether the agent asked about the things it should not decide itself.
5. **Behavior.** Whether it kept to the mode, kept secrets out of the report, and marked unverified items as such.

Record the result in `results.md`. One run is a small sample; repeat it before concluding that a change helped.

## Security alerts on this repository

The fixtures are meant to look vulnerable, so automated scanners will react to them:

- **Dependency alerts.** `site/package.json` pins old packages with published advisories on purpose. If Dependabot alerts are enabled for the repository, dismiss the alerts for that path, or add an alert rule that dismisses alerts whose manifest is under `benchmark/`. Do not upgrade the packages; that would remove planted defects.
- **Secret scanning.** `.github/secret_scanning.yml` excludes `benchmark/` from GitHub secret scanning. Other scanners need their own allowlist for that path. The values are placeholders, not credentials.

## Limits

- The defects were planted by hand and are easier to spot than those in a large real codebase. A high score here does not show that a skill is complete. The `B-SUB` rows were added because a plain request with no skill found most of the others; they are the better measure of what a skill adds.
- Several checks cannot be exercised: there is no real payment provider, email service, CDN, or production deployment, and the Stripe, Clerk, Auth.js, Auth0, and Better Auth checks have no fixture.
- The sites have not been reviewed for defects beyond those planted. Expect an agent to find more.
