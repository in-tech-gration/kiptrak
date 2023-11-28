import { z } from "zod";

export const ProgressSchema = z.object({
  week: z.number().gte(1),
  day: z.number().gte(1).lte(5),
  concept: z.string(),
  task: z.string(),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  confidence: z.number().gte(0).lte(10),
  completed: z.boolean(),
  instructions: z.string(),
});

export type Progress = z.infer<typeof ProgressSchema>;
