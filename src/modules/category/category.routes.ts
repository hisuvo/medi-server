import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../../constants/user-role";

const router = express.Router();

router.get("/", auth(UserRole.CUSTOMER, UserRole.ADMIN), async (req, res) => {
  const user = await req.user;
  res.status(200).json({ success: true, user });
});

export { router as categoryRouter };
