import { STEMQuestion } from '@/types/game';

export const questionBank: STEMQuestion[] = [
  // Math Questions - Grade 6-8
  {
    id: 'math_1',
    question: 'What is 15% of 80?',
    options: ['10', '12', '14', '16'],
    correctAnswer: 1,
    subject: 'math',
    difficulty: 'grade6-8',
    explanation: '15% of 80 = 0.15 × 80 = 12'
  },
  {
    id: 'math_2',
    question: 'If a triangle has angles of 45° and 60°, what is the third angle?',
    options: ['75°', '85°', '90°', '95°'],
    correctAnswer: 0,
    subject: 'math',
    difficulty: 'grade6-8',
    explanation: 'The sum of angles in a triangle is 180°. So 180° - 45° - 60° = 75°'
  },
  {
    id: 'math_3',
    question: 'What is the area of a circle with radius 4 units? (Use π ≈ 3.14)',
    options: ['25.12', '50.24', '75.36', '100.48'],
    correctAnswer: 1,
    subject: 'math',
    difficulty: 'grade9-10',
    explanation: 'Area = πr² = 3.14 × 4² = 3.14 × 16 = 50.24 square units'
  },
  
  // Science Questions
  {
    id: 'science_1',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    subject: 'science',
    difficulty: 'grade6-8',
    explanation: 'Au comes from the Latin word "aurum" meaning gold'
  },
  {
    id: 'science_2',
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Earth', 'Mars'],
    correctAnswer: 1,
    subject: 'science',
    difficulty: 'grade6-8',
    explanation: 'Mercury is the innermost planet in our solar system'
  },
  {
    id: 'science_3',
    question: 'What is the speed of light in a vacuum?',
    options: ['299,792,458 m/s', '300,000,000 m/s', '299,000,000 m/s', '301,000,000 m/s'],
    correctAnswer: 0,
    subject: 'science',
    difficulty: 'grade11-12',
    explanation: 'The exact speed of light in vacuum is 299,792,458 meters per second'
  },

  // Technology Questions
  {
    id: 'tech_1',
    question: 'What does "HTML" stand for?',
    options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'HyperText Making Language'],
    correctAnswer: 0,
    subject: 'technology',
    difficulty: 'grade6-8',
    explanation: 'HTML stands for HyperText Markup Language, used to create web pages'
  },
  {
    id: 'tech_2',
    question: 'Which of these is a programming language?',
    options: ['HTTP', 'Python', 'HTML', 'CSS'],
    correctAnswer: 1,
    subject: 'technology',
    difficulty: 'grade9-10',
    explanation: 'Python is a high-level programming language used for various applications'
  },

  // Engineering Questions
  {
    id: 'eng_1',
    question: 'What type of bridge uses cables hung from towers to support the deck?',
    options: ['Arch bridge', 'Suspension bridge', 'Beam bridge', 'Truss bridge'],
    correctAnswer: 1,
    subject: 'engineering',
    difficulty: 'grade6-8',
    explanation: 'Suspension bridges use cables hung from towers to support the bridge deck'
  },
  {
    id: 'eng_2',
    question: 'Which material has the highest tensile strength?',
    options: ['Steel', 'Aluminum', 'Carbon fiber', 'Titanium'],
    correctAnswer: 2,
    subject: 'engineering',
    difficulty: 'grade11-12',
    explanation: 'Carbon fiber has exceptional tensile strength, even higher than steel'
  }
];

export function getRandomQuestion(excludeIds: string[] = []): STEMQuestion {
  const availableQuestions = questionBank.filter(q => !excludeIds.includes(q.id));
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}

export function getQuestionsBySubject(subject: STEMQuestion['subject']): STEMQuestion[] {
  return questionBank.filter(q => q.subject === subject);
}

export function getQuestionsByDifficulty(difficulty: STEMQuestion['difficulty']): STEMQuestion[] {
  return questionBank.filter(q => q.difficulty === difficulty);
}