import path from "path";
import { parse } from "csv/sync";
import { promises as fs } from "fs";
import { CSVServiceError } from "../error";
import { IProgressRow } from "../../models/progress";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

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
  const records: IProgressRow[][] = [];

  const days: string[] = [];
  if (week && day) {
    day.split(",").forEach((value) => days.push(value));
  } else if (week) {
    weekDays.forEach((value) => days.push(value));
  } else {
    throw new CSVServiceError(
      "GET_CSV_ERROR",
      400,
      "Week parameter is required!"
    );
  }

  for (const day of days) {
    try {
      const readData = await fs.readFile(resolvedFolder(week, day, isDraft));

      const parsedData = parse(readData, { columns: true });

      records.push(parsedData);
    } catch (error: any) {
      throw new CSVServiceError("GET_CSV_ERROR", 500, error.message);
    }
  }

  // Make from [][] to [] array
  return records.reduce(
    (acc, value) => acc.concat(value),
    [] as IProgressRow[]
  );
};

/**
 * Saves progress content of a week-day to a CSV file
 * @param data: IProgressRow[] | Array of IProgressRow for a specific week-day
 * @param week?: string | Number of week in string format, e.g. '01'
 * @param day?: string | Number of day in string format, e.g. '01
 */
export const writeCSV = async (
  data: IProgressRow[],
  week?: string,
  day?: string
) => {
  if (!week || !day) {
    throw new CSVServiceError(
      "WRITE_CSV_ERROR",
      400,
      "Please provide both 'week' and 'day' parameters."
    );
  }

  let csv = Object.keys(data[0]).join(",") + "\n";
  for (const row of data) {
    csv += Object.values(row).join(",") + "\n";
  }

  try {
    // Parse csv to check for validity
    parse(csv);

    await fs.writeFile(resolvedFolder(week, day), csv);
  } catch (error: any) {
    throw new CSVServiceError("WRITE_CSV_ERROR", 500, error.message);
  }
};

/**
 * Deletes a CSV of a specific week-day
 * @param week?: string | Number of week in string format, e.g. '01'
 * @param day?: string | Number of day in string format, e.g. '01'
 */
export const deleteCSV = async (week?: string, day?: string) => {
  if (!week || !day) {
    throw new CSVServiceError(
      "DELETE_CSV_ERROR",
      400,
      "Please provide both 'week' and 'day' parameters."
    );
  }

  try {
    await fs.rm(resolvedFolder(week, day));
  } catch (error: any) {
    throw new CSVServiceError("DELETE_CSV", 500, error.message);
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
    throw new CSVServiceError("READ_FOLDER", 500, error.message);
  }
};
