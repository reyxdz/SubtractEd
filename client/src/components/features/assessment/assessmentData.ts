export interface AssessmentQuestion {
  id: number;
  question: string;
  answer: number;
}

export const assessmentData: AssessmentQuestion[] = [
  { id: 1, question: '71 - (-91)', answer: 162 },
  { id: 2, question: '64 - (18)', answer: 46 },
  { id: 3, question: '-57 - (-3)', answer: -54 },
  { id: 4, question: '-59 - (-66)', answer: 7 },
  { id: 5, question: '84 - (-85)', answer: 169 },
  { id: 6, question: '27 - (-30)', answer: 57 },
  { id: 7, question: '-30 - (-72)', answer: 42 },
  { id: 8, question: '8 - (18)', answer: -10 },
  { id: 9, question: '-96 - (-23)', answer: -73 },
  { id: 10, question: '74 - (5)', answer: 69 },
  { id: 11, question: '68 - (-85)', answer: 153 },
  { id: 12, question: '67 - (66)', answer: 1 },
  { id: 13, question: '83 - (43)', answer: 40 },
  { id: 14, question: '-9 - (-85)', answer: 76 },
  { id: 15, question: '49 - (64)', answer: -15 }
];
