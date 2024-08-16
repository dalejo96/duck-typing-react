import { FinalMessage } from '../utils/common';
import { ImmutableMap } from '../utils/immutable';
import { ComponentModel } from './Models';

export type AppId = string;
export type Guid = string
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
  app_id: AppId;
  app_name: AppName;
};

export interface Command {
  '@': string;
  value: string;
}

export type StdComponentArgs<T> = {
  comp: T;
  onCommand: (cmd: Command) => void;
  onComponentChange: (newComponent: T) => void;
  appInfo: [Warning, AppRegistration];
};

export type SuccessState = {
  type: 'success';
  appList: AppItem[]
  apps: ImmutableMap<AppId, [Warning, AppRegistration]>;
};

export type CritErr = {
  msg: string;
  hint: string;
  err: any;
};

export type ErrorState = {
  type: 'critical';
  err: CritErr;
};

export type Context = any | { '@': string }

export type CtxMessage = { type: 'msgctx'; payload: Context };

export const emptyMsg: FinalMessage = null;

export type Warning = { type: 'noWarn' } | WarningIssue

export type WarningIssue = { type: 'warning'; warn: string; dta: any }