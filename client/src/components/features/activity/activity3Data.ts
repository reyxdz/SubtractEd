// Activity 3 Question Data — Difficult level uses word problems
// Easy & Moderate are sourced from the shared question bank

export type Difficulty = 'easy' | 'moderate' | 'difficult';

export interface A3Question {
  question: string;
  sentence: string;
  minuend: number;
  subtrahend: number;
  answer: number;
  newSentence: string;
  expectedKeep: string;
  expectedOp: string;
  expectedChange: string;
  hint?: string;
  errorTitle: string;
  errorMessage: string;
}

export interface A3QuestionPair {
  ft: A3Question;
  st: A3Question;
}

// ── Helper to build A3Question from expression ──
export function buildA3FromExpr(expr: string, answer: number): A3Question {
  const parts = parseExpression(expr);
  if (!parts) {
    return {
      question: `${expr} = ?`,
      sentence: `${expr} = ?`,
      minuend: 0, subtrahend: 0, answer: 0,
      newSentence: '',
      expectedKeep: '0', expectedOp: '+', expectedChange: '0',
      errorTitle: 'Error',
      errorMessage: 'Please try again.'
    };
  }

  const { a, b } = parts;
  const flipped = -b;
  const newSentence = `${a} + (${flipped})`;

  return {
    question: `${expr} = ?`,
    sentence: `${expr} = ?`,
    minuend: a,
    subtrahend: b,
    answer,
    newSentence,
    expectedKeep: String(a),
    expectedOp: '+',
    expectedChange: String(flipped),
    errorTitle: 'Not Quite!',
    errorMessage: 'Use the KEEP-CHANGE-CHANGE rule. Keep the first number, change minus to plus, change the sign of the second number.'
  };
}

function parseExpression(expr: string): { a: number; b: number } | null {
  const cleaned = expr.replace(/\s+/g, '');
  const match = cleaned.match(/^(-?\d+)-\(?(-?\d+)\)?$/);
  if (match) {
    return { a: parseInt(match[1], 10), b: parseInt(match[2], 10) };
  }
  return null;
}

// ── Helper to build A3Question for word problems ──
function buildDifficultQ(
  question: string,
  exprA: number,
  exprB: number,
  answer: number,
  errorTitle: string,
  errorMessage: string
): A3Question {
  const flipped = -exprB;
  return {
    question,
    sentence: `${exprA} - (${exprB}) = ?`,
    minuend: exprA,
    subtrahend: exprB,
    answer,
    newSentence: `${exprA} + (${flipped})`,
    expectedKeep: String(exprA),
    expectedOp: '+',
    expectedChange: String(flipped),
    errorTitle,
    errorMessage,
  };
}

