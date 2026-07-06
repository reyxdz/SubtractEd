// Question Bank from EASY-AND-MODERATE-QB-FOR-ACT-1-TO-3.docx
// Each activity has Easy and Moderate rounds.
// Each round has 5 conditions, each with 10 question pairs (First Try / Second Try).
// The system picks 1 pair per condition (5 items total per round).

export interface QPair {
  ftExpr: string;
  ftAns: number;
  stExpr: string;
  stAns: number;
}

export interface HintPair {
  ftHint: string;
  stHint: string;
}

type ConditionPairs = readonly QPair[];
type ConditionHintPairs = readonly HintPair[];
type ActivityRound = readonly ConditionPairs[];
type ActivityHintRound = readonly ConditionHintPairs[];

export interface ActivityBank {
  easy: ActivityRound;
  moderate: ActivityRound;
}

export interface ActivityHintBank {
  easy: ActivityHintRound;
  moderate: ActivityHintRound;
}

// ──────────────────────────────────────────────
// Activity 1 Bank
// ──────────────────────────────────────────────
const a1EasyC1: ConditionPairs = [
  { ftExpr: '4 - 2', ftAns: 2, stExpr: '3 - 1', stAns: 2 },
  { ftExpr: '8 - 5', ftAns: 3, stExpr: '4 - 3', stAns: 1 },
  { ftExpr: '7 - 4', ftAns: 3, stExpr: '5 - 2', stAns: 3 },
  { ftExpr: '7 - 2', ftAns: 5, stExpr: '4 - 1', stAns: 3 },
  { ftExpr: '5 - 3', ftAns: 2, stExpr: '2 - 1', stAns: 1 },
  { ftExpr: '3 - 9', ftAns: -6, stExpr: '1 - 2', stAns: -1 },
  { ftExpr: '4 - 9', ftAns: -5, stExpr: '2 - 3', stAns: -1 },
  { ftExpr: '5 - 9', ftAns: -4, stExpr: '1 - 4', stAns: -3 },
  { ftExpr: '1 - 2', ftAns: -1, stExpr: '2 - 4', stAns: -2 },
  { ftExpr: '1 - 6', ftAns: -5, stExpr: '1 - 3', stAns: -2 },
];
const a1EasyC2: ConditionPairs = [
  { ftExpr: '-1 - 5', ftAns: -6, stExpr: '-1 - 2', stAns: -3 },
  { ftExpr: '-9 - 5', ftAns: -14, stExpr: '-2 - 1', stAns: -3 },
  { ftExpr: '-9 - 2', ftAns: -11, stExpr: '-1 - 3', stAns: -4 },
  { ftExpr: '-9 - 3', ftAns: -12, stExpr: '-2 - 2', stAns: -4 },
  { ftExpr: '-5 - 7', ftAns: -12, stExpr: '-3 - 1', stAns: -4 },
  { ftExpr: '-6 - 2', ftAns: -8, stExpr: '-1 - 4', stAns: -5 },
  { ftExpr: '-1 - 2', ftAns: -3, stExpr: '-2 - 3', stAns: -5 },
  { ftExpr: '-5 - 9', ftAns: -14, stExpr: '-3 - 2', stAns: -5 },
  { ftExpr: '-3 - 8', ftAns: -11, stExpr: '-4 - 1', stAns: -5 },
  { ftExpr: '-4 - 3', ftAns: -7, stExpr: '-1 - 5', stAns: -6 },
];
const a1EasyC3: ConditionPairs = [
  { ftExpr: '6 - (-3)', ftAns: 9, stExpr: '1 - (-1)', stAns: 2 },
  { ftExpr: '9 - (-9)', ftAns: 18, stExpr: '2 - (-1)', stAns: 3 },
  { ftExpr: '5 - (-4)', ftAns: 9, stExpr: '1 - (-2)', stAns: 3 },
  { ftExpr: '8 - (-2)', ftAns: 10, stExpr: '3 - (-1)', stAns: 4 },
  { ftExpr: '2 - (-6)', ftAns: 8, stExpr: '2 - (-2)', stAns: 4 },
  { ftExpr: '1 - (-6)', ftAns: 7, stExpr: '1 - (-3)', stAns: 4 },
  { ftExpr: '1 - (-4)', ftAns: 5, stExpr: '4 - (-1)', stAns: 5 },
  { ftExpr: '2 - (-2)', ftAns: 4, stExpr: '3 - (-2)', stAns: 5 },
  { ftExpr: '9 - (-3)', ftAns: 12, stExpr: '2 - (-3)', stAns: 5 },
  { ftExpr: '8 - (-1)', ftAns: 9, stExpr: '1 - (-4)', stAns: 5 },
];
const a1EasyC4: ConditionPairs = [
  { ftExpr: '-4 - (-5)', ftAns: 1, stExpr: '-1 - (-2)', stAns: 1 },
  { ftExpr: '-2 - (-9)', ftAns: 7, stExpr: '-2 - (-3)', stAns: 1 },
  { ftExpr: '-6 - (-7)', ftAns: 1, stExpr: '-1 - (-3)', stAns: 2 },
  { ftExpr: '-2 - (-4)', ftAns: 2, stExpr: '-3 - (-4)', stAns: 1 },
  { ftExpr: '-1 - (-6)', ftAns: 5, stExpr: '-2 - (-4)', stAns: 2 },
  { ftExpr: '-5 - (-7)', ftAns: 2, stExpr: '-1 - (-4)', stAns: 3 },
  { ftExpr: '-6 - (-8)', ftAns: 2, stExpr: '-4 - (-5)', stAns: 1 },
  { ftExpr: '-5 - (-9)', ftAns: 4, stExpr: '-3 - (-5)', stAns: 2 },
  { ftExpr: '-3 - (-8)', ftAns: 5, stExpr: '-2 - (-5)', stAns: 3 },
  { ftExpr: '-2 - (-7)', ftAns: 5, stExpr: '-1 - (-5)', stAns: 4 },
];
const a1EasyC5: ConditionPairs = [
  { ftExpr: '-6 - (-2)', ftAns: -4, stExpr: '-2 - (-1)', stAns: -1 },
  { ftExpr: '-8 - (-3)', ftAns: -5, stExpr: '-3 - (-2)', stAns: -1 },
  { ftExpr: '-4 - (-2)', ftAns: -2, stExpr: '-3 - (-1)', stAns: -2 },
  { ftExpr: '-7 - (-3)', ftAns: -4, stExpr: '-4 - (-3)', stAns: -1 },
  { ftExpr: '-7 - (-1)', ftAns: -6, stExpr: '-4 - (-2)', stAns: -2 },
  { ftExpr: '-9 - (-1)', ftAns: -8, stExpr: '-4 - (-1)', stAns: -3 },
  { ftExpr: '-8 - (-5)', ftAns: -3, stExpr: '-5 - (-4)', stAns: -1 },
  { ftExpr: '-7 - (-5)', ftAns: -2, stExpr: '-5 - (-3)', stAns: -2 },
  { ftExpr: '-2 - (-1)', ftAns: -1, stExpr: '-5 - (-2)', stAns: -3 },
  { ftExpr: '-4 - (-1)', ftAns: -3, stExpr: '-5 - (-1)', stAns: -4 },
];

const a1ModC1: ConditionPairs = [
  { ftExpr: '18 - 5', ftAns: 13, stExpr: '10 - 3', stAns: 7 },
  { ftExpr: '20 - 11', ftAns: 9, stExpr: '12 - 5', stAns: 7 },
  { ftExpr: '13 - 4', ftAns: 9, stExpr: '8 - 2', stAns: 6 },
  { ftExpr: '15 - 9', ftAns: 6, stExpr: '14 - 6', stAns: 8 },
  { ftExpr: '9 - 2', ftAns: 7, stExpr: '9 - 4', stAns: 5 },
  { ftExpr: '4 - 15', ftAns: -11, stExpr: '3 - 10', stAns: -7 },
  { ftExpr: '2 - 19', ftAns: -17, stExpr: '5 - 12', stAns: -7 },
  { ftExpr: '7 - 12', ftAns: -5, stExpr: '2 - 8', stAns: -6 },
  { ftExpr: '5 - 8', ftAns: -3, stExpr: '6 - 11', stAns: -5 },
  { ftExpr: '11 - 20', ftAns: -9, stExpr: '4 - 14', stAns: -10 },
];
const a1ModC2: ConditionPairs = [
  { ftExpr: '-12 - 6', ftAns: -18, stExpr: '-5 - 3', stAns: -8 },
  { ftExpr: '-5 - 14', ftAns: -19, stExpr: '-2 - 7', stAns: -9 },
  { ftExpr: '-18 - 2', ftAns: -20, stExpr: '-6 - 4', stAns: -10 },
  { ftExpr: '-9 - 13', ftAns: -22, stExpr: '-4 - 8', stAns: -12 },
  { ftExpr: '-14 - 7', ftAns: -21, stExpr: '-7 - 5', stAns: -12 },
  { ftExpr: '-7 - 11', ftAns: -18, stExpr: '-1 - 9', stAns: -10 },
  { ftExpr: '-20 - 4', ftAns: -24, stExpr: '-8 - 2', stAns: -10 },
  { ftExpr: '-3 - 16', ftAns: -19, stExpr: '-3 - 6', stAns: -9 },
  { ftExpr: '-16 - 8', ftAns: -24, stExpr: '-9 - 3', stAns: -12 },
  { ftExpr: '-11 - 15', ftAns: -26, stExpr: '-5 - 5', stAns: -10 },
];
const a1ModC3: ConditionPairs = [
  { ftExpr: '14 - (-6)', ftAns: 20, stExpr: '5 - (-4)', stAns: 9 },
  { ftExpr: '9 - (-11)', ftAns: 20, stExpr: '3 - (-7)', stAns: 10 },
  { ftExpr: '15 - (-5)', ftAns: 20, stExpr: '6 - (-3)', stAns: 9 },
  { ftExpr: '6 - (-14)', ftAns: 20, stExpr: '8 - (-5)', stAns: 13 },
  { ftExpr: '20 - (-2)', ftAns: 22, stExpr: '2 - (-9)', stAns: 11 },
  { ftExpr: '11 - (-8)', ftAns: 19, stExpr: '7 - (-2)', stAns: 9 },
  { ftExpr: '4 - (-17)', ftAns: 21, stExpr: '4 - (-6)', stAns: 10 },
  { ftExpr: '17 - (-3)', ftAns: 20, stExpr: '9 - (-1)', stAns: 10 },
  { ftExpr: '8 - (-12)', ftAns: 20, stExpr: '1 - (-8)', stAns: 9 },
  { ftExpr: '12 - (-9)', ftAns: 21, stExpr: '5 - (-5)', stAns: 10 },
];
const a1ModC4: ConditionPairs = [
  { ftExpr: '-8 - (-15)', ftAns: 7, stExpr: '-3 - (-10)', stAns: 7 },
  { ftExpr: '-3 - (-12)', ftAns: 9, stExpr: '-2 - (-11)', stAns: 9 },
  { ftExpr: '-10 - (-17)', ftAns: 7, stExpr: '-5 - (-12)', stAns: 7 },
  { ftExpr: '-1 - (-9)', ftAns: 8, stExpr: '-1 - (-9)', stAns: 8 },
  { ftExpr: '-6 - (-11)', ftAns: 5, stExpr: '-4 - (-9)', stAns: 5 },
  { ftExpr: '-14 - (-20)', ftAns: 6, stExpr: '-6 - (-12)', stAns: 6 },
  { ftExpr: '-2 - (-8)', ftAns: 6, stExpr: '-2 - (-8)', stAns: 6 },
  { ftExpr: '-7 - (-13)', ftAns: 6, stExpr: '-3 - (-9)', stAns: 6 },
  { ftExpr: '-5 - (-6)', ftAns: 1, stExpr: '-4 - (-5)', stAns: 1 },
  { ftExpr: '-11 - (-18)', ftAns: 7, stExpr: '-5 - (-12)', stAns: 7 },
];
const a1ModC5: ConditionPairs = [
  { ftExpr: '-14 - (-5)', ftAns: -9, stExpr: '-10 - (-3)', stAns: -7 },
  { ftExpr: '-19 - (-7)', ftAns: -12, stExpr: '-12 - (-2)', stAns: -10 },
  { ftExpr: '-11 - (-3)', ftAns: -8, stExpr: '-9 - (-4)', stAns: -5 },
  { ftExpr: '-16 - (-10)', ftAns: -6, stExpr: '-11 - (-5)', stAns: -6 },
  { ftExpr: '-8 - (-2)', ftAns: -6, stExpr: '-8 - (-2)', stAns: -6 },
  { ftExpr: '-20 - (-12)', ftAns: -8, stExpr: '-14 - (-6)', stAns: -8 },
  { ftExpr: '-13 - (-4)', ftAns: -9, stExpr: '-13 - (-4)', stAns: -9 },
  { ftExpr: '-17 - (-9)', ftAns: -8, stExpr: '-11 - (-3)', stAns: -8 },
  { ftExpr: '-12 - (-1)', ftAns: -11, stExpr: '-12 - (-1)', stAns: -11 },
  { ftExpr: '-15 - (-6)', ftAns: -9, stExpr: '-10 - (-4)', stAns: -6 },
];

