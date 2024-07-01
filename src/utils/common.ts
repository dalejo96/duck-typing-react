import { Action, AppId, AppRegistration, Command, StdComponentArgs } from '../types/Common';
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

export type Undefined = undefined | null;

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

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

export const appRegistrationSetComponent =
  (newcomp: ComponentModel) =>
  (appreg: AppRegistration): AppRegistration => {
    let alreadyReplacedFasthack = false;
    const newcoms: ComponentModel[] = appreg.app_skeleton.components.map((oldcomp) => {
      if (alreadyReplacedFasthack) return oldcomp;
      else {
        const [m, res] = setComponentRecursive(newcomp)(oldcomp);
        alreadyReplacedFasthack = m;
        return res;
      }
    });
    const newAppSkeleton = { ...appreg.app_skeleton, components: newcoms };

    return { ...appreg, app_skeleton: newAppSkeleton };
  };

export const setComponentRecursive =
  (newcomp: ComponentModel) =>
  (oldcomp: ComponentModel): [boolean, ComponentModel] => {
    const uniqueCid: string = getUniqueId(newcomp);

    if (getUniqueId(oldcomp) === uniqueCid) {
      return [true, newcomp];
    } else if (Array.isArray(oldcomp.tchildren)) {
      // this is fold we could go to a hack like above if slow
      const { match, cs } = oldcomp.tchildren.reduce(
        (acc: { match: boolean; cs: ComponentModel[] }, oldchild: ComponentModel) => {
          if (acc.match) return { match: true, cs: [...acc.cs, oldchild] };
          else {
            const [m, nc] = setComponentRecursive(newcomp)(oldchild);
            return { match: m, cs: [...acc.cs, nc] };
          }
        },
        { m: false, cs: [] as ComponentModel[] }
      );

      if (match) {
        return [match, { ...oldcomp, tchildren: cs }];
      } else return [match, oldcomp];
    } else if (isDefined(oldcomp.child)) {
      const [changed, res] = setComponentRecursive(newcomp)(oldcomp.child);
      if (changed) {
        return [changed, { ...oldcomp, child: res }];
      } else {
        return [false, oldcomp];
      }
    } else {
      return [false, oldcomp];
    }
  };

export const getUniqueId = (component: ComponentModel): string => {
  if (isDefined(component.type) && isUndefined(component.id)) {
    console.error('WARNING - no id', { comp: component });
  }

  return `${component.id || component.type}.${component.text || 'undefined-unique-id'}`;
};

export type Message = {
  components?: ComponentModel[];
  command?: Command;
  actions?: Action[];
  app_id: AppId;
};

export type FinalMessage = { type: 'msg'; payload: Message } | null;

export const commandMessage =
  (appReg: AppRegistration) =>
  (cmd: Command): FinalMessage => {
    const appSkeleton = appReg.app_skeleton;
    const payload: Message = {
      components: appSkeleton.components.map(cleanupOutMessage),
      command: cmd,
      actions: appSkeleton.actions,
      app_id: appReg.app_id
    };

    return { type: 'msg', payload };
  };

const cleanupOutMessage = (component: ComponentModel): ComponentModel => {
  const res = { ...component };
  if (Array.isArray(component.tchildren)) {
    res.tchildren = component.tchildren.map(cleanupOutMessage);
  }

  return res;
};
