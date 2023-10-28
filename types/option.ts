import { PostOption } from '.';

// Task Option
export type SelectedOptions = {
  task: PostOption | null;
  engine: PostOption | null;
  platform: PostOption | null;
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

export type Options = {
  taskOptions: PostOption[];
  targetOptions: PostOption[];
  audienceOptions: PostOption[];
  platformOptions: PostOption[];
  engineOptions: PostOption[];
  modelOptions: string[];
};

// Model Train Setting
export type ModelSettings = {
  model: string | null;
  temperature: number;
};