export const activity1Bank: ActivityBank = {
  easy: [a1EasyC1, a1EasyC2, a1EasyC3, a1EasyC4, a1EasyC5],
  moderate: [a1ModC1, a1ModC2, a1ModC3, a1ModC4, a1ModC5],
};

// ──────────────────────────────────────────────
// Activity 2 Bank
// ──────────────────────────────────────────────
const a2EasyC1: ConditionPairs = [
  { ftExpr: '9 - 4', ftAns: 5, stExpr: '5 - 2', stAns: 3 },
  { ftExpr: '8 - 2', ftAns: 6, stExpr: '4 - 1', stAns: 3 },
  { ftExpr: '7 - 5', ftAns: 2, stExpr: '3 - 1', stAns: 2 },
  { ftExpr: '6 - 1', ftAns: 5, stExpr: '5 - 4', stAns: 1 },
  { ftExpr: '5 - 3', ftAns: 2, stExpr: '4 - 2', stAns: 2 },
  { ftExpr: '3 - 8', ftAns: -5, stExpr: '2 - 5', stAns: -3 },
  { ftExpr: '2 - 7', ftAns: -5, stExpr: '1 - 4', stAns: -3 },
  { ftExpr: '4 - 9', ftAns: -5, stExpr: '3 - 5', stAns: -2 },
  { ftExpr: '1 - 6', ftAns: -5, stExpr: '1 - 5', stAns: -4 },
  { ftExpr: '5 - 9', ftAns: -4, stExpr: '2 - 4', stAns: -2 },
];
const a2EasyC2: ConditionPairs = [
  { ftExpr: '-4 - 3', ftAns: -7, stExpr: '-2 - 3', stAns: -5 },
  { ftExpr: '-2 - 5', ftAns: -7, stExpr: '-1 - 4', stAns: -5 },
  { ftExpr: '-6 - 2', ftAns: -8, stExpr: '-3 - 2', stAns: -5 },
  { ftExpr: '-1 - 8', ftAns: -9, stExpr: '-2 - 1', stAns: -3 },
  { ftExpr: '-5 - 4', ftAns: -9, stExpr: '-1 - 3', stAns: -4 },
  { ftExpr: '-3 - 6', ftAns: -9, stExpr: '-4 - 1', stAns: -5 },
  { ftExpr: '-7 - 1', ftAns: -8, stExpr: '-3 - 1', stAns: -4 },
  { ftExpr: '-8 - 1', ftAns: -9, stExpr: '-1 - 2', stAns: -3 },
  { ftExpr: '-2 - 7', ftAns: -9, stExpr: '-2 - 2', stAns: -4 },
  { ftExpr: '-4 - 5', ftAns: -9, stExpr: '-1 - 1', stAns: -2 },
];
const a2EasyC3: ConditionPairs = [
  { ftExpr: '4 - (-3)', ftAns: 7, stExpr: '2 - (-3)', stAns: 5 },
  { ftExpr: '5 - (-2)', ftAns: 7, stExpr: '4 - (-1)', stAns: 5 },
  { ftExpr: '6 - (-1)', ftAns: 7, stExpr: '3 - (-2)', stAns: 5 },
  { ftExpr: '2 - (-5)', ftAns: 7, stExpr: '1 - (-4)', stAns: 5 },
  { ftExpr: '7 - (-2)', ftAns: 9, stExpr: '2 - (-2)', stAns: 4 },
  { ftExpr: '3 - (-4)', ftAns: 7, stExpr: '3 - (-1)', stAns: 4 },
  { ftExpr: '8 - (-1)', ftAns: 9, stExpr: '1 - (-3)', stAns: 4 },
  { ftExpr: '1 - (-8)', ftAns: 9, stExpr: '2 - (-1)', stAns: 3 },
  { ftExpr: '4 - (-5)', ftAns: 9, stExpr: '1 - (-2)', stAns: 3 },
  { ftExpr: '2 - (-6)', ftAns: 8, stExpr: '1 - (-1)', stAns: 2 },
];
const a2EasyC4: ConditionPairs = [
  { ftExpr: '-3 - (-8)', ftAns: 5, stExpr: '-2 - (-5)', stAns: 3 },
  { ftExpr: '-2 - (-7)', ftAns: 5, stExpr: '-1 - (-4)', stAns: 3 },
  { ftExpr: '-4 - (-9)', ftAns: 5, stExpr: '-3 - (-5)', stAns: 2 },
  { ftExpr: '-1 - (-6)', ftAns: 5, stExpr: '-2 - (-4)', stAns: 2 },
  { ftExpr: '-5 - (-8)', ftAns: 3, stExpr: '-1 - (-3)', stAns: 2 },
  { ftExpr: '-2 - (-9)', ftAns: 7, stExpr: '-4 - (-5)', stAns: 1 },
  { ftExpr: '-6 - (-7)', ftAns: 1, stExpr: '-3 - (-4)', stAns: 1 },
  { ftExpr: '-3 - (-5)', ftAns: 2, stExpr: '-2 - (-3)', stAns: 1 },
  { ftExpr: '-1 - (-8)', ftAns: 7, stExpr: '-1 - (-5)', stAns: 4 },
  { ftExpr: '-4 - (-6)', ftAns: 2, stExpr: '-1 - (-2)', stAns: 1 },
];
const a2EasyC5: ConditionPairs = [
  { ftExpr: '-8 - (-3)', ftAns: -5, stExpr: '-5 - (-2)', stAns: -3 },
  { ftExpr: '-7 - (-2)', ftAns: -5, stExpr: '-4 - (-1)', stAns: -3 },
  { ftExpr: '-9 - (-4)', ftAns: -5, stExpr: '-5 - (-3)', stAns: -2 },
  { ftExpr: '-6 - (-1)', ftAns: -5, stExpr: '-4 - (-2)', stAns: -2 },
  { ftExpr: '-5 - (-2)', ftAns: -3, stExpr: '-3 - (-1)', stAns: -2 },
  { ftExpr: '-9 - (-2)', ftAns: -7, stExpr: '-5 - (-4)', stAns: -1 },
  { ftExpr: '-7 - (-6)', ftAns: -1, stExpr: '-4 - (-3)', stAns: -1 },
  { ftExpr: '-5 - (-3)', ftAns: -2, stExpr: '-3 - (-2)', stAns: -1 },
  { ftExpr: '-8 - (-1)', ftAns: -7, stExpr: '-5 - (-1)', stAns: -4 },
  { ftExpr: '-6 - (-4)', ftAns: -2, stExpr: '-2 - (-1)', stAns: -1 },
];

const a2ModC1: ConditionPairs = [
  { ftExpr: '15 - 5', ftAns: 10, stExpr: '11 - 5', stAns: 6 },
  { ftExpr: '12 - 4', ftAns: 8, stExpr: '9 - 4', stAns: 5 },
  { ftExpr: '14 - 8', ftAns: 6, stExpr: '10 - 6', stAns: 4 },
  { ftExpr: '11 - 2', ftAns: 9, stExpr: '8 - 2', stAns: 6 },
  { ftExpr: '9 - 3', ftAns: 6, stExpr: '7 - 3', stAns: 4 },
  { ftExpr: '4 - 15', ftAns: -11, stExpr: '3 - 11', stAns: -8 },
  { ftExpr: '2 - 12', ftAns: -10, stExpr: '2 - 9', stAns: -7 },
  { ftExpr: '6 - 14', ftAns: -8, stExpr: '5 - 10', stAns: -5 },
  { ftExpr: '5 - 11', ftAns: -6, stExpr: '4 - 8', stAns: -4 },
  { ftExpr: '8 - 13', ftAns: -5, stExpr: '6 - 11', stAns: -5 },
];
const a2ModC2: ConditionPairs = [
  { ftExpr: '-10 - 5', ftAns: -15, stExpr: '-8 - 3', stAns: -11 },
  { ftExpr: '-12 - 2', ftAns: -14, stExpr: '-9 - 2', stAns: -11 },
  { ftExpr: '-8 - 7', ftAns: -15, stExpr: '-6 - 5', stAns: -11 },
  { ftExpr: '-11 - 4', ftAns: -15, stExpr: '-7 - 4', stAns: -11 },
  { ftExpr: '-6 - 9', ftAns: -15, stExpr: '-4 - 6', stAns: -10 },
  { ftExpr: '-9 - 3', ftAns: -12, stExpr: '-5 - 4', stAns: -9 },
  { ftExpr: '-14 - 1', ftAns: -15, stExpr: '-10 - 1', stAns: -11 },
  { ftExpr: '-7 - 6', ftAns: -13, stExpr: '-3 - 8', stAns: -11 },
  { ftExpr: '-13 - 2', ftAns: -15, stExpr: '-8 - 2', stAns: -10 },
  { ftExpr: '-5 - 10', ftAns: -15, stExpr: '-2 - 9', stAns: -11 },
];
const a2ModC3: ConditionPairs = [
  { ftExpr: '10 - (-5)', ftAns: 15, stExpr: '8 - (-3)', stAns: 11 },
  { ftExpr: '8 - (-6)', ftAns: 14, stExpr: '6 - (-5)', stAns: 11 },
  { ftExpr: '12 - (-3)', ftAns: 15, stExpr: '9 - (-2)', stAns: 11 },
  { ftExpr: '9 - (-4)', ftAns: 13, stExpr: '7 - (-4)', stAns: 11 },
  { ftExpr: '7 - (-8)', ftAns: 15, stExpr: '5 - (-6)', stAns: 11 },
  { ftExpr: '11 - (-2)', ftAns: 13, stExpr: '10 - (-1)', stAns: 11 },
  { ftExpr: '14 - (-1)', ftAns: 15, stExpr: '4 - (-7)', stAns: 11 },
  { ftExpr: '6 - (-7)', ftAns: 13, stExpr: '3 - (-8)', stAns: 11 },
  { ftExpr: '13 - (-2)', ftAns: 15, stExpr: '2 - (-9)', stAns: 11 },
  { ftExpr: '5 - (-10)', ftAns: 15, stExpr: '1 - (-10)', stAns: 11 },
];
const a2ModC4: ConditionPairs = [
  { ftExpr: '-5 - (-15)', ftAns: 10, stExpr: '-3 - (-11)', stAns: 8 },
  { ftExpr: '-3 - (-12)', ftAns: 9, stExpr: '-2 - (-9)', stAns: 7 },
  { ftExpr: '-8 - (-14)', ftAns: 6, stExpr: '-5 - (-10)', stAns: 5 },
  { ftExpr: '-2 - (-11)', ftAns: 9, stExpr: '-1 - (-8)', stAns: 7 },
  { ftExpr: '-6 - (-13)', ftAns: 7, stExpr: '-4 - (-11)', stAns: 7 },
  { ftExpr: '-4 - (-10)', ftAns: 6, stExpr: '-2 - (-10)', stAns: 8 },
  { ftExpr: '-1 - (-9)', ftAns: 8, stExpr: '-1 - (-7)', stAns: 6 },
  { ftExpr: '-7 - (-15)', ftAns: 8, stExpr: '-6 - (-11)', stAns: 5 },
  { ftExpr: '-9 - (-12)', ftAns: 3, stExpr: '-3 - (-9)', stAns: 6 },
  { ftExpr: '-10 - (-14)', ftAns: 4, stExpr: '-4 - (-8)', stAns: 4 },
];
const a2ModC5: ConditionPairs = [
  { ftExpr: '-15 - (-5)', ftAns: -10, stExpr: '-11 - (-3)', stAns: -8 },
  { ftExpr: '-12 - (-3)', ftAns: -9, stExpr: '-9 - (-2)', stAns: -7 },
  { ftExpr: '-14 - (-8)', ftAns: -6, stExpr: '-10 - (-5)', stAns: -5 },
  { ftExpr: '-11 - (-2)', ftAns: -9, stExpr: '-8 - (-1)', stAns: -7 },
  { ftExpr: '-13 - (-6)', ftAns: -7, stExpr: '-11 - (-4)', stAns: -7 },
  { ftExpr: '-10 - (-4)', ftAns: -6, stExpr: '-10 - (-2)', stAns: -8 },
  { ftExpr: '-9 - (-1)', ftAns: -8, stExpr: '-7 - (-1)', stAns: -6 },
  { ftExpr: '-15 - (-7)', ftAns: -8, stExpr: '-11 - (-6)', stAns: -5 },
  { ftExpr: '-12 - (-9)', ftAns: -3, stExpr: '-9 - (-3)', stAns: -6 },
  { ftExpr: '-14 - (-10)', ftAns: -4, stExpr: '-8 - (-4)', stAns: -4 },
];

export const activity2Bank: ActivityBank = {
  easy: [a2EasyC1, a2EasyC2, a2EasyC3, a2EasyC4, a2EasyC5],
  moderate: [a2ModC1, a2ModC2, a2ModC3, a2ModC4, a2ModC5],
};

