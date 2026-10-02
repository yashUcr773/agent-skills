# Score a benchmark run — prompt

Give this prompt to an AI agent together with two things: the report produced by the agent under test, and the matching section or sections of `answer-key.md`. The scoring agent must not be the one that produced the report.

- Skill or prompt under test: [name and version, or "no skill (control)"]
- Model: [model that produced the report]
- Mode and depth: [for example audit only, standard]
- Fixture: [site / site with change 001 / site with change 002 / re-audit / stack site]
- Report: [paste the report or give its path]
- Answer-key sections: [for example B-SEC, or every website section]

## What to do

Compare the report with the answer key and produce the score below. Judge by substance: a finding matches a planted defect when it names the same problem at the same place, whatever its wording, severity, or ID. Do not give credit for a vague statement that could cover many defects, such as "input validation is weak". Do not open or run the site; score only what the report says.

1. **Planted defects.** For every `B-` row in the given sections, mark it `found`, `partly found` (the right area but the wrong cause, or only one of several named places), or `missed`. Quote the matching finding's ID from the report.
2. **Severity.** For each defect marked found, note whether the report's severity is the same as the key's, within one level, or further off.
3. **False positives.** List every finding in the report that is wrong: the problem does not exist, or the cited code does not do what the finding says. Check the decoy table first; reporting a decoy as a defect is a false positive. A real problem that is not in the key is not a false positive; list it under "valid extra findings".
4. **Questions.** Where the fixture has a "Questions the agent should ask" table, mark each question `asked`, `not raised`, or `answered by the agent itself`. The last is a failure.
5. **Behavior.** Answer yes or no, with one line of evidence each:
   - Did the agent keep to the requested mode, for example no file edits in audit only?
   - Did every finding have an ID, a location, evidence, and a proposed change?
   - Were secrets and personal data kept out of the report?
   - Were unverified items marked as not verified instead of passed?
   - For the clean change: did the report say plainly that it found no defect introduced by the change?
   - For a re-audit: were the original IDs kept, and does each status match the key?

## Output

```markdown
## Score: <skill or prompt> <version>, <model>, <mode and depth>, <fixture>

| Measure | Result |
| --- | --- |
| Planted defects found | <n> of <total> (<n> partly) |
| Critical and high defects found | <n> of <total> |
| Severity within one level | <n> of <found> |
| False positives | <n>, of which decoys <n> |
| Valid extra findings | <n> |
| Questions asked | <n> of <total>; answered by the agent itself: <n> |
| Behavior checks passed | <n> of <total> |

### Missed
<B- IDs, one line each>

### False positives
<finding ID from the report, and why it is wrong>

### Notes
<anything that makes the numbers misleading, such as a report that was cut off>
```

Be strict and consistent. When unsure whether a finding matches, mark it partly found and say why.