// ── Difficult-level condition banks (5 conditions, 5 pairs each) ──
// Condition 1: a - b
const diffC1: A3QuestionPair[] = [
  {
    ft: buildDifficultQ(
      'Manang Fe harvested 95 heads of sweet corn from her farm in Cabucgayan. She sold 60 heads to a local store down the road. How many heads of sweet corn does Manang Fe have left to sell?',
      95, 60, 35,
      'Not Quite!',
      'Subtract the sold heads from the total harvest.'
    ),
    st: buildDifficultQ(
      'Manang Fe harvested 45 heads of sweet corn from her farm in Cabucgayan. She sold 25 heads to a local store down the road. How many heads of sweet corn does Manang Fe have left to sell?',
      45, 25, 20,
      'Not Quite!',
      'Subtract the sold heads from the total harvest.'
    ),
  },
  {
    ft: buildDifficultQ(
      'For the upcoming sports meet in Caibiran, a sports committee gathered 88 pieces of fresh young coconuts. They used 55 pieces to serve as refreshments for the student athletes. How many pieces of coconut remain with the committee?',
      88, 55, 33,
      'Oops! Try Again!',
      'Subtract the coconuts used from the total gathered.'
    ),
    st: buildDifficultQ(
      'For the upcoming sports meet in Caibiran, a sports committee gathered 38 pieces of fresh young coconuts. They used 20 pieces to serve as refreshments for the student athletes. How many pieces of coconut remain with the committee?',
      38, 20, 18,
      'Oops! Try Again!',
      'Subtract the coconuts used from the total gathered.'
    ),
  },
  {
    ft: buildDifficultQ(
      'Tatay Rene brought 75 baskets of local ginger to the shipping port in Biliran town. He managed to lift 45 baskets onto the cargo boat bound for Leyte. How many baskets of ginger are left resting on the pier deck?',
      75, 45, 30,
      'Almost There!',
      'Subtract the baskets loaded from those brought to the port.'
    ),
    st: buildDifficultQ(
      'Tatay Rene brought 35 baskets of local ginger to the shipping port in Biliran town. He managed to lift 15 baskets onto the cargo boat bound for Leyte. How many baskets of ginger are left resting on the pier deck?',
      35, 15, 20,
      'Almost There!',
      'Subtract the baskets loaded from those brought to the port.'
    ),
  },
  {
    ft: buildDifficultQ(
      'The Higatangan Craft Association has 40 hand-woven mats in stock. A resort owner needs 65 mats to decorate their guest rooms. If the association gives all 40 mats, how many more mats do they still owe the resort owner?',
      40, 65, -25,
      'Not Quite!',
      'The association has fewer mats than needed, so the result is negative.'
    ),
    st: buildDifficultQ(
      'The Higatangan Craft Association has 18 hand-woven mats in stock. A resort owner needs 32 mats to decorate their guest rooms. If the association gives all 18 mats, how many more mats do they still owe the resort owner?',
      18, 32, -14,
      'Not Quite!',
      'The association has fewer mats than needed, so the result is negative.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A fish vendor in Culaba needs to supply 80 kilograms of fresh tilapia to the community market. However, her morning catch yielded only 55 kilograms of the required size. If she delivers these 55 kilograms, how many more kilograms does she still need to catch to fill the order?',
      55, 80, -25,
      'Oops!',
      'She has less than required, so the difference is negative.'
    ),
    st: buildDifficultQ(
      'A fish vendor in Culaba needs to supply 40 kilograms of fresh tilapia to the community market. However, her morning catch yielded only 25 kilograms of the required size. If she delivers these 25 kilograms, how many more kilograms does she still need to catch to fill the order?',
      25, 40, -15,
      'Oops!',
      'She has less than required, so the difference is negative.'
    ),
  },
];

