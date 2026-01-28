import express from "express";
import { categoryController } from "./category.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router = express.Router();

router.get("/", categoryController.getCategory);

router.post("/", auth(UserRole.ADMIN), categoryController.createCategory);

export { router as categoryRouter };
