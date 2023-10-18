export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
  GPT_4 = "gpt-4"
}

export enum BardModel {
  CHAT_BISON = "models/chat-bison-001"
}

export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user";

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
