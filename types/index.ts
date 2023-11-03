export type Role = 'assistant' | 'user';
export interface Message {
  role: Role;
  content: string;
}

export interface PostOption {
  task: string;
  platform: string;
  targets: [string];
  audiences: [string];
}

export interface EngineConfig {
  engine: string;
  model: string;
  temperature: string;
}

export interface Post {
  postConfig: PostOption;
  engine: EngineConfig;
  content: string;
  data: [string];
}

// User Interface
export interface IUser {
  id: string;
  email: string;
  username?: string;
}

// Register Info
export interface ICreateUserInfo extends Pick<IUser, 'email'> {
  password: string;
}
// Login with email , password
export interface ILoginInfo extends Pick<IUser, 'email'> {
  password: string;
}
