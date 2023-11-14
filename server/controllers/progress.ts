import { RequestHandler } from "express";
import path from "path";
import { parse, stringify } from "csv/sync";
import { promises as fs } from "fs";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

// GET /api/progress/draft
export const getProgressDraft: RequestHandler = async (req, res, next) => {
  const week = req.query.week;
  const day = req.query.day;

  try {
    let content;
    // [?week=XX&day=YY]: If both params present on the URL return the requested progress
    if (week && day) {
      content = await fs.readFile(
        path.resolve(
          __dirname,
          "..",
          "..",
          DATA_FOLDER,
          `week${week}`,
          "progress",
          `progress.draft.w${week}.d${day}.csv`
        )
      );
    }
    // TODO: [?week=XX]: If only param week is present return progress for all days
    // If no params present on the URL return the first day of the first week
    else {
      // console.log(process.env.DATA_FOLDER + __dirname
      content = await fs.readFile(
        path.resolve(
          __dirname,
          "..",
          "..",
          DATA_FOLDER,
          "week01",
          "progress",
          "progress.draft.w01.d01.csv"
        )
      );
    }

    const records = content && parse(content);
    res.status(200).json({ records });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
