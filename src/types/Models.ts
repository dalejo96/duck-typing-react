import { Variant } from '@mui/material/styles/createTypography';

export type ComponentModel = any;

export interface TextInputModel {
  id: string;
  type: 'input' | 'textarea';
  text: string;
  value: string;
}

export interface StaticTextModel {
  type: 'text';
  title?: string;
  text: string;
  variant?: Variant;
}

export type TextAreaModel = TextInputModel;

export interface CheckboxModel {
  type: 'checkbox';
  text: string;
  value: boolean;
}

export type ButtonActionEvent = 'Click';

export interface ButtonAction {
  destination: string;
  event: ButtonActionEvent;
  perform_validation?: boolean;
  trigger_loading: boolean;
}

export type ButtonVariant = 'text' | 'contained' | 'outlined';

export interface ButtonModel {
  type: 'button';
  text: string;
  actions: ButtonAction[];
  variant?: ButtonVariant;
  icon?: string;
}

export interface AccordionModel {
  type: 'accordion';
  label: string;
  tchildren: ComponentModel[];
}