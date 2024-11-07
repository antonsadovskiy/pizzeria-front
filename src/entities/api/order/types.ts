import { ProductType } from '../product/types.ts';

export type StatusType = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'PROCESSING';

export type OrderType = {
  id: number;
  status: StatusType;
  orderItems: {
    id: number;
    product: ProductType;
    quantity: number;
  }[];
};

export type GetOrderByIdResponseType = OrderType;

export type UpdateOrderRequestType = {
  status: StatusType;
  orderItems: {
    id: number;
    order: number;
    product: number;
    quantity: number;
  }[];
};

export type UpdateOrderResponseType = OrderType;

export type GetAllOrdersResponseType = OrderType[];

export type CreateOrderRequestType = {
  orderItems: {
    product: {
      id: number;
      name: string;
      price: number;
      description: string;
      category: {
        name: string;
      };
    };
    quantity: number;
  }[];
};

export type CreateOrderResponseType = OrderType;
