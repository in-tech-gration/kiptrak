import path from "path";
import { parse } from "csv/sync";
import { promises as fs } from "fs";
import CSVServiceError from "../errors/CSVServiceError";
import BadRequestError from "../errors/BadRequestError";
import { Progress, ProgressSchema } from "../../models/progress";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

const CSV_HEADER =
  "Week,Day,Concept,Task,Level,Confidence,Completed,Instructions\n";

/**
 * Finds the absolute path of the requested progress file
 * @param week | Number of week in string format, e.g. '01'
 * @param day | Number of day in string format, e.g. '01
 * @param isDraft | If the file is a draft
 * @returns The absolute path of the file
 */
const resolvedFolder = (week: string, day?: string, isDraft = false) =>
  path.resolve(
    __dirname,
    "..",
    "..",
    DATA_FOLDER,
    `week${week}`,
    "progress",
    `progress.${isDraft ? "draft." : ""}w${week}.d${day}.csv`
  );

export const weekDays = ["01", "02", "03", "04", "05"];

/**
 * Gets content from a week,day(s) CSV file(s)
 * @param isDraft: boolean | default false
 * @param week?: string | e.g. '01'
 * @param day?: string | e.g. '01' or '01,02,03'
 *
 * @returns array of JSON objects { columnName: value } from CSV file(s) with first row as header.
 */
export const getCSV = async (isDraft = false, week?: string, day?: string) => {
  const records: Progress[][] = [];

  const days: string[] = [];
  if (week && day) {
    day.split(",").forEach((value) => days.push(value));
  } else if (week) {
    weekDays.forEach((value) => days.push(value));
  } else {
    throw new BadRequestError({
      code: 400,
      message: "Week parameter is required!",
      logging: true,
    });
  }

  for (const day of days) {
    try {
      const readData = await fs.readFile(resolvedFolder(week, day, isDraft));

      const parsedData = parse(readData, {
        columns: (header) =>
          header.map((column: string) => column.toLowerCase()),
        cast: (value, { header, column }) => {
          if (header) {
            return value;
          }
          if (column === "completed") {
            if (value === "FALSE") {
              return false;
            }
            return true;
          }
          if (
            column === "week" ||
            column === "day" ||
            column === "confidence"
          ) {
            return parseInt(value);
          }
          return value;
        },
      });
      parsedData.forEach((p: any) => ProgressSchema.parse(p));

      records.push(parsedData);
    } catch (error: any) {
      throw new CSVServiceError({
        code: 500,
        message: "Error while reading CSV!",
        logging: true,
      });
    }
  }

  // Make from [][] to [] array
  return records.reduce((acc, value) => acc.concat(value), [] as Progress[]);
};

/**
 * Saves progress content of a week-day to a CSV file
 * @param data: Progress[] | Array of Progress for a specific week-day
 * @param week?: string | Number of week in string format, e.g. '01'
 * @param day?: string | Number of day in string format, e.g. '01
 */
export const writeCSV = async (
  data: Progress[],
  week?: string,
  day?: string
) => {
  if (!week || !day) {
    throw new BadRequestError({
      code: 400,
      message: "Week and day parameters are required!",
      logging: true,
    });
  }

  let csv = CSV_HEADER;
  for (const row of data) {
    csv += Object.values(row).join(",") + "\n";
  }

  try {
    // Parse csv to check for validity
    parse(csv);

    await fs.writeFile(resolvedFolder(week, day), csv);
  } catch (error: any) {
    throw new CSVServiceError({
      code: 500,
      message: "Error while writing CSV!",
      logging: true,
    });
  }
};

/**
 * Deletes a CSV of a specific week-day
 * @param week?: string | Number of week in string format, e.g. '01'
 * @param day?: string | Number of day in string format, e.g. '01'
 */
export const deleteCSV = async (week?: string, day?: string) => {
  if (!week || !day) {
    throw new BadRequestError({
      code: 400,
      message: "Week and day parameters are required!",
      logging: true,
    });
  }

  try {
    await fs.rm(resolvedFolder(week, day));
  } catch (error: any) {
    throw new CSVServiceError({
      code: 500,
      message: "Error while deleting CSV!",
      logging: true,
    });
  }
};

/**
 * Returns the names of folders inside the DATA_FOLDER
 * @returns array of folder names
 */
export const getFolderNames = async () => {
  const folderPath = path.resolve(__dirname, "..", "..", DATA_FOLDER);

  try {
    // Read the contents of the specified folder
    const folderContents = await fs.readdir(folderPath);

    // Filter out only the directories (folders)
    const folderNames = folderContents.filter(async (item) => {
      const itemPath = path.join(folderPath, item);
      return (await fs.stat(itemPath)).isDirectory();
    });

    return folderNames;
  } catch (error: any) {
    throw new CSVServiceError({
      code: 500,
      message: "Error while reading contents of folder!",
      logging: true,
    });
  }
};
