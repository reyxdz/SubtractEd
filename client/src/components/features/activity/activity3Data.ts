// Activity 3 Question Data

export type Difficulty = 'easy' | 'moderate' | 'difficult';

export interface A3Question {
  question: string;
  sentence: string;
  minuend: number;
  subtrahend: number;
  answer: number;
  newSentence: string; // canonical: e.g. "10 + (-3)"
  hint?: string;
  errorTitle: string;
  errorMessage: string;
  rememberText: string;
  fixItText: string;
}

export const activity3Questions: Record<Difficulty, A3Question[]> = {
  easy: [
    {
      question: 'You have 10 items. You gave away 3 items.\nHow many items do you have left?',
      sentence: '10 − 3',
      minuend: 10, subtrahend: 3, answer: 7,
      newSentence: '10 + (-3)',
      hint: 'Remember to subtract the smaller number from the bigger one.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'You need to subtract 3 from 10. Try again!',
      rememberText: 'When we KEEP the minuend, we keep the first number exactly as it is.',
      fixItText: 'Start with 10 − 3. Keep the 10, change minus to plus, change 3 to −3.'
    },
    {
      question: 'You have 7 apples. You gave away 5 apples.\nHow many apples do you have left?',
      sentence: '7 − 5',
      minuend: 7, subtrahend: 5, answer: 2,
      newSentence: '7 + (-5)',
      hint: 'Subtract the second number from the first.',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'Remember, 7 − 5 is the operation you\'re trying to solve. Try again!',
      rememberText: 'When we CHANGE the operation, we change the minus (−) to a plus (+).',
      fixItText: 'Start with 7 − 5. What should the minus sign change to? It should change to plus (+).'
    },
    {
      question: 'You have 4 oranges. You gave away 8 oranges.\nHow many oranges do you have left?',
      sentence: '4 − 8',
      minuend: 4, subtrahend: 8, answer: -4,
      newSentence: '4 + (-8)',
      hint: 'When the minuend is smaller, the result will be negative.',
      errorTitle: 'Oops! Looks like you missed the sign.',
      errorMessage: 'Try again and remember, the result will be negative!',
      rememberText: 'When the first number is smaller than the second, the answer is negative.',
      fixItText: 'Start with 4 − 8. After KCC: 4 + (−8). Since 8 > 4, the result is negative.'
    },
    {
      question: 'You have 3 pencils. You gave away 5 pencils.\nHow many pencils do you have left?',
      sentence: '3 − 5',
      minuend: 3, subtrahend: 5, answer: -2,
      newSentence: '3 + (-5)',
      hint: 'A smaller number minus a bigger one will result in a negative number.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a larger number from a smaller one, you get a negative result. Try again!',
      rememberText: 'When we CHANGE the sign of the subtrahend, we flip its sign (positive becomes negative).',
      fixItText: 'Start with 3 − 5. Keep 3, change − to +, change 5 to −5. Answer: 3 + (−5) = −2.'
    },
    {
      question: 'You have 2 candies. You gave away 6 candies.\nHow many candies do you have left?',
      sentence: '2 − 6',
      minuend: 2, subtrahend: 6, answer: -4,
      newSentence: '2 + (-6)',
      hint: 'Always check if the second number is larger. You\'ll get a negative result.',
      errorTitle: 'Oops!',
      errorMessage: 'Remember to think about the negative result when the second number is larger. Try again!',
      rememberText: 'When the subtrahend is larger, the result is always negative.',
      fixItText: 'Start with 2 − 6. After KCC: 2 + (−6). The answer is −4.'
    }
  ],
  moderate: [
    {
      question: 'You owe 15 pesos. You paid 8 pesos.\nHow much do you still owe?',
      sentence: '−15 − (−8)',
      minuend: -15, subtrahend: -8, answer: -7,
      newSentence: '-15 + 8',
      hint: 'Think of subtracting a negative number as adding the positive value.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a negative number, remember to add its positive counterpart. Try again!',
      rememberText: 'When we CHANGE the operation, we change the minus (−) to a plus (+).',
      fixItText: 'Start with −15 − (−8). Keep −15, change − to +, change −8 to 8. Result: −15 + 8 = −7.'
    },
    {
      question: 'You owe 10 pesos. You paid 6 pesos.\nHow much do you still owe?',
      sentence: '−10 − (−6)',
      minuend: -10, subtrahend: -6, answer: -4,
      newSentence: '-10 + 6',
      hint: 'Since the minuend is smaller than the subtrahend, expect a positive result after subtraction.',
      errorTitle: 'Oops! Looks like you missed the result\'s sign.',
      errorMessage: 'When subtracting a larger negative number, you get a positive result. Try again!',
      rememberText: 'When we CHANGE the sign of the subtrahend, a negative becomes positive.',
      fixItText: 'Start with −10 − (−6). After KCC: −10 + 6 = −4.'
    },
    {
      question: 'You owe 20 pesos. You paid 15 pesos.\nHow much do you still owe?',
      sentence: '−20 − (−15)',
      minuend: -20, subtrahend: -15, answer: -5,
      newSentence: '-20 + 15',
      hint: 'A smaller number minus a larger negative number will result in a positive number.',
      errorTitle: 'Oops!',
      errorMessage: 'Remember, when the second number is larger, the result will be positive. Try again!',
      rememberText: 'Subtracting a negative is the same as adding a positive.',
      fixItText: 'Start with −20 − (−15). After KCC: −20 + 15 = −5.'
    },
    {
      question: 'You owe 25 pesos. You paid 5 pesos.\nHow much do you still owe?',
      sentence: '−25 − (−5)',
      minuend: -25, subtrahend: -5, answer: -20,
      newSentence: '-25 + 5',
      hint: 'When subtracting a negative number, remember to add the absolute value.',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'You need to add the absolute value when subtracting a negative number. Try again!',
      rememberText: 'When we CHANGE the sign of the subtrahend, −5 becomes +5.',
      fixItText: 'Start with −25 − (−5). After KCC: −25 + 5 = −20.'
    },
    {
      question: 'You owe 30 pesos. You paid 12 pesos.\nHow much do you still owe?',
      sentence: '−30 − (−12)',
      minuend: -30, subtrahend: -12, answer: -18,
      newSentence: '-30 + 12',
      hint: 'When subtracting a negative number, you actually add the absolute value.',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a negative number, remember to add the absolute value. Try again!',
      rememberText: 'KEEP-CHANGE-CHANGE: Keep −30, change − to +, change −12 to 12.',
      fixItText: 'Start with −30 − (−12). After KCC: −30 + 12 = −18.'
    }
  ],
  difficult: [
    {
      question: 'You have 15 pesos. You owe 6 pesos.\nHow much money do you have now?',
      sentence: '15 − (−6)',
      minuend: 15, subtrahend: -6, answer: 21,
      newSentence: '15 + 6',
      errorTitle: 'Not Quite! Let\'s Try Again!',
      errorMessage: 'When subtracting a negative number, you need to add its absolute value. Try again!',
      rememberText: 'Subtracting a negative is the same as adding a positive.',
      fixItText: 'Start with 15 − (−6). After KCC: 15 + 6 = 21.'
    },
    {
      question: 'You owe 100 pesos. You have 150 pesos.\nHow much do you have left?',
      sentence: '−100 − 150',
      minuend: -100, subtrahend: 150, answer: -250,
      newSentence: '-100 + (-150)',
      errorTitle: 'Oops! Almost there!',
      errorMessage: 'Remember, subtracting a positive number from a negative number makes the result more negative. Try again!',
      rememberText: 'When subtracting a positive from a negative, the result goes further negative.',
      fixItText: 'Start with −100 − 150. After KCC: −100 + (−150) = −250.'
    },
    {
      question: 'You owe 300 pesos. You have 500 pesos.\nHow much do you have left?',
      sentence: '−300 − 500',
      minuend: -300, subtrahend: 500, answer: -800,
      newSentence: '-300 + (-500)',
      errorTitle: 'Oops! Looks like you missed the sign.',
      errorMessage: 'Subtracting a positive number from a negative one results in a more negative value. Try again!',
      rememberText: 'A negative minus a positive always results in a more negative value.',
      fixItText: 'Start with −300 − 500. After KCC: −300 + (−500) = −800.'
    },
    {
      question: 'You owe 1,000 pesos. You have 2,500 pesos.\nHow much do you have left?',
      sentence: '−1000 − 2500',
      minuend: -1000, subtrahend: 2500, answer: -3500,
      newSentence: '-1000 + (-2500)',
      errorTitle: 'Oops!',
      errorMessage: 'You need to remember that subtracting a larger positive number from a negative results in a more negative outcome. Try again!',
      rememberText: 'When the subtrahend is positive, changing its sign makes it negative in the new sentence.',
      fixItText: 'Start with −1000 − 2500. After KCC: −1000 + (−2500) = −3500.'
    },
    {
      question: 'You owe 800 pesos. You have 1,200 pesos.\nHow much do you have left?',
      sentence: '−800 − 1200',
      minuend: -800, subtrahend: 1200, answer: -2000,
      newSentence: '-800 + (-1200)',
      errorTitle: 'Not quite! Let\'s try again.',
      errorMessage: 'When subtracting a larger positive number from a negative number, the result becomes more negative. Try again!',
      rememberText: 'KEEP-CHANGE-CHANGE always works: Keep, change operation, change sign.',
      fixItText: 'Start with −800 − 1200. After KCC: −800 + (−1200) = −2000.'
    }
  ]
};
