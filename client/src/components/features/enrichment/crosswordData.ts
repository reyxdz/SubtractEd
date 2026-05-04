// Enrichment Crossword Grid Data
// Grid: 24 cols (0-23) × 17 rows (0-16)
// Each equation = 5 cells: [num][-][num][=][num], one cell is blank (?)

export interface CWCell {
  row: number;
  col: number;
  value: string | number;
  isBlank: boolean;
  entryId: number;
}

export interface CWEntry {
  id: number;
  direction: 'across' | 'down';
  cells: CWCell[];
}

export interface CWLevel {
  level: number;
  name: string;
  description: string;
  entries: CWEntry[];
}

function makeAcross(
  id: number, row: number, startCol: number,
  vals: (string | number)[], blankIdx: number
): CWEntry {
  return {
    id, direction: 'across',
    cells: vals.map((v, i) => ({
      row, col: startCol + i, value: v, isBlank: i === blankIdx, entryId: id,
    })),
  };
}

function makeDown(
  id: number, col: number, startRow: number,
  vals: (string | number)[], blankIdx: number
): CWEntry {
  return {
    id, direction: 'down',
    cells: vals.map((v, i) => ({
      row: startRow + i, col, value: v, isBlank: i === blankIdx, entryId: id,
    })),
  };
}

// ═══ GRID LAYOUT (24x17) ═══════════════════════════════════
// A: Eq 1 (down, col 6, start row 1), Eq 2 (across, row 3, start col 4). Intersection at (3,6) -> blank
// B: Eq 3 (down, col 15, start row 1), Eq 4 (across, row 3, start col 13). Intersection at (3,15) -> blank
// C: Eq 5 (across, row 5, start col 8), Eq 11 (down, col 10, start row 5). Intersection at (5,10) -> blank
// D: Eq 6 (down, col 4, start row 8).
// E: Eq 7 (down, col 9, start row 10), Eq 10 (across, row 11, start col 8). Intersection at (11,9) -> minus sign
// F: Eq 8 (down, col 14, start row 8), Eq 9 (down, col 17, start row 8).

