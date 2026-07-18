import type { PracticeTest } from "./types";

const test: PracticeTest = {
  id: "sat-practice-1",
  title: "SAT Practice Test 1",
  description: "A 15-question sample SAT-style practice test covering math and reading & writing.",
  subject: "SAT Mixed",
  difficulty: "Mixed",
  durationSeconds: 1200,
  order: 1,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "If 3x + 5 = 20, what is the value of x?",
      choices: { A: "3", B: "5", C: "15", D: "25" },
      correctAnswer: "B",
    },
    {
      id: "q2",
      prompt: 'Which word is closest in meaning to "meticulous"?',
      choices: { A: "Careless", B: "Thorough", C: "Rapid", D: "Loud" },
      correctAnswer: "B",
    },
    {
      id: "q3",
      prompt: "What is 15% of 200?",
      choices: { A: "15", B: "20", C: "30", D: "45" },
      correctAnswer: "C",
    },
    {
      id: "q4",
      prompt: "Choose the correctly punctuated sentence.",
      choices: {
        A: "Its raining outside.",
        B: "It's raining outside.",
        C: "Its' raining outside.",
        D: "It is raining, outside.",
      },
      correctAnswer: "B",
    },
    {
      id: "q5",
      prompt: "If f(x) = 2x^2 - 3, what is f(4)?",
      choices: { A: "13", B: "29", C: "32", D: "5" },
      correctAnswer: "B",
    },
    {
      id: "q6",
      prompt: 'Which of the following is a synonym for "benevolent"?',
      choices: { A: "Cruel", B: "Kind", C: "Rude", D: "Stubborn" },
      correctAnswer: "B",
    },
    {
      id: "q7",
      prompt: "Solve for y: 4y - 8 = 12",
      choices: { A: "3", B: "4", C: "5", D: "6" },
      correctAnswer: "C",
    },
    {
      id: "q8",
      prompt: "The primary purpose of a topic sentence is to:",
      choices: {
        A: "Conclude a paragraph",
        B: "Introduce the main idea",
        C: "Provide a quote",
        D: "Add a transition",
      },
      correctAnswer: "B",
    },
    {
      id: "q9",
      prompt: "What is the slope of the line y = -3x + 7?",
      choices: { A: "7", B: "-3", C: "3", D: "-7" },
      correctAnswer: "B",
    },
    {
      id: "q10",
      prompt: 'Choose the best transition: "She studied hard; ___, she passed."',
      choices: { A: "however", B: "therefore", C: "meanwhile", D: "nevertheless" },
      correctAnswer: "B",
    },
    {
      id: "q11",
      prompt: "A rectangle has length 8 and width 5. What is its area?",
      choices: { A: "13", B: "26", C: "40", D: "45" },
      correctAnswer: "C",
    },
    {
      id: "q12",
      prompt: "Which sentence uses parallel structure correctly?",
      choices: {
        A: "She likes hiking, swimming, and to bike.",
        B: "She likes to hike, swim, and biking.",
        C: "She likes hiking, swimming, and biking.",
        D: "She likes hike, swim, and bike.",
      },
      correctAnswer: "C",
    },
    {
      id: "q13",
      prompt: "If x/4 = 9, then x =",
      choices: { A: "13", B: "36", C: "5", D: "2.25" },
      correctAnswer: "B",
    },
    {
      id: "q14",
      prompt: 'Which word best completes the sentence: "The evidence was ___, leaving no room for doubt."',
      choices: { A: "ambiguous", B: "compelling", C: "trivial", D: "obscure" },
      correctAnswer: "B",
    },
    {
      id: "q15",
      prompt: "The average of 4, 8, and x is 10. What is x?",
      choices: { A: "10", B: "14", C: "18", D: "22" },
      correctAnswer: "C",
    },
  ],
};

export default test;
