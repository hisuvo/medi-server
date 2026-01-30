import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { categoryRouter } from "./modules/category/category.routes";
import { notFound } from "./middleware/notFound";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { userRouter } from "./modules/user/user.route";
import { OrderRouter } from "./modules/order/order.route";
import { reviewsRouter } from "./modules/review/reviews.route";

const app: Application = express();

// middlewate
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
// better-auth all api rutes
app.all("/api/auth/*splat", toNodeHandler(auth));

// welcome route
app.get("/", (req, res) => {
  res.send("Welcome to you from pharmacies API");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/medicines", medicineRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
