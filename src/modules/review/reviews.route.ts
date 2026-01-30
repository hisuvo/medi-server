import { Router } from "express";
import { reviewsController } from "./reviews.controller";
import { UserRole } from "../../constants/user-role";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", () => {});

router.post("/", auth(UserRole.CUSTOMER), reviewsController.createReviews);

export { router as reviewsRouter };
