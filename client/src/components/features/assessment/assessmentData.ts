import item3a from '../../../assets/assessment_items_images/item_3_option_a.png';
import item3b from '../../../assets/assessment_items_images/item_3_option_b.png';
import item3c from '../../../assets/assessment_items_images/item_3_option_c.png';
import item3d from '../../../assets/assessment_items_images/item_3_option_d.png';
import item5a from '../../../assets/assessment_items_images/item_5_option_a.png';
import item5b from '../../../assets/assessment_items_images/item_5_option_b.png';
import item5c from '../../../assets/assessment_items_images/item_5_option_c.png';
import item5d from '../../../assets/assessment_items_images/item_5_option_d.png';
import item6NumberLine from '../../../assets/assessment_items_images/item_6_number_line_reference.png';

export interface AssessmentQuestion {
  id: number;
  type: 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  answer: string | number; // For multiple-choice, it's the index (0-3). For short-answer, it's the text.
  imageUrl?: string;
  optionImages?: string[]; // Image URL per option (picture choices)
  questionVisual?: {
    type: 'chips' | 'numberline';
    data: any;
  };
  optionVisuals?: {
    type: 'chips' | 'numberline';
    data: any[];
  };
}

export const assessmentData: AssessmentQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Anton has 20 negative chips on his table. He took away the 9 negative chips. Which number sentence best describes the situation above?',
    options: ['(-20) – (-9) = N', '(-20) + (-9) = N', '20 - 9 = N', '20 + 9 = N'],
    answer: 0
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Edgar placed 10 positive chips on the table. Ella, her friend, took away 4 positive chips. How many positive chips were left on the table?',
    options: ['6', '40', '8', '14'],
    answer: 0
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'How will you visualize (-3) – 10 using integer chip?',
    options: ['A', 'B', 'C', 'D'],
    optionImages: [item3a, item3b, item3c, item3d],
    answer: 0
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'On the number line, you moved 3 units to the right from zero. From there, you moved again 5 units to the left. In what integer are you now?',
    options: ['-2', '+2', '+8', '-8'],
    answer: 0
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Which number line correctly models the subtraction problem: 3 - (-4) = 7?',
    options: ['A', 'B', 'C', 'D'],
    optionImages: [item5a, item5b, item5c, item5d],
    answer: 2
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'Look at the number line below. Which integer subtraction problem does this number line correctly model?',
    options: ['4 - 5 = - 1', '-1- 5 = - 6', '4 - (-5) = 9', '-1 - (-5) = 4'],
    imageUrl: item6NumberLine,
    answer: 1
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'Using the Keep-Change-Change rule, how should you rewrite the subtraction expression -15 - (-8) as an addition problem?',
    options: ['-15+(-8)', '15+8', '-15+8', '15+(-8)'],
    answer: 2
  },
  {
    id: 8,
    type: 'short-answer',
    question: 'Apply the KCC rule to the expression -9 - 14. Write down the newly transformed addition expression',
    answer: '-9 + -14'
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'Use the Keep-Change-Change rule to rewrite and solve this expression: 12 - (-20).',
    options: ['12 + 20', '-12 + 20', '12 + (-20)', '-12 + (-20)'],
    answer: 0
  },
  {
    id: 10,
    type: 'short-answer',
    question: '20 – ( -4) = ?',
    answer: '24'
  },
  {
    id: 11,
    type: 'short-answer',
    question: '-35 – 15 = ?',
    answer: '-50'
  },
  {
    id: 12,
    type: 'short-answer',
    question: '-11 – ( -11) = ?',
    answer: '0'
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'A delivery driver in Naval has a refrigerated box set at -6°C. He lowers the dial to make it colder for fresh fish, dropping the temperature by another 12°C. Which expression correctly shows the final temperature?',
    options: ['-6-12 =- 18°C', '-6-(-12) = 6°C', '6-12 =- 6°C', '-6+12= 6°C'],
    answer: 0
  },
  {
    id: 14,
    type: 'multiple-choice',
    question: 'An anchor rope on a boat in Maripipi is dropped so that the metal weight hangs at 5 meters below sea level. The boatman lets out more chain, and the anchor drops all the way down to a deep reef at 23 meters below sea level. What is the total change in position when you subtract the starting position from the final deeper position?',
    options: ['-23-(-5) = -18 meters', '-5-(-23) = 18 meters', '-23 -5 = -28 meters', '-5-23 =- 28 meters'],
    answer: 0
  },
  {
    id: 15,
    type: 'short-answer',
    question: 'The Caibiran Farmers Cooperative has 12 boxes of ripe bananas in stock. Caibiran National High School needs 60 boxes for a community feeding program. If the cooperative gives all 12 boxes, how much more do they need to give to the local school?',
    answer: '-48'
  }
];
