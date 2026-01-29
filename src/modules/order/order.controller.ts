import { Request, Response } from "express";
import { ordersService } from "./order.service";
import { UserRole } from "../../constants/user-role";

const getOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are Unauthorized!");
    }

    const result = await ordersService.getOrders(user);

    res.status(209).json({
      success: true,
      message: "Order retrived successfully",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(400).json({
      success: true,
      message: "Order retrived failed",
      details,
    });
  }
};

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

    res.status(400).json({
      success: false,
      message: "Order created failed",
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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("You are Unauthorized!");
    }

    const { orderId } = req?.params;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("OrderId is required for show order details");
    }

    const result = await ordersService.getOrderById(orderId, user.id);

    res.status(209).json({
      success: true,
      message: "Order details retrived successfully",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(400).json({
      success: true,
      message: "Order details retrived failed",
      details,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  // only seller can update order status
  try {
    const seller = req.user;

    if (!seller) {
      throw new Error("You are unauthorized!");
    }

    const { orderId } = req?.params;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("OrderId is required");
    }

    const isSeller = req.user?.role === UserRole.SELLER;

    const result = await ordersService.updateOrderStatus(
      req.body,
      orderId,
      isSeller,
    );

    res.status(209).json({
      success: true,
      message: "Order status updated successfully",
      result,
    });
  } catch (error: any) {
    let details = error.message ? error.message : error;

    res.status(400).json({
      success: true,
      message: "Order status updated failed",
      details,
    });
  }
};

export const ordersController = {
  getOrders,
  createOrders,
  getOrderById,
  updateOrderStatus,
};
