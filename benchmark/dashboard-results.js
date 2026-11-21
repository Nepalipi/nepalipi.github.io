export default {
  "schemaVersion": 1,
  "engineVersion": "2.4.8",
  "previousVersion": "2.4.7",
  "sets": [
    {
      "id": "development",
      "label": "Improvement checks",
      "description": "Examples used while building the fixes.",
      "capturedAt": "2026-11-12T14:05:10.054635+00:00",
      "before": {
        "sentences": {
          "n": 16,
          "matched": 12,
          "errors": 0,
          "edits": 4,
          "referenceLength": 307,
          "codepointCER": 0.013029315960912053
        },
        "choices": {
          "n": 24,
          "matched": 19,
          "errors": 0,
          "withinFive": 22,
          "mrr": 0.8368055555555555
        },
        "workflows": {
          "n": 0,
          "matched": 0,
          "errors": 0
        }
      },
      "after": {
        "sentences": {
          "n": 16,
          "matched": 15,
          "errors": 0,
          "edits": 1,
          "referenceLength": 307,
          "codepointCER": 0.003257328990228013
        },
        "choices": {
          "n": 24,
          "matched": 22,
          "errors": 0,
          "withinFive": 24,
          "mrr": 0.9479166666666666
        },
        "workflows": {
          "n": 0,
          "matched": 0,
          "errors": 0
        }
      },
      "cases": [
        {
          "id": "usage-word-001",
          "kind": "choices",
          "category": "case endings",
          "input": "baithakma",
          "context": "",
          "references": [
            "बैठकमा"
          ],
          "before": {
            "text": "बैठकमा",
            "candidates": [
              "बैठकमा",
              "बैठकम",
              "बैठाकमा",
              "बैठक्मा",
              "बैठाकम"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बैठकमा",
            "candidates": [
              "बैठकमा",
              "बैठकम",
              "बैठाकमा",
              "बैठक्मा",
              "बैठाकम"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-002",
          "kind": "choices",
          "category": "case endings",
          "input": "prayogshalako",
          "context": "",
          "references": [
            "प्रयोगशालाको"
          ],
          "before": {
            "text": "प्रयोगशालाको",
            "candidates": [
              "प्रयोगशालाको",
              "प्रयोगशालको",
              "प्रायोगशालाको",
              "प्रयोगशलाको",
              "परयोगशालाको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "प्रयोगशालाको",
            "candidates": [
              "प्रयोगशालाको",
              "प्रयोगशालको",
              "प्रायोगशालाको",
              "प्रयोगशलाको",
              "परयोगशालाको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-003",
          "kind": "choices",
          "category": "case endings",
          "input": "pratibedanlai",
          "context": "",
          "references": [
            "प्रतिवेदनलाई"
          ],
          "before": {
            "text": "प्रतिबेदनलाई",
            "candidates": [
              "प्रतिबेदनलाई",
              "प्रतिबेदानलाई",
              "प्रतिबेदनलाइ",
              "प्रतिवेदनलाई",
              "प्रतिबेदनालाई"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 4,
              "reciprocalRank": 0.25
            }
          },
          "after": {
            "text": "प्रतिबेदनलाई",
            "candidates": [
              "प्रतिबेदनलाई",
              "प्रतिबेदानलाई",
              "प्रतिबेदनलाइ",
              "प्रतिवेदनलाई",
              "प्रतिबेदनालाई"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 4,
              "reciprocalRank": 0.25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-004",
          "kind": "choices",
          "category": "case endings",
          "input": "prashikshansanga",
          "context": "",
          "references": [
            "प्रशिक्षणसँग"
          ],
          "before": {
            "text": "प्रशिक्षणसँग",
            "candidates": [
              "प्रशिक्षणसँग",
              "प्रशिक्षणसंग",
              "प्रशिक्षाणसँग",
              "प्रशिक्षनसँग",
              "प्रशिक्षणसङ्ग"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "प्रशिक्षणसँग",
            "candidates": [
              "प्रशिक्षणसँग",
              "प्रशिक्षणसंग",
              "प्रशिक्षाणसँग",
              "प्रशिक्षनसँग",
              "प्रशिक्षणसङ्ग"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-005",
          "kind": "choices",
          "category": "case endings",
          "input": "aspataldekhi",
          "context": "",
          "references": [
            "अस्पतालदेखि"
          ],
          "before": {
            "text": "अस्पतालदेखि",
            "candidates": [
              "अस्पतालदेखि",
              "आस्पतालदेखि",
              "अस्पतालदेखी",
              "अस्पातालदेखि",
              "अस्पटलदेखि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "अस्पतालदेखि",
            "candidates": [
              "अस्पतालदेखि",
              "आस्पतालदेखि",
              "अस्पतालदेखी",
              "अस्पातालदेखि",
              "अस्पटलदेखि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-006",
          "kind": "choices",
          "category": "case endings",
          "input": "samitibata",
          "context": "",
          "references": [
            "समितिबाट"
          ],
          "before": {
            "text": "समितिबाट",
            "candidates": [
              "समितिबाट",
              "समितीबाट",
              "सामितिबाट",
              "समिटीबाट",
              "सामिटीबाट"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "समितिबाट",
            "candidates": [
              "समितिबाट",
              "समितीबाट",
              "सामितिबाट",
              "समिटीबाट",
              "सामिटीबाट"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-007",
          "kind": "choices",
          "category": "case endings",
          "input": "suchanasamma",
          "context": "",
          "references": [
            "सूचनासम्म"
          ],
          "before": {
            "text": "सूचनासम्म",
            "candidates": [
              "सूचनासम्म",
              "सुचनासम्म",
              "सूचनासम्मा",
              "सूचनसम्म",
              "सुचनासम्मा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सूचनासम्म",
            "candidates": [
              "सूचनासम्म",
              "सुचनासम्म",
              "सूचनासम्मा",
              "सूचनसम्म",
              "सुचनासम्मा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-008",
          "kind": "choices",
          "category": "case endings",
          "input": "awasthama",
          "context": "",
          "references": [
            "अवस्थामा"
          ],
          "before": {
            "text": "अवस्थामा",
            "candidates": [
              "अवस्थामा",
              "आवस्थामा",
              "अवस्थाम",
              "अवस्थमा",
              "अवास्थामा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "अवस्थामा",
            "candidates": [
              "अवस्थामा",
              "आवस्थामा",
              "अवस्थाम",
              "अवस्थमा",
              "अवास्थामा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-009",
          "kind": "choices",
          "category": "verb forms",
          "input": "pathauchhu",
          "context": "",
          "references": [
            "पठाउँछु"
          ],
          "before": {
            "text": "पठाउछु",
            "candidates": [
              "पठाउछु",
              "पाठाउछु",
              "पठाउँछु",
              "पथाउछु",
              "पाठउछु"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 3,
              "reciprocalRank": 0.3333333333333333
            }
          },
          "after": {
            "text": "पठाउँछु",
            "candidates": [
              "पठाउँछु",
              "पठाउछु",
              "पाठाउछु",
              "पथाउछु",
              "पाठउछु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-010",
          "kind": "choices",
          "category": "verb forms",
          "input": "bujheko",
          "context": "",
          "references": [
            "बुझेको"
          ],
          "before": {
            "text": "बुझेको",
            "candidates": [
              "बुझेको",
              "बूझेको",
              "ब्युझेको",
              "ब्यूझेको",
              "वुझेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बुझेको",
            "candidates": [
              "बुझेको",
              "बूझेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-011",
          "kind": "choices",
          "category": "verb forms",
          "input": "sakchhau",
          "context": "हामी ",
          "references": [
            "सक्छौँ"
          ],
          "before": {
            "text": "सक्छौ",
            "candidates": [
              "सक्छौ",
              "साक्छौ",
              "सक्छौं",
              "सकेछौ",
              "सक्छु"
            ],
            "score": {
              "matched": false,
              "withinFive": false,
              "rank": 0,
              "reciprocalRank": 0
            }
          },
          "after": {
            "text": "सक्छौँ",
            "candidates": [
              "सक्छौँ",
              "सक्छौ",
              "साक्छौ",
              "सक्छौं",
              "सक्छु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-012",
          "kind": "choices",
          "category": "verb forms",
          "input": "tirnu",
          "context": "",
          "references": [
            "तिर्नु"
          ],
          "before": {
            "text": "तिर्नु",
            "candidates": [
              "तिर्नु",
              "तीर्नु",
              "टिर्नु",
              "तिर्नू",
              "तीर्नू"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "तिर्नु",
            "candidates": [
              "तिर्नु",
              "तीर्नु",
              "टिर्नु",
              "तिर्नू",
              "तीर्नू"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-013",
          "kind": "choices",
          "category": "verb forms",
          "input": "lagchha",
          "context": "",
          "references": [
            "लाग्छ"
          ],
          "before": {
            "text": "लाग्छ",
            "candidates": [
              "लाग्छ",
              "लग्छ",
              "लागेछ",
              "लागछ",
              "लगछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "लाग्छ",
            "candidates": [
              "लाग्छ",
              "लग्छ",
              "लागेछ",
              "लागछ",
              "लगछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-014",
          "kind": "choices",
          "category": "verb forms",
          "input": "aaunu",
          "context": "",
          "references": [
            "आउनु"
          ],
          "before": {
            "text": "आउनु",
            "candidates": [
              "आउनु",
              "आउँनु",
              "आउनू",
              "आउँउ",
              "आउँऊ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आउनु",
            "candidates": [
              "आउनु",
              "आउँनु",
              "आउनू",
              "आउँउ",
              "आउँऊ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-015",
          "kind": "choices",
          "category": "verb forms",
          "input": "kheldai",
          "context": "",
          "references": [
            "खेल्दै"
          ],
          "before": {
            "text": "खेल्दै",
            "candidates": [
              "खेल्दै",
              "खेलाडी",
              "खेलडाई",
              "खेलदै",
              "खेल्दाइ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "खेल्दै",
            "candidates": [
              "खेल्दै",
              "खेलाडी",
              "खेलडाई",
              "खेलदै",
              "खेल्दाइ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-016",
          "kind": "choices",
          "category": "verb forms",
          "input": "rokeko",
          "context": "",
          "references": [
            "रोकेको"
          ],
          "before": {
            "text": "रोकेको",
            "candidates": [
              "रोकेको",
              "रोंकेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "रोकेको",
            "candidates": [
              "रोकेको",
              "रोंकेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-017",
          "kind": "choices",
          "category": "informal spellings",
          "input": "hunxa",
          "context": "",
          "references": [
            "हुन्छ"
          ],
          "before": {
            "text": "हुन्छ",
            "candidates": [
              "हुन्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "हुन्छ",
            "candidates": [
              "हुन्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-018",
          "kind": "choices",
          "category": "informal spellings",
          "input": "parxa",
          "context": "",
          "references": [
            "पर्छ"
          ],
          "before": {
            "text": "पर्छ",
            "candidates": [
              "पर्छ",
              "पर्चा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पर्छ",
            "candidates": [
              "पर्छ",
              "पर्चा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-019",
          "kind": "choices",
          "category": "informal spellings",
          "input": "basxa",
          "context": "",
          "references": [
            "बस्छ"
          ],
          "before": {
            "text": "बस्छ",
            "candidates": [
              "बस्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बस्छ",
            "candidates": [
              "बस्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-020",
          "kind": "choices",
          "category": "informal spellings",
          "input": "bhayechha",
          "context": "",
          "references": [
            "भएछ"
          ],
          "before": {
            "text": "भयेछ",
            "candidates": [
              "भयेछ",
              "भइएछ",
              "भाइएछ",
              "भायेछ",
              "भ्याइएछ"
            ],
            "score": {
              "matched": false,
              "withinFive": false,
              "rank": 0,
              "reciprocalRank": 0
            }
          },
          "after": {
            "text": "भएछ",
            "candidates": [
              "भएछ",
              "भाञेछ",
              "भञेछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-021",
          "kind": "choices",
          "category": "names",
          "input": "hridaya",
          "context": "",
          "references": [
            "हृदय"
          ],
          "before": {
            "text": "हृदय",
            "candidates": [
              "हृदय",
              "हृदया",
              "हृदाय",
              "हरिदाय",
              "हरिदय"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "हृदय",
            "candidates": [
              "हृदय",
              "हृदया",
              "हृदाय",
              "हरिदाय",
              "हरिदय"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-022",
          "kind": "choices",
          "category": "names",
          "input": "kaustubh",
          "context": "",
          "references": [
            "कौस्तुभ"
          ],
          "before": {
            "text": "कौस्तुभ",
            "candidates": [
              "कौस्तुभ",
              "कौस्तुभ्",
              "कौस्तुभा",
              "कस्तुभ",
              "काउस्तुभ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "कौस्तुभ",
            "candidates": [
              "कौस्तुभ",
              "कौस्तुभ्",
              "कौस्तुभा",
              "कस्तुभ",
              "काउस्तुभ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-023",
          "kind": "choices",
          "category": "names",
          "input": "saumya",
          "context": "",
          "references": [
            "सौम्य"
          ],
          "before": {
            "text": "सौम्य",
            "candidates": [
              "सौम्य",
              "समय",
              "सौमय",
              "साम्य",
              "सौम्या"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सौम्य",
            "candidates": [
              "सौम्य",
              "समय",
              "सौमय",
              "साम्य",
              "सौम्या"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-024",
          "kind": "choices",
          "category": "names",
          "input": "mrinmay",
          "context": "",
          "references": [
            "मृण्मय"
          ],
          "before": {
            "text": "मृन्मय",
            "candidates": [
              "मृन्मय",
              "मृण्मय",
              "मरिणमय",
              "मृङ्मय",
              "मृणमय"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 2,
              "reciprocalRank": 0.5
            }
          },
          "after": {
            "text": "मृन्मय",
            "candidates": [
              "मृन्मय",
              "मृण्मय",
              "मरिणमय",
              "मृङ्मय",
              "मृणमय"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 2,
              "reciprocalRank": 0.5
            }
          },
          "review": "Proper-name spelling convention मृण्मय versus returned मृन्मय needs independent review. Preserve the locked reference and both candidate lists; do not add a whole-name alias.",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-001",
          "kind": "sentences",
          "category": "places",
          "input": "hami baithakma chhau.",
          "context": "",
          "references": [
            "हामी बैठकमा छौँ।"
          ],
          "before": {
            "text": "हामी बैठकमा छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "after": {
            "text": "हामी बैठकमा छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-002",
          "kind": "sentences",
          "category": "places",
          "input": "ma aspatalbata aaye.",
          "context": "",
          "references": [
            "म अस्पतालबाट आएँ।"
          ],
          "before": {
            "text": "म अस्पतालबाट आएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "म अस्पतालबाट आएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-003",
          "kind": "sentences",
          "category": "administration",
          "input": "yo pratibedanlai hernuhos.",
          "context": "",
          "references": [
            "यो प्रतिवेदनलाई हेर्नुहोस्।"
          ],
          "before": {
            "text": "यो प्रतिबेदनलाई हेर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 27
            }
          },
          "after": {
            "text": "यो प्रतिबेदनलाई हेर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 27
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-004",
          "kind": "sentences",
          "category": "administration",
          "input": "suchana samitibata aayo.",
          "context": "",
          "references": [
            "सूचना समितिबाट आयो।"
          ],
          "before": {
            "text": "सूचना समितिबाट आयो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "सूचना समितिबाट आयो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-005",
          "kind": "sentences",
          "category": "learning",
          "input": "hami prayogshalama kaam garchhau.",
          "context": "",
          "references": [
            "हामी प्रयोगशालामा काम गर्छौँ।"
          ],
          "before": {
            "text": "हामी प्रयोगशालामा काम गर्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "after": {
            "text": "हामी प्रयोगशालामा काम गर्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-006",
          "kind": "sentences",
          "category": "learning",
          "input": "ma pustakalayama padhchhu.",
          "context": "",
          "references": [
            "म पुस्तकालयमा पढ्छु।"
          ],
          "before": {
            "text": "म पुस्तकालयमा पढ्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "म पुस्तकालयमा पढ्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-007",
          "kind": "sentences",
          "category": "errands",
          "input": "ma bholi paisa tirchhu.",
          "context": "",
          "references": [
            "म भोलि पैसा तिर्छु।"
          ],
          "before": {
            "text": "म भोलि पैसा तिर्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "म भोलि पैसा तिर्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-008",
          "kind": "sentences",
          "category": "errands",
          "input": "yo bato sajilo chha.",
          "context": "",
          "references": [
            "यो बाटो सजिलो छ।"
          ],
          "before": {
            "text": "यो बाटो सजिलो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "after": {
            "text": "यो बाटो सजिलो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-009",
          "kind": "sentences",
          "category": "food",
          "input": "aaja tarkari pakauchhu.",
          "context": "",
          "references": [
            "आज तरकारी पकाउँछु।"
          ],
          "before": {
            "text": "आज तरकारी पकाउँछु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "आज तरकारी पकाउँछु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-010",
          "kind": "sentences",
          "category": "food",
          "input": "ek gilas paani dinuhos.",
          "context": "",
          "references": [
            "एक गिलास पानी दिनुहोस्।"
          ],
          "before": {
            "text": "एक गिलास पानी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "after": {
            "text": "एक गिलास पानी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-011",
          "kind": "sentences",
          "category": "household",
          "input": "dhoka bistaarai banda garnuhos.",
          "context": "",
          "references": [
            "ढोका बिस्तारै बन्द गर्नुहोस्।"
          ],
          "before": {
            "text": "ढोका बिस्तारै बन्दा गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 29
            }
          },
          "after": {
            "text": "ढोका बिस्तारै बन्द गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-012",
          "kind": "sentences",
          "category": "household",
          "input": "ma kapada dhunchhu.",
          "context": "",
          "references": [
            "म कपडा धुन्छु।"
          ],
          "before": {
            "text": "म कपडा धुन्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 14
            }
          },
          "after": {
            "text": "म कपडा धुन्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 14
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-013",
          "kind": "sentences",
          "category": "work",
          "input": "hami yo kaam sakchhau.",
          "context": "",
          "references": [
            "हामी यो काम सक्छौँ।"
          ],
          "before": {
            "text": "हामी यो काम सक्छौ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "हामी यो काम सक्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-014",
          "kind": "sentences",
          "category": "work",
          "input": "ma kura bujhe.",
          "context": "",
          "references": [
            "म कुरा बुझेँ।"
          ],
          "before": {
            "text": "म कुरा बुझे।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 13
            }
          },
          "after": {
            "text": "म कुरा बुझेँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 13
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-015",
          "kind": "sentences",
          "category": "names",
          "input": "hridaya gharma chha.",
          "context": "",
          "references": [
            "हृदय घरमा छ।"
          ],
          "before": {
            "text": "हृदय घरमा छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 12
            }
          },
          "after": {
            "text": "हृदय घरमा छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 12
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-016",
          "kind": "sentences",
          "category": "names",
          "input": "saumya bholi aauchha.",
          "context": "",
          "references": [
            "सौम्य भोलि आउँछ।"
          ],
          "before": {
            "text": "सौम्य भोलि आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "after": {
            "text": "सौम्य भोलि आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "review": "",
          "previouslyObserved": false
        }
      ]
    },
    {
      "id": "confirmation",
      "label": "Confirmation checks",
      "description": "Checked after the fixes were frozen. Scores did not change; one word overlaps an older test.",
      "capturedAt": "2026-11-12T14:05:16.695800+00:00",
      "before": {
        "sentences": {
          "n": 16,
          "matched": 14,
          "errors": 0,
          "edits": 4,
          "referenceLength": 348,
          "codepointCER": 0.011494252873563218
        },
        "choices": {
          "n": 24,
          "matched": 22,
          "errors": 0,
          "withinFive": 23,
          "mrr": 0.9270833333333334
        },
        "workflows": {
          "n": 0,
          "matched": 0,
          "errors": 0
        }
      },
      "after": {
        "sentences": {
          "n": 16,
          "matched": 14,
          "errors": 0,
          "edits": 4,
          "referenceLength": 348,
          "codepointCER": 0.011494252873563218
        },
        "choices": {
          "n": 24,
          "matched": 22,
          "errors": 0,
          "withinFive": 23,
          "mrr": 0.9270833333333334
        },
        "workflows": {
          "n": 0,
          "matched": 0,
          "errors": 0
        }
      },
      "cases": [
        {
          "id": "usage-word-025",
          "kind": "choices",
          "category": "case endings",
          "input": "pustakalayabata",
          "context": "",
          "references": [
            "पुस्तकालयबाट"
          ],
          "before": {
            "text": "पुस्तकालयबाट",
            "candidates": [
              "पुस्तकालयबाट",
              "पुस्ताकालयबाट",
              "पुस्तकलयबाट",
              "पुस्तकलायबाट",
              "पुस्टकालयबाट"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पुस्तकालयबाट",
            "candidates": [
              "पुस्तकालयबाट",
              "पुस्ताकालयबाट",
              "पुस्तकलयबाट",
              "पुस्तकलायबाट",
              "पुस्टकालयबाट"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-026",
          "kind": "choices",
          "category": "case endings",
          "input": "karyakramma",
          "context": "",
          "references": [
            "कार्यक्रममा"
          ],
          "before": {
            "text": "कार्यक्रममा",
            "candidates": [
              "कार्यक्रममा",
              "कार्यक्रम्म",
              "कार्यक्रमम",
              "कार्याक्रममा",
              "कार्यक्रम्मा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "कार्यक्रममा",
            "candidates": [
              "कार्यक्रममा",
              "कार्यक्रम्म",
              "कार्यक्रमम",
              "कार्याक्रममा",
              "कार्यक्रम्मा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-027",
          "kind": "choices",
          "category": "case endings",
          "input": "prayogshaladekhi",
          "context": "",
          "references": [
            "प्रयोगशालादेखि"
          ],
          "before": {
            "text": "प्रयोगशालादेखि",
            "candidates": [
              "प्रयोगशालादेखि",
              "प्रायोगशालादेखि",
              "प्रयोगशालदेखि",
              "परयोगशालादेखि",
              "प्रयोगशलादेखि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "प्रयोगशालादेखि",
            "candidates": [
              "प्रयोगशालादेखि",
              "प्रायोगशालादेखि",
              "प्रयोगशालदेखि",
              "परयोगशालादेखि",
              "प्रयोगशलादेखि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-028",
          "kind": "choices",
          "category": "case endings",
          "input": "prashikshanko",
          "context": "",
          "references": [
            "प्रशिक्षणको"
          ],
          "before": {
            "text": "प्रशिक्षणको",
            "candidates": [
              "प्रशिक्षणको",
              "प्रशिक्षाणको",
              "प्रशिक्षनको",
              "प्रशिक्षानको",
              "प्राशिक्षणको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "प्रशिक्षणको",
            "candidates": [
              "प्रशिक्षणको",
              "प्रशिक्षाणको",
              "प्रशिक्षनको",
              "प्रशिक्षानको",
              "प्राशिक्षणको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-029",
          "kind": "choices",
          "category": "case endings",
          "input": "pratibedanma",
          "context": "",
          "references": [
            "प्रतिवेदनमा"
          ],
          "before": {
            "text": "प्रतिबेदनमा",
            "candidates": [
              "प्रतिबेदनमा",
              "प्रतिबेदनम",
              "प्रतिबेदानमा",
              "प्रतिवेदनमा",
              "प्रतिबेदनामा"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 4,
              "reciprocalRank": 0.25
            }
          },
          "after": {
            "text": "प्रतिबेदनमा",
            "candidates": [
              "प्रतिबेदनमा",
              "प्रतिबेदनम",
              "प्रतिबेदानमा",
              "प्रतिवेदनमा",
              "प्रतिबेदनामा"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 4,
              "reciprocalRank": 0.25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-030",
          "kind": "choices",
          "category": "case endings",
          "input": "samitisanga",
          "context": "",
          "references": [
            "समितिसँग"
          ],
          "before": {
            "text": "समितिसँग",
            "candidates": [
              "समितिसँग",
              "समितिसंग",
              "समितीसँग",
              "समितिसङ्ग",
              "सामितिसँग"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "समितिसँग",
            "candidates": [
              "समितिसँग",
              "समितिसंग",
              "समितीसँग",
              "समितिसङ्ग",
              "सामितिसँग"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-031",
          "kind": "choices",
          "category": "case endings",
          "input": "suvidhalai",
          "context": "",
          "references": [
            "सुविधालाई"
          ],
          "before": {
            "text": "सुविधालाई",
            "candidates": [
              "सुविधालाई",
              "सुविधलाई",
              "सुविधालाइ",
              "सुवीधालाई",
              "सुविधालई"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सुविधालाई",
            "candidates": [
              "सुविधालाई",
              "सुविधलाई",
              "सुविधालाइ",
              "सुवीधालाई",
              "सुविधालई"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-032",
          "kind": "choices",
          "category": "case endings",
          "input": "sansthasamma",
          "context": "",
          "references": [
            "संस्थासम्म"
          ],
          "before": {
            "text": "संस्थासम्म",
            "candidates": [
              "संस्थासम्म",
              "संस्थासम्मा",
              "संस्थसम्म",
              "सांस्थासम्म",
              "साँस्थासम्म"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "संस्थासम्म",
            "candidates": [
              "संस्थासम्म",
              "संस्थासम्मा",
              "संस्थसम्म",
              "सांस्थासम्म",
              "साँस्थासम्म"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-033",
          "kind": "choices",
          "category": "verb forms",
          "input": "pathaunu",
          "context": "",
          "references": [
            "पठाउनु"
          ],
          "before": {
            "text": "पठाउनु",
            "candidates": [
              "पठाउनु",
              "पाठाउनु",
              "पथाउनु",
              "पाठ्याउनु",
              "पाठउनु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पठाउनु",
            "candidates": [
              "पठाउनु",
              "पाठाउनु",
              "पथाउनु",
              "पाठउनु",
              "पठाउँनु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-034",
          "kind": "choices",
          "category": "verb forms",
          "input": "bujhchha",
          "context": "",
          "references": [
            "बुझ्छ"
          ],
          "before": {
            "text": "बुझ्छ",
            "candidates": [
              "बुझ्छ",
              "बूझ्छ",
              "बुझछ",
              "ब्युझ्छ",
              "बुझ्छा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बुझ्छ",
            "candidates": [
              "बुझ्छ",
              "बूझ्छ",
              "बुझछ",
              "बुझ्छा",
              "बूझछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-035",
          "kind": "choices",
          "category": "verb forms",
          "input": "sakinchha",
          "context": "",
          "references": [
            "सकिन्छ"
          ],
          "before": {
            "text": "सकिन्छ",
            "candidates": [
              "सकिन्छ",
              "साकिन्छ",
              "सकिनछ",
              "साकिनछ",
              "सकिँछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सकिन्छ",
            "candidates": [
              "सकिन्छ",
              "साकिन्छ",
              "सकिनछ",
              "साकिनछ",
              "सकिँछ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-036",
          "kind": "choices",
          "category": "verb forms",
          "input": "tirchhu",
          "context": "",
          "references": [
            "तिर्छु"
          ],
          "before": {
            "text": "तिर्छु",
            "candidates": [
              "तिर्छु",
              "तीर्छु",
              "टिर्छु",
              "तीरछु",
              "टीर्छु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "तिर्छु",
            "candidates": [
              "तिर्छु",
              "तीर्छु",
              "टिर्छु",
              "तीरछु",
              "टीर्छु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-037",
          "kind": "choices",
          "category": "verb forms",
          "input": "lagne",
          "context": "",
          "references": [
            "लाग्ने"
          ],
          "before": {
            "text": "लाग्ने",
            "candidates": [
              "लाग्ने",
              "लग्ने",
              "लग्न",
              "लागने",
              "लगणे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "लाग्ने",
            "candidates": [
              "लाग्ने",
              "लग्ने",
              "लग्न",
              "लागने",
              "लगणे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-038",
          "kind": "choices",
          "category": "verb forms",
          "input": "aaudaina",
          "context": "",
          "references": [
            "आउँदैन"
          ],
          "before": {
            "text": "आउँदैन",
            "candidates": [
              "आउँदैन",
              "आउदैन",
              "आउडाइना",
              "आउदैना",
              "आउडाइन"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आउँदैन",
            "candidates": [
              "आउँदैन",
              "आउदैन",
              "आउडाइना",
              "आउदैना",
              "आउडाइन"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-039",
          "kind": "choices",
          "category": "verb forms",
          "input": "kheliraheko",
          "context": "",
          "references": [
            "खेलिरहेको"
          ],
          "before": {
            "text": "खेलिरहेको",
            "candidates": [
              "खेलिरहेको",
              "खेलीरहेको",
              "खेलिराहेको",
              "खेलीराहेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "खेलिरहेको",
            "candidates": [
              "खेलिरहेको",
              "खेलीरहेको",
              "खेलिराहेको",
              "खेलीराहेको"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-040",
          "kind": "choices",
          "category": "verb forms",
          "input": "rokinchha",
          "context": "",
          "references": [
            "रोकिन्छ"
          ],
          "before": {
            "text": "रोकिन्छ",
            "candidates": [
              "रोकिन्छ",
              "रोकिनछ",
              "रोकिंछ",
              "रोकिँछ",
              "रोकिन्छा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "रोकिन्छ",
            "candidates": [
              "रोकिन्छ",
              "रोकिनछ",
              "रोकिंछ",
              "रोकिँछ",
              "रोकिन्छा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": true
        },
        {
          "id": "usage-word-041",
          "kind": "choices",
          "category": "informal spellings",
          "input": "hunxan",
          "context": "",
          "references": [
            "हुन्छन्"
          ],
          "before": {
            "text": "हुन्छन्",
            "candidates": [
              "हुन्छन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "हुन्छन्",
            "candidates": [
              "हुन्छन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-042",
          "kind": "choices",
          "category": "informal spellings",
          "input": "parxan",
          "context": "",
          "references": [
            "पर्छन्"
          ],
          "before": {
            "text": "पर्छन्",
            "candidates": [
              "पर्छन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पर्छन्",
            "candidates": [
              "पर्छन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-043",
          "kind": "choices",
          "category": "informal spellings",
          "input": "basxau",
          "context": "तिमी ",
          "references": [
            "बस्छौ"
          ],
          "before": {
            "text": "बस्छौ",
            "candidates": [
              "बस्छौ",
              "बस्छौँ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बस्छौ",
            "candidates": [
              "बस्छौ",
              "बस्छौँ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-044",
          "kind": "choices",
          "category": "informal spellings",
          "input": "aaunuhunxa",
          "context": "",
          "references": [
            "आउनुहुन्छ"
          ],
          "before": {
            "text": "आउनुहुन्छ",
            "candidates": [
              "आउनुहुन्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आउनुहुन्छ",
            "candidates": [
              "आउनुहुन्छ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-045",
          "kind": "choices",
          "category": "names",
          "input": "mrinal",
          "context": "",
          "references": [
            "मृणाल"
          ],
          "before": {
            "text": "मृणाल",
            "candidates": [
              "मृणाल",
              "मरिनल",
              "मरिनाल",
              "मृनाल",
              "मृनल"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "मृणाल",
            "candidates": [
              "मृणाल",
              "मरिनल",
              "मरिनाल",
              "मृनाल",
              "मृनल"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-046",
          "kind": "choices",
          "category": "names",
          "input": "aniruddha",
          "context": "",
          "references": [
            "अनिरुद्ध"
          ],
          "before": {
            "text": "अनिरुद्ध",
            "candidates": [
              "अनिरुद्ध",
              "अनिरूद्ध",
              "अनीरुद्ध",
              "अनीरूद्ध",
              "आनिरुद्ध"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "अनिरुद्ध",
            "candidates": [
              "अनिरुद्ध",
              "अनिरूद्ध",
              "अनीरुद्ध",
              "अनीरूद्ध",
              "आनिरुद्ध"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-047",
          "kind": "choices",
          "category": "names",
          "input": "shreeyansh",
          "context": "",
          "references": [
            "श्रेयांश"
          ],
          "before": {
            "text": "श्रीयांश",
            "candidates": [
              "श्रीयांश",
              "श्रीयंश",
              "श्रीयणश",
              "श्रीयनश",
              "श्रीयानश"
            ],
            "score": {
              "matched": false,
              "withinFive": false,
              "rank": 0,
              "reciprocalRank": 0
            }
          },
          "after": {
            "text": "श्रीयांश",
            "candidates": [
              "श्रीयांश",
              "श्रीयंश",
              "श्रीयणश",
              "श्रीयनश",
              "श्रीयानश"
            ],
            "score": {
              "matched": false,
              "withinFive": false,
              "rank": 0,
              "reciprocalRank": 0
            }
          },
          "review": "The selected name spelling and explicit ee notation need independent pronunciation/spelling review. Retain the strict miss; do not memorize a complete-name alias.",
          "previouslyObserved": false
        },
        {
          "id": "usage-word-048",
          "kind": "choices",
          "category": "names",
          "input": "siddhant",
          "context": "",
          "references": [
            "सिद्धान्त"
          ],
          "before": {
            "text": "सिद्धान्त",
            "candidates": [
              "सिद्धान्त",
              "सीद्धान्त",
              "सिद्धान्ट",
              "सिद्धानत",
              "सिद्धनत"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सिद्धान्त",
            "candidates": [
              "सिद्धान्त",
              "सीद्धान्त",
              "सिद्धान्ट",
              "सिद्धानत",
              "सिद्धनत"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-017",
          "kind": "sentences",
          "category": "places",
          "input": "hami karyakramma janchhau.",
          "context": "",
          "references": [
            "हामी कार्यक्रममा जान्छौँ।"
          ],
          "before": {
            "text": "हामी कार्यक्रममा जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "हामी कार्यक्रममा जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-018",
          "kind": "sentences",
          "category": "places",
          "input": "uni pustakalayabata aayin.",
          "context": "",
          "references": [
            "उनी पुस्तकालयबाट आइन्।"
          ],
          "before": {
            "text": "उनी पुस्तकालयबाट आयिन।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 3,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "उनी पुस्तकालयबाट आयिन।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 3,
              "referenceLength": 22
            }
          },
          "review": "The feminine past आइन् remains unsupported for this Roman form; keep the captured आयिन failure for a later iteration.",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-019",
          "kind": "sentences",
          "category": "administration",
          "input": "yo prashikshanko samaya ho.",
          "context": "",
          "references": [
            "यो प्रशिक्षणको समय हो।"
          ],
          "before": {
            "text": "यो प्रशिक्षणको समय हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "यो प्रशिक्षणको समय हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-020",
          "kind": "sentences",
          "category": "administration",
          "input": "pratibedanma sabai kura chha.",
          "context": "",
          "references": [
            "प्रतिवेदनमा सबै कुरा छ।"
          ],
          "before": {
            "text": "प्रतिबेदनमा सबै कुरा छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 23
            }
          },
          "after": {
            "text": "प्रतिबेदनमा सबै कुरा छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 23
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-021",
          "kind": "sentences",
          "category": "learning",
          "input": "ma prayogshaladekhi aaye.",
          "context": "",
          "references": [
            "म प्रयोगशालादेखि आएँ।"
          ],
          "before": {
            "text": "म प्रयोगशालादेखि आएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "म प्रयोगशालादेखि आएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-022",
          "kind": "sentences",
          "category": "learning",
          "input": "hami naya kura sikchhau.",
          "context": "",
          "references": [
            "हामी नयाँ कुरा सिक्छौँ।"
          ],
          "before": {
            "text": "हामी नयाँ कुरा सिक्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "after": {
            "text": "हामी नयाँ कुरा सिक्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-023",
          "kind": "sentences",
          "category": "errands",
          "input": "ma yo paisa bholi tirchhu.",
          "context": "",
          "references": [
            "म यो पैसा भोलि तिर्छु।"
          ],
          "before": {
            "text": "म यो पैसा भोलि तिर्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "म यो पैसा भोलि तिर्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-024",
          "kind": "sentences",
          "category": "errands",
          "input": "tapailai sahayog chahinchha.",
          "context": "",
          "references": [
            "तपाईंलाई सहयोग चाहिन्छ।"
          ],
          "before": {
            "text": "तपाईंलाई सहयोग चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "after": {
            "text": "तपाईंलाई सहयोग चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-025",
          "kind": "sentences",
          "category": "food",
          "input": "ma bhaat pakaaudai chhu.",
          "context": "",
          "references": [
            "म भात पकाउँदै छु।"
          ],
          "before": {
            "text": "म भात पकाउँदै छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "म भात पकाउँदै छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-026",
          "kind": "sentences",
          "category": "food",
          "input": "chiya ali taato chha.",
          "context": "",
          "references": [
            "चिया अलि तातो छ।"
          ],
          "before": {
            "text": "चिया अलि तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "after": {
            "text": "चिया अलि तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 16
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-027",
          "kind": "sentences",
          "category": "household",
          "input": "yo kaam sajilai sakinchha.",
          "context": "",
          "references": [
            "यो काम सजिलै सकिन्छ।"
          ],
          "before": {
            "text": "यो काम सजिलै सकिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "यो काम सजिलै सकिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-028",
          "kind": "sentences",
          "category": "household",
          "input": "ma kura bujhchhu.",
          "context": "",
          "references": [
            "म कुरा बुझ्छु।"
          ],
          "before": {
            "text": "म कुरा बुझ्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 14
            }
          },
          "after": {
            "text": "म कुरा बुझ्छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 14
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-029",
          "kind": "sentences",
          "category": "work",
          "input": "hami samitisanga kura garchhau.",
          "context": "",
          "references": [
            "हामी समितिसँग कुरा गर्छौँ।"
          ],
          "before": {
            "text": "हामी समितिसँग कुरा गर्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "after": {
            "text": "हामी समितिसँग कुरा गर्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-030",
          "kind": "sentences",
          "category": "work",
          "input": "yo sansthasamma pugna sakinchha.",
          "context": "",
          "references": [
            "यो संस्थासम्म पुग्न सकिन्छ।"
          ],
          "before": {
            "text": "यो संस्थासम्म पुग्न सकिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "after": {
            "text": "यो संस्थासम्म पुग्न सकिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-031",
          "kind": "sentences",
          "category": "names",
          "input": "aniruddha bholi aaunuhunchha.",
          "context": "",
          "references": [
            "अनिरुद्ध भोलि आउनुहुन्छ।"
          ],
          "before": {
            "text": "अनिरुद्ध भोलि आउनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "after": {
            "text": "अनिरुद्ध भोलि आउनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "usage-sentence-032",
          "kind": "sentences",
          "category": "names",
          "input": "mrinal aaja karyakramma chha.",
          "context": "",
          "references": [
            "मृणाल आज कार्यक्रममा छ।"
          ],
          "before": {
            "text": "मृणाल आज कार्यक्रममा छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "after": {
            "text": "मृणाल आज कार्यक्रममा छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 23
            }
          },
          "review": "",
          "previouslyObserved": false
        }
      ]
    },
    {
      "id": "editor",
      "label": "Editor regression",
      "description": "The same 108 recorded sentence, suggestion and editor-action checks.",
      "capturedAt": "2026-11-12T14:05:36.782640+00:00",
      "before": {
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
      "after": {
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
      "cases": [
        {
          "id": "choice-001",
          "kind": "choices",
          "category": "Water / also",
          "input": "pani",
          "context": "म ",
          "references": [
            "पनि"
          ],
          "before": {
            "text": "पनि",
            "candidates": [
              "पनि",
              "पानी",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पनि",
            "candidates": [
              "पनि",
              "पानी",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-002",
          "kind": "choices",
          "category": "Water / also",
          "input": "pani",
          "context": "चिसो ",
          "references": [
            "पानी"
          ],
          "before": {
            "text": "पानी",
            "candidates": [
              "पानी",
              "पनि",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पानी",
            "candidates": [
              "पानी",
              "पनि",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-003",
          "kind": "choices",
          "category": "Water / also",
          "input": "pani",
          "context": "आज ",
          "references": [
            "पनि"
          ],
          "before": {
            "text": "पनि",
            "candidates": [
              "पनि",
              "पानी",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पनि",
            "candidates": [
              "पनि",
              "पानी",
              "पनी",
              "पानि",
              "पाणि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-004",
          "kind": "choices",
          "category": "Water / also",
          "input": "paani",
          "context": "गिलास ",
          "references": [
            "पानी"
          ],
          "before": {
            "text": "पानी",
            "candidates": [
              "पानी",
              "पनि",
              "पानि",
              "पाणि",
              "पाणी"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पानी",
            "candidates": [
              "पानी",
              "पनि",
              "पानि",
              "पाणि",
              "पाणी"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-005",
          "kind": "choices",
          "category": "Time / relation",
          "input": "baje",
          "context": "बिहान ८ ",
          "references": [
            "बजे"
          ],
          "before": {
            "text": "बजे",
            "candidates": [
              "बजे",
              "बाजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बजे",
            "candidates": [
              "बजे",
              "बाजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-006",
          "kind": "choices",
          "category": "Time / relation",
          "input": "baje",
          "context": "मेरो ",
          "references": [
            "बाजे"
          ],
          "before": {
            "text": "बाजे",
            "candidates": [
              "बाजे",
              "बजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बाजे",
            "candidates": [
              "बाजे",
              "बजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-007",
          "kind": "choices",
          "category": "Time / relation",
          "input": "baaje",
          "context": "कति ",
          "references": [
            "बाजे"
          ],
          "before": {
            "text": "बाजे",
            "candidates": [
              "बाजे",
              "बजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बाजे",
            "candidates": [
              "बाजे",
              "बजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-008",
          "kind": "choices",
          "category": "Time / relation",
          "input": "baje",
          "context": "बस कति ",
          "references": [
            "बजे"
          ],
          "before": {
            "text": "बजे",
            "candidates": [
              "बजे",
              "बाजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बजे",
            "candidates": [
              "बजे",
              "बाजे",
              "वजे",
              "वाजे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-009",
          "kind": "choices",
          "category": "Person endings",
          "input": "aaunchhau",
          "context": "हामी पर्सि ",
          "references": [
            "आउँछौँ",
            "आउँछौं"
          ],
          "before": {
            "text": "आउँछौँ",
            "candidates": [
              "आउँछौँ",
              "आउँछौ",
              "आउन्छौ",
              "आउनछौ",
              "आउँछाउ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आउँछौँ",
            "candidates": [
              "आउँछौँ",
              "आउँछौ",
              "आउन्छौ",
              "आउनछौ",
              "आउँछाउ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-010",
          "kind": "choices",
          "category": "Person endings",
          "input": "aaunchhau",
          "context": "तिमी पर्सि ",
          "references": [
            "आउँछौ"
          ],
          "before": {
            "text": "आउँछौ",
            "candidates": [
              "आउँछौ",
              "आउँछौँ",
              "आउन्छौ",
              "आउनछौ",
              "आउँछाउ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आउँछौ",
            "candidates": [
              "आउँछौ",
              "आउँछौँ",
              "आउन्छौ",
              "आउनछौ",
              "आउँछाउ"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-011",
          "kind": "choices",
          "category": "Person endings",
          "input": "lekhen",
          "context": "मैले पत्र ",
          "references": [
            "लेखें",
            "लेखेँ"
          ],
          "before": {
            "text": "लेखेँ",
            "candidates": [
              "लेखेँ",
              "लेखेन",
              "लेखेन्",
              "लेखें",
              "लेखेण"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "लेखेँ",
            "candidates": [
              "लेखेँ",
              "लेखेन",
              "लेखेन्",
              "लेखें",
              "लेखेण"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-012",
          "kind": "choices",
          "category": "Person endings",
          "input": "aayenan",
          "context": "उनीहरू किन ",
          "references": [
            "आएनन्"
          ],
          "before": {
            "text": "आएनन्",
            "candidates": [
              "आएनन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आएनन्",
            "candidates": [
              "आएनन्"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-013",
          "kind": "choices",
          "category": "Word meanings",
          "input": "khana",
          "context": "",
          "references": [
            "खाना"
          ],
          "before": {
            "text": "खाना",
            "candidates": [
              "खाना",
              "खान",
              "खन",
              "खना",
              "खानु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "खाना",
            "candidates": [
              "खाना",
              "खान",
              "खन",
              "खना",
              "खानु"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-014",
          "kind": "choices",
          "category": "Word meanings",
          "input": "khan",
          "context": "",
          "references": [
            "खान"
          ],
          "before": {
            "text": "खान",
            "candidates": [
              "खान",
              "खन",
              "खन्",
              "खाँ",
              "खां"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "खान",
            "candidates": [
              "खान",
              "खन",
              "खन्",
              "खाँ",
              "खां"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-015",
          "kind": "choices",
          "category": "Word meanings",
          "input": "parchaa",
          "context": "",
          "references": [
            "पर्चा"
          ],
          "before": {
            "text": "पर्चा",
            "candidates": [
              "पर्चा",
              "पर्छ",
              "पार्चा",
              "परचा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "पर्चा",
            "candidates": [
              "पर्चा",
              "पर्छ",
              "पार्चा",
              "परचा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-016",
          "kind": "choices",
          "category": "Word meanings",
          "input": "banda",
          "context": "ढोका ",
          "references": [
            "बन्द"
          ],
          "before": {
            "text": "बन्द",
            "candidates": [
              "बन्द",
              "बन्दा",
              "बन्डा",
              "बाँडा",
              "बान्दा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "बन्द",
            "candidates": [
              "बन्द",
              "बन्दा",
              "बन्डा",
              "बाँडा",
              "बान्दा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-017",
          "kind": "choices",
          "category": "Names and clusters",
          "input": "srijana",
          "context": "",
          "references": [
            "सिर्जना",
            "सृजना"
          ],
          "before": {
            "text": "सृजना",
            "candidates": [
              "सृजना",
              "सृजन",
              "सरिजन",
              "सरिजना",
              "श्रीजना"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "सृजना",
            "candidates": [
              "सृजना",
              "सृजन",
              "सरिजन",
              "सरिजना",
              "श्रीजना"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-018",
          "kind": "choices",
          "category": "Names and clusters",
          "input": "pragya",
          "context": "",
          "references": [
            "प्रज्ञा"
          ],
          "before": {
            "text": "प्रज्ञ",
            "candidates": [
              "प्रज्ञ",
              "प्रज्ञा",
              "प्राज्ञ",
              "प्राग्य",
              "पराग्य"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 2,
              "reciprocalRank": 0.5
            }
          },
          "after": {
            "text": "प्रज्ञ",
            "candidates": [
              "प्रज्ञ",
              "प्रज्ञा",
              "प्राज्ञ",
              "प्राग्य",
              "पराग्य"
            ],
            "score": {
              "matched": false,
              "withinFive": true,
              "rank": 2,
              "reciprocalRank": 0.5
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-019",
          "kind": "choices",
          "category": "Names and clusters",
          "input": "sanskriti",
          "context": "",
          "references": [
            "संस्कृति"
          ],
          "before": {
            "text": "संस्कृति",
            "candidates": [
              "संस्कृति",
              "सँस्कृति",
              "संस्कृती",
              "सांस्कृति",
              "साँस्कृति"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "संस्कृति",
            "candidates": [
              "संस्कृति",
              "सँस्कृति",
              "संस्कृती",
              "सांस्कृति",
              "साँस्कृति"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-020",
          "kind": "choices",
          "category": "Names and clusters",
          "input": "drishti",
          "context": "",
          "references": [
            "दृष्टि"
          ],
          "before": {
            "text": "दृष्टि",
            "candidates": [
              "दृष्टि",
              "दृष्टी",
              "दृश्ति",
              "दृश्ती",
              "ड्रिष्टि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "दृष्टि",
            "candidates": [
              "दृष्टि",
              "दृष्टी",
              "दृश्ति",
              "दृश्ती",
              "ड्रिष्टि"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-021",
          "kind": "choices",
          "category": "Roman styles",
          "input": "aausadhalayema",
          "context": "",
          "references": [
            "औषधालयमा"
          ],
          "before": {
            "text": "औषधालयमा",
            "candidates": [
              "औषधालयमा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "औषधालयमा",
            "candidates": [
              "औषधालयमा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-022",
          "kind": "choices",
          "category": "Roman styles",
          "input": "aakhaa",
          "context": "",
          "references": [
            "आँखा"
          ],
          "before": {
            "text": "आँखा",
            "candidates": [
              "आँखा",
              "आखा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "आँखा",
            "candidates": [
              "आँखा",
              "आखा"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-023",
          "kind": "choices",
          "category": "Roman styles",
          "input": "manxe",
          "context": "",
          "references": [
            "मान्छे"
          ],
          "before": {
            "text": "मान्छे",
            "candidates": [
              "मान्छे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "मान्छे",
            "candidates": [
              "मान्छे"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "choice-024",
          "kind": "choices",
          "category": "Roman styles",
          "input": "gnyan",
          "context": "",
          "references": [
            "ज्ञान"
          ],
          "before": {
            "text": "ज्ञान",
            "candidates": [
              "ज्ञान",
              "गन्यन",
              "गण्यन",
              "ग्नयन",
              "गन्यान"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "after": {
            "text": "ज्ञान",
            "candidates": [
              "ज्ञान",
              "गन्यन",
              "गण्यन",
              "ग्नयन",
              "गन्यान"
            ],
            "score": {
              "matched": true,
              "withinFive": true,
              "rank": 1,
              "reciprocalRank": 1.0
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-001",
          "kind": "sentences",
          "category": "Appointments",
          "input": "hami parsi bihana bhetchhau.",
          "context": "",
          "references": [
            "हामी पर्सि बिहान भेट्छौँ।"
          ],
          "before": {
            "text": "हामी पर्सि बिहान भेट्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "हामी पर्सि बिहान भेट्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-002",
          "kind": "sentences",
          "category": "Appointments",
          "input": "haami parsi bihaan bhetchau.",
          "context": "",
          "references": [
            "हामी पर्सि बिहान भेट्छौँ।"
          ],
          "before": {
            "text": "हामी पर्सि बिहान भेट्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "हामी पर्सि बिहान भेट्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-003",
          "kind": "sentences",
          "category": "Appointments",
          "input": "tapai bholi aaunuhunchha?",
          "context": "",
          "references": [
            "तपाईं भोलि आउनुहुन्छ?"
          ],
          "before": {
            "text": "तपाईं भोलि आउनुहुन्छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "तपाईं भोलि आउनुहुन्छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-004",
          "kind": "sentences",
          "category": "Appointments",
          "input": "tapaai bholi aaunuhuncha?",
          "context": "",
          "references": [
            "तपाईं भोलि आउनुहुन्छ?"
          ],
          "before": {
            "text": "तपाईं भोलि आउनुहुन्छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "तपाईं भोलि आउनुहुन्छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-005",
          "kind": "sentences",
          "category": "Directions",
          "input": "yahabata sidha januhos.",
          "context": "",
          "references": [
            "यहाँबाट सीधा जानुहोस्।"
          ],
          "before": {
            "text": "यहाँबाट सिधा जानुहोस्।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "यहाँबाट सिधा जानुहोस्।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 22
            }
          },
          "review": "सीधा / सिधा remains a reference spelling question for native-speaker review. The nasal mark in यहाँबाट is now preserved; original strict references are unchanged.",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-006",
          "kind": "sentences",
          "category": "Directions",
          "input": "yahaabata seedha jaanuhos.",
          "context": "",
          "references": [
            "यहाँबाट सीधा जानुहोस्।"
          ],
          "before": {
            "text": "यहाँबाट सीधा जानुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "यहाँबाट सीधा जानुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-007",
          "kind": "sentences",
          "category": "Directions",
          "input": "baya modma pasal chha.",
          "context": "",
          "references": [
            "बायाँ मोडमा पसल छ।"
          ],
          "before": {
            "text": "बायाँ मोडमा पसल छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "बायाँ मोडमा पसल छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-008",
          "kind": "sentences",
          "category": "Directions",
          "input": "baayaa modma pasal cha.",
          "context": "",
          "references": [
            "बायाँ मोडमा पसल छ।"
          ],
          "before": {
            "text": "बायाँ मोडमा पसल छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "बायाँ मोडमा पसल छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-009",
          "kind": "sentences",
          "category": "Restaurant",
          "input": "malai chiya ra roti dinuhos.",
          "context": "",
          "references": [
            "मलाई चिया र रोटी दिनुहोस्।"
          ],
          "before": {
            "text": "मलाई चिया र रोटी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "after": {
            "text": "मलाई चिया र रोटी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-010",
          "kind": "sentences",
          "category": "Restaurant",
          "input": "malaai chiyaa ra rotee dinuhos.",
          "context": "",
          "references": [
            "मलाई चिया र रोटी दिनुहोस्।"
          ],
          "before": {
            "text": "मलाई चिया र रोटी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "after": {
            "text": "मलाई चिया र रोटी दिनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-011",
          "kind": "sentences",
          "category": "Restaurant",
          "input": "yo khana dherai mitho chha.",
          "context": "",
          "references": [
            "यो खाना धेरै मिठो छ।"
          ],
          "before": {
            "text": "यो खाना धेरै मीठो छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "यो खाना धेरै मीठो छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 20
            }
          },
          "review": "Reference मिठो differs from returned मीठो. This may be a reference spelling issue rather than an engine defect. Original labels and strict counts are retained; seek native-speaker review before treating these as wrong suggestions.",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-012",
          "kind": "sentences",
          "category": "Restaurant",
          "input": "yo khaana dherai meetho cha.",
          "context": "",
          "references": [
            "यो खाना धेरै मिठो छ।"
          ],
          "before": {
            "text": "यो खाना धेरै मीठो छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "यो खाना धेरै मीठो छ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 20
            }
          },
          "review": "Reference मिठो differs from returned मीठो. This may be a reference spelling issue rather than an engine defect. Original labels and strict counts are retained; seek native-speaker review before treating these as wrong suggestions.",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-013",
          "kind": "sentences",
          "category": "Payments",
          "input": "masanga ahile paisa chhaina.",
          "context": "",
          "references": [
            "मसँग अहिले पैसा छैन।"
          ],
          "before": {
            "text": "मसँग अहिले पैसा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "मसँग अहिले पैसा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-014",
          "kind": "sentences",
          "category": "Payments",
          "input": "ma sanga ahile paisaa chaina.",
          "context": "",
          "references": [
            "म सँग अहिले पैसा छैन।"
          ],
          "before": {
            "text": "म सँग अहिले पैसा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "म सँग अहिले पैसा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-015",
          "kind": "sentences",
          "category": "Payments",
          "input": "yasko mulya kati ho?",
          "context": "",
          "references": [
            "यसको मूल्य कति हो?"
          ],
          "before": {
            "text": "यसको मूल्य कति हो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "यसको मूल्य कति हो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-016",
          "kind": "sentences",
          "category": "Payments",
          "input": "yas ko moolya kati ho.",
          "context": "",
          "references": [
            "यस को मूल्य कति हो।"
          ],
          "before": {
            "text": "यस को मूल्य कति हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "यस को मूल्य कति हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-017",
          "kind": "sentences",
          "category": "Work messages",
          "input": "maile patra lekheko chhu.",
          "context": "",
          "references": [
            "मैले पत्र लेखेको छु।"
          ],
          "before": {
            "text": "मैले पत्र लेखेको छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "मैले पत्र लेखेको छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-018",
          "kind": "sentences",
          "category": "Work messages",
          "input": "maile patra lekheko chu.",
          "context": "",
          "references": [
            "मैले पत्र लेखेको छु।"
          ],
          "before": {
            "text": "मैले पत्र लेखेको छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "मैले पत्र लेखेको छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-019",
          "kind": "sentences",
          "category": "Work messages",
          "input": "kripaya malai khabar garnuhos.",
          "context": "",
          "references": [
            "कृपया मलाई खबर गर्नुहोस्।"
          ],
          "before": {
            "text": "कृपया मलाई खबर गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "कृपया मलाई खबर गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-020",
          "kind": "sentences",
          "category": "Work messages",
          "input": "kripya malaai khabar garnuhos.",
          "context": "",
          "references": [
            "कृपया मलाई खबर गर्नुहोस्।"
          ],
          "before": {
            "text": "कृपया मलाई खबर गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "कृपया मलाई खबर गर्नुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-021",
          "kind": "sentences",
          "category": "Household",
          "input": "jhyal kholnuhos, kotha tato chha.",
          "context": "",
          "references": [
            "झ्याल खोल्नुहोस्, कोठा तातो छ।"
          ],
          "before": {
            "text": "झ्याल खोल्नुहोस्, कोठा तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 30
            }
          },
          "after": {
            "text": "झ्याल खोल्नुहोस्, कोठा तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 30
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-022",
          "kind": "sentences",
          "category": "Household",
          "input": "jhyaal kholnuhos, kothaa taato cha.",
          "context": "",
          "references": [
            "झ्याल खोल्नुहोस्, कोठा तातो छ।"
          ],
          "before": {
            "text": "झ्याल खोल्नुहोस्, कोठा तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 30
            }
          },
          "after": {
            "text": "झ्याल खोल्नुहोस्, कोठा तातो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 30
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-023",
          "kind": "sentences",
          "category": "Household",
          "input": "maile sabai luga dhoye.",
          "context": "",
          "references": [
            "मैले सबै लुगा धोएँ।"
          ],
          "before": {
            "text": "मैले सबै लुगा धोएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "मैले सबै लुगा धोएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-024",
          "kind": "sentences",
          "category": "Household",
          "input": "maile sabai lugaa dhoen.",
          "context": "",
          "references": [
            "मैले सबै लुगा धोएँ।"
          ],
          "before": {
            "text": "मैले सबै लुगा धोएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "मैले सबै लुगा धोएँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-025",
          "kind": "sentences",
          "category": "Feelings",
          "input": "ma aaja dherai khusi chhu.",
          "context": "",
          "references": [
            "म आज धेरै खुसी छु।"
          ],
          "before": {
            "text": "म आज धेरै खुसी छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "म आज धेरै खुसी छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 18
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-026",
          "kind": "sentences",
          "category": "Feelings",
          "input": "ma aja dherai khushee chu.",
          "context": "",
          "references": [
            "म आज धेरै खुसी छु।"
          ],
          "before": {
            "text": "म आज धेरै खुशी छु।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 18
            }
          },
          "after": {
            "text": "म आज धेरै खुशी छु।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 1,
              "referenceLength": 18
            }
          },
          "review": "खुसी / खुशी is a spelling-variant question. Strict original reference agreement is recorded; it does not establish that the alternate is invalid.",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-027",
          "kind": "sentences",
          "category": "Feelings",
          "input": "timilai ke bhayo?",
          "context": "",
          "references": [
            "तिमीलाई के भयो?"
          ],
          "before": {
            "text": "तिमीलाई के भयो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 15
            }
          },
          "after": {
            "text": "तिमीलाई के भयो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 15
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-028",
          "kind": "sentences",
          "category": "Feelings",
          "input": "timilaai k bhayo?",
          "context": "",
          "references": [
            "तिमीलाई के भयो?"
          ],
          "before": {
            "text": "तिमीलाई के भयो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 15
            }
          },
          "after": {
            "text": "तिमीलाई के भयो?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 15
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-029",
          "kind": "sentences",
          "category": "Invitations",
          "input": "hamro gharma aaunuhos.",
          "context": "",
          "references": [
            "हाम्रो घरमा आउनुहोस्।"
          ],
          "before": {
            "text": "हाम्रो घरमा आउनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "हाम्रो घरमा आउनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-030",
          "kind": "sentences",
          "category": "Invitations",
          "input": "haamro gharmaa aaunuhos.",
          "context": "",
          "references": [
            "हाम्रो घरमा आउनुहोस्।"
          ],
          "before": {
            "text": "हाम्रो घरमा आउनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "हाम्रो घरमा आउनुहोस्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-031",
          "kind": "sentences",
          "category": "Invitations",
          "input": "hami sangai khana khaau.",
          "context": "",
          "references": [
            "हामी सँगै खाना खाऔँ।"
          ],
          "before": {
            "text": "हामी सँगै खाना खाऔँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "हामी सँगै खाना खाऔँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-032",
          "kind": "sentences",
          "category": "Invitations",
          "input": "haami sangai khaana khaaun.",
          "context": "",
          "references": [
            "हामी सँगै खाना खाऔँ।"
          ],
          "before": {
            "text": "हामी सँगै खाना खाऔँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "after": {
            "text": "हामी सँगै खाना खाऔँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 20
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-033",
          "kind": "sentences",
          "category": "Help requests",
          "input": "kripaya malai sahayog garnuhos!",
          "context": "",
          "references": [
            "कृपया मलाई सहयोग गर्नुहोस्!"
          ],
          "before": {
            "text": "कृपया मलाई सहयोग गर्नुहोस्!",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "after": {
            "text": "कृपया मलाई सहयोग गर्नुहोस्!",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-034",
          "kind": "sentences",
          "category": "Help requests",
          "input": "kripya malaai sahayog garnuhos!",
          "context": "",
          "references": [
            "कृपया मलाई सहयोग गर्नुहोस्!"
          ],
          "before": {
            "text": "कृपया मलाई सहयोग गर्नुहोस्!",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "after": {
            "text": "कृपया मलाई सहयोग गर्नुहोस्!",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 27
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-035",
          "kind": "sentences",
          "category": "Help requests",
          "input": "yaha mero jhola harayo.",
          "context": "",
          "references": [
            "यहाँ मेरो झोला हरायो।"
          ],
          "before": {
            "text": "यहाँ मेरो झोला हरायो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "यहाँ मेरो झोला हरायो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-036",
          "kind": "sentences",
          "category": "Help requests",
          "input": "yahaa mero jholaa haraayo.",
          "context": "",
          "references": [
            "यहाँ मेरो झोला हरायो।"
          ],
          "before": {
            "text": "यहाँ मेरो झोला हरायो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "यहाँ मेरो झोला हरायो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-037",
          "kind": "sentences",
          "category": "Weather and seasons",
          "input": "aaja bahira dherai chiso chha.",
          "context": "",
          "references": [
            "आज बाहिर धेरै चिसो छ।"
          ],
          "before": {
            "text": "आज बाहिर धेरै चिसो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "आज बाहिर धेरै चिसो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-038",
          "kind": "sentences",
          "category": "Weather and seasons",
          "input": "aja baahira dherai chiso cha.",
          "context": "",
          "references": [
            "आज बाहिर धेरै चिसो छ।"
          ],
          "before": {
            "text": "आज बाहिर धेरै चिसो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "आज बाहिर धेरै चिसो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-039",
          "kind": "sentences",
          "category": "Weather and seasons",
          "input": "gham lagepachhi hami janchhau.",
          "context": "",
          "references": [
            "घाम लागेपछि हामी जान्छौँ।"
          ],
          "before": {
            "text": "घाम लागेपछि हामी जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "घाम लागेपछि हामी जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-040",
          "kind": "sentences",
          "category": "Weather and seasons",
          "input": "ghaam laagepachi haami jaanchau.",
          "context": "",
          "references": [
            "घाम लागेपछि हामी जान्छौँ।"
          ],
          "before": {
            "text": "घाम लागेपछि हामी जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "after": {
            "text": "घाम लागेपछि हामी जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 25
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-041",
          "kind": "sentences",
          "category": "Honorific contrasts",
          "input": "uha ahile gharma hunuhunchha.",
          "context": "",
          "references": [
            "उहाँ अहिले घरमा हुनुहुन्छ।"
          ],
          "before": {
            "text": "उहाँ अहिले घरमा हुनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "after": {
            "text": "उहाँ अहिले घरमा हुनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-042",
          "kind": "sentences",
          "category": "Honorific contrasts",
          "input": "uhaa ahile gharmaa hunuhuncha.",
          "context": "",
          "references": [
            "उहाँ अहिले घरमा हुनुहुन्छ।"
          ],
          "before": {
            "text": "उहाँ अहिले घरमा हुनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "after": {
            "text": "उहाँ अहिले घरमा हुनुहुन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 26
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-043",
          "kind": "sentences",
          "category": "Honorific contrasts",
          "input": "timi ahile gharma chhau.",
          "context": "",
          "references": [
            "तिमी अहिले घरमा छौ।"
          ],
          "before": {
            "text": "तिमी अहिले घरमा छौ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "तिमी अहिले घरमा छौ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-044",
          "kind": "sentences",
          "category": "Honorific contrasts",
          "input": "timi ahile gharmaa chau.",
          "context": "",
          "references": [
            "तिमी अहिले घरमा छौ।"
          ],
          "before": {
            "text": "तिमी अहिले घरमा छौ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "तिमी अहिले घरमा छौ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-045",
          "kind": "sentences",
          "category": "Conjuncts and nasalization",
          "input": "mero drishti ramro chha.",
          "context": "",
          "references": [
            "मेरो दृष्टि राम्रो छ।"
          ],
          "before": {
            "text": "मेरो दृष्टि राम्रो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "मेरो दृष्टि राम्रो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-046",
          "kind": "sentences",
          "category": "Conjuncts and nasalization",
          "input": "mero dristhi ramro cha.",
          "context": "",
          "references": [
            "मेरो दृष्टि राम्रो छ।"
          ],
          "before": {
            "text": "मेरो दृष्टि राम्रो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "मेरो दृष्टि राम्रो छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-047",
          "kind": "sentences",
          "category": "Conjuncts and nasalization",
          "input": "yo gyan sabailai chahinchha.",
          "context": "",
          "references": [
            "यो ज्ञान सबैलाई चाहिन्छ।"
          ],
          "before": {
            "text": "यो ज्ञान सबैलाई चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "after": {
            "text": "यो ज्ञान सबैलाई चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-048",
          "kind": "sentences",
          "category": "Conjuncts and nasalization",
          "input": "yo gnyan sabailaai chahincha.",
          "context": "",
          "references": [
            "यो ज्ञान सबैलाई चाहिन्छ।"
          ],
          "before": {
            "text": "यो ज्ञान सबैलाई चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "after": {
            "text": "यो ज्ञान सबैलाई चाहिन्छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 24
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-049",
          "kind": "sentences",
          "category": "Informal Roman",
          "input": "manxe xito aauxa.",
          "context": "",
          "references": [
            "मान्छे छिटो आउँछ।"
          ],
          "before": {
            "text": "मान्छे छिटो आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "मान्छे छिटो आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-050",
          "kind": "sentences",
          "category": "Informal Roman",
          "input": "manchhe chhito aauchha.",
          "context": "",
          "references": [
            "मान्छे छिटो आउँछ।"
          ],
          "before": {
            "text": "मान्छे छिटो आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "मान्छे छिटो आउँछ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-051",
          "kind": "sentences",
          "category": "Informal Roman",
          "input": "malai kehi thaha xaina.",
          "context": "",
          "references": [
            "मलाई केही थाहा छैन।"
          ],
          "before": {
            "text": "मलाई केही थाहा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "मलाई केही थाहा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-052",
          "kind": "sentences",
          "category": "Informal Roman",
          "input": "malaai kehee thaahaa chhaina.",
          "context": "",
          "references": [
            "मलाई केही थाहा छैन।"
          ],
          "before": {
            "text": "मलाई केही थाहा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "after": {
            "text": "मलाई केही थाहा छैन।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 19
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-053",
          "kind": "sentences",
          "category": "Negative questions",
          "input": "timile kaam garenau?",
          "context": "",
          "references": [
            "तिमीले काम गरेनौ?"
          ],
          "before": {
            "text": "तिमीले काम गरेनौ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "तिमीले काम गरेनौ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-054",
          "kind": "sentences",
          "category": "Negative questions",
          "input": "timeele kaam garenau?",
          "context": "",
          "references": [
            "तिमीले काम गरेनौ?"
          ],
          "before": {
            "text": "तिमीले काम गरेनौ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "तिमीले काम गरेनौ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-055",
          "kind": "sentences",
          "category": "Negative questions",
          "input": "uniharu kina aayenan?",
          "context": "",
          "references": [
            "उनीहरू किन आएनन्?"
          ],
          "before": {
            "text": "उनीहरू किन आएनन्?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "उनीहरू किन आएनन्?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-056",
          "kind": "sentences",
          "category": "Negative questions",
          "input": "uneeharu kina aaenan?",
          "context": "",
          "references": [
            "उनीहरू किन आएनन्?"
          ],
          "before": {
            "text": "उनीहरू किन आएनन्?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "after": {
            "text": "उनीहरू किन आएनन्?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 17
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-057",
          "kind": "sentences",
          "category": "Extended punctuation",
          "input": "\"thik chha\", sitale bhanin.",
          "context": "",
          "references": [
            "\"ठीक छ\", सीताले भनिन्।"
          ],
          "before": {
            "text": "\"ठीक छ\", सीताले भनिन्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "\"ठीक छ\", सीताले भनिन्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-058",
          "kind": "sentences",
          "category": "Extended punctuation",
          "input": "“theek cha”, seetale bhanin.",
          "context": "",
          "references": [
            "“ठीक छ”, सीताले भनिन्।"
          ],
          "before": {
            "text": "“ठीक छ”, सीताले भनिन्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "after": {
            "text": "“ठीक छ”, सीताले भनिन्।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 22
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-059",
          "kind": "sentences",
          "category": "Extended punctuation",
          "input": "namaste—aajako khabar ke chha?",
          "context": "",
          "references": [
            "नमस्ते—आजको खबर के छ?"
          ],
          "before": {
            "text": "नमस्ते—आजको खबर के छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "नमस्ते—आजको खबर के छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-060",
          "kind": "sentences",
          "category": "Extended punctuation",
          "input": "namaste—ajako khabar k cha?",
          "context": "",
          "references": [
            "नमस्ते—आजको खबर के छ?"
          ],
          "before": {
            "text": "नमस्ते—आजको खबर के छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "after": {
            "text": "नमस्ते—आजको खबर के छ?",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 21
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-061",
          "kind": "sentences",
          "category": "Longer clauses",
          "input": "ma bazaar gaye, tara pasal banda thiyo.",
          "context": "",
          "references": [
            "म बजार गएँ, तर पसल बन्द थियो।"
          ],
          "before": {
            "text": "म बजार गएँ, तर पसल बन्द थियो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "after": {
            "text": "म बजार गएँ, तर पसल बन्द थियो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-062",
          "kind": "sentences",
          "category": "Longer clauses",
          "input": "ma bajaar gaen, tara pasal banda thiyo.",
          "context": "",
          "references": [
            "म बजार गएँ, तर पसल बन्द थियो।"
          ],
          "before": {
            "text": "म बजार गएँ, तर पसल बन्द थियो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "after": {
            "text": "म बजार गएँ, तर पसल बन्द थियो।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 29
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-063",
          "kind": "sentences",
          "category": "Longer clauses",
          "input": "yadi paani parena bhane hami bahira janchhau.",
          "context": "",
          "references": [
            "यदि पानी परेन भने हामी बाहिर जान्छौँ।"
          ],
          "before": {
            "text": "यदि पानी परेन भने हामी बाहिर जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 37
            }
          },
          "after": {
            "text": "यदि पानी परेन भने हामी बाहिर जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": true,
              "edits": 0,
              "referenceLength": 37
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "extended-sentence-064",
          "kind": "sentences",
          "category": "Longer clauses",
          "input": "yadi pani parena bhane haami baahira jaanchau.",
          "context": "",
          "references": [
            "यदि पानी परेन भने हामी बाहिर जान्छौँ।"
          ],
          "before": {
            "text": "यदि पनि परेन भने हामी बाहिर जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 2,
              "referenceLength": 37
            }
          },
          "after": {
            "text": "यदि पनि परेन भने हामी बाहिर जान्छौँ।",
            "candidates": [],
            "score": {
              "matched": false,
              "edits": 2,
              "referenceLength": 37
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-001",
          "kind": "workflows",
          "category": "Choosing words",
          "input": "Choose water explicitly",
          "context": "",
          "references": [
            "आज पानी परिरहेको छ।"
          ],
          "before": {
            "text": "आज पानी परिरहेको छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "आज पानी परिरहेको छ।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-002",
          "kind": "workflows",
          "category": "Choosing words",
          "input": "Arrow and Enter choose the second spelling",
          "context": "",
          "references": [
            "पानी"
          ],
          "before": {
            "text": "पानी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "पानी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-003",
          "kind": "workflows",
          "category": "Choosing words",
          "input": "Number key selects the second spelling",
          "context": "",
          "references": [
            "पानी"
          ],
          "before": {
            "text": "पानी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "पानी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-004",
          "kind": "workflows",
          "category": "Choosing words",
          "input": "Click an explicit name",
          "context": "",
          "references": [
            "सीता"
          ],
          "before": {
            "text": "सीता",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "सीता",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-005",
          "kind": "workflows",
          "category": "Word joining",
          "input": "Join a noun ending explicitly",
          "context": "",
          "references": [
            "म घरमा छु।"
          ],
          "before": {
            "text": "म घरमा छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "म घरमा छु।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-006",
          "kind": "workflows",
          "category": "Word joining",
          "input": "Join an irregular pronoun case",
          "context": "",
          "references": [
            "मैले"
          ],
          "before": {
            "text": "मैले",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "मैले",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-007",
          "kind": "workflows",
          "category": "History",
          "input": "Undo and redo a word commit",
          "context": "",
          "references": [
            "नमस्ते"
          ],
          "before": {
            "text": "नमस्ते",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "नमस्ते",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-008",
          "kind": "workflows",
          "category": "Caret editing",
          "input": "Insert punctuation in the middle",
          "context": "",
          "references": [
            "नमस्ते। साथी"
          ],
          "before": {
            "text": "नमस्ते। साथी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "नमस्ते। साथी",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-009",
          "kind": "workflows",
          "category": "Caret editing",
          "input": "Replace a selected range",
          "context": "",
          "references": [
            "नमस्ते।"
          ],
          "before": {
            "text": "नमस्ते।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "नमस्ते।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-010",
          "kind": "workflows",
          "category": "English and paste",
          "input": "English mode keeps dots and numbers",
          "context": "",
          "references": [
            "Hello, Nepal. 3.5"
          ],
          "before": {
            "text": "Hello, Nepal. 3.5",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "Hello, Nepal. 3.5",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-011",
          "kind": "workflows",
          "category": "English and paste",
          "input": "Escape keeps Roman text",
          "context": "",
          "references": [
            "OpenAI "
          ],
          "before": {
            "text": "OpenAI ",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "OpenAI ",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-012",
          "kind": "workflows",
          "category": "English and paste",
          "input": "Paste a URL and email unchanged",
          "context": "",
          "references": [
            "https://example.com a@example.com"
          ],
          "before": {
            "text": "https://example.com a@example.com",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "https://example.com a@example.com",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-013",
          "kind": "workflows",
          "category": "English and paste",
          "input": "Paste conjuncts and mixed scripts unchanged",
          "context": "",
          "references": [
            "श्रद्धा, आँखा र ब्रह्म — UTF-8"
          ],
          "before": {
            "text": "श्रद्धा, आँखा र ब्रह्म — UTF-8",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "श्रद्धा, आँखा र ब्रह्म — UTF-8",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-014",
          "kind": "workflows",
          "category": "Software keyboard",
          "input": "Mobile period after accepted text",
          "context": "",
          "references": [
            "नमस्ते।"
          ],
          "before": {
            "text": "नमस्ते।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "नमस्ते।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-015",
          "kind": "workflows",
          "category": "Software keyboard",
          "input": "Mobile closing quote commits the word",
          "context": "",
          "references": [
            "म घर आएँ”"
          ],
          "before": {
            "text": "म घर आएँ”",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "म घर आएँ”",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-016",
          "kind": "workflows",
          "category": "Preferences",
          "input": "A contextual choice survives reload",
          "context": "",
          "references": [
            "एक गिलास pani"
          ],
          "before": {
            "text": "एक गिलास pani",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "एक गिलास pani",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-017",
          "kind": "workflows",
          "category": "Persistence",
          "input": "Draft survives reload",
          "context": "",
          "references": [
            "नमस्ते "
          ],
          "before": {
            "text": "नमस्ते ",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "नमस्ते ",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-018",
          "kind": "workflows",
          "category": "Punctuation and numbers",
          "input": "Shift Enter inserts a new line",
          "context": "",
          "references": [
            "मेरो नाम\nसीता हो।"
          ],
          "before": {
            "text": "मेरो नाम\nसीता हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "मेरो नाम\nसीता हो।",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-019",
          "kind": "workflows",
          "category": "Punctuation and numbers",
          "input": "Decimal followed by sentence punctuation",
          "context": "",
          "references": [
            "मूल्य 3.5।"
          ],
          "before": {
            "text": "मूल्य 3.5.",
            "candidates": [],
            "score": {
              "matched": false,
              "finalMatches": false,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "मूल्य 3.5.",
            "candidates": [],
            "score": {
              "matched": false,
              "finalMatches": false,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        },
        {
          "id": "workflow-020",
          "kind": "workflows",
          "category": "Punctuation and numbers",
          "input": "Brackets commit the enclosed word",
          "context": "",
          "references": [
            "[नमस्ते] र (पानी)"
          ],
          "before": {
            "text": "[नमस्ते] र (पानी)",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "after": {
            "text": "[नमस्ते] र (पानी)",
            "candidates": [],
            "score": {
              "matched": true,
              "finalMatches": true,
              "checkpointsMatch": true
            }
          },
          "review": "",
          "previouslyObserved": false
        }
      ]
    }
  ],
  "sourceHashes": {
    "public/benchmark/current-results-2.4.8.json": "6d8b808a24313defddd2fcde6a4944224f5f10d3d4969feca64d33245a67adc5",
    "benchmarks/improvement-2.4.8/usage-results.json": "6f26daaaf551789c4669aabfcaa72b855f7d4024377f48b652f5a934bade7e40",
    "benchmarks/improvement-2.4.8/evaluation-notes.json": "e7aa47d6d9c6b92b7ca29073031ecde0c5c8efcc733d48a059f0cd17a17a3421",
    "benchmarks/improvement-2.4.8/post-evaluation-review.json": "d2d505487af1f1059e9c6a7ff5ee55b57af1b9be3dcfa9419c391f90272db75f",
    "benchmarks/editor-2.4.8-v1/summary.json": "f65fb417823ebe60c227ab63fdda4e2774a59d34fbd07a9eac2321477680bfcd",
    "benchmarks/editor-2.4.7-v1/summary.json": "fb4b98cca2500c4abcc14bbd7b42ad43837103dfaaaae521182254e40885dcc6",
    "benchmarks/editor-2.4.8-v1/review-notes.json": "3ec2875b1e237ae46358dcd211dbb4286ac1d9350818e021d9ca63e890e027cf"
  },
  "downloads": {
    "usage": "/benchmark/usage-2.4.8.json",
    "notes": "/benchmark/usage-notes-2.4.8.json",
    "editor": "/benchmark/editor-2.4.8-v1.json",
    "words": "/benchmark/word-replay-2.4.8.json"
  }
};
