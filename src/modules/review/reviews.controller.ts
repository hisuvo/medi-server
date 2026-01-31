import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";

const getReviews = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Reviews post successfull",
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(400).json({
      success: true,
      message: "Reviews post failed",
      details,
    });
  }
};

const createReviews = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("you are unauthrozied!");
    }

    const result = await reviewsService.createReviews({
      data: req.body,
      user,
    });

    res.status(200).json({
      success: true,
      message: "Reviews post successfull",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(400).json({
      success: true,
      message: "Reviews post failed",
      details,
    });
  }
};

export const reviewsController = {
  createReviews,
  getReviews,
};
