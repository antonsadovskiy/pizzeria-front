import {
  GetAllUsersResponseType,
  GetUserByIdResponseType,
  UpdateUserRequestType,
  UpdateUserResponseType,
  UserType,
} from './types.ts';
import { Api } from '../index.ts';

export class User {
  public static async adminGetUserById(id: number) {
    const response = await Api.axios.get<GetUserByIdResponseType>(`user/${id}`);
    return response.data;
  }

  public static async adminUpdateUser(id: number, data: UpdateUserRequestType) {
    const response = await Api.axios.put<UpdateUserResponseType>(
      `user/${id}`,
      data,
    );
    return response.data;
  }

  public static async adminDeleteUser(id: number) {
    const response = await Api.axios.delete(`user/${id}`);
    return response.data;
  }

  public static async adminGetAllUsers() {
    const response = await Api.axios.get<GetAllUsersResponseType>('user');
    return response.data;
  }

  public static async me() {
    const response = await Api.axios.get<UserType>('user/me');
    return response.data;
  }
}
