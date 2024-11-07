import {
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
  RegisterResponseType,
} from './types.ts';
import { Api } from '../index.ts';

export class Auth {
  public static async register(data: RegisterRequestType) {
    const response = await Api.axios.post<RegisterResponseType>(
      `auth/register`,
      data,
    );

    if (response.data.access_token) {
      Api.accessToken = response.data.access_token;
    }

    return response.data;
  }

  public static async login(data: LoginRequestType) {
    const response = await Api.axios.post<LoginResponseType>(
      'auth/authenticate',
      data,
    );

    if (response.data.access_token) {
      Api.accessToken = response.data.access_token;
    }

    return response.data;
  }

  public static async refresh() {
    const response = await Api.axios.post('auth/refresh-token');
    return response.data;
  }
}
