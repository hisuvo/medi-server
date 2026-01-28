import { Request, Response } from "express";
import { medicineService } from "./medicine.service";

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
    res.status(200).json(result);
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

export const medicineController = {
  getMedicine,
  getMedicineById,
  createMedicine,
};
