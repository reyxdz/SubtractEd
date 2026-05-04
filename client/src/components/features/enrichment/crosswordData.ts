// Enrichment Crossword Grid Data
// Grid: 14 cols (0-13) × 13 rows (0-12)
// Each equation = 5 cells: [num][op][num][op][num], one cell is blank (?)
// Intersections: E1∩E2 share blank cell, E3∩E4 share blank cell, E5∩E11 share blank cell

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

// ═══ GRID LAYOUT ═══════════════════════════════════════════
// E1  (down)   col=4   rows 0–4   blank=idx2  → (2,4) is blank
// E2  (across) row=2   cols 2–6   blank=idx2  → (2,4) is blank  ← intersects E1 ✓
// E3  (down)   col=10  rows 0–4   blank=idx2  → (2,10) is blank
// E4  (across) row=2   cols 8–12  blank=idx2  → (2,10) is blank ← intersects E3 ✓
// E5  (across) row=5   cols 4–8   blank=idx2  → (5,6) is blank
// E11 (down)   col=6   rows 5–9   blank=idx0  → (5,6) is blank  ← intersects E5 ✓
// E6  (down)   col=2   rows 5–9   blank=idx4
// E7  (down)   col=5   rows 8–12  blank=idx4
// E8  (down)   col=9   rows 5–9   blank=idx4
// E9  (down)   col=11  rows 5–9   blank=idx4
// E10 (across) row=10  cols 2–6   blank=idx4
// ════════════════════════════════════════════════════════════

