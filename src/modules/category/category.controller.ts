import { Request, Response } from "express";
import { categoryService } from "./category.service";

const getCategory = async (req: Request, res: Response) => {
  console.log("await categoryService.createCategory()");
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Comment creation failed",
      details: error,
    });
  }
};

export const categoryController = {
  createCategory,
  getCategory,
};
