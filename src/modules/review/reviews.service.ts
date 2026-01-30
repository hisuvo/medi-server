import { OrderStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../constants/user-role";
import { prisma } from "../../lib/prisma";
import { ReviewsCreatePayload } from "./review.payload";

const getReviews = async () => {};

const createReviews = async (payload: ReviewsCreatePayload) => {
  const { data, user } = payload;
  //  customer can review if order status is delevered
  //  customerid and order userId is same then

  const isCustomer = user.role === UserRole.CUSTOMER;

  if (!isCustomer) {
    throw new Error("Only Customer can review their orders");
  }

  const orderData = await prisma.order.findFirst({
    select: {
      userId: true,
      status: true,
    },
  });

  if (
    orderData?.userId !== user.id &&
    orderData?.status !== OrderStatus.DELIVERED
  ) {
    throw new Error("you are unauthorized!");
  }

  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      userId: user.id,
      medicineId: data.medicineId,
    },
  });
};

export const reviewsService = {
  createReviews,
  getReviews,
};
