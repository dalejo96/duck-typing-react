import { StdComponentArgs } from '../types/Common';
import { CheckboxModel, ComponentModel } from '../types/Models';

export const adjustStdComponentArgs = (
  sc: StdComponentArgs<any>,
  comp: ComponentModel,
  onComponentChange: (newComponent: ComponentModel) => void
): StdComponentArgs<any> => {
  return { ...sc, comp: comp, onComponentChange: onComponentChange };
};

export const containerSetChild = (
  childComp: ComponentModel,
  inx: number,
  containerComp: ComponentModel
): ComponentModel => {
  const children: ComponentModel[] = containerComp.tchildren || [];
  const newChildren = children.map((cp, ix) => (ix === inx ? childComp : cp));
  return { ...containerComp, tchildren: newChildren };
};

export type Undefined = undefined | null

export const isUndefined = (value: unknown): value is Undefined => {
  return value === undefined || value === null;
};

export const isUndefinedBool = (value: unknown): boolean => {
  return value === undefined || value === null;
};

export const userCheckboxAction: <T extends CheckboxModel>(component: T, checked: boolean) => T = (
  component,
  checked
) => {
  return { ...component, value: checked };
};
