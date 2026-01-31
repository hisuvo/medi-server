import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { UserRole } from "../../constants/user-role";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const getMedicines = async (req: Request, res: Response) => {
  try {
    const searchQueryString = (value: unknown): string =>
      typeof value === "string" ? value : "";

    const isActive = req.query.isActive
      ? req.query.isActive === "true"
        ? true
        : req.query.isActive === "false"
          ? false
          : undefined
      : undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );

    console.log(page, limit);

    const result = await medicineService.getMedicines({
      search: searchQueryString(req.query.search),
      isActive,
      page,
      limit,
      skip,
    });

    res.status(200).json({
      success: true,
      message: "Medicine retrived successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Medicine retrived failed",
      details: error,
    });
  }
};

const getMedicineById = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;
    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }
    const result = await medicineService.getMedicineById(medicineId as string);

    res.status(200).json({
      success: true,
      message: "Medicine retrived successfully",
      result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: "medicine retrived failed",
      details: e,
    });
  }
};

const createMedicine = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    req.body.sellerId = user?.id;
    const result = await medicineService.createMedicine(req.body);

    res.status(200).json({
      success: true,
      message: "Medicine created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Medicine creation failed",
      details: error,
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;

    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }

    const isSeller = req.user?.role === UserRole.SELLER;
    const userId = req.user?.id;

    const result = await medicineService.updateMedicine(
      req.body,
      medicineId as string,
      userId as string,
      isSeller,
    );

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: "medicine update failed",
      details: error.message,
    });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;

    if (!medicineId) {
      throw new Error("Medicine Id is required!");
    }

    const isSeller = req.user?.role === UserRole.SELLER;
    const userId = req.user?.id;

    const result = await medicineService.deleteMedicine(
      medicineId as string,
      userId as string,
      isSeller,
    );

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: "medicine delete failed",
      details: error.message,
    });
  }
};

export const medicineController = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
