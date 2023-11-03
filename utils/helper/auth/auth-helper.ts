/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import Cookies from 'js-cookie';

import { IAuthResponse, ITokens } from '@/redux/user/user.interface';

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESSTOKEN);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(EnumTokens.ACCESSTOKEN, data.token);
  Cookies.set(EnumTokens.REFRESHTOKEN, data.refresh_token);
};

export const removeFromStorage = () => {
  console.log('Remove from local storage');
  Cookies.remove(EnumTokens.ACCESSTOKEN);
  Cookies.remove(EnumTokens.REFRESHTOKEN);
  localStorage.removeItem('user');
};

// Save Data User
export const saveUserToStorage = (data: IAuthResponse) => {
  localStorage.setItem('user', JSON.stringify(data));
};

export enum EnumTokens {
  ACCESSTOKEN = 'token',
  REFRESHTOKEN = 'refresh_token',
}
