import axios from 'axios';
import Cookies from 'js-cookie';

import { getContentType } from '../api/apiHelper';
import { instance } from '../api/apiInterupt';

import { EnumTokens, saveToStorage } from './auth.helper';

import { IAuthResponse } from '@/redux/user/user.interface';
import { ICreateUserInfo, ILoginInfo } from '@/types';

export class AuthService {
  private AUTH_URL = '/auth';

  async register(data: ICreateUserInfo) {
    const response = await instance<IAuthResponse>({
      method: 'POST',
      url: `${this.AUTH_URL}/register`,
      data,
    });

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response.data;
  }

  async login(data: ILoginInfo) {
    const response = await instance<string, { data: IAuthResponse }>({
      method: 'POST',
      url: `${this.AUTH_URL}/login`,
      data,
    });
    console.log(response.data);
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response.data;
  }

  async getNewTokens() {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);

    const response = await axios.post<string, { data: IAuthResponse }>(
      `${this.AUTH_URL}/refresh-token`,
      { refreshToken },
      { headers: getContentType() }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response.data;
  }
}

export default new AuthService();
