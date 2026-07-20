import type { PracticeTest } from "./types";
const test: PracticeTest = {
  id: "sat-practice-6",
  title: "SAT Problem Solving & Data Analysis Practice",
  description: "A 15-question practice test covering ratios and rates, percents, one- and two-variable data, probability, inference and margin of error, and evaluating statistical claims from Day 5",
  subject: "SAT Math",
  difficulty: "Hard",
  durationSeconds: 1200,
  order: 5,
  published: true,
  questions: [
    {
      id: "q1",
      prompt: "A plumber charges $85 per hour for a repair job. At this rate, how much would the plumber charge for 6 hours of work?",
      choices: { A: "$470", B: "$510", C: "$540", D: "$425" },
      correctAnswer: "B",
    },
    {
      id: "q2",
      prompt: "At a craft store, 5 identical spools of ribbon cost $60. At this rate, what would 9 of the same spools cost?",
      choices: { A: "$96", B: "$100", C: "$108", D: "$120" },
      correctAnswer: "C",
    },
    {
      id: "q3",
      prompt: "A solid metal cube has a density of 8,000 kilograms per cubic meter and an edge length of 0.5 meters. Using the formula D = m/v, what is the mass of the cube, in kilograms?",
      choices: { A: "1,000", B: "500", C: "800", D: "4,000" },
      correctAnswer: "A",
    },
    {
      id: "q4",
      prompt: "A positive number a is 250% of the sum of positive numbers b and c, and b is 40% of c. What percent of c is a?",
      choices: { A: "140%", B: "250%", C: "300%", D: "350%" },
      correctAnswer: "D",
    },
    {
      id: "q5",
      prompt: "A positive number x is 150% of the number y, and x is also 60% of the number z. If z is p% of y, what is the value of p?",
      choices: { A: "150", B: "250", C: "200", D: "375" },
      correctAnswer: "B",
    },
    {
      id: "q6",
      prompt: "A jacket's price increased from $80 to $92. What was the percent increase in price?",
      choices: { A: "12%", B: "10%", C: "15%", D: "20%" },
      correctAnswer: "C",
    },
    {
      id: "q7",
      prompt: "A data set consists of the values 4, 8, 8, 10, and 15. What is the mean of the data set?",
      choices: { A: "9", B: "8", C: "10", D: "7.5" },
      correctAnswer: "A",
    },
    {
      id: "q8",
      prompt: "A data set consists of the values 3, 7, 7, 7, and 11. What is the range of the data set?",
      choices: { A: "4", B: "7", C: "11", D: "8" },
      correctAnswer: "D",
    },
    {
      id: "q9",
      prompt: "A scatterplot shows that as the number of hours students spend watching TV increases, their test scores tend to decrease. This relationship best illustrates which of the following?",
      choices: { A: "A positive correlation", B: "A negative correlation", C: "No correlation", D: "A causal relationship" },
      correctAnswer: "B",
    },
    {
      id: "q10",
      prompt: "A shipment of 250 phones includes 15 defective units. If one phone is selected at random from the shipment, what is the probability that it is defective?",
      choices: { A: "3/50", B: "1/50", C: "3/25", D: "1/25" },
      correctAnswer: "A",
    },
    {
      id: "q11",
      prompt: "A survey of 200 people found that 120 prefer tea, and of those tea drinkers, 40 also like coffee. What is the probability that a randomly selected tea drinker also likes coffee?",
      choices: { A: "1/5", B: "2/5", C: "1/3", D: "3/10" },
      correctAnswer: "C",
    },
    {
      id: "q12",
      prompt: "A bag contains 5 red marbles and 7 blue marbles. What is the probability of randomly drawing a red marble?",
      choices: { A: "7/12", B: "5/12", C: "5/7", D: "1/2" },
      correctAnswer: "B",
    },
    {
      id: "q13",
      prompt: "A poll of 500 randomly selected town residents found that 320 support building a new park. Based on this sample, about what percent of the town's residents would be expected to support the park?",
      choices: { A: "56%", B: "60%", C: "70%", D: "64%" },
      correctAnswer: "D",
    },
    {
      id: "q14",
      prompt: "A survey estimates that 45% of voters support a candidate, with a margin of error of 3 percentage points. Which of the following percentages is NOT within the plausible range of the candidate's actual support?",
      choices: { A: "43%", B: "46%", C: "48%", D: "50%" },
      correctAnswer: "D",
    },
    {
      id: "q15",
      prompt: "A researcher surveys 300 randomly selected students at a single high school in Ohio about their study habits. To which population can the results of this survey be reasonably generalized?",
      choices: { A: "Students at that high school", B: "All high school students in Ohio", C: "All students in the United States", D: "All teenagers nationally" },
      correctAnswer: "A",
    },
  ],
};
export default test;
