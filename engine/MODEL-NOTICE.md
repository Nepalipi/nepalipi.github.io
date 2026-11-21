# Model data and attribution

The segment model, native-unit language counts, and character counts are derived
from the **training** portion of AI4Bharat's Aksharantar Nepali dataset. No Google
responses or benchmark reference labels are used to train these models.

Dataset revision: e418c1fc928d9f5393af33268472cf20c1891be8

Source: https://huggingface.co/datasets/ai4bharat/Aksharantar/tree/e418c1fc928d9f5393af33268472cf20c1891be8

Authors: Yash Madhani, Sushane Parthan, Priyanka Bedekar, Ruchi Khapra,
Anoop Kunchukuttan, Pratyush Kumar, and Mitesh Shantadevi Khapra / AI4Bharat.

Paper: Aksharantar: Open Indic-language Transliteration datasets and models for
the Next Billion Users. https://arxiv.org/abs/2205.03018

The upstream dataset card describes manually collected data as CC-BY and mined
and existing-source packaging as CC0. The original card, including its full
licensing statements and limitations, is retained alongside this notice as
Aksharantar-README.md. Preserve that card and attribution when redistributing
the derived counts.

License information:
https://creativecommons.org/about/cclicenses/
https://creativecommons.org/publicdomain/zero/1.0/

Changes: filtering, native-unit segmentation, three supervised Viterbi alignment
passes, aggregation of segment and language counts, pruning, and browser-module
export. The inference and training algorithms were written for this project.
Version 2.1 adds TRAIN-only word-boundary-conditioned emission counts and
phonetic evidence from the original alignment seeds. Its boundary/phonetic
weights and rule-pool calibration use validation plus an existing spelling
regression contract. The global emission path remains as a second candidate
source. Its mixing offset uses validation subject to retaining top-five counts
on the observed 89-case and 148-case regression sets. No Google or reserved-confirmation references are read by
training or parameter-selection scripts.
This is not the IndicXlit neural model, a Google model, or a Google client.

Version 2.2 adds project-authored curated vocabulary and bounded verb, plural,
name-ending and suffix-repair rules. These are spelling preferences and
productive patterns, not measured word frequencies. Observed examples informed
curation and regression gates. New category probes withhold exact added aliases
but can reuse known native words and stems; they are not word-disjoint tests.
No Google response is used to build vocabulary, rules, or learned counts.

## Version 2.3 native spelling dictionary (separate data license)

`native-lexicon-data.js` is derived from the Madan Puraskar Pustakalaya Nepali
SpellChecking Dictionary 1.1, dated 2006-10-17, distributed under LGPL 2.1 in
[LibreOffice/dictionaries](https://github.com/LibreOffice/dictionaries/tree/c0865a85eb67dc377f2cf8e8fe2c4fa9e53f0dcb/ne_NP).
The original `ne_NP.dic`, contributor/acknowledgment README, complete LGPL 2.1
license and source/provenance hashes are available in `dictionary-source/` beside
this notice. Preserve those files and this attribution when redistributing the
derived dictionary. The raw dictionary is the corresponding source data;
`scripts/build-native-lexicon.py` rebuilds the derived module without network
access. It can be replaced and rebuilt independently of learned model counts.

Changes: remove Hunspell flags, normalize Unicode, remove joiners, filter words
unsupported by the explicit transliteration table, deduplicate, and derive Roman
retrieval signatures with optional final schwa/nasal notation. Affix rules are
not expanded. There are 34,288 accepted distinct spellings and 52,937 signatures.
The dictionary is old and incomplete for modern words and proper names. It
provides lexical evidence, not traffic frequencies or authoritative name
pronunciations. It was not selected or edited using Google outputs or evaluation
references. Learned TRAIN tables remain unchanged. Runtime ranking/filters were
developed using observed diagnostic failures; they are not validation-only
parameter selection and do not establish an independent accuracy improvement.

## Version 2.4.1 language rules

Project-authored rules add logical Devanagari validation, vowel-stem/past/passive
patterns, alternative informal Roman retrieval keys, bounded grammatical context
and explicit word-joining ranges. These policies were developed from observed
failures and grammatical references; they are not learned sentence models or
independent grammar-accuracy evidence. The TRAIN counts and dictionary source
data are unchanged. No external textbook text, corpus or Google labels are
bundled or trained. See `benchmarks/improvement-2.4/REPORT.md` for reference links,
development diagnostics, preserved failed candidate and remaining limitations.

## Version 2.4.2 reported spelling coverage

Five project-authored word/alias families cover reported Roman spellings and
their nominal endings. A bounded reviewed-alias policy removes unsupported
generated alternatives; a separate filter handles intrusive-य forms of known
inflections. These changes use observed examples as development regressions,
not independent evaluation labels. TRAIN counts and dictionary data are
unchanged. No Google outputs inform these aliases or filters. See
`benchmarks/improvement-2.4.2/REPORT.md` for reproducible before/after evidence
and remaining limitations.

## Version 2.4.4 everyday sentence rules

Project-authored changes compose written pronoun endings, extend bounded verb
patterns, prefer exact inflections over lossy lexical matches, add two words and
several aliases, and use a few neighboring words for ambiguous spellings.
The 60 everyday sentence references were fixed before browser capture, then
used to guide these fixes. All are now observed development cases. No learned
TRAIN counts, native dictionary source or Google responses changed or informed
the additions. See `benchmarks/improvement-2.4.4/REPORT.md` for actual sentence
outputs, the remaining ambiguity and every observed word replay change.

## Version 2.4.5 observed expanded-benchmark repairs

Authored rules extend negative-past and washing forms, scoped informal x
interpretations for known inflections, shared invitations, written spatial and
plural-pronoun stems, and bounded explicit-subject clause selection. A single
curated word family and alias changes use observed development examples.
The original 108 reference cases are retained unchanged. No Google response,
new corpus, TRAIN table or dictionary source was used or changed. See
benchmarks/improvement-2.4.5/REPORT.md for preserved before/after evidence,
primary usage references, individual preservation gates and remaining limits.

## Version 2.4.7 scoped orthography corrections

Eight authored word/alias families (541 curated spellings total), five written
verb stems, known-vocabulary adjective endings and local saved-choice guards
address observed spelling failures. The policy follows the ordinary य / ए
versus Sanskrit-derived ये distinction in the Nepal Law Commission drafting
guide, section 4.11; reference links and limits are in
benchmarks/improvement-2.4.7/REPORT.md. These are development-informed rules,
not learned frequencies or a general grammar model. TRAIN tables, native
spelling dictionary source and Google data are unchanged. Candidate 2.4.6 and
its first captures are preserved separately from final 2.4.7.

## Version 2.4.8 usage robustness

Three authored written verb stems reuse productive paradigms, evidential-past
endings compose from written stems, and bounded context/joining tolerates
horizontal whitespace and one supported adverb. No full-name or whole-inflection
aliases, TRAIN counts or dictionary source changes are included. The wider
dictionary-ranking experiment was rejected after it changed supported readings;
all three attempts and first results remain preserved. The final source freeze
precedes confirmation queries, apart from one disclosed older-regression input.
The author-created confirmation scores are unchanged; they do not establish a
new unseen-input accuracy gain. See benchmarks/improvement-2.4.8/REPORT.md.
