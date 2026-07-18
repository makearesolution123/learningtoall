export type Choice = "A" | "B" | "C" | "D";

export type Subject =
  | "SAT Math"
  | "SAT Reading & Writing"
  | "SAT Mixed"
  | "ACT Math"
  | "ACT English"
  | "Other";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Mixed";

export interface Question {
  /** Stable identifier within the test. Used for answer storage and grading. */
  id: string;
  prompt: string;
  choices: Record<Choice, string>;
  correctAnswer: Choice;
  /** Optional short explanation shown on the PDF / review view. */
  explanation?: string;
  /** Optional image URL (rendered above the prompt when present). */
  imageUrl?: string;
}

export interface PracticeTest {
  /** URL-safe slug — also the DB test_id for attempts. Must be unique. */
  id: string;
  title: string;
  description: string;
  subject: Subject;
  difficulty: Difficulty;
  /** Total time in seconds. */
  durationSeconds: number;
  /** Lower numbers appear first on the list page. */
  order: number;
  published: boolean;
  questions: Question[];
}
