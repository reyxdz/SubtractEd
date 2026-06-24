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

type ConditionPairs = readonly QPair[];
type ActivityRound = readonly ConditionPairs[];

export interface ActivityBank {
  easy: ActivityRound;
  moderate: ActivityRound;
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
