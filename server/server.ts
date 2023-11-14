import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import progressRouter from "./routes/progress";

dotenv.config({ path: "./config.env" });

const app: Express = express();

app.use(express.json());
app.use(cors());
// Serve the React static files after build
app.use(express.static("../client/build"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`);
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.use("/api/progress", progressRouter);

// All other unmatched requests will return the React app
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});
