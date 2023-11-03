import axios from 'axios';
import Cookies from 'js-cookie';

import { instance } from '../api/api-interupt';

import {
  EnumTokens,
  saveTokensStorage,
  saveUserToStorage,
} from './auth-helper';

import {
  IAuthResponse,
  ICreateUserInfo,
  ILoginInfo,
} from '@/redux/user/user.interface';

export class AuthService {
  private AUTH_URL = '/auth';

  async register(data: ICreateUserInfo) {
    const response = await instance<IAuthResponse>({
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
    const response = await instance<string, { data: IAuthResponse }>({
      method: 'POST',
      url: `${this.AUTH_URL}/login`,
      data,
    });

    if (response.data.token) {
      saveTokensStorage(response.data);
      this.getAuthUser();
    }

    return response.data;
  }

  async getAuthUser() {
    const access_token = Cookies.get(EnumTokens.ACCESSTOKEN);
    const response = await instance<string, { data: any }>({
      method: 'GET',
      url: `user`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    saveUserToStorage(response.data);

    return response.data;
  }
  async getNewTokens() {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);

    /*   const response = await instance<string, { data: any }>({
      method: 'POST',
      url: `${this.AUTH_URL}/refresh`,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }); */
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
      // Update Refresh Token
      /*    saveTokensStorage(response.data); */
      Cookies.set(EnumTokens.ACCESSTOKEN, response.data.access_token);
    }

    return response.data;
  }
}

export default new AuthService();
