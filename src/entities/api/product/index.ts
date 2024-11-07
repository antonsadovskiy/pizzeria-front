import { Api } from '../index.ts';
import {
  CreateProductRequestType,
  CreateProductResponseType,
  GetAllProductsResponseType,
  GetProductByIdResponseType,
  UpdateProductRequestType,
  UpdateProductResponseType,
} from './types.ts';

export class Product {
  public static async getProductById(id: number) {
    const response = await Api.axios.get<GetProductByIdResponseType>(
      `product/${id}`,
    );
    return response.data;
  }

  public static async adminUpdateProduct(
    id: number,
    data: UpdateProductRequestType,
  ) {
    const response = await Api.axios.put<UpdateProductResponseType>(
      `product/${id}`,
      data,
    );
    return response.data;
  }

  public static async adminDeleteProduct(id: number) {
    const response = await Api.axios.delete(`product/${id}`);

    return response.data;
  }

  public static async getAllProducts() {
    const response = await Api.axios.get<GetAllProductsResponseType>(`product`);
    return response.data;
  }

  public static async adminCreateProduct(data: CreateProductRequestType) {
    const response = await Api.axios.post<CreateProductResponseType>(
      `product`,
      data,
    );
    return response.data;
  }
}
