import { RequestHandler } from "express";
import {
  getCSV,
  writeCSV,
  deleteCSV,
  weekDays,
  getFolderNames,
} from "../services/csv-service";
import { ProgressSchema } from "../../models/progress";
import { NODE_ENV } from "../server";

/**
 * { GET /api/progress?type=<type>&week=<week>&day=<day> } : gets progress of week and day(s)
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
export const getProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week && req.query.week.toString();
  const day = req.query.day && req.query.day.toString();
  const isDraft =
    req.query.isDraft && req.query.isDraft === "true" ? true : false;

  try {
    const days = day ? day.toString().split(",") : weekDays;
    console.log(`GET Progress of week: ${week} and days: ${days}`);

    const data = await getCSV(isDraft, week, day);
    if (NODE_ENV == "development") {
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    }
    res.status(200).send({
      week,
      days,
      rows: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * { POST /api/progress } : creates a progress.w{week}.d{day}.csv file
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
export const postProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  try {
    data.forEach((d: any) => ProgressSchema.parse(d));
    console.log(`POST Progress for week: ${week} and day: ${day}`);

    await writeCSV(data, week, day);
    const fileName = `progress.w${week}.d${day}.csv`;
    if (NODE_ENV == "development") {
      console.log(`Successfully created file: ${fileName}`);
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    }
    res.status(201).send({
      fileName,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * { DELETE /api/progress?week=<week>&day=<day> } : deletes a progress.w{week}.d{day}.csv file
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
export const deleteProgress: RequestHandler = async (req, res, next) => {
  const week = req.query.week && req.query.week.toString();
  const day = req.query.day && req.query.day.toString();

  try {
    console.log(`DELETE Progress for week: ${week} and day: ${day}`);

    await deleteCSV(week, day);
    const fileName = `progress.w${week}.d${day}.csv`;
    if (NODE_ENV == "development") {
      console.log(`Successfully deleted file: ${fileName}`);
    }
    res.status(200).send({
      fileName,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * { PUT /api/progress } : updates a progress.w{week}.d{day}.csv file
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
export const updateProgress: RequestHandler = async (req, res, next) => {
  const data = req.body.data;
  const week = req.body.week;
  const day = req.body.day;

  try {
    data.forEach((d: any) => ProgressSchema.parse(d));
    console.log(`POST Progress for week: ${week} and day: ${day}`);

    await writeCSV(data, week, day);
    const fileName = `progress.w${week}.d${day}.csv`;
    if (NODE_ENV == "development") {
      console.log(`Successfully updated file: ${fileName}`);
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    }
    res.status(200).send({
      fileName,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * { GET /api/progress/weeks } : gets available weeks of a curriculum
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
export const getAvailableWeeks: RequestHandler = async (req, res, next) => {
  try {
    const weeks = await getFolderNames();
    res.status(200).send({
      weeks,
    });
  } catch (error) {
    next(error);
  }
};
