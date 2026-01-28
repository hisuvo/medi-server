import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

router.get("/", categoryController.getCategory);

router.post("/", categoryController.createCategory);

export { router as categoryRouter };
