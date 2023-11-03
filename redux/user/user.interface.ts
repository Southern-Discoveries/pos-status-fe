import { IUser } from '@/types';
export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}

export interface ITokens {
  token: string;
  refresh_token: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser | null;
}

export interface ILoginResponse extends ITokens {}
