import { OrderStatus } from "../../../generated/prisma/enums";

export interface updateOrderStatusPayload {
  status: OrderStatus;
}
