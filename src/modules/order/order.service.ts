import { UserRole } from "../../constants/user-role";
import { prisma } from "../../lib/prisma";
import { userType } from "../../types/user";
import { createOrdersPayload } from "./create-order.type";

const getOrders = async (user: userType) => {
  // customer can see only their own orders
  // admins and sellers can access all orders

  if (user.role === UserRole.CUSTOMER) {
    const ownOrder = await prisma.order.findMany({
      where: {
        id: user.id,
      },
    });

    return ownOrder;
  }

  const ordersData = await prisma.order.findMany();
  return ordersData;
};

const createOrders = async (payload: createOrdersPayload) => {
  const { userId, items } = payload;

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
    },

    include: {
      items: true,
    },
  });
  return result;
};

export const ordersService = {
  getOrders,
  createOrders,
};
