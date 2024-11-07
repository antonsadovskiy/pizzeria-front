import {
  CreateOrderRequestType,
  CreateOrderResponseType,
  GetAllOrdersResponseType,
  GetOrderByIdResponseType,
  StatusType,
  UpdateOrderRequestType,
  UpdateOrderResponseType,
} from './types.ts';
import { Api } from '../index.ts';

export class Order {
  public static async getOrderById(id: number) {
    const response = await Api.axios.get<GetOrderByIdResponseType>(
      `order/${id}`,
    );
    return response.data;
  }

  public static async adminUpdateOrder(
    id: number,
    data: UpdateOrderRequestType,
  ) {
    const response = await Api.axios.put<UpdateOrderResponseType>(
      `order/${id}`,
      data,
    );
    return response.data;
  }

  public static async adminDeleteOrder(id: number) {
    const response = await Api.axios.delete(`order/${id}`);
    return response.data;
  }

  public static async adminUpdateOrderStatus(id: number, status: StatusType) {
    const response = await Api.axios.put<UpdateOrderResponseType>(
      `order/${id}/update-status?status=${status}`,
    );

    return response.data;
  }

  public static async getAllOrders() {
    const response = await Api.axios.get<GetAllOrdersResponseType>('order');
    return response.data;
  }

  public static async adminCreateOrder(data: CreateOrderRequestType) {
    const response = await Api.axios.post<CreateOrderResponseType>(
      'order',
      data,
    );
    return response.data;
  }
}
