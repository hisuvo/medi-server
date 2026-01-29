import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserRole } from "../../constants/user-role";

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const result = await userService.getUsers(user);

    res.status(202).json({
      success: true,
      message: "Users retrived successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "users retrived failed",
      details: error,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const result = await userService.updateProfile(req.body, user);

    res.status(202).json({
      success: true,
      message: "Profile updated successfully",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;
    res.status(400).json({
      success: false,
      message: "Profile updated failed",
      details,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const isAdmin = req.user?.role === UserRole.ADMIN;
    const adminUserId = req.user?.id;

    const result = await userService.updateUserStatus(
      req.body,
      userId as string,
      adminUserId as string,
      isAdmin,
    );

    res.status(202).json({
      success: true,
      message: "Users status updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Users status updated failed",
      error: error.message,
      details: error,
    });
  }
};

export const userController = {
  getUsers,
  updateUserStatus,
  updateProfile,
};
