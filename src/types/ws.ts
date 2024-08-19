import { Nullable } from '../utils/common';
import { Action, AppId, Command } from './Common';
import { ComponentModel } from './Models';

export type AppMessage = {
  components?: Nullable<ComponentModel[]>;
  command?: Nullable<Command>;
  actions?: Nullable<Action[]>;
  app_id: AppId;
  from?: Nullable<any>;
  tabs?: Nullable<any[]>;
  req_stamp?: Nullable<string>;
};

export type PingMessage = {
  msgtype: 'ping';
};

export const isAppMessage = (component: any): component is AppMessage => {
  return Array.isArray(component.components) || component.command !== undefined;
};

export const isPingMessage = (t: any): t is PingMessage => {
  return t?.msgtype === 'ping';
};
