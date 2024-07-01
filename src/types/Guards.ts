import {
  AccordionModel,
  ButtonModel,
  CheckboxModel,
  ComponentModel,
  StaticTextModel,
  TextAreaModel,
  TextInputModel
} from './Models';

export const isTextInputModel = (component: ComponentModel): component is TextInputModel => {
  return component.type === 'input';
};

export const isTextAreaModel = (component: ComponentModel): component is TextAreaModel => {
  return component.type === 'textarea';
};

export const isStaticTextModel = (component: ComponentModel): component is StaticTextModel => {
  return component.type === 'text';
};

export const isCheckboxModel = (component: ComponentModel): component is CheckboxModel => {
  return component.type === 'checkbox';
};

export const isButtonModel = (component: ComponentModel): component is ButtonModel => {
  return component.type === 'button';
};

export const isAccordionModel = (component: ComponentModel): component is AccordionModel => {
  return component.type === 'accordion';
};
