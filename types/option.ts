import { PostOption } from '.';

// Task Option
export type SelectedOptions = {
  task: string | null;
  engine: string | null;
  platform: string | null;
  targets: PostOption[];
  audiences: PostOption[];
};

// Basic Info Of Model
export interface Selected {
  name: string;
  des: string;
  models?: any;
}

export type Options = {
  taskOptions: Selected[];
  targetOptions: Selected[];
  audienceOptions: Selected[];
  platformOptions: Selected[];
};

// Model Train Setting
export type ModelSettings = {
  model: string | null;
  temperature: number;
};
