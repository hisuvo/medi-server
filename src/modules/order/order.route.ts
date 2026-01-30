import { Router } from "express";
import { ordersController } from "./order.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router = Router();

router.get(
  "/",
  auth(UserRole.CUSTOMER, UserRole.SELLER, UserRole.ADMIN),
  ordersController.getOrders,
);

router.get(
  "/:orderId",
  auth(UserRole.CUSTOMER, UserRole.SELLER),
  ordersController.getOrderById,
);

router.post("/", auth(UserRole.CUSTOMER), ordersController.createOrders);

router.patch(
  "/:orderId",
  auth(UserRole.CUSTOMER, UserRole.SELLER),
  ordersController.updateOrderStatus,
);

export { router as OrderRouter };