// Condition 2: -a - b
const diffC2: A3QuestionPair[] = [
  {
    ft: buildDifficultQ(
      'A rice farmer in Naval borrowed 85 pesos for organic pest control spray. Today, he needs to borrow another 50 pesos for a new plastic shovel. How much does he need to pay back to the store?',
      -85, 50, -135,
      'Not Quite!',
      'Borrowing more increases the debt. Add the amounts and keep the negative sign.'
    ),
    st: buildDifficultQ(
      'A rice farmer in Naval borrowed 35 pesos for organic pest control spray. Today, he needs to borrow another 20 pesos for a new plastic shovel. How much does he need to pay back to the store?',
      -35, 20, -55,
      'Not Quite!',
      'Borrowing more increases the debt. Add the amounts and keep the negative sign.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A puto baker in Biliran town borrowed 70 pesos from her neighbor for a bag of white sugar. Today, she needs to borrow another 45 pesos to buy banana leaves for lining her baking pans. How much does she need to pay back to her neighbor?',
      -70, 45, -115,
      'Oops! Try Again!',
      'Adding more debt makes the total more negative.'
    ),
    st: buildDifficultQ(
      'A puto baker in Biliran town borrowed 40 pesos from her neighbor for a pack of white sugar. Today, she needs to borrow another 15 pesos to buy banana leaves for lining her baking pans. How much does she need to pay back to her neighbor?',
      -40, 15, -55,
      'Oops! Try Again!',
      'Adding more debt makes the total more negative.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A barbecue stand owner near the beach in Sambawan Island borrowed 90 pesos from a market supplier for charcoal. Today, he needs to borrow another 60 pesos to buy a fresh tub of sweet soy sauce marinade. How much does he need to pay back in total?',
      -90, 60, -150,
      'Almost There!',
      'Combining debts means adding them together.'
    ),
    st: buildDifficultQ(
      'A barbecue stand owner near the beach in Sambawan Island borrowed 45 pesos from a market supplier for charcoal. Today, he needs to borrow another 25 pesos to buy a fresh tub of sweet soy sauce marinade. How much does he need to pay back in total?',
      -45, 25, -70,
      'Almost There!',
      'Combining debts means adding them together.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A tricycle driver in Caibiran borrowed 65 pesos from a local vulcanizing shop to fix a flat inner tube. Today, he needs to borrow another 55 pesos for gasoline to complete his afternoon trips. How much does he need to pay back?',
      -65, 55, -120,
      'Not Quite!',
      'Both amounts are debts that need to be combined.'
    ),
    st: buildDifficultQ(
      'A tricycle driver in Caibiran borrowed 30 pesos from a local vulcanizing shop to fix a flat inner tube. Today, he needs to borrow another 25 pesos for gasoline to complete his afternoon trip. How much does he need to pay back?',
      -30, 25, -55,
      'Not Quite!',
      'Both amounts are debts that need to be combined.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A fish vendor at the Almeria fish port borrowed 80 pesos for renting an insulated storage cooler box. Today, she needs to borrow another 40 pesos to buy blocks of crushed ice for her fresh catch. How much does she need to pay back?',
      -80, 40, -120,
      'Oops!',
      'Debts add up. The total is the sum of both borrowed amounts.'
    ),
    st: buildDifficultQ(
      'A fish vendor at the Almeria fish port borrowed 38 pesos for renting an insulated storage cooler box. Today, she needs to borrow another 22 pesos to buy blocks of crushed ice for her fresh catch. How much does she need to pay back?',
      -38, 22, -60,
      'Oops!',
      'Debts add up. The total is the sum of both borrowed amounts.'
    ),
  },
];

