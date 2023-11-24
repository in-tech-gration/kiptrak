import cors from "cors";
import dotenv from "dotenv";
import progressRouter from "./routes/progress";
import { ErrorHandler } from "./middleware/error-handler";
import express, { Express, Request, Response } from "express";

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

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
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`);
});