export const crosswordLevels: CWLevel[] = [
  {
    level: 1, name: 'Level 1', description: 'Basic Subtraction',
    entries: [
      makeDown(1, 4, 0,    [15, '−', 6, '=', 9],       2),
      makeAcross(2, 2, 2,  [12, '−', 6, '=', 6],       2),
      makeDown(3, 10, 0,   [18, '−', 5, '=', 13],      2),
      makeAcross(4, 2, 8,  [14, '−', 5, '=', 9],       2),
      makeAcross(5, 5, 4,  [20, '−', 10, '=', 10],     2),
      makeDown(11, 6, 5,   [10, '−', 3, '=', 7],       0),
      makeDown(6, 2, 5,    [17, '−', 8, '=', 9],       4),
      makeDown(7, 5, 8,    [15, '−', 4, '=', 11],      4),
      makeDown(8, 9, 5,    [21, '−', 9, '=', 12],      4),
      makeDown(9, 11, 5,   [14, '−', 6, '=', 8],       4),
      makeAcross(10, 10, 2,[13, '−', 5, '=', 8],       4),
    ],
  },
  {
    level: 2, name: 'Level 2', description: 'Negative Integer Focus',
    entries: [
      makeDown(1, 4, 0,    [4, '−', 12, '=', -8],      2),
      makeAcross(2, 2, 2,  [7, '−', 12, '=', -5],      2),
      makeDown(3, 10, 0,   [2, '−', 15, '=', -13],     2),
      makeAcross(4, 2, 8,  [6, '−', 15, '=', -9],      2),
      makeAcross(5, 5, 4,  [3, '−', 8, '=', -5],       2),
      makeDown(11, 6, 5,   [8, '−', 11, '=', -3],      0),
      makeDown(6, 2, 5,    [5, '−', 14, '=', -9],      4),
      makeDown(7, 5, 8,    [1, '−', 10, '=', -9],      4),
      makeDown(8, 9, 5,    [9, '−', 20, '=', -11],     4),
      makeDown(9, 11, 5,   [4, '−', 18, '=', -14],     4),
      makeAcross(10, 10, 2,[8, '−', 15, '=', -7],      4),
    ],
  },
  {
    level: 3, name: 'Level 3', description: 'Negative Minuend Focus',
    entries: [
      makeDown(1, 4, 0,    [-4, '−', 10, '=', -14],    2),
      makeAcross(2, 2, 2,  [-8, '−', 10, '=', -18],    2),
      makeDown(3, 10, 0,   [-5, '−', 7, '=', -12],     2),
      makeAcross(4, 2, 8,  [-12, '−', 7, '=', -19],    2),
      makeAcross(5, 5, 4,  [-9, '−', 6, '=', -15],     2),
      makeDown(11, 6, 5,   [-6, '−', 4, '=', -10],     0),
      makeDown(6, 2, 5,    [-15, '−', 5, '=', -20],    4),
      makeDown(7, 5, 8,    [-3, '−', 9, '=', -12],     4),
      makeDown(8, 9, 5,    [-20, '−', 10, '=', -30],   4),
      makeDown(9, 11, 5,   [-7, '−', 13, '=', -20],    4),
      makeAcross(10, 10, 2,[-11, '−', 4, '=', -15],    4),
    ],
  },
  {
    level: 4, name: 'Level 4', description: 'Subtracting Negatives',
    entries: [
      makeDown(1, 4, 0,    [5, '−', -8, '=', 13],      2),
      makeAcross(2, 2, 2,  [12, '−', -8, '=', 20],     2),
      makeDown(3, 10, 0,   [4, '−', -11, '=', 15],     2),
      makeAcross(4, 2, 8,  [9, '−', -11, '=', 20],     2),
      makeAcross(5, 5, 4,  [10, '−', -6, '=', 16],     2),
      makeDown(11, 6, 5,   [-6, '−', -3, '=', -3],     0),
      makeDown(6, 2, 5,    [7, '−', -5, '=', 12],      4),
      makeDown(7, 5, 8,    [15, '−', -10, '=', 25],    4),
      makeDown(8, 9, 5,    [3, '−', -9, '=', 12],      4),
      makeDown(9, 11, 5,   [20, '−', -4, '=', 24],     4),
      makeAcross(10, 10, 2,[8, '−', -12, '=', 20],     4),
    ],
  },
  {
    level: 5, name: 'Level 5', description: 'Double Negative Focus',
    entries: [
      makeDown(1, 4, 0,    [-5, '−', -12, '=', 7],     2),
      makeAcross(2, 2, 2,  [-2, '−', -12, '=', 10],    2),
      makeDown(3, 10, 0,   [-3, '−', -15, '=', 12],    2),
      makeAcross(4, 2, 8,  [-6, '−', -15, '=', 9],     2),
      makeAcross(5, 5, 4,  [-4, '−', -8, '=', 4],      2),
      makeDown(11, 6, 5,   [-8, '−', -5, '=', -3],     0),
      makeDown(6, 2, 5,    [-10, '−', -18, '=', 8],    4),
      makeDown(7, 5, 8,    [-1, '−', -11, '=', 10],    4),
      makeDown(8, 9, 5,    [-7, '−', -20, '=', 13],    4),
      makeDown(9, 11, 5,   [-4, '−', -14, '=', 10],    4),
      makeAcross(10, 10, 2,[-11, '−', -16, '=', 5],    4),
    ],
  },
  {
    level: 6, name: 'Level 6', description: 'Mixed Negative Operations',
    entries: [
      makeDown(1, 4, 0,    [-10, '−', -5, '=', -15],   2),
      makeAcross(2, 2, 2,  [-5, '−', -5, '=', -20],    2),
      makeDown(3, 10, 0,   [-12, '−', 6, '=', -18],    2),
      makeAcross(4, 2, 8,  [-2, '−', 26, '=', -28],    2),
      makeAcross(5, 5, 4,  [-8, '−', 4, '=', -12],     2),
      makeDown(11, 6, 5,   [-20, '−', -5, '=', -15],   0),
      makeDown(6, 2, 5,    [-3, '−', -10, '=', 7],     4),
      makeDown(7, 5, 8,    [-11, '−', -15, '=', 4],    4),
      makeDown(8, 9, 5,    [-6, '−', -20, '=', 14],    4),
      makeDown(9, 11, 5,   [-1, '−', -12, '=', 11],    4),
      makeAcross(10, 10, 2,[-9, '−', -14, '=', 5],     4),
    ],
  },
];

export const GRID_ROWS = 13;
export const GRID_COLS = 14;