// Condition 3: a - (-b)
const diffC3: A3QuestionPair[] = [
  {
    ft: buildDifficultQ(
      'Manang Luz made a container of native calamansi juice at her stall in Naval. It was kept chilling in deep ice at -15\u00B0C. She left it out on a table until it warmed up to a warm room temperature of 32\u00B0C. What is the temperature difference between the warm 32\u00B0C juice and its cold -15\u00B0C starting temperature?',
      32, -15, 47,
      'Not Quite! Let\'s Try Again!',
      'Subtracting a negative is like adding. The difference is the sum of the two temperatures.'
    ),
    st: buildDifficultQ(
      'Manang Luz made a container of native calamansi juice at her stall in Naval. It was kept chilling in deep ice at -8\u00B0C. She left it out on a table until it warmed up to a room temperature of 24\u00B0C. What is the temperature difference between the warm 24\u00B0C juice and its cold -8\u00B0C starting temperature?',
      24, -8, 32,
      'Not Quite! Let\'s Try Again!',
      'Subtracting a negative is like adding. The difference is the sum of the two temperatures.'
    ),
  },
  {
    ft: buildDifficultQ(
      'Tatay Mario is tracking his small grocery store records in Maripipi Island. On Thursday, his ledger showed a net loss recorded as -45 because he had to repair a broken shelf. On Friday, his record went up to a positive profit of 85. What is the total financial difference between Friday\'s profit and Thursday\'s loss?',
      85, -45, 130,
      'Oops! Almost there!',
      'Subtracting a loss is like adding back that amount. Friday\'s profit minus a loss means you add the loss to the profit.'
    ),
    st: buildDifficultQ(
      'Tatay Mario is tracking his small grocery store records in Maripipi Island. On Thursday, his ledger showed a net loss recorded as -20 because he had to repair a broken shelf. On Friday, his record went up to a positive profit of 40. What is the total financial difference between Friday\'s profit and Thursday\'s loss?',
      40, -20, 60,
      'Oops! Almost there!',
      'Subtracting a loss is like adding back that amount.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A local tour guide stands on top of a rocky coastal cliff in Culaba that is 25 meters above sea level. Straight below him, a hidden underwater cave opening sits at 18 meters below sea level. What is the total vertical distance between the guide on the 25-meter cliff and the cave opening at -18 meters?',
      25, -18, 43,
      'Not Quite!',
      'Distance is always positive. Subtract the lower position from the higher position.'
    ),
    st: buildDifficultQ(
      'A local tour guide stands on top of a rocky coastal cliff in Culaba that is 12 meters above sea level. Straight below him, a hidden underwater cave opening sits at 6 meters below sea level. What is the total vertical distance between the guide on the 12-meter cliff and the cave opening at -6 meters?',
      12, -6, 18,
      'Not Quite!',
      'Distance is always positive. Subtract the lower position from the higher position.'
    ),
  },
  {
    ft: buildDifficultQ(
      'Elena earned 78 points on her Science long quiz at Caibiran National High School. Afterward, her teacher realized there was a mistaken -12 point penalty written on her grading sheet. To fix the mistake, the teacher subtracted the -12 penalty from her score. What is Elena\'s corrected final quiz score?',
      78, -12, 90,
      'Not Quite!',
      'Removing a penalty increases the score. Subtract the negative penalty to get the corrected score.'
    ),
    st: buildDifficultQ(
      'Elena earned 42 points on her Science long quiz at Caibiran National High School. Afterward, her teacher realized there was a mistaken -5 point penalty written on her grading sheet. To fix the mistake, the teacher subtracted the -5 penalty from her score. What is Elena\'s corrected final quiz score?',
      42, -5, 47,
      'Not Quite!',
      'Removing a penalty increases the score.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A vendor in Almeria prepares a fresh pan of warm maja blanca that sits at a temperature of 35\u00B0C. She sets it inside a heavy-duty cooling storage box running at -25\u00B0C to firm it up. What is the total temperature difference between the warm 35\u00B0C pudding and the -25\u00B0C cooling box?',
      35, -25, 60,
      'Not Quite! Let\'s Try Again!',
      'The temperature difference is the warm temperature minus the cold temperature. Subtracting a negative gives a larger positive result.'
    ),
    st: buildDifficultQ(
      'A vendor in Almeria prepares a fresh pan of warm maja blanca that sits at a temperature of 22\u00B0C. She sets it inside a heavy-duty cooling storage box running at -15\u00B0C to firm it up. What is the total temperature difference between the warm 22\u00B0C pudding and the -15\u00B0C cooling box?',
      22, -15, 37,
      'Not Quite! Let\'s Try Again!',
      'The temperature difference is the warm temperature minus the cold temperature. Subtracting a negative gives a larger positive result.'
    ),
  },
];

