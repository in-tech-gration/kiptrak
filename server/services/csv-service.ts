import path from "path";
import { parse, stringify } from "csv/sync";
import { promises as fs } from "fs";

const DATA_FOLDER = process.env.DATA_FOLDER || "data";

/**
 * @param type: string | either 'draft.' or ''
 * @param week: string
 * @param day?: string
 *
 * @returns array of JSON objects { columnName: value } from CSV file(s) with first row as header.
 */
export const getCSVData = async (type: string, week?: string, day?: string) => {
  if (day) {
    return parse(
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
    );
  } else if (week) {
    let records: any = [];
    const days = ["01", "02", "03", "04", "05"];

    for (const d of days) {
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
              `progress.${type}w${week}.d${d}.csv`
            )
          ),
          {
            columns: true,
          }
        )
      );
    }
    return [].concat(...records);
  } else {
    throw new Error("Week parameter is required!");
  }
};
