import { RequestHandler } from "express";
import { getCSV, writeCSV, deleteCSV, weekDays, getFolderNames } from "../services/csv-service";

/**
 * { GET /api/progress?type=<type>&week=<week>&day=<day> } : gets progress of week and day(s)
 * @param req Request object as defined in RequestHandler interface
 * @param res Response object as defined in RequestHandler interface
 * @param next NextFunction
 */
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
      days: day ? day.toString().split(",") : weekDays,
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
    await writeCSV(data, week, day);
    res.status(201).send({
      fileName: `progress.w${week}.d${day}.csv`,
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
    await writeCSV(data, week, day);
    res.status(200).send({
      fileName: `progress.w${week}.d${day}.csv`,
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
      weeks
    });
  } catch (error) {
    next(error);
  }  
}