// Condition 4: -a - (-b) where result > 0
const diffC4: A3QuestionPair[] = [
  {
    ft: buildDifficultQ(
      'A vendor in Almeria has a small icebox for storing freshly caught fish that is sitting at -12\u00B0C. A larger deep-freeze storage unit nearby is kept much colder at -65\u00B0C. What is the temperature difference if you subtract the colder -65\u00B0C from the -12\u00B0C fish icebox?',
      -12, -65, 53,
      'Not Quite!',
      'Subtracting a colder temperature from a warmer one gives a positive difference. Use KCC: -12 + 65 = 53.'
    ),
    st: buildDifficultQ(
      'A vendor in Almeria has a small icebox for storing freshly caught fish that is sitting at -5\u00B0C. A larger deep-freeze storage unit nearby is kept colder at -32\u00B0C. What is the temperature difference if you subtract the colder -32\u00B0C from the -5\u00B0C fish icebox?',
      -5, -32, 27,
      'Not Quite!',
      'Subtracting a colder temperature from a warmer one gives a positive difference. Use KCC: -5 + 32 = 27.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A delivery motorcycle is carrying frozen chicken across Naval. Inside the container, a top shelf bag sits at -15\u00B0C. The bottom freezer box right underneath it is colder at -48\u00B0C. What is the temperature difference if you subtract the colder -48\u00B0C from the -15\u00B0C top shelf bag?',
      -15, -48, 33,
      'Oops!',
      'Subtract the colder temperature from the warmer one. -15 - (-48) = -15 + 48 = 33.'
    ),
    st: buildDifficultQ(
      'A delivery motorcycle is carrying frozen chicken across Naval. Inside the container, a top shelf bag sits at -8\u00B0C. The bottom freezer box right underneath it is colder at -25\u00B0C. What is the temperature difference if you subtract the colder -25\u00B0C from the -8\u00B0C top shelf bag?',
      -8, -25, 17,
      'Oops!',
      'Subtract the colder temperature from the warmer one. -8 - (-25) = -8 + 25 = 17.'
    ),
  },
  {
    ft: buildDifficultQ(
      'While exploring the deep waters around Sambawan Island, a local diver swims at a depth of 22 meters below sea level. Straight beneath her, a beautiful coral reef sits at 85 meters below sea level. What is the distance between the -22 meter diver and the -85 meter coral reef?',
      -22, -85, 63,
      'Not Quite!',
      'Distance is positive. Subtract the deeper position from the shallower one. -22 - (-85) = -22 + 85 = 63.'
    ),
    st: buildDifficultQ(
      'While exploring the deep waters around Sambawan Island, a local diver swims at a depth of 12 meters below sea level. Straight beneath her, a beautiful coral reef sits at 40 meters below sea level. What is the distance between the -12 meter diver and the -40 meter coral reef?',
      -12, -40, 28,
      'Not Quite!',
      'Distance is positive. Subtract the deeper position from the shallower one. -12 - (-40) = -12 + 40 = 28.'
    ),
  },
  {
    ft: buildDifficultQ(
      'During a science activity at Kawayan National High School, a beaker of liquid alcohol is cooled down to -18\u00B0C. A second beaker in the laboratory is chilled even further down to -70\u00B0C. What is the temperature difference when you subtract the colder -70\u00B0C from the -18\u00B0C beaker?',
      -18, -70, 52,
      'Not Quite!',
      'Subtracting a colder temperature gives a positive result. -18 - (-70) = -18 + 70 = 52.'
    ),
    st: buildDifficultQ(
      'During a science activity at Kawayan National High School, a beaker of liquid alcohol is cooled down to -6\u00B0C. A second beaker in the laboratory is chilled even further down to -35\u00B0C. What is the temperature difference when you subtract the colder -35\u00B0C from the -6\u00B0C beaker?',
      -6, -35, 29,
      'Not Quite!',
      'Subtracting a colder temperature gives a positive result. -6 - (-35) = -6 + 35 = 29.'
    ),
  },
  {
    ft: buildDifficultQ(
      'An underwater sensor near a coastal mangrove in Biliran town is placed at 30 meters below sea level. A dropped boat anchor lands deeper down on the sandy floor at 95 meters below sea level. What is the distance between the -30 meter sensor and the -95 meter anchor?',
      -30, -95, 65,
      'Oops! Try Again!',
      'Find the distance between two negative positions. -30 - (-95) = -30 + 95 = 65.'
    ),
    st: buildDifficultQ(
      'An underwater sensor near a coastal mangrove in Biliran town is placed at 15 meters below sea level. A dropped boat anchor lands deeper down on the sandy floor at 45 meters below sea level. What is the distance between the -15 meter sensor and the -45 meter anchor?',
      -15, -45, 30,
      'Oops! Try Again!',
      'Find the distance between two negative positions. -15 - (-45) = -15 + 45 = 30.'
    ),
  },
];

