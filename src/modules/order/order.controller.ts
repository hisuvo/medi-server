import { Request, Response } from "express";
import { ordersService } from "./order.service";

const getOrders = async (req: Request, res: Response) => {};

const createOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are unauthorized!");
    }

    const { items } = req.body;

    if (!items || items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const result = await ordersService.createOrders({
      userId: user?.id,
      items,
    });

    res.status(209).json({
      success: true,
      message: "Order created successfully",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(209).json({
      success: true,
      message: "Order created successfully",
      details,
    });
  }
};
// order client data
/** 
     * {
        "items": [
          { "medicineId": "med-uuid-1", "quantity": 2, "price": 50 },
          { "medicineId": "med-uuid-2", "quantity": 1, "price": 20.5 }
        ]
      }
    */

export const ordersController = {
  getOrders,
  createOrders,
};
