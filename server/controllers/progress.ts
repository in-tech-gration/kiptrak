import { RequestHandler } from "express";
import { getCSVData } from "../services/csv-service";

// GET /api/progress/draft
export const getProgressDraft: RequestHandler = async (req, res, next) => {
  const week = req.query.week?.toString();
  const day = req.query.day?.toString();

  try {
    const records = await getCSVData("draft.", week, day);
    res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
