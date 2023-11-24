import { RequestHandler } from "express";
import { getCSV, writeCSV, deleteCSV } from "../services/csv-service";

// GET /api/progress?type=<type>&week=<week>&day=<day>
export const getProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week;
  const day = req.query.day;
  const isDraft = req.query.isDraft;

  try {
    const data = day
      ? await getCSV(
          isDraft && isDraft === "true" ? true : false,
          week && week.toString(),
          day.toString()
        )
      : await getCSV(
          isDraft && isDraft === "true" ? true : false,
          week && week.toString()
        );
    res.status(200).send({
      week,
      days: day ? day.toString().split(",") : ["01", "02", "03", "04", "05"],
      rows: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/progress
export const postProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  try {
    await writeCSV(data, week, day);
    res.status(201).send({
      fileName: `progress.w${week}.d${day}.csv`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/progress?week=<week>&day=<day>
export const deleteProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week;
  const day = req.query.day;

  try {
    await deleteCSV(week && week.toString(), day && day.toString());
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/progress
export const updateProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  try {
    await writeCSV(data, week, day);
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
      data,
    });
  } catch (error) {
    next(error);
  }
};
