// User Interface
export interface IUser {
  id: string;
  email: string;
}

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

// Register Info
export interface ICreateUserInfo extends Pick<IUser, 'email'> {
  password: string;
}
// Login with email , password
export interface ILoginInfo extends Pick<IUser, 'email'> {
  password: string;
}

// Refresh API from server response
export interface IRefreshResponse {
  access_token: string;
}
