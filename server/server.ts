import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import progressRouter from "./routes/progress";
import ErrorHandler from "./middleware/ErrorHandler";
import express, { Express, Request, Response } from "express";

const env = dotenv.config({ path: path.resolve(process.cwd(), "config.env") });

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
export const DATA_FOLDER = process.env.DATA_FOLDER || "user";

const app: Express = express();

app.use(express.json());
app.use(cors());
// Serve the React static files after build
app.use(express.static("../client/build"));
app.use("/api/progress", progressRouter);
app.use(ErrorHandler);

app.get("/api/hello", (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.listen(PORT, () => {

  if (env.error) {
    console.log("=========");
    console.log(
      "No environment configuration file was loaded. Using default values instead."
    );
    console.log("PORT=5000");
    console.log("DATA_FOLDER=user");
    console.log(
      "If you want to provided your own environment variables, please create a 'config.env' file containing 'PORT' and 'DATA_FOLDER' variables."
    );
    console.log("=========");
  }
  
  console.log(`Server running in ${NODE_ENV} on ${PORT}`);
});
