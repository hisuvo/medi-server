import { OrderItemType } from "../../types/order-item";
import { ShippingAddressType } from "../../types/shoping-address";

export interface createOrdersPayload {
  userId?: string;
  items: OrderItemType[];
  shipping: ShippingAddressType;
}
