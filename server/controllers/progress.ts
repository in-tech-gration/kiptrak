import { RequestHandler } from "express";
import { getCSV, writeCSV, deleteCSV } from "../services/csv-service";

// GET /api/progress?type=<type>&week=<week>&day=<day>
export const getProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week?.toString();
  const day = req.query.day?.toString();
  const type = req.query.type?.toString();

  try {
    const records = await getCSV(type ? type : "", week, day);
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

  if (!week || !day) {
    next("Missing Body parameters. Please provide both 'week' and 'day'");
    return;
  }

  try {
    await writeCSV(data, week, day);
    res.status(201).send({
      fileName: `progress.w${week}.d${day}.csv`,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE /api/progress?week=<week>&day=<day>
export const deleteProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week?.toString();
  const day = req.query.day?.toString();

  if (!week || !day) {
    next("Missing URL parameters. Please provide both 'week' and 'day'");
    return;
  }

  try {
    await deleteCSV(week, day);
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// PUT /api/progress
export const updateProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  if (!week || !day) {
    next("Missing Body parameters. Please provide both 'week' and 'day'");
    return;
  }

  try {
    await writeCSV(data, week, day);
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }

};
