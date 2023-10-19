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
