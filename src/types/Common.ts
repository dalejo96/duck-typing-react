import { ComponentModel } from './Models';

export type AppId = string;
export type AppName = string;
export type Action = object;

export interface AppSkeleton {
  components: ComponentModel[];
  command?: Command;
  actions?: Action[];
}

export interface AppRegistration {
  app_id: AppId;
  app_name: AppName;
  app_skeleton: AppSkeleton;
}

export interface Command {
  '@': string;
  value: string;
}

export type StdComponentArgs<T> = {
  comp: T;
  onCommand: (cmd: Command) => void;
  onComponentChange: (newComponent: T) => void;
  appInfo: [AppRegistration];
};
