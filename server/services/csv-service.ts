import path from "path";
import { parse } from "csv/sync";
import { promises as fs } from "fs";
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
export const getCSV = async (type: string, week: string, day?: string) => {
  const records: IProgressRow[][] = [];

  const days: string[] = [];
  if (week && day) {
    day.split(",").forEach((value) => days.push(value));
  } else if (week) {
    ["01", "02", "03", "04", "05"].forEach((value) => days.push(value));
  } else {
    throw new Error("Week parameter is required!");
  }

  for (const day of days) {
    records.push(
      parse(await fs.readFile(resolvedFolder(type, week, day)), {
        columns: true,
      })
    );
  }

  // Make from [][] to [] array
  return records.reduce(
    (acc, value) => acc.concat(value),
    [] as IProgressRow[]
  );
};

export const writeCSV = async (
  data: IProgressRow[],
  week: string,
  day: string
) => {
  let csv = Object.keys(data[0]).join(",") + "\n";
  for (const row of data) {
    csv += Object.values(row).join(",") + "\n";
  }

  // Parse csv to check for validity
  parse(csv);

  await fs.writeFile(resolvedFolder("", week, day), csv);
};

export const deleteCSV = async (week: string, day: string) => {
  await fs.rm(resolvedFolder("", week, day));
};
