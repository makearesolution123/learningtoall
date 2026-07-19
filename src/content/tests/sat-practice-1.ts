import type { PracticeTest } from "./types";

const test: PracticeTest = {
  id: "sat-practice-1",
  title: "SAT Algebra Practice 1",
  description: "A 15-question sample SAT-style practice test the Algebra topics learned today",
  subject: "SAT Math",
  difficulty: "Easy",
  durationSeconds: 1200,
  order: 1,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "Maria rents a kayak at a cost of $8 per hour plus a onetime equipment fee of $12. Which equation represents the total cost c, in dollars, to rent the kayak for h hours?",
      choices: { A: "c = 8(h + 12)", B: "c = 12(h + 8)", C: "c = 8h + 12", D: "c = 12h + 8" },
      correctAnswer: "C",
    },
    {
      id: "q2",
      prompt: "Line k(x) = 4/3x + 5. j(x) is perpendicular to line k. What is the slope of line j(x)",
      choices: { A: "-3/4", B: "3/4", C: "-4/3", D: "k(x) = 4/3" },
      correctAnswer: "A",
    },
    {
      id: "q3",
      prompt: "The function g is defined by the equation g(x) = x + 7/9. What is the value of g(x) when x = 2/9?",
      choices: { A: "1", B: "3", C: "5/9", D: "1/9" },
      correctAnswer: "A",
    },
    {
      id: "q4",
      prompt: "In the xy-plane, the graph of the linear function h contains the points (0, 5) and (6, 29). Which equation defines h, where y = h(x)?",
      choices: { A: "h(x) = 4x + 5", B: "h(x) = 24x + 5", C: "h(x) = 5x + 4", D: "h(x) = 6x + 5" },
      correctAnswer: "A",
    },
    {
      id: "q5",
      prompt: "What is the y-coordinate of the y-intercept of the graph of 2x/3 = -4y/5 + 12 in the xy-plane?",
      choices: { A: "12", B: "15", C: "18", D: "20" },
      correctAnswer: "B",
    },
    {
      id: "q6",
      prompt: "What value of x is the solution to the equation 0.6x - 0.12 = 6(x - 0.04) + 1.2?",
      choices: { A: "-0.2", B: "0.2", C: "1.2", D: "2" },
      correctAnswer: "A",
    },
    {
      id: "q7",
      prompt: "For the function f, if f(x) = x + 9 for all values of x, what is the value of f(10)?",
      choices: { A: "5", B: "10", C: "14", D: "19" },
      correctAnswer: "D",
    },
    {
      id: "q8",
      prompt: "If 6 - 5(3 - 2x) = 21 - 4(3 - 2x), what is the value of 3 - 2x?",
      choices: { A: "-15", B: "-5", C: "5", D: "15" },
      correctAnswer: "A",
    },
    {
      id: "q9",
      prompt: "The line with the equation (3/4)x + (1/2)y = 1 is graphed in the xy-plane. What is the x-coordinate of the x-intercept of the line?",
      choices: { A: "3/4", B: "1/2", C: "4/3", D: "2" },
      correctAnswer: "C",
    },
    {
      id: "q10",
      prompt: "2(3x - 4) - 9 = 3(x - 2) + 1. If x is the solution to the equation above, what is the value of x - 2?",
      choices: { A: "2", B: "4", C: "6", D: "8" },
      correctAnswer: "A",
    },
    {
      id: "q11",
      prompt: "The function h is defined by h(x) = -2x + 9. What is the value of h(0)?",
      choices: { A: "-2", B: "0", C: "7", D: "9" },
      correctAnswer: "D",
    },
    {
      id: "q12",
      prompt: "A caterer charges a delivery fee of $25 plus $9 per guest for a catered event. Which equation represents the total cost c, in dollars, for g guests?",
      choices: { A: "c = 25(g + 9)", B: "c = 9(g + 25)", C: "c = 25g + 9", D: "c = 9g + 25" },
      correctAnswer: "D",
    },
    {
      id: "q13",
      prompt: "For the linear function p, the graph of y = p(x) in the xy-plane passes through the points (1, 4) and (4, 22). Which equation defines p?",
      choices: { A: "p(x) = 6x - 2", B: "p(x) = 3x + 1", C: "p(x) = 2x + 2", D: "p(x) = 4x" },
      correctAnswer: "A",
    },
    {
      id: "q14",
      prompt: "What is the y-coordinate of the y-intercept of the graph of 5x/2 = -3y/4 + 16 in the xy-plane?",
      choices: { A: "16", B: "64/3", C: "48", D: "4" },
      correctAnswer: "B",
    },
    {
      id: "q15",
      prompt: "For the function q, if q(4x) = x - 5 for all values of x, what is the value of q(8)?",
      choices: { A: "-3", B: "-4", C: "-5", D: "3" },
      correctAnswer: "A",
    },
  ],
};

export default test;
