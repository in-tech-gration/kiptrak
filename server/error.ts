export class CSVServiceError extends Error {
  code: string;
  status: number;

  constructor(code = "GENERIC", status = 500, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CSVServiceError);
    }

    this.code = code;
    this.status = status;
  }
}