export const crosswordLevels: CWLevel[] = [
  {
    level: 1, name: 'Level 1', description: 'Basic Subtraction',
    entries: [
      makeDown(1, 6, 1,    [15, '−', 6, '=', 9],       2),
      makeAcross(2, 3, 4,  [12, '−', 6, '=', 6],       2),
      makeDown(3, 15, 1,   [18, '−', 5, '=', 13],      2),
      makeAcross(4, 3, 13, [14, '−', 5, '=', 9],       2),
      makeAcross(5, 5, 8,  [20, '−', 10, '=', 10],     2),
      makeDown(11, 10, 5,  [10, '−', 3, '=', 7],       0),
      makeDown(6, 4, 8,    [17, '−', 8, '=', 9],       4),
      makeDown(7, 9, 10,   [15, '−', 4, '=', 11],      4),
      makeDown(8, 14, 8,   [21, '−', 9, '=', 12],      4),
      makeDown(9, 17, 8,   [14, '−', 6, '=', 8],       4),
      makeAcross(10, 11, 8,[13, '−', 5, '=', 8],       4),
    ],
  },
  {
    level: 2, name: 'Level 2', description: 'Negative Integer Focus',
    entries: [
      makeDown(1, 6, 1,    [4, '−', 12, '=', -8],      2),
      makeAcross(2, 3, 4,  [7, '−', 12, '=', -5],      2),
      makeDown(3, 15, 1,   [2, '−', 15, '=', -13],     2),
      makeAcross(4, 3, 13, [6, '−', 15, '=', -9],      2),
      makeAcross(5, 5, 8,  [3, '−', 8, '=', -5],       2),
      makeDown(11, 10, 5,  [8, '−', 11, '=', -3],      0),
      makeDown(6, 4, 8,    [5, '−', 14, '=', -9],      4),
      makeDown(7, 9, 10,   [1, '−', 10, '=', -9],      4),
      makeDown(8, 14, 8,   [9, '−', 20, '=', -11],     4),
      makeDown(9, 17, 8,   [4, '−', 18, '=', -14],     4),
      makeAcross(10, 11, 8,[8, '−', 15, '=', -7],      4),
    ],
  },
  {
    level: 3, name: 'Level 3', description: 'Negative Minuend Focus',
    entries: [
      makeDown(1, 6, 1,    [-4, '−', 10, '=', -14],    2),
      makeAcross(2, 3, 4,  [-8, '−', 10, '=', -18],    2),
      makeDown(3, 15, 1,   [-5, '−', 7, '=', -12],     2),
      makeAcross(4, 3, 13, [-12, '−', 7, '=', -19],    2),
      makeAcross(5, 5, 8,  [-9, '−', 6, '=', -15],     2),
      makeDown(11, 10, 5,  [-6, '−', 4, '=', -10],     0),
      makeDown(6, 4, 8,    [-15, '−', 5, '=', -20],    4),
      makeDown(7, 9, 10,   [-3, '−', 9, '=', -12],     4),
      makeDown(8, 14, 8,   [-20, '−', 10, '=', -30],   4),
      makeDown(9, 17, 8,   [-7, '−', 13, '=', -20],    4),
      makeAcross(10, 11, 8,[-11, '−', 4, '=', -15],    4),
    ],
  },
  {
    level: 4, name: 'Level 4', description: 'Subtracting Negatives',
    entries: [
      makeDown(1, 6, 1,    [5, '−', -8, '=', 13],      2),
      makeAcross(2, 3, 4,  [12, '−', -8, '=', 20],     2),
      makeDown(3, 15, 1,   [4, '−', -11, '=', 15],     2),
      makeAcross(4, 3, 13, [9, '−', -11, '=', 20],     2),
      makeAcross(5, 5, 8,  [10, '−', -6, '=', 16],     2),
      makeDown(11, 10, 5,  [-6, '−', -3, '=', -3],     0),
      makeDown(6, 4, 8,    [7, '−', -5, '=', 12],      4),
      makeDown(7, 9, 10,   [15, '−', -10, '=', 25],    4),
      makeDown(8, 14, 8,   [3, '−', -9, '=', 12],      4),
      makeDown(9, 17, 8,   [20, '−', -4, '=', 24],     4),
      makeAcross(10, 11, 8,[8, '−', -12, '=', 20],     4),
    ],
  },
  {
    level: 5, name: 'Level 5', description: 'Double Negative Focus',
    entries: [
      makeDown(1, 6, 1,    [-5, '−', -12, '=', 7],     2),
      makeAcross(2, 3, 4,  [-2, '−', -12, '=', 10],    2),
      makeDown(3, 15, 1,   [-3, '−', -15, '=', 12],    2),
      makeAcross(4, 3, 13, [-6, '−', -15, '=', 9],     2),
      makeAcross(5, 5, 8,  [-4, '−', -8, '=', 4],      2),
      makeDown(11, 10, 5,  [-8, '−', -5, '=', -3],     0),
      makeDown(6, 4, 8,    [-10, '−', -18, '=', 8],    4),
      makeDown(7, 9, 10,   [-1, '−', -11, '=', 10],    4),
      makeDown(8, 14, 8,   [-7, '−', -20, '=', 13],    4),
      makeDown(9, 17, 8,   [-4, '−', -14, '=', 10],    4),
      makeAcross(10, 11, 8,[-11, '−', -16, '=', 5],    4),
    ],
  },
  {
    level: 6, name: 'Level 6', description: 'Mixed Negative Operations',
    entries: [
      makeDown(1, 6, 1,    [-10, '−', -5, '=', -15],   2),
      makeAcross(2, 3, 4,  [-5, '−', -5, '=', -20],    2),
      makeDown(3, 15, 1,   [-12, '−', 6, '=', -18],    2),
      makeAcross(4, 3, 13, [-2, '−', 26, '=', -28],    2),
      makeAcross(5, 5, 8,  [-8, '−', 4, '=', -12],     2),
      makeDown(11, 10, 5,  [-20, '−', -5, '=', -15],   0),
      makeDown(6, 4, 8,    [-3, '−', -10, '=', 7],     4),
      makeDown(7, 9, 10,   [-11, '−', -15, '=', 4],    4),
      makeDown(8, 14, 8,   [-6, '−', -20, '=', 14],    4),
      makeDown(9, 17, 8,   [-1, '−', -12, '=', 11],    4),
      makeAcross(10, 11, 8,[-9, '−', -14, '=', 5],     4),
    ],
  },
];

export const GRID_ROWS = 15;
export const GRID_COLS = 22;
