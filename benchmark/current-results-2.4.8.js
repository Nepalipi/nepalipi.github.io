export default {
  "engineVersion": "2.4.8",
  "capturedAt": "2026-11-12T14:05:36.782640+00:00",
  "wordRecordedAt": "2026-11-12T14:05:48.231Z",
  "experiment": "editor-2.4.8-v1",
  "tracks": {
    "sentences": {
      "n": 64,
      "matched": 59,
      "errors": 0,
      "edits": 6,
      "referenceLength": 1404,
      "codepointCER": 0.004273504273504274
    },
    "choices": {
      "n": 24,
      "matched": 23,
      "errors": 0,
      "withinFive": 24,
      "mrr": 0.9791666666666666
    },
    "workflows": {
      "n": 20,
      "matched": 19,
      "errors": 0
    }
  },
  "words": [
    {
      "id": "google-comparison",
      "n": 512,
      "first": 265,
      "withinFive": 374
    },
    {
      "id": "typing-check",
      "n": 148,
      "first": 148,
      "withinFive": 148
    },
    {
      "id": "public-test",
      "n": 4085,
      "first": 2212,
      "withinFive": 2972
    },
    {
      "id": "development",
      "n": 60,
      "first": 59,
      "withinFive": 60
    },
    {
      "id": "confirmation",
      "n": 41,
      "first": 28,
      "withinFive": 41
    },
    {
      "id": "fresh-regression",
      "n": 89,
      "first": 64,
      "withinFive": 88
    },
    {
      "id": "categories",
      "n": 97,
      "first": 85,
      "withinFive": 92
    }
  ],
  "sourceHashes": {
    "benchmarks/editor-2.4.8-v1/summary.json": "f65fb417823ebe60c227ab63fdda4e2774a59d34fbd07a9eac2321477680bfcd",
    "benchmarks/improvement-2.4.8/word-replay.json": "4bab1a6e76ba1df89455aa9bb052020fdfde6ec6b1027ef64ed38b010f1adb00",
    "benchmarks/improvement-2.4.8/usage-summary.json": "575f28244f4a1a2c471bc5725c138dbc5e278ceb417c8ff96ca1a6e8316e98a9"
  },
  "usage": {
    "engineVersion": "2.4.8",
    "previousVersion": "2.4.7",
    "scope": "Authored everyday usage diagnostics with a reserved confirmation split. Known vocabulary is allowed. Not independent native-speaker annotation or word-disjoint evaluation. No cases selected by output quality.",
    "evaluationNotes": {
      "confirmationExposure": [
        {
          "id": "usage-word-040",
          "roman": "rokinchha",
          "reason": "This locked confirmation input also appears in the older category suite. The routine pre-freeze regression replay queries it. Retain it in the 24-case denominator and report the 23 non-overlapping confirmation words separately. No references were changed and its output did not guide the fix."
        }
      ],
      "annotationReview": [
        {
          "id": "usage-word-024",
          "reason": "Proper-name spelling convention मृण्मय versus returned मृन्मय needs independent review. Preserve the locked reference and both candidate lists; do not add a whole-name alias."
        }
      ],
      "policy": "All inputs remain scored. The confirmation set is authored and not independently annotated; it is not a claim of blind, word-disjoint or traffic-representative accuracy."
    },
    "splits": {
      "development": {
        "before": {
          "sentences": {
            "summary": {
              "n": 16,
              "matched": 12,
              "errors": 0,
              "edits": 4,
              "referenceLength": 307,
              "codepointCER": 0.013029315960912053
            },
            "categories": {
              "places": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 33,
                "codepointCER": 0.0
              },
              "administration": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 1,
                "referenceLength": 46,
                "codepointCER": 0.021739130434782608
              },
              "learning": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 49,
                "codepointCER": 0.0
              },
              "errands": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 35,
                "codepointCER": 0.0
              },
              "food": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 41,
                "codepointCER": 0.0
              },
              "household": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 1,
                "referenceLength": 43,
                "codepointCER": 0.023255813953488372
              },
              "work": {
                "n": 2,
                "matched": 0,
                "errors": 0,
                "edits": 2,
                "referenceLength": 32,
                "codepointCER": 0.0625
              },
              "names": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 28,
                "codepointCER": 0.0
              }
            }
          },
          "choices": {
            "summary": {
              "n": 24,
              "matched": 19,
              "errors": 0,
              "withinFive": 22,
              "mrr": 0.8368055555555555
            },
            "categories": {
              "case endings": {
                "n": 8,
                "matched": 7,
                "errors": 0,
                "withinFive": 8,
                "mrr": 0.90625
              },
              "verb forms": {
                "n": 8,
                "matched": 6,
                "errors": 0,
                "withinFive": 7,
                "mrr": 0.7916666666666666
              },
              "informal spellings": {
                "n": 4,
                "matched": 3,
                "errors": 0,
                "withinFive": 3,
                "mrr": 0.75
              },
              "names": {
                "n": 4,
                "matched": 3,
                "errors": 0,
                "withinFive": 4,
                "mrr": 0.875
              }
            }
          }
        },
        "after": {
          "sentences": {
            "summary": {
              "n": 16,
              "matched": 15,
              "errors": 0,
              "edits": 1,
              "referenceLength": 307,
              "codepointCER": 0.003257328990228013
            },
            "categories": {
              "places": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 33,
                "codepointCER": 0.0
              },
              "administration": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 1,
                "referenceLength": 46,
                "codepointCER": 0.021739130434782608
              },
              "learning": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 49,
                "codepointCER": 0.0
              },
              "errands": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 35,
                "codepointCER": 0.0
              },
              "food": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 41,
                "codepointCER": 0.0
              },
              "household": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 43,
                "codepointCER": 0.0
              },
              "work": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 32,
                "codepointCER": 0.0
              },
              "names": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 28,
                "codepointCER": 0.0
              }
            }
          },
          "choices": {
            "summary": {
              "n": 24,
              "matched": 22,
              "errors": 0,
              "withinFive": 24,
              "mrr": 0.9479166666666666
            },
            "categories": {
              "case endings": {
                "n": 8,
                "matched": 7,
                "errors": 0,
                "withinFive": 8,
                "mrr": 0.90625
              },
              "verb forms": {
                "n": 8,
                "matched": 8,
                "errors": 0,
                "withinFive": 8,
                "mrr": 1.0
              },
              "informal spellings": {
                "n": 4,
                "matched": 4,
                "errors": 0,
                "withinFive": 4,
                "mrr": 1.0
              },
              "names": {
                "n": 4,
                "matched": 3,
                "errors": 0,
                "withinFive": 4,
                "mrr": 0.875
              }
            }
          }
        }
      },
      "confirmation": {
        "before": {
          "sentences": {
            "summary": {
              "n": 16,
              "matched": 14,
              "errors": 0,
              "edits": 4,
              "referenceLength": 348,
              "codepointCER": 0.011494252873563218
            },
            "categories": {
              "places": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 3,
                "referenceLength": 47,
                "codepointCER": 0.06382978723404255
              },
              "administration": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 1,
                "referenceLength": 45,
                "codepointCER": 0.022222222222222223
              },
              "learning": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 44,
                "codepointCER": 0.0
              },
              "errands": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 45,
                "codepointCER": 0.0
              },
              "food": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 33,
                "codepointCER": 0.0
              },
              "household": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 34,
                "codepointCER": 0.0
              },
              "work": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 53,
                "codepointCER": 0.0
              },
              "names": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 47,
                "codepointCER": 0.0
              }
            }
          },
          "choices": {
            "summary": {
              "n": 24,
              "matched": 22,
              "errors": 0,
              "withinFive": 23,
              "mrr": 0.9270833333333334
            },
            "categories": {
              "case endings": {
                "n": 8,
                "matched": 7,
                "errors": 0,
                "withinFive": 8,
                "mrr": 0.90625
              },
              "verb forms": {
                "n": 8,
                "matched": 8,
                "errors": 0,
                "withinFive": 8,
                "mrr": 1.0
              },
              "informal spellings": {
                "n": 4,
                "matched": 4,
                "errors": 0,
                "withinFive": 4,
                "mrr": 1.0
              },
              "names": {
                "n": 4,
                "matched": 3,
                "errors": 0,
                "withinFive": 3,
                "mrr": 0.75
              }
            }
          },
          "unexposedWords": {
            "n": 23,
            "matched": 21,
            "errors": 0,
            "withinFive": 22,
            "mrr": 0.9239130434782609
          }
        },
        "after": {
          "sentences": {
            "summary": {
              "n": 16,
              "matched": 14,
              "errors": 0,
              "edits": 4,
              "referenceLength": 348,
              "codepointCER": 0.011494252873563218
            },
            "categories": {
              "places": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 3,
                "referenceLength": 47,
                "codepointCER": 0.06382978723404255
              },
              "administration": {
                "n": 2,
                "matched": 1,
                "errors": 0,
                "edits": 1,
                "referenceLength": 45,
                "codepointCER": 0.022222222222222223
              },
              "learning": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 44,
                "codepointCER": 0.0
              },
              "errands": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 45,
                "codepointCER": 0.0
              },
              "food": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 33,
                "codepointCER": 0.0
              },
              "household": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 34,
                "codepointCER": 0.0
              },
              "work": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 53,
                "codepointCER": 0.0
              },
              "names": {
                "n": 2,
                "matched": 2,
                "errors": 0,
                "edits": 0,
                "referenceLength": 47,
                "codepointCER": 0.0
              }
            }
          },
          "choices": {
            "summary": {
              "n": 24,
              "matched": 22,
              "errors": 0,
              "withinFive": 23,
              "mrr": 0.9270833333333334
            },
            "categories": {
              "case endings": {
                "n": 8,
                "matched": 7,
                "errors": 0,
                "withinFive": 8,
                "mrr": 0.90625
              },
              "verb forms": {
                "n": 8,
                "matched": 8,
                "errors": 0,
                "withinFive": 8,
                "mrr": 1.0
              },
              "informal spellings": {
                "n": 4,
                "matched": 4,
                "errors": 0,
                "withinFive": 4,
                "mrr": 1.0
              },
              "names": {
                "n": 4,
                "matched": 3,
                "errors": 0,
                "withinFive": 3,
                "mrr": 0.75
              }
            }
          },
          "unexposedWords": {
            "n": 23,
            "matched": 21,
            "errors": 0,
            "withinFive": 22,
            "mrr": 0.9239130434782609
          }
        }
      }
    },
    "sourceHashes": {
      "benchmarks/improvement-2.4.8/usage-manifest.json": "53914ac0e804067bcee00b930a116ac790603f124444eedc36ea45b78381ca0b",
      "benchmarks/improvement-2.4.8/prior-input-exposure.json": "e4bf18f3df2bf960d6e809f9d6f5688c7a08d9f24e5dfec350a53dceb6c6db57",
      "benchmarks/improvement-2.4.8/engine-freeze.json": "c7038430e9f0c2c11bc968fd1f5309f6f14d0f390ba628e4c3e14752c56822b3",
      "benchmarks/improvement-2.4.8/confirmation-query-start.json": "dc82826799a20f4cd3606ee22eea05f0a8e5dc7e258b3114596830080ad959ff",
      "benchmarks/improvement-2.4.8/evaluation-notes.json": "e7aa47d6d9c6b92b7ca29073031ecde0c5c8efcc733d48a059f0cd17a17a3421",
      "benchmarks/improvement-2.4.8/development-before/manifest.json": "a29d1e81caedc4a81b45ffc01b64091b9db71aef38bbbc9b04a175a48eeca32d",
      "benchmarks/improvement-2.4.8/development-before/freeze.json": "cc99b791e26d8f26a1729e63f60d21a3d8c97cb67abe966f1bcf067553e73c0b",
      "benchmarks/improvement-2.4.8/development-before/verified-run.json": "5009aa1969113d1e4a6ee22aad109abfd79552bfdc25ed6e247a9762170ac44c",
      "benchmarks/improvement-2.4.8/development-after/manifest.json": "a29d1e81caedc4a81b45ffc01b64091b9db71aef38bbbc9b04a175a48eeca32d",
      "benchmarks/improvement-2.4.8/development-after/freeze.json": "21cdfd1108bbbee149ad3cc2a82b18afe8591a44fd8603027cc6493963fd1609",
      "benchmarks/improvement-2.4.8/development-after/verified-run.json": "990d0d72e3208334e2b36f665c3cf9d83045ec4ee3e68fcd63ba20acdc12afb4",
      "benchmarks/improvement-2.4.8/confirmation-before/manifest.json": "3c68999db737a69948e0559f733c1ad1757750665cf68fc6849b6d3ec0199374",
      "benchmarks/improvement-2.4.8/confirmation-before/freeze.json": "fbd2f35c8c5bb2cd8aea1740669562ad6e06b4a338ee7afa4d284d11455efbe9",
      "benchmarks/improvement-2.4.8/confirmation-before/verified-run.json": "46468433f8d0a62750ee29b9a76fec2a0847dbf5bb87244af02e2d7463fcdda5",
      "benchmarks/improvement-2.4.8/confirmation-after/manifest.json": "3c68999db737a69948e0559f733c1ad1757750665cf68fc6849b6d3ec0199374",
      "benchmarks/improvement-2.4.8/confirmation-after/freeze.json": "eecb2399fbbecb70495e70f4c5bd0cdce1ff143273b25e912bf8c6ed8d48b6a8",
      "benchmarks/improvement-2.4.8/confirmation-after/verified-run.json": "1a4f32daec0f8a2a984ffe56ee9a60d4c26b2fdd89365ff2214a5c98aae7b28a"
    }
  }
};
