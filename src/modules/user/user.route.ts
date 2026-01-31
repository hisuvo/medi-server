import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router: Router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER),
  userController.getUsers,
);

router.patch(
  "/profile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER),
  userController.updateProfile,
);

router.patch("/:userId", auth(UserRole.ADMIN), userController.updateUserStatus);

export { router as userRouter };