// ──────────────────────────────────────────────
// Activity 3 Bank
// ──────────────────────────────────────────────
const a3EasyC1: ConditionPairs = [
  { ftExpr: '9 - 3', ftAns: 6, stExpr: '5 - 2', stAns: 3 },
  { ftExpr: '7 - 2', ftAns: 5, stExpr: '4 - 1', stAns: 3 },
  { ftExpr: '8 - 4', ftAns: 4, stExpr: '3 - 1', stAns: 2 },
  { ftExpr: '6 - 2', ftAns: 4, stExpr: '5 - 3', stAns: 2 },
  { ftExpr: '5 - 1', ftAns: 4, stExpr: '2 - 1', stAns: 1 },
  { ftExpr: '2 - 8', ftAns: -6, stExpr: '1 - 4', stAns: -3 },
  { ftExpr: '3 - 7', ftAns: -4, stExpr: '2 - 5', stAns: -3 },
  { ftExpr: '1 - 5', ftAns: -4, stExpr: '1 - 3', stAns: -2 },
  { ftExpr: '4 - 9', ftAns: -5, stExpr: '2 - 4', stAns: -2 },
  { ftExpr: '2 - 6', ftAns: -4, stExpr: '1 - 5', stAns: -4 },
];
const a3EasyC2: ConditionPairs = [
  { ftExpr: '-5 - 3', ftAns: -8, stExpr: '-2 - 1', stAns: -3 },
  { ftExpr: '-7 - 1', ftAns: -8, stExpr: '-3 - 2', stAns: -5 },
  { ftExpr: '-2 - 6', ftAns: -8, stExpr: '-1 - 4', stAns: -5 },
  { ftExpr: '-4 - 4', ftAns: -8, stExpr: '-2 - 3', stAns: -5 },
  { ftExpr: '-1 - 8', ftAns: -9, stExpr: '-4 - 1', stAns: -5 },
  { ftExpr: '-6 - 2', ftAns: -8, stExpr: '-1 - 3', stAns: -4 },
  { ftExpr: '-3 - 5', ftAns: -8, stExpr: '-2 - 2', stAns: -4 },
  { ftExpr: '-8 - 1', ftAns: -9, stExpr: '-3 - 1', stAns: -4 },
  { ftExpr: '-2 - 7', ftAns: -9, stExpr: '-1 - 2', stAns: -3 },
  { ftExpr: '-4 - 5', ftAns: -9, stExpr: '-2 - 0', stAns: -2 },
];
const a3EasyC3: ConditionPairs = [
  { ftExpr: '5 - (-4)', ftAns: 9, stExpr: '2 - (-3)', stAns: 5 },
  { ftExpr: '3 - (-6)', ftAns: 9, stExpr: '1 - (-4)', stAns: 5 },
  { ftExpr: '7 - (-2)', ftAns: 9, stExpr: '3 - (-2)', stAns: 5 },
  { ftExpr: '1 - (-8)', ftAns: 9, stExpr: '4 - (-1)', stAns: 5 },
  { ftExpr: '6 - (-3)', ftAns: 9, stExpr: '2 - (-2)', stAns: 4 },
  { ftExpr: '2 - (-7)', ftAns: 9, stExpr: '1 - (-3)', stAns: 4 },
  { ftExpr: '4 - (-5)', ftAns: 9, stExpr: '3 - (-1)', stAns: 4 },
  { ftExpr: '8 - (-1)', ftAns: 9, stExpr: '2 - (-1)', stAns: 3 },
  { ftExpr: '3 - (-5)', ftAns: 8, stExpr: '1 - (-2)', stAns: 3 },
  { ftExpr: '5 - (-2)', ftAns: 7, stExpr: '1 - (-1)', stAns: 2 },
];
const a3EasyC4: ConditionPairs = [
  { ftExpr: '-3 - (-8)', ftAns: 5, stExpr: '-2 - (-5)', stAns: 3 },
  { ftExpr: '-2 - (-7)', ftAns: 5, stExpr: '-1 - (-4)', stAns: 3 },
  { ftExpr: '-4 - (-9)', ftAns: 5, stExpr: '-3 - (-5)', stAns: 2 },
  { ftExpr: '-1 - (-6)', ftAns: 5, stExpr: '-2 - (-4)', stAns: 2 },
  { ftExpr: '-5 - (-8)', ftAns: 3, stExpr: '-1 - (-3)', stAns: 2 },
  { ftExpr: '-2 - (-9)', ftAns: 7, stExpr: '-4 - (-5)', stAns: 1 },
  { ftExpr: '-6 - (-7)', ftAns: 1, stExpr: '-2 - (-3)', stAns: 1 },
  { ftExpr: '-3 - (-5)', ftAns: 2, stExpr: '-1 - (-2)', stAns: 1 },
  { ftExpr: '-1 - (-8)', ftAns: 7, stExpr: '-3 - (-4)', stAns: 1 },
  { ftExpr: '-4 - (-6)', ftAns: 2, stExpr: '-1 - (-5)', stAns: 4 },
];
const a3EasyC5: ConditionPairs = [
  { ftExpr: '-8 - (-3)', ftAns: -5, stExpr: '-5 - (-2)', stAns: -3 },
  { ftExpr: '-7 - (-2)', ftAns: -5, stExpr: '-4 - (-1)', stAns: -3 },
  { ftExpr: '-9 - (-4)', ftAns: -5, stExpr: '-5 - (-3)', stAns: -2 },
  { ftExpr: '-6 - (-1)', ftAns: -5, stExpr: '-4 - (-2)', stAns: -2 },
  { ftExpr: '-5 - (-2)', ftAns: -3, stExpr: '-3 - (-1)', stAns: -2 },
  { ftExpr: '-9 - (-2)', ftAns: -7, stExpr: '-5 - (-4)', stAns: -1 },
  { ftExpr: '-7 - (-6)', ftAns: -1, stExpr: '-4 - (-3)', stAns: -1 },
  { ftExpr: '-5 - (-3)', ftAns: -2, stExpr: '-3 - (-2)', stAns: -1 },
  { ftExpr: '-8 - (-1)', ftAns: -7, stExpr: '-5 - (-1)', stAns: -4 },
  { ftExpr: '-6 - (-4)', ftAns: -2, stExpr: '-2 - (-1)', stAns: -1 },
];

const a3ModC1: ConditionPairs = [
  { ftExpr: '38 - 12', ftAns: 26, stExpr: '28 - 10', stAns: 18 },
  { ftExpr: '35 - 15', ftAns: 20, stExpr: '25 - 11', stAns: 14 },
  { ftExpr: '40 - 22', ftAns: 18, stExpr: '30 - 15', stAns: 15 },
  { ftExpr: '32 - 8', ftAns: 24, stExpr: '22 - 5', stAns: 17 },
  { ftExpr: '29 - 14', ftAns: 15, stExpr: '19 - 7', stAns: 12 },
  { ftExpr: '12 - 38', ftAns: -26, stExpr: '10 - 28', stAns: -18 },
  { ftExpr: '15 - 35', ftAns: -20, stExpr: '11 - 25', stAns: -14 },
  { ftExpr: '22 - 40', ftAns: -18, stExpr: '15 - 30', stAns: -15 },
  { ftExpr: '8 - 32', ftAns: -24, stExpr: '5 - 22', stAns: -17 },
  { ftExpr: '14 - 29', ftAns: -15, stExpr: '7 - 19', stAns: -12 },
];
const a3ModC2: ConditionPairs = [
  { ftExpr: '-25 - 14', ftAns: -39, stExpr: '-18 - 10', stAns: -28 },
  { ftExpr: '-30 - 8', ftAns: -38, stExpr: '-20 - 6', stAns: -26 },
  { ftExpr: '-18 - 22', ftAns: -40, stExpr: '-12 - 15', stAns: -27 },
  { ftExpr: '-35 - 4', ftAns: -39, stExpr: '-25 - 3', stAns: -28 },
  { ftExpr: '-22 - 15', ftAns: -37, stExpr: '-15 - 12', stAns: -27 },
  { ftExpr: '-12 - 25', ftAns: -37, stExpr: '-9 - 18', stAns: -27 },
  { ftExpr: '-8 - 30', ftAns: -38, stExpr: '-6 - 20', stAns: -26 },
  { ftExpr: '-22 - 18', ftAns: -40, stExpr: '-15 - 12', stAns: -27 },
  { ftExpr: '-4 - 35', ftAns: -39, stExpr: '-3 - 25', stAns: -28 },
  { ftExpr: '-15 - 22', ftAns: -37, stExpr: '-12 - 15', stAns: -27 },
];
const a3ModC3: ConditionPairs = [
  { ftExpr: '25 - (-14)', ftAns: 39, stExpr: '18 - (-10)', stAns: 28 },
  { ftExpr: '30 - (-8)', ftAns: 38, stExpr: '20 - (-6)', stAns: 26 },
  { ftExpr: '18 - (-22)', ftAns: 40, stExpr: '12 - (-15)', stAns: 27 },
  { ftExpr: '35 - (-4)', ftAns: 39, stExpr: '25 - (-3)', stAns: 28 },
  { ftExpr: '22 - (-15)', ftAns: 37, stExpr: '15 - (-12)', stAns: 27 },
  { ftExpr: '12 - (-25)', ftAns: 37, stExpr: '9 - (-18)', stAns: 27 },
  { ftExpr: '8 - (-30)', ftAns: 38, stExpr: '6 - (-20)', stAns: 26 },
  { ftExpr: '22 - (-18)', ftAns: 40, stExpr: '15 - (-12)', stAns: 27 },
  { ftExpr: '4 - (-35)', ftAns: 39, stExpr: '3 - (-25)', stAns: 28 },
  { ftExpr: '15 - (-22)', ftAns: 37, stExpr: '12 - (-15)', stAns: 27 },
];
const a3ModC4: ConditionPairs = [
  { ftExpr: '-12 - (-38)', ftAns: 26, stExpr: '-10 - (-28)', stAns: 18 },
  { ftExpr: '-15 - (-35)', ftAns: 20, stExpr: '-11 - (-25)', stAns: 14 },
  { ftExpr: '-22 - (-40)', ftAns: 18, stExpr: '-15 - (-30)', stAns: 15 },
  { ftExpr: '-8 - (-32)', ftAns: 24, stExpr: '-5 - (-22)', stAns: 17 },
  { ftExpr: '-14 - (-29)', ftAns: 15, stExpr: '-7 - (-19)', stAns: 12 },
  { ftExpr: '-10 - (-35)', ftAns: 25, stExpr: '-8 - (-25)', stAns: 17 },
  { ftExpr: '-5 - (-28)', ftAns: 23, stExpr: '-4 - (-20)', stAns: 16 },
  { ftExpr: '-18 - (-39)', ftAns: 21, stExpr: '-12 - (-29)', stAns: 17 },
  { ftExpr: '-11 - (-36)', ftAns: 25, stExpr: '-9 - (-27)', stAns: 18 },
  { ftExpr: '-6 - (-31)', ftAns: 25, stExpr: '-5 - (-22)', stAns: 17 },
];
const a3ModC5: ConditionPairs = [
  { ftExpr: '-38 - (-12)', ftAns: -26, stExpr: '-28 - (-10)', stAns: -18 },
  { ftExpr: '-35 - (-15)', ftAns: -20, stExpr: '-25 - (-11)', stAns: -14 },
  { ftExpr: '-40 - (-22)', ftAns: -18, stExpr: '-30 - (-15)', stAns: -15 },
  { ftExpr: '-32 - (-8)', ftAns: -24, stExpr: '-22 - (-5)', stAns: -17 },
  { ftExpr: '-29 - (-14)', ftAns: -15, stExpr: '-19 - (-7)', stAns: -12 },
  { ftExpr: '-35 - (-10)', ftAns: -25, stExpr: '-25 - (-8)', stAns: -17 },
  { ftExpr: '-28 - (-5)', ftAns: -23, stExpr: '-20 - (-4)', stAns: -16 },
  { ftExpr: '-39 - (-18)', ftAns: -21, stExpr: '-29 - (-12)', stAns: -17 },
  { ftExpr: '-36 - (-11)', ftAns: -25, stExpr: '-27 - (-9)', stAns: -18 },
  { ftExpr: '-31 - (-6)', ftAns: -25, stExpr: '-22 - (-5)', stAns: -17 },
];

export const activity3Bank: ActivityBank = {
  easy: [a3EasyC1, a3EasyC2, a3EasyC3, a3EasyC4, a3EasyC5],
  moderate: [a3ModC1, a3ModC2, a3ModC3, a3ModC4, a3ModC5],
};

