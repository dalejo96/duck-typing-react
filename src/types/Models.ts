export interface TextInputModel {
  id: string;
  type: "input" | "textarea";
  text: string;
  value: string;
}

export interface StaticTextModel {
  type: "text";
  title?: string;
  text: string;
}

export type TextAreaModel = TextInputModel;

export interface CheckboxModel {
  type: "checkbox";
  text: string;
  value: boolean;
}

export type ButtonActionEvent = "Click";

export interface ButtonAction {
  destination: string;
  event: ButtonActionEvent;
  perform_validation?: boolean;
  trigger_loading: boolean;
}

export interface ButtonModel {
  type: "button";
  text: string;
  actions: ButtonAction[];
  variant?: string;
  icon?: string;
}
