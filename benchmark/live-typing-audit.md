# Live typing audit — 2026-11-12

The previous headline overstated the completed-word comparison. The arithmetic
checks reference agreement correctly, but that is insufficient evidence for the
quality of the suggestion list or the writing experience. A list can score
100% while containing four implausible alternatives for every intended word.
The observed typing suites were also used during development.

## Reproduced in the actual local editor, version 2.2.0

- `naam`: first `नाम`, followed by `न्यायाम`, `नाम्`, `नयाम`, `नायम`.
- `ke`: `के`, `कले`, `क्ये`, `क`, `क्ले`.
- Deliberately selecting `ma` → `म`, then reloading, changes `maa` from `मा`
  to `म`. Preference keys collapse repeated vowels and other distinct letters.
- Typing `mero ghar kathmandu ma chha ` commits `मेरो घर काठमाडौं म छ `.
  The ambiguous token `ma` is ranked without sentence context; `मा` is an
  alternative, but the automatic choice is inappropriate for the intended
  locative sentence. This is a context limitation, not a failed token reference.

The two model paths can promote emissions containing untyped sounds. The
unconstrained global model competes above the literal decoder, so plausible
native-unit sequences can displace faithful readings of the Roman input.

## Version 2.3 changes

The current editor fixes the preference collision and checks phonetic/lexical
evidence before returning alternatives. `ko` and `ke` each return one candidate;
`naam` returns `नाम`, `नाम्`; `shristi` ranks `सृष्टि` first; `xamata` returns
`क्षमता`. The bundled native spelling dictionary is dated and incomplete,
especially for names; it is evidence, not a frequency ranking.

All seven observed suites were replayed separately. Category probes change
80→85 first and 88→92 within five; the public split changes 2196→2207 first and
2969→2970 within five. The latter includes 69 lost and 80 gained first matches.
These are development diagnostics, not an independent quality rating.

Context remains unresolved: the locative `ma` sentence above still needs manual
selection of `मा`. Some name alternatives are still poor. No Google Translate
UI observations have been added. Saved leaderboard data remains frozen 2.2.

`scripts/audit-live-typing.py` captures every keystroke, visible candidate list,
committed text and preference replay in a fresh browser profile. Run it against
the local server, with Playwright installed, passing a new output file. Captures
are development diagnostics, not new independent quality scores.

## Google comparison status

The old Google files are dated Input Tools endpoint responses for isolated
tokens. They do not demonstrate the behavior of Google Translate's live UI.
Browser control was disabled in the execution environment, including the in-app
browser, so no actual Translate UI observation is claimed in this audit.

Before claiming comparable suggestion quality, compare the same keystrokes and
context in both interfaces; review every candidate for phonetic faithfulness and
linguistic plausibility; test preferences and corrections; and obtain independent
Nepali-speaker judgments. Publish missing observations and regressions along
with improvements. Keep all previous snapshots and scores unchanged.
