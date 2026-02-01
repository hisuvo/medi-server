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
      error: "Categories retrived failed",
      details: error,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }

    const result = await categoryService.getCategoryById({ categoryId });

    res.status(200).json({
      success: true,
      message: "Categories created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Categories created failed",
      details: error,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }

    const result = await categoryService.updateCategory(categoryId, req.body);

    res.status(200).json({
      success: true,
      message: "Categories updated successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: "Comment updated failed",
      details: error,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || Array.isArray(categoryId)) {
      throw new Error("You are unauthrozied");
    }

    const result = await categoryService.getCategoryById({ categoryId });

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
  getCategoryById,
  updateCategory,
  deleteCategory,
};
