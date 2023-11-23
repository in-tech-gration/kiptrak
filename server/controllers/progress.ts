import { RequestHandler } from "express";
import { getCSVData } from "../services/csv-service";

// GET /api/progress?type=<type>&week=<week>&day=<day>
export const getProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week?.toString();
  const day = req.query.day?.toString();
  const type = req.query.type?.toString();

  try {
    const records = await getCSVData(type ? type : "", week, day);
    res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
