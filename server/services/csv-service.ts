import path from "path";
import { parse, stringify } from "csv/sync";
import { promises as fs } from "fs";
import { IProgressRow } from "../models/progress";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

/**
 * @param type: string | either 'draft.' or ''
 * @param week: string
 * @param day?: string
 *
 * @returns array of JSON objects { columnName: value } from CSV file(s) with first row as header.
 */
export const getCSV = async (type: string, week: string, day?: string) => {
  const records: any = [];

  if (week && day) {
    const days = day.split(",");

    for (const day of days) {
      records.push(
        parse(
          await fs.readFile(
            path.resolve(
              __dirname,
              "..",
              "..",
              DATA_FOLDER,
              `week${week}`,
              "progress",
              `progress.${type}w${week}.d${day}.csv`
            )
          ),
          {
            columns: true,
          }
        )
      );
    }
  } else if (week) {
    const days = ["01", "02", "03", "04", "05"];

    for (const day of days) {
      records.push(
        parse(
          await fs.readFile(
            path.resolve(
              __dirname,
              "..",
              "..",
              DATA_FOLDER,
              `week${week}`,
              "progress",
              `progress.${type}w${week}.d${day}.csv`
            )
          ),
          {
            columns: true,
          }
        )
      );
    }
  } else {
    throw new Error("Week parameter is required!");
  }

  return [].concat(...records);
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

  await fs.writeFile(
    path.resolve(
      __dirname,
      "..",
      "..",
      DATA_FOLDER,
      `week${week}`,
      "progress",
      `progress.w${week}.d${day}.csv`
    ),
    csv
  );
};

export const deleteCSV = async (week: string, day: string) => {
  await fs.rm(
    path.resolve(
      __dirname,
      "..",
      "..",
      DATA_FOLDER,
      `week${week}`,
      "progress",
      `progress.w${week}.d${day}.csv`
    )
  );
};
