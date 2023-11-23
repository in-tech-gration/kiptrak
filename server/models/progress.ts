enum Level {
  beg = "Beginner",
  int = "Intermediate",
  adv = "Advanced",
}

export interface IProgressRow {
  Week: number;
  Day: number;
  Concept: string;
  Task: string;
  Level: Level;
  Confidence: number;
  Completed: boolean;
  Instructions: string;
}
