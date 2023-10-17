export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user";

export interface PostOption {
  task: string;
  platform: string;
  engine: string;
  targets: [string];
  audiences: [string];
}

export interface Post {
  options: PostOption;
  content: string;
  data: [string];
}
