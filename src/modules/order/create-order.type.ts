import { OrderItemType } from "../../types/order-item";

export interface createOrdersPayload {
  userId?: string;
  items: OrderItemType[];
}
