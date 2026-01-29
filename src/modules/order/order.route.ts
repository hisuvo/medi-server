import { Router } from "express";
import { ordersController } from "./order.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router = Router();

router.get("/", () => console.log("order router is connected"));

router.post("/", auth(UserRole.CUSTOMER), ordersController.createOrders);

export { router as OrderRouter };
