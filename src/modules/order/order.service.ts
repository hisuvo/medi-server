import { OrderStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../constants/user-role";
import { prisma } from "../../lib/prisma";
import { userType } from "../../types/user";
import { createOrdersPayload } from "./create-order.type";
import { updateOrderStatusPayload } from "./udpate-order.type";

const getOrders = async (user: userType) => {
  // customer can see only their own orders
  // sellers can access her own medicines all orders

  if (user.role === UserRole.CUSTOMER) {
    const ownOrder = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    return ownOrder;
  }

  const ordersData = await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: user.id,
          },
        },
      },
    },
  });
  return ordersData;
};

const createOrders = async (payload: createOrdersPayload) => {
  const { userId, items, shipping } = payload;

  if (!userId) {
    throw new Error("User ID is required");
  }

  let total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const result = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.price,
        })),
      },

      ShippingAddress: {
        create: shipping,
      },
    },

    include: {
      items: true,
      ShippingAddress: true,
    },
  });
  return result;
};

const getOrderById = async (orderId: string, userId: string) => {
  const orderData = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (orderData?.userId !== userId) {
    throw new Error("You are unauthrozied!");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
  });

  return order;
};

const updateOrderStatus = async (
  payload: updateOrderStatusPayload,
  orderId: string,
  user: userType,
) => {
  const orderData = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      userId: true,
      status: true,
    },
  });

  // * If order status is PENDING that customer can update CANCLE order
  // * When order status drop on PROCESSING that customer can't update it
  // * Seller change all order status without canclled order

  if (
    user.role === UserRole.CUSTOMER &&
    orderData?.status === OrderStatus.PENDING &&
    orderData.userId === user.id
  ) {
    return await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: payload.status,
      },
    });
  }

  if (user.role !== UserRole.SELLER) {
    throw new Error("Only Seller can update user status");
  }

  if (orderData?.status === OrderStatus.CANCELLED) {
    throw new Error("You can not cancelled order status");
  }

  const result = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const ordersService = {
  getOrders,
  createOrders,
  getOrderById,
  updateOrderStatus,
};
