// Enrichment Activity Data — 6 Levels × 11 Questions

export interface EnrichmentQuestion {
  id: number;
  equation: string;   // Display string with ? for the blank
  answer: number;     // Correct answer
}

export interface EnrichmentLevel {
  level: number;
  name: string;
  description: string;
  questions: EnrichmentQuestion[];
}

export const enrichmentLevels: EnrichmentLevel[] = [
  // ── Level 1: Basic Subtraction ────────────────────────────
  {
    level: 1,
    name: 'Level 1',
    description: 'Basic Subtraction',
    questions: [
      { id: 1,  equation: '15 − ? = 9',    answer: 6 },
      { id: 2,  equation: '12 − ? = 6',    answer: 6 },
      { id: 3,  equation: '18 − ? = 13',   answer: 5 },
      { id: 4,  equation: '14 − ? = 9',    answer: 5 },
      { id: 5,  equation: '20 − ? = 10',   answer: 10 },
      { id: 6,  equation: '17 − 8 = ?',    answer: 9 },
      { id: 7,  equation: '15 − 4 = ?',    answer: 11 },
      { id: 8,  equation: '21 − 9 = ?',    answer: 12 },
      { id: 9,  equation: '14 − 6 = ?',    answer: 8 },
      { id: 10, equation: '13 − 5 = ?',    answer: 8 },
      { id: 11, equation: '? − 3 = 7',     answer: 10 },
    ],
  },

  // ── Level 2: Negative Integer Focus ───────────────────────
  {
    level: 2,
    name: 'Level 2',
    description: 'Negative Integer Focus',
    questions: [
      { id: 1,  equation: '4 − ? = −8',     answer: 12 },
      { id: 2,  equation: '7 − ? = −5',     answer: 12 },
      { id: 3,  equation: '2 − ? = −13',    answer: 15 },
      { id: 4,  equation: '6 − ? = −9',     answer: 15 },
      { id: 5,  equation: '3 − ? = −5',     answer: 8 },
      { id: 6,  equation: '5 − 14 = ?',     answer: -9 },
      { id: 7,  equation: '1 − 10 = ?',     answer: -9 },
      { id: 8,  equation: '9 − 20 = ?',     answer: -11 },
      { id: 9,  equation: '4 − 18 = ?',     answer: -14 },
      { id: 10, equation: '8 − 15 = ?',     answer: -7 },
      { id: 11, equation: '? − 11 = −3',    answer: 8 },
    ],
  },

  // ── Level 3: Negative Minuend Focus ───────────────────────
  {
    level: 3,
    name: 'Level 3',
    description: 'Negative Minuend Focus',
    questions: [
      { id: 1,  equation: '−4 − ? = −14',    answer: 10 },
      { id: 2,  equation: '−8 − ? = −18',    answer: 10 },
      { id: 3,  equation: '−5 − ? = −12',    answer: 7 },
      { id: 4,  equation: '−12 − ? = −19',   answer: 7 },
      { id: 5,  equation: '−9 − ? = −15',    answer: 6 },
      { id: 6,  equation: '−15 − 5 = ?',     answer: -20 },
      { id: 7,  equation: '−3 − 9 = ?',      answer: -12 },
      { id: 8,  equation: '−20 − 10 = ?',    answer: -30 },
      { id: 9,  equation: '−7 − 13 = ?',     answer: -20 },
      { id: 10, equation: '−11 − 4 = ?',     answer: -15 },
      { id: 11, equation: '? − 4 = −10',     answer: -6 },
    ],
  },

  // ── Level 4: Subtracting Negatives ────────────────────────
  {
    level: 4,
    name: 'Level 4',
    description: 'Subtracting Negatives',
    questions: [
      { id: 1,  equation: '5 − (?) = 13',        answer: -8 },
      { id: 2,  equation: '12 − (?) = 20',       answer: -8 },
      { id: 3,  equation: '4 − (?) = 15',        answer: -11 },
      { id: 4,  equation: '9 − (?) = 20',        answer: -11 },
      { id: 5,  equation: '10 − (?) = 16',       answer: -6 },
      { id: 6,  equation: '7 − (−5) = ?',        answer: 12 },
      { id: 7,  equation: '15 − (−10) = ?',      answer: 25 },
      { id: 8,  equation: '3 − (−9) = ?',        answer: 12 },
      { id: 9,  equation: '20 − (−4) = ?',       answer: 24 },
      { id: 10, equation: '8 − (−12) = ?',       answer: 20 },
      { id: 11, equation: '(?) − (−3) = −3',     answer: -6 },
    ],
  },

  // ── Level 5: Double Negative Focus ────────────────────────
  {
    level: 5,
    name: 'Level 5',
    description: 'Double Negative Focus',
    questions: [
      { id: 1,  equation: '−5 − (?) = 7',         answer: -12 },
      { id: 2,  equation: '−2 − (?) = 10',        answer: -12 },
      { id: 3,  equation: '−3 − (?) = 12',        answer: -15 },
      { id: 4,  equation: '−6 − (?) = 9',         answer: -15 },
      { id: 5,  equation: '−4 − (?) = 4',         answer: -8 },
      { id: 6,  equation: '−10 − (−18) = ?',      answer: 8 },
      { id: 7,  equation: '−1 − (−11) = ?',       answer: 10 },
      { id: 8,  equation: '−7 − (−20) = ?',       answer: 13 },
      { id: 9,  equation: '−4 − (−14) = ?',       answer: 10 },
      { id: 10, equation: '−11 − (−16) = ?',      answer: 5 },
      { id: 11, equation: '(?) − (−5) = −3',      answer: -8 },
    ],
  },

  // ── Level 6: Mixed Negative Operations ────────────────────
  {
    level: 6,
    name: 'Level 6',
    description: 'Mixed Negative Operations',
    questions: [
      { id: 1,  equation: '−10 − (?) = −15',       answer: -5 },
      { id: 2,  equation: '−5 − (?) = −20',        answer: 15 },
      { id: 3,  equation: '−12 − (?) = −18',       answer: 6 },
      { id: 4,  equation: '−2 − (?) = −28',        answer: 26 },
      { id: 5,  equation: '−8 − (?) = −12',        answer: 4 },
      { id: 6,  equation: '−3 − (−10) = ?',        answer: 7 },
      { id: 7,  equation: '−11 − (−15) = ?',       answer: 4 },
      { id: 8,  equation: '−6 − (−20) = ?',        answer: 14 },
      { id: 9,  equation: '−1 − (−12) = ?',        answer: 11 },
      { id: 10, equation: '−9 − (−14) = ?',        answer: 5 },
      { id: 11, equation: '(?) − (−5) = −15',      answer: -20 },
    ],
  },
];

// Total questions across all levels
export const TOTAL_ENRICHMENT_QUESTIONS = enrichmentLevels.reduce(
  (sum, level) => sum + level.questions.length,
  0
);
