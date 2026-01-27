import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

// middlewate
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000", // client side url
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the pharmacies API");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next(err);
});

export default app;