// Condition 5: -a - (-b) where result < 0
const diffC5: A3QuestionPair[] = [
  {
    ft: buildDifficultQ(
      'Nang Cora sells homemade avocado ice candy in Culaba. Her cooler chest starts at a cold temperature of -14\u00B0C. She adds more rock salt and crushed ice, dropping the temperature down to -45\u00B0C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?',
      -45, -14, -31,
      'Not Quite!',
      'The temperature dropped further, so the change is negative. -45 - (-14) = -45 + 14 = -31.'
    ),
    st: buildDifficultQ(
      'Nang Cora sells homemade avocado ice candy in Culaba. Her cooler chest starts at a cold temperature of -6\u00B0C. She adds more rock salt and crushed ice, dropping the temperature down to -25\u00B0C. What is the change in temperature when you subtract the starting temperature from the final colder temperature?',
      -25, -6, -19,
      'Not Quite!',
      'The temperature dropped further, so the change is negative. -25 - (-6) = -25 + 6 = -19.'
    ),
  },
  {
    ft: buildDifficultQ(
      'Tatay Lito loaded fresh squid into a freezer box on his boat in Cabucgayan. The box started at -11\u00B0C. He turned the cooling dial, making the temperature drop down to -38\u00B0C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?',
      -38, -11, -27,
      'Oops!',
      'The temperature went lower, so the change is negative. -38 - (-11) = -38 + 11 = -27.'
    ),
    st: buildDifficultQ(
      'Tatay Lito loaded fresh squid into a freezer box on his boat in Cabucgayan. The box started at -8\u00B0C. He turned the cooling dial, making the temperature drop down to -22\u00B0C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?',
      -22, -8, -14,
      'Oops!',
      'The temperature went lower, so the change is negative. -22 - (-8) = -22 + 8 = -14.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A student exploring the marine sanctuary of Higatangan Island swims at a depth of 15 meters below sea level. She then dives deeper down to look at a sea turtle at 55 meters below sea level. What is her change in position when you subtract her starting depth from her final deeper depth?',
      -55, -15, -40,
      'Not Quite!',
      'She went deeper, so the change is negative. -55 - (-15) = -55 + 15 = -40.'
    ),
    st: buildDifficultQ(
      'A student exploring the marine sanctuary of Higatangan Island swims at a depth of 5 meters below sea level. She then dives deeper down to look at a sea turtle at 28 meters below sea level. What is her change in position when you subtract her starting depth from her final deeper depth?',
      -28, -5, -23,
      'Not Quite!',
      'She went deeper, so the change is negative. -28 - (-5) = -28 + 5 = -23.'
    ),
  },
  {
    ft: buildDifficultQ(
      'During a laboratory experiment at Almeria National High School, students cooled a sugar solution down to -18\u00B0C. They packed it in dry ice until it froze further down to -62\u00B0C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?',
      -62, -18, -44,
      'Not Quite!',
      'The solution got colder, so the change is negative. -62 - (-18) = -62 + 18 = -44.'
    ),
    st: buildDifficultQ(
      'During a laboratory experiment at Almeria National High School, students cooled a sugar solution down to -9\u00B0C. They packed it in dry ice until it froze further down to -31\u00B0C. What is the change in temperature when you subtract the initial temperature from the final colder temperature?',
      -31, -9, -22,
      'Not Quite!',
      'The solution got colder, so the change is negative. -31 - (-9) = -31 + 9 = -22.'
    ),
  },
  {
    ft: buildDifficultQ(
      'A boatman near a small pier in Maripipi lowers a metal weight to 24 meters below sea level. He then lets out more line, dropping the weight down to a reef at 88 meters below sea level. What is the change in the weight\'s position when you subtract its starting position from its final deeper position?',
      -88, -24, -64,
      'Oops! Try Again!',
      'The weight went deeper, so the change is negative. -88 - (-24) = -88 + 24 = -64.'
    ),
    st: buildDifficultQ(
      'A boatman near a small pier in Maripipi lowers a metal weight to 12 meters below sea level. He then lets out more line, dropping the weight down to a reef at 35 meters below sea level. What is the change in the weight\'s position when you subtract its starting position from its final deeper position?',
      -35, -12, -23,
      'Oops! Try Again!',
      'The weight went deeper, so the change is negative. -35 - (-12) = -35 + 12 = -23.'
    ),
  },
];

// ── Difficult pair data (5 conditions, 5 pairs each) ──
const difficultPairData: A3QuestionPair[][] = [diffC1, diffC2, diffC3, diffC4, diffC5];

// ── Pick 1 random pair from each condition ──
export function pickDifficultPairs(): A3QuestionPair[] {
  const result: A3QuestionPair[] = [];
  for (let c = 0; c < 5; c++) {
    const condition = difficultPairData[c];
    const idx = Math.floor(Math.random() * condition.length);
    result.push(condition[idx]);
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
