import axios from 'axios';
import Cookies from 'js-cookie';

import { EnumTokens, saveTokensStorage } from './user-helper';

import { instance } from '@/axios/api-interupt';
import {
  ICreateUserInfo,
  ILoginInfo,
  IUser,
} from '@/redux/user/user-interface';

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

    return response;
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
    return response;
  }
  async getNewTokens() {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);
    const response = await axios.post<
      string,
      { data: { access_token: string } }
    >(
      `${process.env.NEXT_PUBLIC_AI_SERVICE_URL}${this.AUTH_URL}/refresh`,
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
    return response;
  }
}

export default new AuthService();
