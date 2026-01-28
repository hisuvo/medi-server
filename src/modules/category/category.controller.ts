import { Request, Response } from "express";
import { categoryService } from "./category.service";

const getCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getCategory();

    res.status(200).json({
      success: true,
      message: "Categories retrived successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Comment creation failed",
      details: error,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Category created faild",
      details: error,
    });
  }
};

export const categoryController = {
  createCategory,
  getCategory,
};
