import {
  CreateCategoryResponseType,
  GetAllCategoriesResponseType,
  GetCategoryByIdResponseType,
  UpdateCategoryResponseType,
} from './types.ts';
import { Api } from '../index.ts';

export class Category {
  public static async getCategoryById(id: number) {
    const response = await Api.axios.get<GetCategoryByIdResponseType>(
      `category/${id}`,
    );
    return response.data;
  }

  public static async updateCategory(id: number, data: { name: string }) {
    const response = await Api.axios.put<UpdateCategoryResponseType>(
      `category/${id}`,
      data,
    );
    return response.data;
  }

  public static async deleteCategory(id: number) {
    const response = await Api.axios.delete(`category/${id}`);
    return response.data;
  }

  public static async getAllCategories() {
    const response =
      await Api.axios.get<GetAllCategoriesResponseType>(`category`);
    return response.data;
  }

  public static async createCategory(data: { name: string }) {
    const response = await Api.axios.post<CreateCategoryResponseType>(
      `category`,
      data,
    );
    return response.data;
  }
}
