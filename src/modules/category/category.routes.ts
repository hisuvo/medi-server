import express, { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router: Router = express.Router();

router.get("/", categoryController.getCategory);

router.get("/:categoryId", categoryController.getCategoryById);

router.patch(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryController.updateCategory,
);

router.delete(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryController.deleteCategory,
);

router.post("/", auth(UserRole.ADMIN), categoryController.createCategory);

export { router as categoryRouter };
