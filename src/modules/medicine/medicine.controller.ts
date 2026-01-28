import { Request, Response } from "express";
import { medicineService } from "./medicine.service";
import { UserRole } from "../../constants/user-role";

const getMedicine = async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getMedicine();

    res.status(200).json({
      success: true,
      message: "Medicine retrived successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
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
      error: "medicine update failed",
      details: error.message,
    });
  }
};

export const medicineController = {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
};
