import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-7",
  title: "SAT Geometry Practice: Right Triangles, Trigonometry & Circles",
  description: "A 15-question practice test covering right triangles and trigonometry, and circles, from Day 7",
  subject: "SAT Math",
  difficulty: "Medium",
  durationSeconds: 1200,
  order: 7,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "A right triangle has leg lengths of 8 and 15. What is the length of the hypotenuse?",
      choices: { A: "16", B: "17", C: "23", D: "13" },
      correctAnswer: "B",
    },
    {
      id: "q2",
      prompt: "A right triangle has a hypotenuse of length 13 and one leg of length 5. What is the length of the other leg?",
      choices: { A: "8", B: "10", C: "12", D: "18" },
      correctAnswer: "C",
    },
    {
      id: "q3",
      prompt: "A right triangle has a hypotenuse of length 10 and one leg of length 6. What is the length of the other leg?",
      choices: { A: "8", B: "4", C: "14", D: "16" },
      correctAnswer: "A",
    },
    {
      id: "q4",
      prompt: "In right triangle ABC, the right angle is at C. If cos(A) = 3/5, what is the value of sin(B)?",
      choices: { A: "4/5", B: "3/5", C: "5/3", D: "5/4" },
      correctAnswer: "B",
    },
    {
      id: "q5",
      prompt: "In right triangle XYZ, the right angle is at Y. If sin(X) = 7/25, what is the value of cos(Z)?",
      choices: { A: "24/25", B: "25/7", C: "7/25", D: "7/24" },
      correctAnswer: "C",
    },
    {
      id: "q6",
      prompt: "A right triangle has legs of length 9 and 12. What is the tangent of the angle opposite the side of length 9?",
      choices: { A: "4/3", B: "3/4", C: "9/15", D: "12/9" },
      correctAnswer: "B",
    },
    {
      id: "q7",
      prompt: "A 30-60-90 triangle has a shorter leg of length 6. What is the length of the longer leg?",
      choices: { A: "6√2", B: "12", C: "6√3", D: "3√3" },
      correctAnswer: "C",
    },
    {
      id: "q8",
      prompt: "A 45-45-90 triangle has legs of length 8. What is the length of the hypotenuse?",
      choices: { A: "8√3", B: "16", C: "8", D: "8√2" },
      correctAnswer: "D",
    },
    {
      id: "q9",
      prompt: "A circle is defined by the equation (x - 4)² + (y + 7)² = 81. What is the diameter of the circle?",
      choices: { A: "9", B: "18", C: "81", D: "36" },
      correctAnswer: "B",
    },
    {
      id: "q10",
      prompt: "A circle is defined by the equation (x + 2)² + (y - 5)² = 49. What is the radius of the circle?",
      choices: { A: "7", B: "49", C: "14", D: "24.5" },
      correctAnswer: "A",
    },
    {
      id: "q11",
      prompt: "An arc has a measure of 60 degrees. What is that measure in radians?",
      choices: { A: "π/6", B: "π/3", C: "π/2", D: "2π/3" },
      correctAnswer: "B",
    },
    {
      id: "q12",
      prompt: "An arc has a measure of 135 degrees. What is that measure in radians?",
      choices: { A: "3π/4", B: "π/2", C: "5π/6", D: "2π/3" },
      correctAnswer: "A",
    },
    {
      id: "q13",
      prompt: "A circle is defined by the equation x² + y² - 6x + 4y - 12 = 0. What is the radius of the circle?",
      choices: { A: "25", B: "12", C: "5", D: "6" },
      correctAnswer: "C",
    },
    {
      id: "q14",
      prompt: "A circle defined by 2x² + 2y² - 8x + 12y - k = 0 has a radius of 6. What is the value of k?",
      choices: { A: "23", B: "46", C: "72", D: "13" },
      correctAnswer: "B",
    },
    {
      id: "q15",
      prompt: "A circle has a radius of 10, and an arc on the circle corresponds to a central angle of 2 radians. What is the length of the arc?",
      choices: { A: "5", B: "10", C: "20", D: "40" },
      correctAnswer: "C",
    },
  ],
};
export default test;
