import { PostOption } from '.';

// Task Option
export type SelectedOptions = {
  task: string | null;
  engine: string | null;
  platform: string | null;
  targets: PostOption[];
  audiences: PostOption[];
};
// Instead of Using
export type SectionState = {
  taskSectionOpen: boolean;
  targetSectionOpen: boolean;
  audienceSectionOpen: boolean;
  platformSectionOpen: boolean;
  engineSectionOpen: boolean;
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
  engineOptions: PostOption[];
  modelOptions: string[];
};

// Model Train Setting
export type ModelSettings = {
  model: string | null;
  temperature: number;
};