// ── Randomization Helpers ─────────────────────
// Pick 5 pairs, one random from each condition.
export function pickFivePairs(round: ActivityRound): QPair[] {
  const result: QPair[] = [];
  for (let c = 0; c < 5; c++) {
    const condition = round[c];
    const idx = Math.floor(Math.random() * condition.length);
    result.push(condition[idx]);
  }
  // Shuffle the order
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Parse expression string like "4 - 2" or "4 - (-2)" or "-4 - (-2)"
export function parseExpr(expr: string): { a: number; b: number } {
  // Handle "a - b" or "a - (-b)" or "-a - b" or "-a - (-b)"
  const cleaned = expr.replace(/\s+/g, '');
  // Match pattern: (-?\d+) - \(?(-?\d+)\)?
  const match = cleaned.match(/^(-?\d+)-\(?(-?\d+)\)?$/);
  if (match) {
    return { a: parseInt(match[1], 10), b: parseInt(match[2], 10) };
  }
  // Fallback: split on " - "
  const parts = expr.split(' - ').map(s => parseInt(s.trim(), 10));
  return { a: parts[0], b: parts[1] };
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DiffPair - For difficult round word problems
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export interface DiffPair {
  ftProb: string;
  ftAns: number;
  stProb: string;
  stAns: number;
}

export type DiffCondition = readonly DiffPair[];
export type DiffRound = readonly DiffCondition[];

// The difficult word problems embed an "Equation: ..." answer-key reference in
// their text for maintainers. Strip it before showing the problem to students.
export function stripEquationRef(text: string): string {
  return text.replace(/\s*(?:[•*-]\s*)?Equation\s*:[\s\S]*$/i, '').trim();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Activity 1 Hint Banks
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const a1EasyHintsC1: ConditionHintPairs = [
  { ftHint: "Place 4 (+) chips. Take away 2 (+) chips.", stHint: "Place 3 (+) chips. Take away 1 (+) chip." },
  { ftHint: "Place 8 (+) chips. Take away 5 (+) chips.", stHint: "Place 4 (+) chips. Take away 3 (+) chips." },
  { ftHint: "Place 7 (+) chips. Take away 4 (+) chips.", stHint: "Place 5 (+) chips. Take away 2 (+) chips." },
  { ftHint: "Place 7 (+) chips. Take away 2 (+) chips.", stHint: "Place 4 (+) chips. Take away 1 (+) chip." },
  { ftHint: "Place 5 (+) chips. Take away 3 (+) chips.", stHint: "Place 2 (+) chips. Take away 1 (+) chip." },
  { ftHint: "Place 3 (+) chips. Add zero pairs until you have 9 (+). Take away 9 (+) chips.", stHint: "Place 1 (+) chip. Add zero pairs until you have 2 (+). Take away 2 (+) chips." },
  { ftHint: "Place 4 (+) chips. Add zero pairs until you have 9 (+). Take away 9 (+) chips.", stHint: "Place 2 (+) chips. Add zero pairs until you have 3 (+). Take away 3 (+) chips." },
  { ftHint: "Place 5 (+) chips. Add zero pairs until you have 9 (+). Take away 9 (+) chips.", stHint: "Place 1 (+) chip. Add zero pairs until you have 4 (+). Take away 4 (+) chips." },
  { ftHint: "Place 1 (+) chip. Add zero pairs until you have 2 (+). Take away 2 (+) chips.", stHint: "Place 2 (+) chips. Add zero pairs until you have 4 (+). Take away 4 (+) chips." },
  { ftHint: "Place 1 (+) chip. Add zero pairs until you have 6 (+). Take away 6 (+) chips.", stHint: "Place 1 (+) chip. Add zero pairs until you have 3 (+). Take away 3 (+) chips." },
];

const a1EasyHintsC2: ConditionHintPairs = [
  { ftHint: "Place 1 (-) chip. Add 5 zero pairs. Take away 5 (+) chips.", stHint: "Place 1 (-) chip. Add 2 zero pairs. Take away 2 (+) chips." },
  { ftHint: "Place 9 (-) chips. Add 5 zero pairs. Take away 5 (+) chips.", stHint: "Place 2 (-) chips. Add 1 zero pair. Take away 1 (+) chip." },
  { ftHint: "Place 9 (-) chips. Add 2 zero pairs. Take away 2 (+) chips.", stHint: "Place 1 (-) chip. Add 3 zero pairs. Take away 3 (+) chips." },
  { ftHint: "Place 9 (-) chips. Add 3 zero pairs. Take away 3 (+) chips.", stHint: "Place 2 (-) chips. Add 2 zero pairs. Take away 2 (+) chips." },
  { ftHint: "Place 5 (-) chips. Add 7 zero pairs. Take away 7 (+) chips.", stHint: "Place 3 (-) chips. Add 1 zero pair. Take away 1 (+) chip." },
  { ftHint: "Place 6 (-) chips. Add 2 zero pairs. Take away 2 (+) chips.", stHint: "Place 1 (-) chip. Add 4 zero pairs. Take away 4 (+) chips." },
  { ftHint: "Place 1 (-) chip. Add 2 zero pairs. Take away 2 (+) chips.", stHint: "Place 2 (-) chips. Add 3 zero pairs. Take away 3 (+) chips." },
  { ftHint: "Place 5 (-) chips. Add 9 zero pairs. Take away 9 (+) chips.", stHint: "Place 3 (-) chips. Add 2 zero pairs. Take away 2 (+) chips." },
  { ftHint: "Place 3 (-) chips. Add 8 zero pairs. Take away 8 (+) chips.", stHint: "Place 4 (-) chips. Add 1 zero pair. Take away 1 (+) chip." },
  { ftHint: "Place 4 (-) chips. Add 3 zero pairs. Take away 3 (+) chips.", stHint: "Place 1 (-) chip. Add 5 zero pairs. Take away 5 (+) chips." },
];

const a1EasyHintsC3: ConditionHintPairs = [
  { ftHint: "Place 6 (+) chips. Add 3 zero pairs. Take away 3 (-) chips.", stHint: "Place 1 (+) chip. Add 1 zero pair. Take away 1 (-) chip." },
  { ftHint: "Place 9 (+) chips. Add 9 zero pairs. Take away 9 (-) chips.", stHint: "Place 2 (+) chips. Add 1 zero pair. Take away 1 (-) chip." },
  { ftHint: "Place 5 (+) chips. Add 4 zero pairs. Take away 4 (-) chips.", stHint: "Place 1 (+) chip. Add 2 zero pairs. Take away 2 (-) chips." },
  { ftHint: "Place 8 (+) chips. Add 2 zero pairs. Take away 2 (-) chips.", stHint: "Place 3 (+) chips. Add 1 zero pair. Take away 1 (-) chip." },
  { ftHint: "Place 2 (+) chips. Add 6 zero pairs. Take away 6 (-) chips.", stHint: "Place 2 (+) chips. Add 2 zero pairs. Take away 2 (-) chips." },
  { ftHint: "Place 1 (+) chip. Add 6 zero pairs. Take away 6 (-) chips.", stHint: "Place 1 (+) chip. Add 3 zero pairs. Take away 3 (-) chips." },
  { ftHint: "Place 1 (+) chip. Add 4 zero pairs. Take away 4 (-) chips.", stHint: "Place 4 (+) chips. Add 1 zero pair. Take away 1 (-) chip." },
  { ftHint: "Place 2 (+) chips. Add 2 zero pairs. Take away 2 (-) chips.", stHint: "Place 3 (+) chips. Add 2 zero pairs. Take away 2 (-) chips." },
  { ftHint: "Place 9 (+) chips. Add 3 zero pairs. Take away 3 (-) chips.", stHint: "Place 2 (+) chips. Add 3 zero pairs. Take away 3 (-) chips." },
  { ftHint: "Place 8 (+) chips. Add 1 zero pair. Take away 1 (-) chip.", stHint: "Place 1 (+) chip. Add 4 zero pairs. Take away 4 (-) chips." },
];

const a1EasyHintsC4: ConditionHintPairs = [
  { ftHint: "Place 4 (-) chips. Add zero pairs until you have 5 (-). Take away 5 (-) chips.", stHint: "Place 1 (-) chip. Add zero pairs until you have 2 (-). Take away 2 (-) chips." },
  { ftHint: "Place 2 (-) chips. Add zero pairs until you have 9 (-). Take away 9 (-) chips.", stHint: "Place 2 (-) chips. Add zero pairs until you have 3 (-). Take away 3 (-) chips." },
  { ftHint: "Place 6 (-) chips. Add zero pairs until you have 7 (-). Take away 7 (-) chips.", stHint: "Place 1 (-) chip. Add zero pairs until you have 3 (-). Take away 3 (-) chips." },
  { ftHint: "Place 2 (-) chips. Add zero pairs until you have 4 (-). Take away 4 (-) chips.", stHint: "Place 3 (-) chips. Add zero pairs until you have 4 (-). Take away 4 (-) chips." },
  { ftHint: "Place 1 (-) chip. Add zero pairs until you have 6 (-). Take away 6 (-) chips.", stHint: "Place 2 (-) chips. Add zero pairs until you have 4 (-). Take away 4 (-) chips." },
  { ftHint: "Place 5 (-) chips. Add zero pairs until you have 7 (-). Take away 7 (-) chips.", stHint: "Place 1 (-) chip. Add zero pairs until you have 4 (-). Take away 4 (-) chips." },
  { ftHint: "Place 6 (-) chips. Add zero pairs until you have 8 (-). Take away 8 (-) chips.", stHint: "Place 4 (-) chips. Add zero pairs until you have 5 (-). Take away 5 (-) chips." },
  { ftHint: "Place 5 (-) chips. Add zero pairs until you have 9 (-). Take away 9 (-) chips.", stHint: "Place 3 (-) chips. Add zero pairs until you have 5 (-). Take away 5 (-) chips." },
  { ftHint: "Place 3 (-) chips. Add zero pairs until you have 8 (-). Take away 8 (-) chips.", stHint: "Place 2 (-) chips. Add zero pairs until you have 5 (-). Take away 5 (-) chips." },
  { ftHint: "Place 2 (-) chips. Add zero pairs until you have 7 (-). Take away 7 (-) chips.", stHint: "Place 1 (-) chip. Add zero pairs until you have 5 (-). Take away 5 (-) chips." },
];

const a1EasyHintsC5: ConditionHintPairs = [
  { ftHint: "Place 6 (-) chips. Take away 2 (-) chips.", stHint: "Place 2 (-) chips. Take away 1 (-) chip." },
  { ftHint: "Place 8 (-) chips. Take away 3 (-) chips.", stHint: "Place 3 (-) chips. Take away 2 (-) chips." },
  { ftHint: "Place 4 (-) chips. Take away 2 (-) chips.", stHint: "Place 3 (-) chips. Take away 1 (-) chip." },
  { ftHint: "Place 7 (-) chips. Take away 3 (-) chips.", stHint: "Place 4 (-) chips. Take away 3 (-) chips." },
  { ftHint: "Place 7 (-) chips. Take away 1 (-) chip.", stHint: "Place 4 (-) chips. Take away 2 (-) chips." },
  { ftHint: "Place 9 (-) chips. Take away 1 (-) chip.", stHint: "Place 4 (-) chips. Take away 1 (-) chip." },
  { ftHint: "Place 8 (-) chips. Take away 5 (-) chips.", stHint: "Place 5 (-) chips. Take away 4 (-) chips." },
  { ftHint: "Place 7 (-) chips. Take away 5 (-) chips.", stHint: "Place 5 (-) chips. Take away 3 (-) chips." },
  { ftHint: "Place 2 (-) chips. Take away 1 (-) chip.", stHint: "Place 5 (-) chips. Take away 2 (-) chips." },
  { ftHint: "Place 4 (-) chips. Take away 1 (-) chip.", stHint: "Place 5 (-) chips. Take away 1 (-) chip." },
];

const a1ModHintsC1: ConditionHintPairs = [
  { ftHint: "Subtracting a smaller positive from a larger positive directly reduces the group.", stHint: "Subtracting a smaller positive from a larger positive directly reduces the group." },
  { ftHint: "Subtracting a smaller positive from a larger positive directly reduces the group.", stHint: "Subtracting a smaller positive from a larger positive directly reduces the group." },
  { ftHint: "Subtracting a smaller positive from a larger positive directly reduces the group.", stHint: "Subtracting a smaller positive from a larger positive directly reduces the group." },
  { ftHint: "Subtracting a smaller positive from a larger positive directly reduces the group.", stHint: "Subtracting a smaller positive from a larger positive directly reduces the group." },
  { ftHint: "Subtracting a smaller positive from a larger positive directly reduces the group.", stHint: "Subtracting a smaller positive from a larger positive directly reduces the group." },
  { ftHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group.", stHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group." },
  { ftHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group.", stHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group." },
  { ftHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group.", stHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group." },
  { ftHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group.", stHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group." },
  { ftHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group.", stHint: "Subtracting a larger positive from a smaller positive requires adding zero pairs to expand the group." },
];

const a1ModHintsC2: ConditionHintPairs = [
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
  { ftHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs.", stHint: "Removing positive chips from a negative group requires introducing positive values through zero pairs." },
];

const a1ModHintsC3: ConditionHintPairs = [
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
  { ftHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs.", stHint: "Removing negative chips from a positive group requires introducing negative values through zero pairs." },
];

const a1ModHintsC4: ConditionHintPairs = [
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
  { ftHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives.", stHint: "Removing a larger negative amount from a smaller negative group requires adding zero pairs to supply extra negatives." },
];

const a1ModHintsC5: ConditionHintPairs = [
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
  { ftHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group.", stHint: "Subtracting a smaller negative value from a larger negative group directly reduces the group." },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Activity 2 Hint Banks
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const a2EasyHintsC1: ConditionHintPairs = [
  { ftHint: "Start at 4 on the number line and move left 2 spaces to subtract the positive value.", stHint: "Start at 3 on the number line and move left 1 space to subtract the positive value." },
  { ftHint: "Start at 8 on the number line and move left 5 spaces to subtract the positive value.", stHint: "Start at 4 on the number line and move left 3 spaces to subtract the positive value." },
  { ftHint: "Start at 7 on the number line and move left 4 spaces to subtract the positive value.", stHint: "Start at 5 on the number line and move left 2 spaces to subtract the positive value." },
  { ftHint: "Start at 7 on the number line and move left 2 spaces to subtract the positive value.", stHint: "Start at 4 on the number line and move left 1 space to subtract the positive value." },
  { ftHint: "Start at 5 on the number line and move left 3 spaces to subtract the positive value.", stHint: "Start at 2 on the number line and move left 1 space to subtract the positive value." },
  { ftHint: "Start at 3 on the number line and move left 9 spaces past zero into the negative numbers.", stHint: "Start at 1 on the number line and move left 2 spaces past zero into the negative numbers." },
  { ftHint: "Start at 4 on the number line and move left 9 spaces past zero into the negative numbers.", stHint: "Start at 2 on the number line and move left 3 spaces past zero into the negative numbers." },
  { ftHint: "Start at 5 on the number line and move left 9 spaces past zero into the negative numbers.", stHint: "Start at 1 on the number line and move left 4 spaces past zero into the negative numbers." },
  { ftHint: "Start at 1 on the number line and move left 2 spaces past zero into the negative numbers.", stHint: "Start at 2 on the number line and move left 4 spaces past zero into the negative numbers." },
  { ftHint: "Start at 1 on the number line and move left 6 spaces past zero into the negative numbers.", stHint: "Start at 1 on the number line and move left 3 spaces past zero into the negative numbers." },
];

const a2EasyHintsC2: ConditionHintPairs = [
  { ftHint: "Start at -1 on the negative side and move further left 5 spaces to subtract the positive value.", stHint: "Start at -1 on the negative side and move further left 2 spaces to subtract the positive value." },
  { ftHint: "Start at -9 on the negative side and move further left 5 spaces to subtract the positive value.", stHint: "Start at -2 on the negative side and move further left 1 space to subtract the positive value." },
  { ftHint: "Start at -9 on the negative side and move further left 2 spaces to subtract the positive value.", stHint: "Start at -1 on the negative side and move further left 3 spaces to subtract the positive value." },
  { ftHint: "Start at -9 on the negative side and move further left 3 spaces to subtract the positive value.", stHint: "Start at -2 on the negative side and move further left 2 spaces to subtract the positive value." },
  { ftHint: "Start at -5 on the negative side and move further left 7 spaces to subtract the positive value.", stHint: "Start at -3 on the negative side and move further left 1 space to subtract the positive value." },
  { ftHint: "Start at -6 on the negative side and move further left 2 spaces to subtract the positive value.", stHint: "Start at -1 on the negative side and move further left 4 spaces to subtract the positive value." },
  { ftHint: "Start at -1 on the negative side and move further left 2 spaces to subtract the positive value.", stHint: "Start at -2 on the negative side and move further left 3 spaces to subtract the positive value." },
  { ftHint: "Start at -5 on the negative side and move further left 9 spaces to subtract the positive value.", stHint: "Start at -3 on the negative side and move further left 2 spaces to subtract the positive value." },
  { ftHint: "Start at -3 on the negative side and move further left 8 spaces to subtract the positive value.", stHint: "Start at -4 on the negative side and move further left 1 space to subtract the positive value." },
  { ftHint: "Start at -4 on the negative side and move further left 3 spaces to subtract the positive value.", stHint: "Start at -1 on the negative side and move further left 5 spaces to subtract the positive value." },
];

const a2EasyHintsC3: ConditionHintPairs = [
  { ftHint: "Start at 6 on the positive side. Subtracting a negative turns the direction right, so move right 3 spaces.", stHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 1 space." },
  { ftHint: "Start at 9 on the positive side. Subtracting a negative turns the direction right, so move right 9 spaces.", stHint: "Start at 2 on the positive side. Subtracting a negative turns the direction right, so move right 1 space." },
  { ftHint: "Start at 5 on the positive side. Subtracting a negative turns the direction right, so move right 4 spaces.", stHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 2 spaces." },
  { ftHint: "Start at 8 on the positive side. Subtracting a negative turns the direction right, so move right 2 spaces.", stHint: "Start at 3 on the positive side. Subtracting a negative turns the direction right, so move right 1 space." },
  { ftHint: "Start at 2 on the positive side. Subtracting a negative turns the direction right, so move right 6 spaces.", stHint: "Start at 2 on the positive side. Subtracting a negative turns the direction right, so move right 2 spaces." },
  { ftHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 6 spaces.", stHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 3 spaces." },
  { ftHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 4 spaces.", stHint: "Start at 4 on the positive side. Subtracting a negative turns the direction right, so move right 1 space." },
  { ftHint: "Start at 2 on the positive side. Subtracting a negative turns the direction right, so move right 2 spaces.", stHint: "Start at 3 on the positive side. Subtracting a negative turns the direction right, so move right 2 spaces." },
  { ftHint: "Start at 9 on the positive side. Subtracting a negative turns the direction right, so move right 3 spaces.", stHint: "Start at 2 on the positive side. Subtracting a negative turns the direction right, so move right 3 spaces." },
  { ftHint: "Start at 8 on the positive side. Subtracting a negative turns the direction right, so move right 1 space.", stHint: "Start at 1 on the positive side. Subtracting a negative turns the direction right, so move right 4 spaces." },
];

const a2EasyHintsC4: ConditionHintPairs = [
  { ftHint: "Start at -4 on the negative side. Subtracting a negative flips the direction right, so move right 5 spaces across zero.", stHint: "Start at -1 on the negative side. Subtracting a negative flips the direction right, so move right 2 spaces across zero." },
  { ftHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 9 spaces across zero.", stHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 3 spaces across zero." },
  { ftHint: "Start at -6 on the negative side. Subtracting a negative flips the direction right, so move right 7 spaces across zero.", stHint: "Start at -1 on the negative side. Subtracting a negative flips the direction right, so move right 3 spaces across zero." },
  { ftHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 4 spaces across zero.", stHint: "Start at -3 on the negative side. Subtracting a negative flips the direction right, so move right 4 spaces across zero." },
  { ftHint: "Start at -1 on the negative side. Subtracting a negative flips the direction right, so move right 6 spaces across zero.", stHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 4 spaces across zero." },
  { ftHint: "Start at -5 on the negative side. Subtracting a negative flips the direction right, so move right 7 spaces across zero.", stHint: "Start at -1 on the negative side. Subtracting a negative flips the direction right, so move right 4 spaces across zero." },
  { ftHint: "Start at -6 on the negative side. Subtracting a negative flips the direction right, so move right 8 spaces across zero.", stHint: "Start at -4 on the negative side. Subtracting a negative flips the direction right, so move right 5 spaces across zero." },
  { ftHint: "Start at -5 on the negative side. Subtracting a negative flips the direction right, so move right 9 spaces across zero.", stHint: "Start at -3 on the negative side. Subtracting a negative flips the direction right, so move right 5 spaces across zero." },
  { ftHint: "Start at -3 on the negative side. Subtracting a negative flips the direction right, so move right 8 spaces across zero.", stHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 5 spaces across zero." },
  { ftHint: "Start at -2 on the negative side. Subtracting a negative flips the direction right, so move right 7 spaces across zero.", stHint: "Start at -1 on the negative side. Subtracting a negative flips the direction right, so move right 5 spaces across zero." },
];

const a2EasyHintsC5: ConditionHintPairs = [
  { ftHint: "Start at -6 on the negative side. Subtracting a negative changes direction right, so move right 2 spaces.", stHint: "Start at -2 on the negative side. Subtracting a negative changes direction right, so move right 1 space." },
  { ftHint: "Start at -8 on the negative side. Subtracting a negative changes direction right, so move right 3 spaces.", stHint: "Start at -3 on the negative side. Subtracting a negative changes direction right, so move right 2 spaces." },
  { ftHint: "Start at -4 on the negative side. Subtracting a negative changes direction right, so move right 2 spaces.", stHint: "Start at -3 on the negative side. Subtracting a negative changes direction right, so move right 1 space." },
  { ftHint: "Start at -7 on the negative side. Subtracting a negative changes direction right, so move right 3 spaces.", stHint: "Start at -4 on the negative side. Subtracting a negative changes direction right, so move right 3 spaces." },
  { ftHint: "Start at -7 on the negative side. Subtracting a negative changes direction right, so move right 1 space.", stHint: "Start at -4 on the negative side. Subtracting a negative changes direction right, so move right 2 spaces." },
  { ftHint: "Start at -9 on the negative side. Subtracting a negative changes direction right, so move right 1 space.", stHint: "Start at -4 on the negative side. Subtracting a negative changes direction right, so move right 1 space." },
  { ftHint: "Start at -8 on the negative side. Subtracting a negative changes direction right, so move right 5 spaces.", stHint: "Start at -5 on the negative side. Subtracting a negative changes direction right, so move right 4 spaces." },
  { ftHint: "Start at -7 on the negative side. Subtracting a negative changes direction right, so move right 5 spaces.", stHint: "Start at -5 on the negative side. Subtracting a negative changes direction right, so move right 3 spaces." },
  { ftHint: "Start at -2 on the negative side. Subtracting a negative changes direction right, so move right 1 space.", stHint: "Start at -5 on the negative side. Subtracting a negative changes direction right, so move right 2 spaces." },
  { ftHint: "Start at -4 on the negative side. Subtracting a negative changes direction right, so move right 1 space.", stHint: "Start at -5 on the negative side. Subtracting a negative changes direction right, so move right 1 space." },
];

const a2ModHintsC1: ConditionHintPairs = [
  { ftHint: "Start at the positive first value. Move left to subtract the positive value.", stHint: "Start at the positive first value. Move left to subtract the positive value." },
  { ftHint: "Start at the positive first value. Move left to subtract the positive value.", stHint: "Start at the positive first value. Move left to subtract the positive value." },
  { ftHint: "Start at the positive first value. Move left to subtract the positive value.", stHint: "Start at the positive first value. Move left to subtract the positive value." },
  { ftHint: "Start at the positive first value. Move left to subtract the positive value.", stHint: "Start at the positive first value. Move left to subtract the positive value." },
  { ftHint: "Start at the positive first value. Move left to subtract the positive value.", stHint: "Start at the positive first value. Move left to subtract the positive value." },
  { ftHint: "Start at the positive first value and move left, traveling past zero into the negative numbers.", stHint: "Start at the positive first value and move left, traveling past zero into the negative numbers." },
  { ftHint: "Start at the positive first value and move left, traveling past zero into the negative numbers.", stHint: "Start at the positive first value and move left, traveling past zero into the negative numbers." },
  { ftHint: "Start at the positive first value and move left, traveling past zero into the negative numbers.", stHint: "Start at the positive first value and move left, traveling past zero into the negative numbers." },
  { ftHint: "Start at the positive first value and move left, traveling past zero into the negative numbers.", stHint: "Start at the positive first value and move left, traveling past zero into the negative numbers." },
  { ftHint: "Start at the positive first value and move left, traveling past zero into the negative numbers.", stHint: "Start at the positive first value and move left, traveling past zero into the negative numbers." },
];

const a2ModHintsC2: ConditionHintPairs = [
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
  { ftHint: "Start at the negative first value and travel further left to subtract the positive value.", stHint: "Start at the negative first value and travel further left to subtract the positive value." },
];

const a2ModHintsC3: ConditionHintPairs = [
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
  { ftHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right.", stHint: "Start on the positive side. Subtracting a negative turns your direction around, so move right." },
];

const a2ModHintsC4: ConditionHintPairs = [
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
  { ftHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero.", stHint: "Start on the negative side. Subtracting a larger negative flips your movement to the right, past zero." },
];

const a2ModHintsC5: ConditionHintPairs = [
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the negative total." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values." },
  { ftHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values.", stHint: "Start on the negative side. Subtracting a smaller negative changes direction right, reducing the more negative values." },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Activity 3 Hint Banks
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const a3EasyHintsC1: ConditionHintPairs = [
  { ftHint: "Keep 4, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep 3, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep 8, change subtraction to addition, and change 5 to -5. Now add.", stHint: "Keep 4, change subtraction to addition, and change 3 to -3. Now add." },
  { ftHint: "Keep 7, change subtraction to addition, and change 4 to -4. Now add.", stHint: "Keep 5, change subtraction to addition, and change 2 to -2. Now add." },
  { ftHint: "Keep 7, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep 4, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep 5, change subtraction to addition, and change 3 to -3. Now add.", stHint: "Keep 2, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep 3, change subtraction to addition, and change 9 to -9. Now add.", stHint: "Keep 1, change subtraction to addition, and change 2 to -2. Now add." },
  { ftHint: "Keep 4, change subtraction to addition, and change 9 to -9. Now add.", stHint: "Keep 2, change subtraction to addition, and change 3 to -3. Now add." },
  { ftHint: "Keep 5, change subtraction to addition, and change 9 to -9. Now add.", stHint: "Keep 1, change subtraction to addition, and change 4 to -4. Now add." },
  { ftHint: "Keep 1, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep 2, change subtraction to addition, and change 4 to -4. Now add." },
  { ftHint: "Keep 1, change subtraction to addition, and change 6 to -6. Now add.", stHint: "Keep 1, change subtraction to addition, and change 3 to -3. Now add." },
];

const a3EasyHintsC2: ConditionHintPairs = [
  { ftHint: "Keep -1, change subtraction to addition, and change 5 to -5. Now add.", stHint: "Keep -1, change subtraction to addition, and change 2 to -2. Now add." },
  { ftHint: "Keep -9, change subtraction to addition, and change 5 to -5. Now add.", stHint: "Keep -2, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep -9, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep -1, change subtraction to addition, and change 3 to -3. Now add." },
  { ftHint: "Keep -9, change subtraction to addition, and change 3 to -3. Now add.", stHint: "Keep -2, change subtraction to addition, and change 2 to -2. Now add." },
  { ftHint: "Keep -5, change subtraction to addition, and change 7 to -7. Now add.", stHint: "Keep -3, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep -6, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep -1, change subtraction to addition, and change 4 to -4. Now add." },
  { ftHint: "Keep -1, change subtraction to addition, and change 2 to -2. Now add.", stHint: "Keep -2, change subtraction to addition, and change 3 to -3. Now add." },
  { ftHint: "Keep -5, change subtraction to addition, and change 9 to -9. Now add.", stHint: "Keep -3, change subtraction to addition, and change 2 to -2. Now add." },
  { ftHint: "Keep -3, change subtraction to addition, and change 8 to -8. Now add.", stHint: "Keep -4, change subtraction to addition, and change 1 to -1. Now add." },
  { ftHint: "Keep -4, change subtraction to addition, and change 3 to -3. Now add.", stHint: "Keep -1, change subtraction to addition, and change 5 to -5. Now add." },
];

const a3EasyHintsC3: ConditionHintPairs = [
  { ftHint: "Keep 6, change subtraction to addition, and change -3 to 3. Now add.", stHint: "Keep 1, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep 9, change subtraction to addition, and change -9 to 9. Now add.", stHint: "Keep 2, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep 5, change subtraction to addition, and change -4 to 4. Now add.", stHint: "Keep 1, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep 8, change subtraction to addition, and change -2 to 2. Now add.", stHint: "Keep 3, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep 2, change subtraction to addition, and change -6 to 6. Now add.", stHint: "Keep 2, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep 1, change subtraction to addition, and change -6 to 6. Now add.", stHint: "Keep 1, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep 1, change subtraction to addition, and change -4 to 4. Now add.", stHint: "Keep 4, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep 2, change subtraction to addition, and change -2 to 2. Now add.", stHint: "Keep 3, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep 9, change subtraction to addition, and change -3 to 3. Now add.", stHint: "Keep 2, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep 8, change subtraction to addition, and change -1 to 1. Now add.", stHint: "Keep 1, change subtraction to addition, and change -4 to 4. Now add." },
];

const a3EasyHintsC4: ConditionHintPairs = [
  { ftHint: "Keep -4, change subtraction to addition, and change -5 to 5. Now add.", stHint: "Keep -1, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep -2, change subtraction to addition, and change -9 to 9. Now add.", stHint: "Keep -2, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep -6, change subtraction to addition, and change -7 to 7. Now add.", stHint: "Keep -1, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep -2, change subtraction to addition, and change -4 to 4. Now add.", stHint: "Keep -3, change subtraction to addition, and change -4 to 4. Now add." },
  { ftHint: "Keep -1, change subtraction to addition, and change -6 to 6. Now add.", stHint: "Keep -2, change subtraction to addition, and change -4 to 4. Now add." },
  { ftHint: "Keep -5, change subtraction to addition, and change -7 to 7. Now add.", stHint: "Keep -1, change subtraction to addition, and change -4 to 4. Now add." },
  { ftHint: "Keep -6, change subtraction to addition, and change -8 to 8. Now add.", stHint: "Keep -4, change subtraction to addition, and change -5 to 5. Now add." },
  { ftHint: "Keep -5, change subtraction to addition, and change -9 to 9. Now add.", stHint: "Keep -3, change subtraction to addition, and change -5 to 5. Now add." },
  { ftHint: "Keep -3, change subtraction to addition, and change -8 to 8. Now add.", stHint: "Keep -2, change subtraction to addition, and change -5 to 5. Now add." },
  { ftHint: "Keep -2, change subtraction to addition, and change -7 to 7. Now add.", stHint: "Keep -1, change subtraction to addition, and change -5 to 5. Now add." },
];

const a3EasyHintsC5: ConditionHintPairs = [
  { ftHint: "Keep -6, change subtraction to addition, and change -2 to 2. Now add.", stHint: "Keep -2, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep -8, change subtraction to addition, and change -3 to 3. Now add.", stHint: "Keep -3, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep -4, change subtraction to addition, and change -2 to 2. Now add.", stHint: "Keep -3, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep -7, change subtraction to addition, and change -3 to 3. Now add.", stHint: "Keep -4, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep -7, change subtraction to addition, and change -1 to 1. Now add.", stHint: "Keep -4, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep -9, change subtraction to addition, and change -1 to 1. Now add.", stHint: "Keep -4, change subtraction to addition, and change -1 to 1. Now add." },
  { ftHint: "Keep -8, change subtraction to addition, and change -5 to 5. Now add.", stHint: "Keep -5, change subtraction to addition, and change -4 to 4. Now add." },
  { ftHint: "Keep -7, change subtraction to addition, and change -5 to 5. Now add.", stHint: "Keep -5, change subtraction to addition, and change -3 to 3. Now add." },
  { ftHint: "Keep -2, change subtraction to addition, and change -1 to 1. Now add.", stHint: "Keep -5, change subtraction to addition, and change -2 to 2. Now add." },
  { ftHint: "Keep -4, change subtraction to addition, and change -1 to 1. Now add.", stHint: "Keep -5, change subtraction to addition, and change -1 to 1. Now add." },
];

const a3ModHintsC1: ConditionHintPairs = [
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
  { ftHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add.", stHint: "Keep the first value, change subtraction to addition, and change the second value to a negative. Now add." },
];

const a3ModHintsC2: ConditionHintPairs = [
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the positive second value to a negative. Now add." },
];

const a3ModHintsC3: ConditionHintPairs = [
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the positive first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
];

const a3ModHintsC4: ConditionHintPairs = [
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
];

const a3ModHintsC5: ConditionHintPairs = [
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
  { ftHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add.", stHint: "Keep the negative first value, change subtraction to addition, and change the negative second value to a positive. Now add." },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Activity 1 - Difficult Round Word Problems
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const a1DiffC1: DiffCondition = [
  { ftProb: "Ate Susan harvested 38 baskets of santol from her farm in Naval. She delivered 22 baskets to the local public market stall. How many baskets of santol does Ate Susan have left in her storage?\nEquation: 38 - 22 = 16", ftAns: 16, stProb: "Ate Susan harvested 25 baskets of santol from her farm in Naval. She delivered 15 baskets to the local public market stall. How many baskets of santol does Ate Susan have left in her storage?\nEquation: 25 - 15 = 10", stAns: 10 },
  { ftProb: "For the upcoming barangay festival in Almeria, a farming family gathered 35 kilograms of red rambutan. They donated 20 kilograms to the youth games prize booth. How many kilograms of rambutan remain with the family?\nEquation: 35 - 20 = 15", ftAns: 15, stProb: "For the upcoming barangay festival in Almeria, a farming family gathered 28 kilograms of red rambutan. They donated 18 kilograms to the youth games prize booth. How many kilograms of rambutan remain with the family?\nEquation: 28 - 18 = 10", stAns: 10 },
  { ftProb: "Tatay Marlon brought 40 bunches of Saba bananas to the pier in Maripipi Island. He managed to load 25 bunches onto the first pump boat heading to the mainland. How many bunches of bananas are left on the dock?\nEquation: 40 - 25 = 15", ftAns: 15, stProb: "Tatay Marlon brought 20 bunches of Saba bananas to the pier in Maripipi Island. He managed to load 12 bunches onto the first pump boat heading to the mainland. How many bunches of bananas are left on the dock?\nEquation: 20 - 12 = 8", stAns: 8 },
  { ftProb: "The Kawayan Farmers Cooperative has 30 boxes of ripe bananas in stock. A local school needs 38 boxes for a community feeding program. If the cooperative gives all 30 boxes, how much more do they need to give to the local school?\nEquation: 30 - 38 = -8", ftAns: -8, stProb: "The Kawayan Farmers Cooperative has 15 boxes of ripe bananas in stock. A local school needs 22 boxes for a community feeding program. If the cooperative gives all 15 boxes, how much more do they need to give to the local school?\nEquation: 15 - 22 = -7", stAns: -7 },
  { ftProb: "A fruit vendor in Culaba needs to supply 35 baskets of santol to the public market. However, only 22 baskets are high quality enough to send out. If she sends these 22 baskets, how many baskets does she need to send to?\nEquation: 22 - 35 = -13", ftAns: -13, stProb: "A fruit vendor in Culaba needs to supply 26 baskets of santol to the public market. However, only 16 baskets are high quality enough to send out. If she sends these 16 baskets, how many baskets does she still need to find?\nEquation: 16 - 26 = -10", stAns: -10 },
];

const a1DiffC2: DiffCondition = [
  { ftProb: "Due to a slow fruit season, a mango farmer in Biliran town already borrowed the local cooperative ₱35 for organic fertilizer. Today, he needs to borrow another ₱25 for organic fertilizer. How much does he need to pay to the cooperative?\nEquation: -35 - 20 = -55", ftAns: -55, stProb: "Due to a slow fruit season, a mango farmer in Biliran town already owes the local cooperative ₱12 for organic fertilizer. Today, he needs to borrow another ₱10. How much total debt does he need to pay back to the cooperative?\nEquation: -12 - 10 = -₱22", stAns: -22 },
  { ftProb: "A rambutan farmer in Almeria town already borrowed ₱30 from his neighbor for eco bags. Today, he needs to borrow another ₱15. How much does he need to pay back to his neighbor?\nEquation: -30 - 15 = -45", ftAns: -45, stProb: "A rambutan farmer in Almeria town already owes ₱15 to his neighbor for eco bags. Today, he needs to borrow another ₱8. How much does he need to pay back to his neighbor?\nEquation: -15 - 8 = -₱23", stAns: -23 },
  { ftProb: "A food vendor in Kawayan already borrowed ₱25 from a market group to buy banana leaves. Today, she needs to borrow another ₱20 to buy small packet of sugar for her sweet suman. How much does she need to pay back in total?\nEquation: -25 - 20 = -45", ftAns: -45, stProb: "A food vendor in Kawayan already owes ₱10 to a market group for banana leaves. Today, she needs to borrow another ₱15 to buy sugar for her sweet suman. How much does she need to pay back in total?\nEquation: -10 - 15 = -₱25", stAns: -25 },
  { ftProb: "A tricycle driver in Caibiran already borrowed ₱40 from his friend to patch his tire. Today, he needs to borrow another ₱40 for gasoline to reach his passengers. How much does he need to pay back?\nEquation: -40 - 40 = -80", ftAns: -80, stProb: "A tricycle driver in Caibiran already owes ₱14 to his friend to patch his tire. Today, he needs to borrow another ₱14 fo inflate his tires. How much total debt does he need to pay back?\nEquation: -14 - 14 = -₱28", stAns: -28 },
  { ftProb: "A fish vendor at the Naval public market already borrowed ₱35 to rent a display table. Today, she needs to borrow another ₱25 to buy a block of crushed ice for her fresh catch. How much does she still need to pay?\nEquation: -35 - 25 = -40", ftAns: -40, stProb: "A fish vendor at the Naval public market already borrowed ₱15 to rent a display table. Today, she needs to borrow another ₱12 to buy a block of crushed ice for her fresh catch. How much does she need to pay?\nEquation: -15 - 12 = -₱27", stAns: -27 },
];

const a1DiffC3: DiffCondition = [
  { ftProb: "Mang Juan took a batch of homemade ice candy out of the freezer, where it was frozen at -6℃. He left it out on the table until it completely melted and reached a room temperature of 24C.What is the temperature difference between the melted 24C ice candy and its original frozen temperature?\nEquation: 24-(-6) =30℃", ftAns: 30, stProb: "Mang Juan took a batch of homemade ice candy out of the freezer, where it was frozen at -4°C. He left it out on the table until it reached a room temperature of 18°C. What is the temperature difference between the 18°C ice candy and its original frozen temperature?\nEquation: 18 - (-4) = 22°C", stAns: 22 },
  { ftProb: "Aling Marie is tracking her daily store earnings. On Tuesday, her daily ledger showed a net loss, recorded as -₱15. On Wednesday, she bring her daily record up to a positive profit of ₱20. What is the total financial difference between Wednesday's profit and Tuesday's loss?\nEquation: 20 - (-15) = ₱35", ftAns: 35, stProb: "Aling Marie is tracking her daily store earnings. On Tuesday, her daily ledger showed a net loss, recorded as -₱5. On Wednesday, she brought her daily record up to a positive profit of ₱15. What is the total financial difference between Wednesday's profit and Tuesday's loss?\nEquation: 15 - (-5) = ₱20", stAns: 20 },
  { ftProb: "A fisherman stands on a rocky coastal cliff in Caibiran that is 15 meters above sea level. He casts his line deep into the water, and his bait sinks down to a rock bed located 12 meters below sea level. What is the total vertical distance between the fisherman on the 15-meter cliff and his bait down at the -12 meter rock bed?\nEquation: 15 - (-12) = 27 meters", ftAns: 27, stProb: "A fisherman stands on a rocky coastal cliff in Caibiran that is 12 meters above sea level. He casts his line into the water, and his bait sinks down to a rock bed located 6 meters below sea level. What is the total vertical distance between the fisherman on the 12-meter cliff and his bait down at the -6 meter rock bed?\nEquation: 12 - (-6) = 18 meters", stAns: 18 },
  { ftProb: "Kiko scored 28 points on his Science quiz at Caibiran National High School. Later, his teacher noticed that mistakenly, there was a -4 point penalty on his paper. To fix it, the teacher subtracted the -4 penalty from his score. What is Kiko's corrected, final quiz score?\nEquation: 28 - (-4) = 32", ftAns: 32, stProb: "Kiko scored 20 points on his Science quiz at Caibiran National High School. Later, his teacher noticed that mistakenly, there was a -3 point penalty on his paper. To fix it, the teacher subtracted the -3 penalty from his score. What is Kiko's corrected, final quiz score?\nEquation: 20 - (-3) = 23", stAns: 23 },
  { ftProb: "A vendor in Naval prepares a fresh batch of suman that sits at a warm temperature of 25°C. She places it into a specialized cooling storage unit that keeps a temperature of -15°C. What is the total temperature difference between the warm 25°C suman and the -15°C cooling storage unit?\nEquation: 25 - (-15) = 40°C", ftAns: 40, stProb: "A vendor in Naval prepares a fresh batch of suman that sits at a temperature of 22°C. She places it into a small cooling unit that keeps a temperature of -5°C. What is the total temperature difference between the 22°C suman and the -5°C cooling unit?\nEquation: 22 - (-5) = 27°C", stAns: 27 },
];

const a1DiffC4: DiffCondition = [
  { ftProb: "A vendor in Naval has a freezer for storing ice candy that is currently sitting at -14°C. A second, heavy-duty deep freezer nearby is kept much colder at -38°C. What is the temperature difference when you subtract the colder -38°C temperature from the -14°C freezer temperature?\nEquation: -14 - (-38) = 24°C", ftAns: 24, stProb: "A vendor in Naval has an ice candy box that is at -5°C. A deep freezer next to it is colder at -15°C. What is the temperature difference if you subtract the colder -15°C from the -5°C ice candy box?\nEquation: -5 - (-15) = 10°C", stAns: 10 },
  { ftProb: "A delivery truck is carrying frozen food across Biliran. Inside the truck, the small cooling box is cold at -15°C. The large freezer next to it is much colder at -35°C. What is the temperature difference if you subtract the colder -35°C from the -15°C cooling box?\nEquation: -15 - (-35) = 20°C", ftAns: 20, stProb: "A delivery truck is carrying frozen food across Biliran. Inside the truck, the small cooling box is at -8°C. The large freezer next to it is colder at -20°C. What is the temperature difference if you subtract the colder -20°C from the -8°C cooling box?\nEquation: -8 - (-20) = 12°C", stAns: 12 },
  { ftProb: "While exploring the waters around Sambawan Island, a snorkeler swims at a depth of 4 meters below sea level. Straight beneath her, a colorful coral formation rests on the seabed at 25 meters below sea level. What is the total vertical distance between the snorkeler at -4 meters and the coral reef at -25 meters?\nEquation: -4 - (-25) = 21 meters", ftAns: 21, stProb: "A snorkeler in Sambawan Island swims at 3 meters below sea. Straight beneath her, a colorful coral reef is at 18 meters below sea level. What is the distance between the -3 meter snorkeler and the -18 meter coral reef?\nEquation: -3 - (-18) = 15 meters", stAns: 15 },
  { ftProb: "During a science experiment at the local high school, a chemical mixture is chilled down to -18°C. A second mixture in the laboratory is frozen even further down to -30°C. What is the temperature difference when you subtract the colder -30°C from the -18°C mixture?\nEquation: -18 - (-30) = 12°C", ftAns: 12, stProb: "During a science experiment at school, a liquid mixture is cooled down to -6°C. A second mixture is frozen even further down to -16°C. What is the temperature difference when you subtract the colder -16°C from the -6°C mixture?\nEquation: -6 - (-16) = 10°C", stAns: 10 },
  { ftProb: "An underwater camera near a pier in Biliran is placed at 8 meters below sea level. A crab trap is dropped much deeper, landing on the ocean floor at 36 meters below sea level. What is the distance between the -8 meter camera and the -36 meter crab trap?\nEquation: -8 - (-36) = 28 meters", ftAns: 28, stProb: "An underwater camera near a pier in Biliran is placed at 5 meters below sea level. A crab trap is dropped deeper, landing on the ocean floor at 22 meters below sea level. What is the distance between the -5 meter camera and the -22 meter crab trap?\nEquation: -5 - (-22) = 17 meters", stAns: 17 },
];

const a1DiffC5: DiffCondition = [
  { ftProb: "Manang Sita makes homemade avocado ice cream in Almeria. Her storage box starts at a cold temperature of -8°C. To keep the ice cream firm, she adds more ice and salt, dropping the temperature down to -28°C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?\nEquation: -28 - (-8) = -20°C", ftAns: -20, stProb: "Manang Sita makes homemade avocado ice cream in Almeria. Her storage box starts at a cold temperature of -4°C. To keep the ice cream firm, she adds more ice and salt, dropping the temperature down to -18°C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?\nEquation: -18 - (-4) = -14°C", stAns: -14 },
  { ftProb: "Tatay Jun loaded fresh tuna into a cooler chest on his boat in Kawayan. The cooler started at -4°C. He added dry ice, making the temperature drop down to -34°C. What is the change in temperature when you subtract the morning temperature from the final colder temperature?\nEquation: -34 - (-4) = -30°C", ftAns: -30, stProb: "Tatay Jun loaded fresh tuna into a cooler chest on his boat in Kawayan. The cooler started at -5°C. He added dry ice, making the temperature drop down to -25°C. What is the change in temperature when you subtract the morning temperature from the final colder temperature?\nEquation: -25 - (-5) = -20°C", stAns: -20 },
  { ftProb: "A free diver exploring the clear waters of Higatangan Island pauses at a depth of 6 meters below sea level. He then dives much deeper to check a submerged rock cave at 38 meters below sea level. What is his change in position when you subtract his starting depth from his final deeper depth?\nEquation: -38 - (-6) = -32 meters", ftAns: -32, stProb: "A free diver exploring the clear waters of Higatangan Island pauses at a depth of 3 meters below sea level. He then dives deeper to check a submerged rock cave at 22 meters below sea level. What is his change in position when you subtract his starting depth from his final deeper depth?\nEquation: -22 - (-3) = -19 meters", stAns: -19 },
  { ftProb: "During a class activity at Culaba National High School, students cooled a saltwater solution down to -12°C. They added a special chemical that caused the solution to freeze much further down to -37°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\nEquation: -37 - (-12) = -25°C", ftAns: -25, stProb: "During a class activity at Culaba National High School, students cooled a saltwater solution down to -8°C. They added a special chemical that caused the solution to freeze further down to -20°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\nEquation: -20 - (-8) = -12°C", stAns: -12 },
  { ftProb: "A boat operator near a pier in Cabucgayan lowers a small depth marker to 15 meters below sea level. He then lets out more rope, dropping the marker all the way down to the muddy bottom at 35 meters below sea level. What is the change in the marker's position when you subtract -15 meters from its -35 meters final deeper position?\nEquation: -35 - (-15) = -20 meters", ftAns: -20, stProb: "A boat operator near a pier in Cabucgayan lowers a small depth marker to 10 meters below sea level. He then lets out more rope, dropping the marker down to the muddy bottom at 28 meters below sea level. What is the change in the marker's position when you subtract -10 meters from its -28 meters final deeper position?\nEquation: -28 - (-10) = -18 meters", stAns: -18 },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Activity 2 - Difficult Round Word Problems
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const a2DiffC1: DiffCondition = [
  { ftProb: "Ate Susan harvested 15 baskets of santol from her farm in Naval. She delivered 9 baskets to the local public market stall. How many baskets of santol does Ate Susan have left in her storage?\n•	Equation: 15 - 9 = 6", ftAns: 6, stProb: "Ate Susan harvested 10 baskets of santol from her farm in Naval. She delivered 6 baskets to the local public market stall. How many baskets of santol does Ate Susan have left in her storage?\n•	Equation: 10 - 6 = 4", stAns: 4 },
  { ftProb: "For the upcoming barangay festival in Almeria, a farming family gathered 14 kilograms of red rambutan. They donated 8 kilograms to the youth games prize booth. How many kilograms of rambutan remain with the family?\n•	Equation: 14 - 8 = 6", ftAns: 6, stProb: "For the upcoming barangay festival in Almeria, a farming family gathered 9 kilograms of red rambutan. They donated 4 kilograms to the youth games prize booth. How many kilograms of rambutan remain with the family?\n•	Equation: 9 - 4 = 5", stAns: 5 },
  { ftProb: "Tatay Marlon brought 13 bunches of Saba bananas to the pier in Maripipi Island. He managed to load 7 bunches onto the first pump boat heading to the mainland. How many bunches of bananas are left on the dock?\n•	Equation: 13 - 7 = 6", ftAns: 6, stProb: "Tatay Marlon brought 8 bunches of Saba bananas to the pier in Maripipi Island. He managed to load 3 bunches onto the first pump boat heading to the mainland. How many bunches of bananas are left on the dock?\n•	Equation: 8 - 3 = 5", stAns: 5 },
  { ftProb: "The Kawayan Farmers Cooperative has 9 boxes of ripe bananas in stock. A local school needs 14 boxes for a community feeding program. If the cooperative gives all 9 boxes, how much more do they need to give to the local school?\n•	Equation: 9 - 14 = -5", ftAns: -5, stProb: "The Kawayan Farmers Cooperative has 5 boxes of ripe bananas in stock. A local school needs 11 boxes for a community feeding program. If the cooperative gives all 5 boxes, how much more do they need to give to the local school?\n•	Equation: 5 - 11 = -6", stAns: -6 },
  { ftProb: "A fruit vendor in Culaba needs to supply 15 baskets of santol to the public market. However, only 10 baskets are high quality enough to send out. If she sends these 10 baskets, how many baskets does she still need to find?\n•	Equation: 10 - 15 = -5", ftAns: -5, stProb: "A fruit vendor in Culaba needs to supply 12 baskets of santol to the public market. However, only 6 baskets are high quality enough to send out. If she sends these 6 baskets, how many baskets does she still need to find?\n•	Equation: 6 - 12 = -6", stAns: -6 },
];

const a2DiffC2: DiffCondition = [
  { ftProb: "A banana farmer in Culaba borrowed the farmers' COOP ₱14 for healthy soil. Today, he needs to borrow another ₱10 for extra seeds. How much does he need to pay back to the COOP?\n•	Equation: -14 - 10 = -₱24", ftAns: -24, stProb: "A banana farmer in Culaba borrowed the farmers' COOP ₱9 for healthy soil. Today, he needs to borrow another ₱5 for extra seeds. How much does he need to pay back to the COOP?\n•	Equation: -9 - 5 = -₱14", stAns: -14 },
  { ftProb: "A suman maker in Cabucgayan borrowed ₱15 to her cousin for specialized wrapping paper. Today, she needs to borrow another ₱8. How much does she need to pay back to her cousin?\n•	Equation: -15 - 8 = -₱23", ftAns: -23, stProb: "A suman maker in Cabucgayan borrowed ₱8 to her cousin for specialized wrapping paper. Today, she needs to borrow another ₱4. How much does she need to pay back to her cousin?\n•	Equation: -8 - 4 = -₱12", stAns: -12 },
  { ftProb: "A street food vendor in Maripipi borrowed ₱12 to a local store for frying oil. Today, she needs to borrow another ₱9 to buy sticks for her barbecue. How much does she need to pay back in total?\n•	Equation: -12 - 9 = -₱21", ftAns: -21, stProb: "A street food vendor in Maripipi borrowed ₱7 to a local store for frying oil. Today, she needs to borrow another ₱6 to buy sticks for her barbecue. How much does she need to pay back in total?\n\n•	Equation: -7 - 6 = -₱13", stAns: -13 },
  { ftProb: "A tricycle driver in Almeria borrowed ₱13 from his friend for a carwash. Today, he needs to borrow another ₱11 to inflate his flat tire. How much does he need to pay back?\n•	Equation: -13 - 11 = -₱24", ftAns: -24, stProb: "A tricycle driver in Almeria borrowed ₱10 from his friend for a carwash. Today, he needs to borrow another ₱5 to inflate his flat tire. How much does he need to pay back?\n•	Equation: -10 - 5 = -₱15", stAns: -15 },
  { ftProb: "A vegetable vendor at the Kawayan market already owes ₱15 for her daily stall space rental. Today, she needs to borrow another ₱12 to buy wholesale tomatoes from a grower. How much total debt does she have now?\n•	Equation: -15 - 12 = -₱27", ftAns: -27, stProb: "A vegetable vendor at the Kawayan market already owes ₱9 for her daily stall space rental. Today, she needs to borrow another ₱7 to buy wholesale tomatoes from a grower. How much total debt does she have now?\n•	Equation: -9 - 7 = -₱16", stAns: -16 },
];

const a2DiffC3: DiffCondition = [
  { ftProb: "Nang Rosa made a bottle of fresh buko juice on her farm in Kawayan. It was kept chilling in ice at -5°C. She left it on the kitchen counter until it warmed up to a pleasant room temperature of 14°C. What is the temperature difference between the warm 14°C juice and its cold -5°C starting temperature?\n•	Equation: 14 - (-5) = 19°C", ftAns: 19, stProb: "Nang Rosa made a bottle of fresh buko juice on her farm in Kawayan. It was kept chilling in ice at -3°C. She left it on the kitchen counter until it warmed up to a room temperature of 9°C. What is the temperature difference between the warm 9°C juice and its cold -3°C starting temperature?\n•	Equation: 9 - (-3) = 12°C", stAns: 12 },
  { ftProb: "Mang Pedro is checking his backyard store records in Cabucgayan. On Monday, his ledger showed a net loss recorded as -₱12 because he had to buy plastic bags. On Tuesday, his record jumped up to a positive profit of ₱15. What is the total financial difference between Tuesday's profit and Monday's loss?\n•	Equation: 15 - (-12) = ₱27", ftAns: 27, stProb: "Mang Pedro is checking his backyard store records in Cabucgayan. On Monday, his ledger showed a net loss recorded as -₱5 because he had to buy plastic bags. On Tuesday, his record jumped up to a positive profit of ₱8. What is the total financial difference between Tuesday's profit and Monday's loss?\n•	Equation: 8 - (-5) = ₱13", stAns: 13 },
  { ftProb: "An adventure guide stands on a high eco-park platform in Biliran town that is 13 meters above sea level. Straight below him, a valley hiking trail sits at 8 meters below sea level. What is the total vertical distance between the guide on the 13-meter platform and the trail at -8 meters?\n•	Equation: 13 - (-8) = 21 meters", ftAns: 21, stProb: "An adventure guide stands on a high eco-park platform in Biliran town that is 7 meters above sea level. Straight below him, a valley hiking trail sits at 4 meters below sea level. What is the total vertical distance between the guide on the 7-meter platform and the trail at -4 meters?\n•	Equation: 7 - (-4) = 11 meters", stAns: 11 },
  { ftProb: "Lito earned 15 points on his Math board activity at Culaba National High School. Afterward, his teacher realized there was a mistaken -4 point penalty written on his tally sheet. To fix the mistake, the teacher subtracted the -4 penalty from his score. What is Lito's corrected final score?\n•	Equation: 15 - (-4) = 19", ftAns: 19, stProb: "Lito earned 10 points on his Math board activity at Culaba National High School. Afterward, his teacher realized there was a mistaken -2 point penalty written on his tally sheet. To fix the mistake, the teacher subtracted the -2 penalty from his score. What is Lito's corrected final score?\n•	Equation: 10 - (-2) = 12", stAns: 12 },
  { ftProb: "A cook in Almeria wraps a batch of biko that sits at a temperature of 12°C. She sets it inside a heavy-duty cooling chest running at -10°C. What is the total temperature difference between the warm 12°C delicacy and the -10°C cooling chest?\n•	Equation: 12 - (-10) = 22°C", ftAns: 22, stProb: "A cook in Almeria wraps a batch of biko that sits at a temperature of 8°C. She sets it inside a heavy-duty cooling chest running at -5°C. What is the total temperature difference between the warm 8°C delicacy and the -5°C cooling chest?\n•	Equation: 8 - (-5) = 13°C", stAns: 13 },
];

const a2DiffC4: DiffCondition = [
  { ftProb: "A vendor in Caibiran has a small icebox for storing fish that is sitting at -5°C. A larger deep-freeze storage unit nearby is kept colder at -15°C. What is the temperature difference if you subtract the colder -15°C from the -5°C fish icebox?\n•	Equation: -5 - (-15) = 10°C", ftAns: 10, stProb: "A vendor in Caibiran has a small icebox for storing fish that is sitting at -2°C. A larger deep-freeze storage unit nearby is kept colder at -8°C. What is the temperature difference if you subtract the colder -8°C from the -2°C fish icebox?\n•	Equation: -2 - (-8) = 6°C", stAns: 6 },
  { ftProb: "A delivery jeepney is carrying native sausages across Cabucgayan. Inside the jeepney, a small cooler bag is at -4°C. The main freezer box next to it is colder at -14°C. What is the temperature difference if you subtract the colder -14°C from the -4°C cooler bag?\n•	Equation: -4 - (-14) = 10°C", ftAns: 10, stProb: "A delivery jeepney is carrying native sausages across Cabucgayan. Inside the jeepney, a small cooler bag is at -3°C. The main freezer box next to it is colder at -10°C. What is the temperature difference if you subtract the colder -10°C from the -3°C cooler bag?\n•	Equation: -3 - (-10) = 7°C", stAns: 7 },
  { ftProb: "While exploring the sea around Higatangan Island, a local diver swims at a depth of 3 meters below sea level. Straight beneath him, a giant sea clam rests on a rock bed at 12 meters below sea level. What is the distance between the -3 meter diver and the -12 meter sea clam?\n•	Equation: -3 - (-12) = 9 meters", ftAns: 9, stProb: "While exploring the sea around Higatangan Island, a local diver swims at a depth of 2 meters below sea level. Straight beneath him, a giant sea clam rests on a rock bed at 9 meters below sea level. What is the distance between the -2 meter diver and the -9 meter sea clam?\n•	Equation: -2 - (-9) = 7 meters", stAns: 7 },
  { ftProb: "During a science activity at Biliran Science High School, a saltwater cup is cooled down to -6°C. A second cup in the lab is chilled even further down to -15°C. What is the temperature difference when you subtract the colder -15°C from the -6°C cup?\n•	Equation: -6 - (-15) = 9°C", ftAns: 9, stProb: "During a science activity at Biliran Science High School, a saltwater cup is cooled down to -4°C. A second cup in the lab is chilled even further down to -10°C. What is the temperature difference when you subtract the colder -10°C from the -4°C cup?\n•	Equation: -4 - (-10) = 6°C", stAns: 6 },
  { ftProb: "An underwater sensor near a pier in Maripipi Island is placed at 5 meters below sea level. A dropped fishing net lands deeper on the seabed at 14 meters below sea level. What is the distance between the -5 meter sensor and the -14 meter fishing net?\n•	Equation: -5 - (-14) = 9 meters", ftAns: 9, stProb: "An underwater sensor near a pier in Maripipi Island is placed at 3 meters below sea level. A dropped fishing net lands deeper on the seabed at 8 meters below sea level. What is the distance between the -3 meter sensor and the -8 meter fishing net?\n•	Equation: -3 - (-8) = 5 meters", stAns: 5 },
];

const a2DiffC5: DiffCondition = [
  { ftProb: "Nang Tina sells homemade mango ice candy in Caibiran. Her cooler chest starts at a cold temperature of -4°C. She adds more crushed ice, dropping the temperature down to -14°C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?\n•	Equation: -14 - (-4) = -10°C", ftAns: -10, stProb: "Nang Tina sells homemade mango ice candy in Caibiran. Her cooler chest starts at a cold temperature of -2°C. She adds more crushed ice, dropping the temperature down to -9°C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?\n•	Equation: -9 - (-2) = -7°C", stAns: -7 },
  { ftProb: "Tatay Ben loaded fresh shrimp into a freezer box on his boat in Maripipi Island. The box started at -3°C. He adjusted the cooling dial, making the temperature drop down to -15°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\n•	Equation: -15 - (-3) = -12°C", ftAns: -12, stProb: "Tatay Ben loaded fresh shrimp into a freezer box on his boat in Maripipi Island. The box started at -3°C. He adjusted the cooling dial, making the temperature drop down to -10°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\n•	Equation: -10 - (-3) = -7°C", stAns: -7 },
  { ftProb: "A student exploring the waters of Biliran town swims at a depth of 5 meters below sea level. She then dives deeper down to look at a sea star at 13 meters below sea level. What is her change in position when you subtract her starting depth of -5 meters from her final deeper depth of -13 meters?\n•	Equation: -13 - (-5) = -8 meters", ftAns: -8, stProb: "A student exploring the waters of Biliran town swims at a depth of 2 meters below sea level. She then dives deeper down to look at a sea star at 8 meters below sea level. What is her change in position when you subtract her starting depth of -2 meters from her final deeper depth of -8 meters?\n\nEquation: -8 - (-2) = -6 meters", stAns: -6 },
  { ftProb: "During a laboratory experiment at Naval National High School, students cooled a vinegar solution down to -6°C. They packed it in dry ice until it froze further down to -15°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\n•	Equation: -15 - (-6) = -9°C", ftAns: -9, stProb: "During a laboratory experiment at Naval National High School, students cooled a vinegar solution down to -4°C. They packed it in dry ice until it froze further down to -10°C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?\n•	Equation: -10 - (-4) = -6°C", stAns: -6 },
  { ftProb: "A boatman near a small pier in Kawayan lowers a metal weight to 8 meters below sea level. He then lets out more line, dropping the weight down to a reef at 14 meters below sea level. What is the change in the weight's position when you subtract its -8 meters starting position from its final deeper position of -14 meters?\n•	Equation: -14 - (-8) = -6 meters", ftAns: -6, stProb: "A boatman near a small pier in Kawayan lowers a metal weight to 3 meters below sea level. He then lets out more line, dropping the weight down to a reef at 9 meters below sea level. What is the change in the weight's position when you subtract its -3 meters starting position from its final deeper position of -9 meters?\n•	Equation: -9 - (-3) = -6 meters", stAns: -6 },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Hint Bank Exports
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export const activity1Hints: ActivityHintBank = {
  easy: [a1EasyHintsC1, a1EasyHintsC2, a1EasyHintsC3, a1EasyHintsC4, a1EasyHintsC5],
  moderate: [a1ModHintsC1, a1ModHintsC2, a1ModHintsC3, a1ModHintsC4, a1ModHintsC5],
};

export const activity2Hints: ActivityHintBank = {
  easy: [a2EasyHintsC1, a2EasyHintsC2, a2EasyHintsC3, a2EasyHintsC4, a2EasyHintsC5],
  moderate: [a2ModHintsC1, a2ModHintsC2, a2ModHintsC3, a2ModHintsC4, a2ModHintsC5],
};

export const activity3Hints: ActivityHintBank = {
  easy: [a3EasyHintsC1, a3EasyHintsC2, a3EasyHintsC3, a3EasyHintsC4, a3EasyHintsC5],
  moderate: [a3ModHintsC1, a3ModHintsC2, a3ModHintsC3, a3ModHintsC4, a3ModHintsC5],
};

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Difficult Bank Exports
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export const activity1DiffBank: DiffRound = [
  a1DiffC1, a1DiffC2, a1DiffC3, a1DiffC4, a1DiffC5
];

export const activity2DiffBank: DiffRound = [
  a2DiffC1, a2DiffC2, a2DiffC3, a2DiffC4, a2DiffC5
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Selection Functions
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function pickFiveWithHints(
  round: ActivityRound,
  hintRound: ActivityHintRound
): (QPair & HintPair)[] {
  const result: (QPair & HintPair)[] = [];
  for (let c = 0; c < 5; c++) {
    const condition = round[c];
    const hintCondition = hintRound[c];
    const idx = Math.floor(Math.random() * condition.length);
    result.push({ ...condition[idx], ...hintCondition[idx] });
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickFiveDiffPairs(round: DiffRound): DiffPair[] {
  const result: DiffPair[] = [];
  for (let c = 0; c < 5; c++) {
    const condition = round[c];
    const idx = Math.floor(Math.random() * condition.length);
    result.push(condition[idx]);
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

