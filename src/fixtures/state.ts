import { AppRegistration, Warning } from '../types/Common';
import { State } from '../utils/common';

const mapApps = new Map<string, [Warning, AppRegistration]>();

mapApps.set('App-1', [
  {
    type: 'noWarn'
  },
  {
    app_id: 'App-1',
    app_name: 'App 1',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-1'
      },
      components: [
        {
          id: 'id-000',
          text: 'Please fill out the following form and tell us a bit about yourself.',
          type: 'text',
          variant: 'subtitle1'
        },
        {
          id: 'id-001',
          text: 'Full name',
          type: 'input',
          value: null
        },
        {
          id: 'id-002',
          text: 'Email',
          type: 'input',
          value: null
        },
        {
          id: 'id-003',
          text: 'Phone number',
          type: 'input',
          value: null
        },
        {
          id: 'id-004',
          text: 'Comments',
          type: 'textarea',
          value: null
        },
        {
          id: 'id-005',
          text: 'I accept the Terms of Policy',
          type: 'checkbox',
          value: false
        },
        {
          id: 'id-006',
          text: 'Submit',
          type: 'button',
          actions: [],
          variant: 'contained'
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
    app_name: 'App 2',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-2'
      },
      components: [
        {
          id: 'id-000',
          text: 'Please write your name on the input below',
          type: 'text',
          variant: 'h6'
        },
        {
          id: 'id-001',
          text: 'Name',
          type: 'input',
          value: null
        },
        {
          id: 'id-006',
          text: 'Submit',
          type: 'button',
          actions: [],
          variant: 'outlined'
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
    app_name: 'App 3',
    app_skeleton: {
      actions: [],
      command: {
        '@': 'display',
        value: 'App-3'
      },
      components: [
        {
          id: 'id-000',
          text: 'Please open the accordion and complete the information',
          type: 'text',
          variant: 'h6'
        },
        {
          id: 'id-001',
          label: 'My cool container',
          tchildren: [
            {
              id: 'id-002',
              text: 'First name',
              type: 'input',
              value: null
            },
            {
              id: 'id-003',
              text: 'Middle name',
              type: 'input',
              value: null
            },
            {
              id: 'id-004',
              text: 'Last name',
              type: 'input',
              value: null
            },
            {
              id: 'id-005',
              text: 'Action!',
              type: 'button',
              actions: [],
              variant: 'text'
            }
          ],
          type: 'accordion'
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
