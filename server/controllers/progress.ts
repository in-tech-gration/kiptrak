import { RequestHandler } from "express";
import { getCSVData, writeToCSV } from "../services/csv-service";

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

// POST /api/progress
export const postProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  try {
    await writeToCSV(data, week, day);
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
