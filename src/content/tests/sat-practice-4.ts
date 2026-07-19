import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-4",
  title: "SAT Nonlinear Equations & Functions Practice",
  description: "A 15-question practice test covering nonlinear equations in one variable, nonlinear functions, tables, and exponential functions from Day 4",
  subject: "SAT Math",
  difficulty: "Medium",
  durationSeconds: 1200,
  order: 4,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "|x| + 13 = 35. What is the sum of all possible values of x?",
      choices: { A: "22", B: "0", C: "-22", D: "44" },
      correctAnswer: "B",
    },
    {
      id: "q2",
      prompt: "x² + 9 = 90. What is the positive solution to the equation?",
      choices: { A: "36", B: "-9", C: "9", D: "18" },
      correctAnswer: "C",
    },
    {
      id: "q3",
      prompt: "x² + 31 = 200. What is the product of the two solutions?",
      choices: { A: "169", B: "-13", C: "26", D: "-169" },
      correctAnswer: "D",
    },
    {
      id: "q4",
      prompt: "x - 5 = 24/x. What is the positive solution to the equation?",
      choices: { A: "8", B: "-3", C: "5", D: "24" },
      correctAnswer: "A",
    },
    {
      id: "q5",
      prompt: "h(t) = -3t² + 24t + 18. What is the y-coordinate of the y-intercept of the graph of y = h(t)?",
      choices: { A: "24", B: "18", C: "-3", D: "0" },
      correctAnswer: "B",
    },
    {
      id: "q6",
      prompt: "f(x) = 20x² + 10x + 45. What is the value of f(2)?",
      choices: { A: "130", B: "115", C: "145", D: "160" },
      correctAnswer: "C",
    },
    {
      id: "q7",
      prompt: "f(x) = 6x² - 24 and g(x) = 3x² - 12. If h(x) = f(x) + g(x), what is the positive x-coordinate of the x-intercept of y = h(x)?",
      choices: { A: "4", B: "3", C: "6", D: "2" },
      correctAnswer: "D",
    },
    {
      id: "q8",
      prompt: "A quadratic function f is defined by a table of values: f(0) = 5, f(1) = 9, and f(2) = 17. Which equation could define f(x)?",
      choices: { A: "f(x) = 2x² + 2x + 5", B: "f(x) = 2x² + 5", C: "f(x) = x² + 4x + 5", D: "f(x) = 3x² + 5" },
      correctAnswer: "A",
    },
    {
      id: "q9",
      prompt: "f is a quadratic function defined by f(x) = 3x² - 5x + 2, and y = f(x) + 9. What is the y-coordinate of the y-intercept of y?",
      choices: { A: "2", B: "11", C: "9", D: "-5" },
      correctAnswer: "B",
    },
    {
      id: "q10",
      prompt: "The table shows three points on the linear function f, defined by f(x) = ax + b: f(1) = 7, f(3) = 15, f(5) = 23. What is the value of a - b?",
      choices: { A: "4", B: "3", C: "1", D: "7" },
      correctAnswer: "C",
    },
    {
      id: "q11",
      prompt: "An exponential function is defined by f(x) = 200(0.5)^x. What is the value of f(3)?",
      choices: { A: "50", B: "100", C: "12.5", D: "25" },
      correctAnswer: "D",
    },
    {
      id: "q12",
      prompt: "An exponential function is defined by f(x) = 50(3)^x. What is the value of f(2)?",
      choices: { A: "450", B: "150", C: "300", D: "900" },
      correctAnswer: "A",
    },
    {
      id: "q13",
      prompt: "x³ - 8 = 19. What is the value of x?",
      choices: { A: "9", B: "3", C: "-3", D: "27" },
      correctAnswer: "B",
    },
    {
      id: "q14",
      prompt: "The height, in feet, of a ball t seconds after being thrown is modeled by h(t) = -16t² + 64t + 5. What is the height of the ball at t = 2?",
      choices: { A: "64", B: "133", C: "69", D: "5" },
      correctAnswer: "C",
    },
    {
      id: "q15",
      prompt: "2x² - 8 = 42. What is the positive solution to the equation?",
      choices: { A: "25", B: "-5", C: "10", D: "5" },
      correctAnswer: "D",
    },
  ],
};
export default test;
