import { ErrorRequestHandler } from "express";

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("ERROR HANDLER");
  next(err);
}