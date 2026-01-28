import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { categoryRouter } from "./modules/category/category.routes";
import { notFound } from "./middleware/notFound";
import { medicineRouter } from "./modules/medicine/medicine.route";

const app: Application = express();

// middlewate
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000", // client side url
    credentials: true,
  }),
);

app.use(express.json());
// better-auth all api rutes
app.all("/api/auth/*splat", toNodeHandler(auth));

// test api
app.get("/", (req, res) => {
  res.send("Welcome to the pharmacies API");
});

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/medicine", medicineRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
