import { ImmutableMap } from '../utils/immutable';
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
  out_command?: Command;
}

export type AppItem = {
  app_id: AppId
  app_name: AppName
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

export type SuccessState = {
  type: 'success';
  apps: ImmutableMap<AppId, [AppRegistration]>;
};
