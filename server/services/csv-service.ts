import path from "path";
import { parse } from "csv/sync";
import { promises as fs } from "fs";
import { CSVServiceError } from "../error";
import { IProgressRow } from "../models/progress";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

const resolvedFolder = (type: string, week: string, day?: string) =>
  path.resolve(
    __dirname,
    "..",
    "..",
    DATA_FOLDER,
    `week${week}`,
    "progress",
    `progress.${type}w${week}.d${day}.csv`
  );

/**
 * @param type: string | e.g. 'draft.' or ''
 * @param week: string | e.g. '01'
 * @param day?: string | e.g. '01' or '01,02,03'
 *
 * @returns array of JSON objects { columnName: value } from CSV file(s) with first row as header.
 */
export const getCSV = async (type: string, week?: string, day?: string) => {
  const records: IProgressRow[][] = [];

  const days: string[] = [];
  if (week && day) {
    day.split(",").forEach((value) => days.push(value));
  } else if (week) {
    ["01", "02", "03", "04", "05"].forEach((value) => days.push(value));
  } else {
    throw new CSVServiceError(
      "GET_CSV_ERROR",
      400,
      "Week parameter is required!"
    );
  }

  for (const day of days) {
    try {
      const readData = await fs.readFile(resolvedFolder(type, week, day));

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

    await fs.writeFile(resolvedFolder("", week, day), csv);
  } catch (error: any) {
    throw new CSVServiceError("WRITE_CSV_ERROR", 500, error.message);
  }
};

export const deleteCSV = async (week?: string, day?: string) => {
  if (!week || !day) {
    throw new CSVServiceError(
      "DELETE_CSV_ERROR",
      400,
      "Please provide both 'week' and 'day' parameters."
    );
  }

  try {
    await fs.rm(resolvedFolder("", week, day));
  } catch (error: any) {
    throw new CSVServiceError("DELETE_CSV", 500, error.message);
  }
};
