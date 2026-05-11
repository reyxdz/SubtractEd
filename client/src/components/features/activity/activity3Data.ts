// Activity 3 Question Data — Revised with Filipino-context questions

export type Difficulty = 'easy' | 'moderate' | 'difficult';

export interface A3Question {
  question: string;
  sentence: string;          // e.g. "10 − 3"
  minuend: number;
  subtrahend: number;
  answer: number;
  newSentence: string;       // canonical: e.g. "10 + (-3)"
  /** Expected values for the 3 colored input boxes */
  expectedKeep: string;      // green box — kept minuend
  expectedOp: string;        // blue box  — always "+"
  expectedChange: string;    // yellow box — flipped subtrahend
  hint?: string;
  errorTitle: string;
  errorMessage: string;
}

export const activity3Questions: Record<Difficulty, A3Question[]> = {
  easy: [
    {
      question: 'You have 10 pesos. You bought one isaw for 3 pesos. How much is left?',
      sentence: '10 − 3 = ?',
      minuend: 10, subtrahend: 3, answer: 7,
      newSentence: '10 + (-3)',
      expectedKeep: '10', expectedOp: '+', expectedChange: '-3',
      hint: 'Remember to subtract the smaller number from the bigger one.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'You need to subtract 3 from 10. Try again!'
    },
    {
      question: 'A Jeepney has 7 passengers. 5 people got off at the plaza. How many remain?',
      sentence: '7 − 5 = ?',
      minuend: 7, subtrahend: 5, answer: 2,
      newSentence: '7 + (-5)',
      expectedKeep: '7', expectedOp: '+', expectedChange: '-5',
      hint: 'Subtract the second number from the first.',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'Remember, 7 − 5 is the operation you\'re trying to solve. Try again!'
    },
    {
      question: 'You have 4 pesos, but a pack of Clover chips costs 8 pesos. If you pay what you have, how much do you still owe?',
      sentence: '4 − 8 = ?',
      minuend: 4, subtrahend: 8, answer: -4,
      newSentence: '4 + (-8)',
      expectedKeep: '4', expectedOp: '+', expectedChange: '-8',
      hint: 'When the minuend is smaller, the result will be negative (debt).',
      errorTitle: 'Oops! Looks like you missed the sign.',
      errorMessage: 'Try again and remember, the result will be negative!'
    },
    {
      question: 'A street vendor has 3 ripe mangoes. A customer wants to buy 5. How many more mangoes does the vendor need?',
      sentence: '3 − 5 = ?',
      minuend: 3, subtrahend: 5, answer: -2,
      newSentence: '3 + (-5)',
      expectedKeep: '3', expectedOp: '+', expectedChange: '-5',
      hint: 'A smaller number minus a bigger one will result in a negative number.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a larger number from a smaller one, you get a negative result. Try again!'
    },
    {
      question: 'You have 2 load credits. You sent a promo text worth 6 credits. What is your new balance?',
      sentence: '2 − 6 = ?',
      minuend: 2, subtrahend: 6, answer: -4,
      newSentence: '2 + (-6)',
      expectedKeep: '2', expectedOp: '+', expectedChange: '-6',
      hint: 'Always check if the second number is larger. You\'ll get a negative result.',
      errorTitle: 'Oops!',
      errorMessage: 'Remember to think about the negative result when the second number is larger. Try again!'
    }
  ],
  moderate: [
    {
      question: 'You owe the canteen 15 pesos. The owner gives you an 8-peso discount. What is your remaining debt?',
      sentence: '−15 − (−8) = ?',
      minuend: -15, subtrahend: -8, answer: -7,
      newSentence: '-15 + 8',
      expectedKeep: '-15', expectedOp: '+', expectedChange: '8',
      hint: 'Think of subtracting a negative number (removing debt) as adding the positive value.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a negative number, remember to add its positive counterpart. Try again!'
    },
    {
      question: 'You owe a friend 10 pesos. You returned 6 pesos today. How much do you still owe?',
      sentence: '−10 − (−6) = ?',
      minuend: -10, subtrahend: -6, answer: -4,
      newSentence: '-10 + 6',
      expectedKeep: '-10', expectedOp: '+', expectedChange: '6',
      hint: 'Subtracting a negative means you are moving closer to zero from a negative start.',
      errorTitle: 'Oops! Looks like you missed the result\'s sign.',
      errorMessage: 'When subtracting a negative number from a negative, the value becomes less negative. Try again!'
    },
    {
      question: 'A vendor has a 20-peso loss. After a small sale, the loss is reduced by 15 pesos. What is the final loss?',
      sentence: '−20 − (−15) = ?',
      minuend: -20, subtrahend: -15, answer: -5,
      newSentence: '-20 + 15',
      expectedKeep: '-20', expectedOp: '+', expectedChange: '15',
      hint: 'Removing a larger debt value from a smaller one keeps the result negative but closer to zero.',
      errorTitle: 'Oops!',
      errorMessage: 'Remember, you are reducing the debt. The result should be less negative. Try again!'
    },
    {
      question: 'A basket of calamansi is 25 grams underweight. You add 5 grams. How far from the target weight is it now?',
      sentence: '−25 − (−5) = ?',
      minuend: -25, subtrahend: -5, answer: -20,
      newSentence: '-25 + 5',
      expectedKeep: '-25', expectedOp: '+', expectedChange: '5',
      hint: 'When subtracting a negative number, remember to add the absolute value.',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'You need to add the value when "subtracting" a negative. Try again!'
    },
    {
      question: 'You have 30 pesos debt in GCash. You refund a 12-peso error. What is your balance?',
      sentence: '−30 − (−12) = ?',
      minuend: -30, subtrahend: -12, answer: -18,
      newSentence: '-30 + 12',
      expectedKeep: '-30', expectedOp: '+', expectedChange: '12',
      hint: 'When subtracting a negative number, you actually add the absolute value.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a negative number, remember to add. Try again!'
    }
  ],
  difficult: [
    {
      question: 'Your game score is 15. The leader removes your 6-point penalty. What is your new score?',
      sentence: '15 − (−6) = ?',
      minuend: 15, subtrahend: -6, answer: 21,
      newSentence: '15 + 6',
      expectedKeep: '15', expectedOp: '+', expectedChange: '6',
      hint: 'Subtracting a negative is like adding. Removing a penalty makes your score higher.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'Taking away a penalty is a good thing! It makes your score go up. Try again!'
    },
    {
      question: 'A tricycle driver owes 100 pesos for gas. He then borrows 150 pesos more for lunch. What is his total debt?',
      sentence: '−100 − 150 = ?',
      minuend: -100, subtrahend: 150, answer: -250,
      newSentence: '-100 + (-150)',
      expectedKeep: '-100', expectedOp: '+', expectedChange: '-150',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'Remember, subtracting a positive number from a negative number makes the result more negative. Try again!'
    },
    {
      question: 'A student owes 300 pesos for a class t-shirt and another 500 pesos for a field trip. What is the total "utang"?',
      sentence: '−300 − 500 = ?',
      minuend: -300, subtrahend: 500, answer: -800,
      newSentence: '-300 + (-500)',
      expectedKeep: '-300', expectedOp: '+', expectedChange: '-500',
      errorTitle: 'Oops! Looks like you missed the sign.',
      errorMessage: 'Subtracting a positive number from a negative one results in a more negative value. Try again!'
    },
    {
      question: 'A farmer has a loan of 1,000 pesos. He takes an additional loan of 2,500 pesos for seeds. How much is his total loan?',
      sentence: '−1000 − 2500 = ?',
      minuend: -1000, subtrahend: 2500, answer: -3500,
      newSentence: '-1000 + (-2500)',
      expectedKeep: '-1000', expectedOp: '+', expectedChange: '-2500',
      errorTitle: 'Oops!',
      errorMessage: 'You need to remember that subtracting a positive number from a negative results in a more negative outcome. Try again!'
    },
    {
      question: 'A sari-sari store\'s loss is 800. If they spend another 1,200 on repairs, what is the total loss?',
      sentence: '−800 − 1200 = ?',
      minuend: -800, subtrahend: 1200, answer: -2000,
      newSentence: '-800 + (-1200)',
      expectedKeep: '-800', expectedOp: '+', expectedChange: '-1200',
      errorTitle: 'Not quite! Let\'s try again.',
      errorMessage: 'When subtracting a positive number from a negative number, the result becomes more negative. Try again!'
    }
  ]
};
