import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-3",
  title: "SAT Advanced Math Practice",
  description: "A 15-question practice test covering equivalent expressions, exponent rules, and factoring from Day 3",
  subject: "SAT Math",
  difficulty: "Medium",
  durationSeconds: 1200,
  order: 3,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "f(x) = 12x² - 5x + 8 and g(x) = 4x² + 9x - 15. If h(x) = f(x) + g(x), what is h(4)?",
      choices: { A: "265", B: "249", C: "281", D: "233" },
      correctAnswer: "A",
    },
    {
      id: "q2",
      prompt: "A triangular garden has side lengths 15x³, 6x³, and 7x². Which expression represents the perimeter of the garden?",
      choices: { A: "21x³ + 7x²", B: "21x⁶ + 7x²", C: "28x³ + 7x²", D: "21x³ + 13x²" },
      correctAnswer: "A",
    },
    {
      id: "q3",
      prompt: "(ax + 4)(3x² - bx + 5) = 18x³ - 6x² + 18x + 20, where a and b are constants. What is the value of ab?",
      choices: { A: "12", B: "15", C: "18", D: "24" },
      correctAnswer: "C",
    },
    {
      id: "q4",
      prompt: "(2x - 3)(x + 5) = 2x² + bx - 15, where b is a constant. What is the value of b?",
      choices: { A: "7", B: "-7", C: "13", D: "-13" },
      correctAnswer: "A",
    },
    {
      id: "q5",
      prompt: "f(x) = 3x² + 2x - 1 and g(x) = x² - 4x + 6. If h(x) = f(x) - g(x), what is h(-2)?",
      choices: { A: "-11", B: "-3", C: "11", D: "19" },
      correctAnswer: "A",
    },
    {
      id: "q6",
      prompt: "Which expression is equivalent to b^(4/5)?",
      choices: { A: "⁵√(b⁴)", B: "⁴√(b⁵)", C: "(√b)^(4/5)", D: "b^(5/4)" },
      correctAnswer: "A",
    },
    {
      id: "q7",
      prompt: "Which expression is equivalent to (x^(2/3))^(3/2)?",
      choices: { A: "x", B: "x^(4/9)", C: "x^(9/4)", D: "x²" },
      correctAnswer: "A",
    },
    {
      id: "q8",
      prompt: "If 3^(2x+1) = 81, what is the value of x?",
      choices: { A: "1", B: "1.5", C: "2", D: "3" },
      correctAnswer: "B",
    },
    {
      id: "q9",
      prompt: "Which expression is equivalent to the cube root of x⁵?",
      choices: { A: "x^(5/3)", B: "x^(3/5)", C: "x^15", D: "x^8" },
      correctAnswer: "A",
    },
    {
      id: "q10",
      prompt: "Which expression is equivalent to √(4x⁶y²)?",
      choices: { A: "2x³y", B: "4x³y", C: "2x³y²", D: "2x¹²y" },
      correctAnswer: "A",
    },
    {
      id: "q11",
      prompt: "What is the fully factored form of 21x³ + 13x² + 8x?",
      choices: { A: "x(21x² + 13x + 8)", B: "x²(21x + 13 + 8x)", C: "(3x + 4)(7x² + 3x + 2)", D: "x(21x² - 13x + 8)" },
      correctAnswer: "A",
    },
    {
      id: "q12",
      prompt: "What is the fully factored form of x² - 5x - 24?",
      choices: { A: "(x - 8)(x + 3)", B: "(x + 8)(x - 3)", C: "(x - 6)(x + 4)", D: "(x - 4)(x + 6)" },
      correctAnswer: "A",
    },
    {
      id: "q13",
      prompt: "What is the fully factored form of 4x² - 9?",
      choices: { A: "(2x - 3)(2x + 3)", B: "(4x - 3)(x + 3)", C: "(2x - 9)(2x + 1)", D: "(4x + 3)(x - 3)" },
      correctAnswer: "A",
    },
    {
      id: "q14",
      prompt: "What is the fully factored form of 3x³ + 6x² - 24x?",
      choices: { A: "3x(x + 4)(x - 2)", B: "3x(x - 4)(x + 2)", C: "x(3x + 4)(x - 2)", D: "3(x + 4)(x - 2)x²" },
      correctAnswer: "A",
    },
    {
      id: "q15",
      prompt: "If x² + bx + 20 factors as (x + 4)(x + 5), what is the value of b?",
      choices: { A: "9", B: "20", C: "1", D: "-9" },
      correctAnswer: "A",
    },
  ],
};
export default test;
