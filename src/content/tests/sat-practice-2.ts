import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-2",
  title: "SAT Algebra Practice 2",
  description: "A 15-question sample SAT-style practice test the Algebra topics learned today",
  subject: "SAT Math",
  difficulty: "Medium",
  durationSeconds: 1200,
  order: 2,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "Which of the following points (x, y) satisfies the inequality 3x - 2y > 6?",
      choices: { A: "(0, 0)", B: "(2, 0)", C: "(4, 1)", D: "(2, -2)" },
      correctAnswer: "C",
    },
    {
      id: "q2",
      prompt: "A system of two linear equations is given by 2x + 5y = 20 and 4x + ky = 40, where k is a constant. For which value of k does the system have infinitely many solutions?",
      choices: { A: "5", B: "8", C: "10", D: "20" },
      correctAnswer: "C",
    },
    {
      id: "q3",
      prompt: "If x² - 9 = 0 and x < 0, what is the value of x?",
      choices: { A: "-9", B: "-3", C: "3", D: "9" },
      correctAnswer: "B",
    },
    {
      id: "q4",
      prompt: "The function f is defined by f(x) = 2x² - 3x + 1. What is the value of f(-2)?",
      choices: { A: "3", B: "9", C: "15", D: "19" },
      correctAnswer: "C",
    },
    {
      id: "q5",
      prompt: "|2x - 5| = 9. What is the sum of all possible values of x?",
      choices: { A: "-2", B: "0", C: "5", D: "9" },
      correctAnswer: "C",
    },
    {
      id: "q6",
      prompt: "Which of the following is equivalent to (3x - 2)(x + 4)?",
      choices: { A: "3x² + 10x - 8", B: "3x² - 10x - 8", C: "3x² + 2x - 8", D: "3x² - 2x + 8" },
      correctAnswer: "A",
    },
    {
      id: "q7",
      prompt: "If 5(2x - 1) - 3 = 2(3x + 4), what is the value of x?",
      choices: { A: "2", B: "3", C: "4", D: "5" },
      correctAnswer: "C",
    },
    {
      id: "q8",
      prompt: "For what value of x is the equation 3(x + 4)/2 = x + 9 true?",
      choices: { A: "0", B: "3", C: "6", D: "9" },
      correctAnswer: "C",
    },
    {
      id: "q9",
      prompt: "A vending machine snack costs $2, and a delivery fee of $5 is charged per order regardless of how many snacks are purchased. If Jordan wants to spend no more than $25 on an order, what is the maximum number of snacks he can buy?",
      choices: { A: "8", B: "9", C: "10", D: "12" },
      correctAnswer: "C",
    },
    {
      id: "q10",
      prompt: "If x²- 6x + 8 = 0, what are the two solutions for x?",
      choices: { A: "2 and 4", B: "-2 and -4", C: "1 and 8", D: "2 and -4" },
      correctAnswer: "A",
    },
    {
      id: "q11",
      prompt: "Which inequality represents all values of x for which 4x - 7 ≥ 2x + 9?",
      choices: { A: "x ≥ -8", B: "x ≥ 1", C: "x ≥ 8", D: "x ≤ 8" },
      correctAnswer: "C",
    },
    {
      id: "q12",
      prompt: "The function g is defined by g(x) = (x - 3)(x + 5). For what value(s) of x does g(x) = 0?",
      choices: { A: "x = 3 only", B: "x = -5 only", C: "x = 3 or x = -5", D: "x = -3 or x = 5" },
      correctAnswer: "C",
    },
    {
      id: "q13",
      prompt: "If 2^(x+1) = 32, what is the value of x?",
      choices: { A: "3", B: "4", C: "5", D: "6" },
      correctAnswer: "B",
    },
    {
      id: "q14",
      prompt: "A car rental company charges an initial fee plus a fixed rate per mile driven. A 50-mile trip costs $45, and a 120-mile trip costs $80. What is the cost per mile, in dollars?",
      choices: { A: "$0.35", B: "$0.50", C: "$0.65", D: "$0.75" },
      correctAnswer: "B",
    },
    {
      id: "q15",
      prompt: "If f(x) = 3x - 4 and g(x) = x² + 1, what is the value of f(g(2))?",
      choices: { A: "5", B: "11", C: "13", D: "15" },
      correctAnswer: "B",
    },
  ],
};
export default test;
