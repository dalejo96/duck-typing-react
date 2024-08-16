import { AppRegistration, Warning } from '../types/Common';
import { State } from '../utils/common';

const mapApps = new Map<string, [Warning, AppRegistration]>();

mapApps.set('App-1', [
  {
    type: 'noWarn'
  },
  {
    app_id: 'App-1',
    app_name: 'hello',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-1'
      },
      components: [
        {
          error: null,
          id: null,
          input_actions: [],
          loading: false,
          options: [],
          recommendation: 'Change Me!',
          text: 'Hello World',
          type: 'input',
          validations: {},
          value: null
        }
      ]
    },
    out_command: undefined
  }
]);

mapApps.set('App-2', [
  {
    type: 'noWarn'
  },
  {
    app_id: 'App-2',
    app_name: 'hello',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-2'
      },
      components: [
        {
          error: null,
          id: null,
          input_actions: [],
          loading: false,
          options: [],
          recommendation: 'Change Me!',
          text: 'Hello World App 2',
          type: 'input',
          validations: {},
          value: null
        }
      ]
    },
    out_command: undefined
  }
]);

mapApps.set('App-3', [
  {
    type: 'noWarn'
  },
  {
    app_id: 'App-3',
    app_name: 'hello',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-3'
      },
      components: [
        {
          error: null,
          id: null,
          input_actions: [],
          loading: false,
          options: [],
          recommendation: 'Change Me!',
          text: 'Hello World App 3',
          type: 'input',
          validations: {},
          value: null
        }
      ]
    },
    out_command: undefined
  }
]);

export const emptyState: State = {
  type: 'success',
  appList: [
    {
      app_id: 'App-1',
      app_name: 'App 1 name'
    },
    {
      app_id: 'App-2',
      app_name: 'App 2 name'
    },
    {
      app_id: 'App-3',
      app_name: 'App 3 name'
    }
  ],
  apps: {
    internal: mapApps
  }
};
