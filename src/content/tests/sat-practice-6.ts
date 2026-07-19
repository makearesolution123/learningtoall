import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-6",
  title: "SAT Geometry Practice: Area, Volume, Lines, Angles & Triangles",
  description: "A 15-question practice test covering area and volume, lines and angles, and triangles from Day 6",
  subject: "SAT Math",
  difficulty: "Hard",
  durationSeconds: 1200,
  order: 6,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "A rectangular tabletop has a length of 42 inches and a width of 18 inches. What is the area of the tabletop, in square inches?",
      choices: { A: "630", B: "756", C: "840", D: "504" },
      correctAnswer: "B",
    },
    {
      id: "q2",
      prompt: "A circular garden has a radius of 7 feet. What is the area of the garden, in terms of π?",
      choices: { A: "14π", B: "98π", C: "49π", D: "7π" },
      correctAnswer: "C",
    },
    {
      id: "q3",
      prompt: "A cylindrical water tank has a radius of 4 feet and a height of 10 feet. What is the volume of the tank, in terms of π?",
      choices: { A: "40π", B: "80π", C: "320π", D: "160π" },
      correctAnswer: "D",
    },
    {
      id: "q4",
      prompt: "A storage cube has an edge length of 9 inches. What is the volume of the cube, in cubic inches?",
      choices: { A: "729", B: "81", C: "648", D: "972" },
      correctAnswer: "A",
    },
    {
      id: "q5",
      prompt: "A rectangular prism has a length of 6 cm, a width of 5 cm, and a height of 4 cm. What is the volume of the prism, in cubic centimeters?",
      choices: { A: "90", B: "100", C: "120", D: "150" },
      correctAnswer: "C",
    },
    {
      id: "q6",
      prompt: "Two angles lie along a straight line and have measures of (3x + 10)° and (2x + 30)°. What is the measure of the larger angle?",
      choices: { A: "86°", B: "94°", C: "90°", D: "100°" },
      correctAnswer: "B",
    },
    {
      id: "q7",
      prompt: "Two vertical angles are formed by intersecting lines and have measures of (5x - 10)° and (3x + 20)°. What is the measure of each angle?",
      choices: { A: "55°", B: "60°", C: "70°", D: "65°" },
      correctAnswer: "D",
    },
    {
      id: "q8",
      prompt: "Two complementary angles have measures of 4x° and (2x + 12)°. What is the measure of the smaller angle?",
      choices: { A: "52°", B: "38°", C: "48°", D: "45°" },
      correctAnswer: "A",
    },
    {
      id: "q9",
      prompt: "Two parallel lines are cut by a transversal, forming a pair of alternate interior angles with measures of (6x - 5)° and (4x + 15)°. What is the measure of each angle?",
      choices: { A: "45°", B: "50°", C: "55°", D: "65°" },
      correctAnswer: "C",
    },
    {
      id: "q10",
      prompt: "The three angles of a triangle measure x°, 2x°, and 3x°. What is the measure of the largest angle?",
      choices: { A: "60°", B: "75°", C: "80°", D: "90°" },
      correctAnswer: "D",
    },
    {
      id: "q11",
      prompt: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
      choices: { A: "13", B: "15", C: "17", D: "21" },
      correctAnswer: "B",
    },
    {
      id: "q12",
      prompt: "A right triangle has a hypotenuse of length 26 and one leg of length 24. What is the length of the other leg?",
      choices: { A: "10", B: "12", C: "8", D: "14" },
      correctAnswer: "A",
    },
    {
      id: "q13",
      prompt: "Triangle ABC is similar to triangle DEF, where A, B, and C correspond to D, E, and F. If AB = 8, DE = 20, and BC = 12, what is the length of EF?",
      choices: { A: "15", B: "24", C: "30", D: "18" },
      correctAnswer: "C",
    },
    {
      id: "q14",
      prompt: "An isosceles triangle has two equal base angles, and its vertex angle measures 30° more than each base angle. What is the measure of the vertex angle?",
      choices: { A: "70°", B: "80°", C: "90°", D: "60°" },
      correctAnswer: "B",
    },
    {
      id: "q15",
      prompt: "Polygons PQRS and TUVW are similar, where P, Q, R, and S correspond to T, U, V, and W. The measure of angle S is 98°, PS = 20, and TW = 5. What is the measure of angle W?",
      choices: { A: "98°", B: "24.5°", C: "392°", D: "49°" },
      correctAnswer: "A",
    },
  ],
};
export default test;
