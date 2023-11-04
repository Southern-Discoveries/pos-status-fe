import axios from 'axios';
import Cookies from 'js-cookie';

import { instance } from '../api/api-interupt';

import { EnumTokens, saveTokensStorage } from './auth-helper';

import {
  ICreateUserInfo,
  ILoginInfo,
  IUser,
} from '@/redux/user/user.interface';

export class AuthService {
  private AUTH_URL = '/auth';

  async register(data: ICreateUserInfo) {
    // Current API no  return any thing
    // It jut a messsage
    const response = await instance<string>({
      method: 'POST',
      url: `${this.AUTH_URL}/register`,
      data,
    });

    if (response.status == 200) {
      this.login(data);
    }

    return response.data;
  }
  async logout() {
    const response = await instance<string, {}>({
      url: `${this.AUTH_URL}/logout`,
    });
    return response;
  }
  async login(data: ILoginInfo) {
    const response = await instance<any, any>({
      method: 'POST',
      url: `${this.AUTH_URL}/login`,
      data,
    });

    if (response.data.token) {
      saveTokensStorage(response.data);
      await this.getAuthUser();
    }

    return response;
  }

  async getAuthUser() {
    const access_token = Cookies.get(EnumTokens.ACCESSTOKEN);
    const response = await instance<string, { data: IUser }>({
      method: 'GET',
      url: `user`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  }
  async getNewTokens() {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);
    const response = await axios.post<
      string,
      { data: { access_token: string } }
    >(
      `http://127.0.0.1:8000${this.AUTH_URL}/refresh`,
      { token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (response.data.access_token) {
      Cookies.set(EnumTokens.ACCESSTOKEN, response.data.access_token);
    }
    return response.data;
  }
}

export default new AuthService();
