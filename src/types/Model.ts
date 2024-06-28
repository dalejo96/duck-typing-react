export type TextInputModel = {
  id: string;
  type: "input" | "textarea";
  text: string;
  value: string;
};

export type StaticTextModel = {
  type: "text";
  title?: string;
  text: string;
};

export type TextAreaModel = TextInputModel;

export type CheckboxModel = {
  type: "checkbox";
  text: string;
  value: boolean;
};

export type ButtonActionEvent = "Click";

export type ButtonAction = {
  destination: string;
  event: ButtonActionEvent;
  perform_validation?: boolean;
  trigger_loading: boolean;
};

export type ButtonModel = {
  text: string;
  actions: ButtonAction[];
  variant?: string;
  icon?: string;
};
