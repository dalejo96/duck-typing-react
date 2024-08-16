import { match } from 'ts-pattern';
import { FinalMessage, getUniqueId, isDefined, Nullable, State } from './common';
import { imGet, imSet, zipWith } from './immutable';
import { AppId, AppRegistration, AppSkeleton, SuccessState, Warning } from '../types/Common';
import { ComponentModel } from '../types/Models';

export const updateState = (msg: FinalMessage, state: State): State => {
  return match(state)
    .with({ type: 'success' }, (st) => {
      const hasComponents: boolean = isDefined(msg) && isDefined(msg.payload.components);
      if (
        msg?.payload.command &&
        (msg?.payload.command['@'] === 'display' || msg?.payload.command['@'] === 'display-result')
      ) {
        const appid = msg?.payload.app_id;
        const currentApp = imGet(st.apps)(appid);

        if (currentApp) {
          const [warn, stateappreg] = currentApp;
          const napps: AppRegistration = hasComponents
            ? {
                ...stateappreg,
                app_skeleton: {
                  ...stateappreg.app_skeleton,
                  components: zipWith(
                    stateappreg.app_skeleton.components,
                    msg?.payload.components,
                    updateComp(stateappreg.app_id)(false)
                  ),
                  command: msg?.payload.command
                },
                out_command: undefined
              }
            : {
                ...stateappreg,
                app_skeleton: {
                  ...stateappreg.app_skeleton,
                  command: msg?.payload.command
                },
                out_command: undefined
              };
          const nmp = imSet(st.apps)(appid, [warn, napps]);
          const res = { ...st, apps: nmp };
          return res;
        } else {
          const warn: Warning = {
            type: 'warning',
            warn: 'Message for unknown component ' + msg?.payload?.app_id,
            dta: msg
          };
          return processGlobalWarning(warn, st, null);
        }
      } else {
        const warn: Warning = {
          type: 'warning',
          warn: 'Message for unknown component ' + msg?.payload?.app_id,
          dta: msg
        };
        return processGlobalWarning(warn, st, null);
      }
    })
    .with({ type: 'critical' }, () => {
      return state;
    })
    .exhaustive();
};

const processGlobalWarning = (w: Warning, st: SuccessState, msgAppId: Nullable<AppId>): State => {
  const st1 = match(w)
    .with({ type: 'warning' }, (warn) => {
      return { ...st, unexpectedWarn: warn };
    })
    .with({ type: 'noWarn' }, () => st)
    .exhaustive();
  if (msgAppId && msgAppId !== '' && msgAppId !== 'unknown') {
    return stateOverApp(msgAppId, clearOutCommand, st1);
  } else return st1;
};

export const stateOverApp = (
  appId: AppId,
  fn: (_: AppRegistration) => AppRegistration,
  state: State
): State => {
  return match(state)
    .with({ type: 'success' }, (st) => {
      if (st.apps) {
        const old = imGet(st.apps)(appId);
        if (old) {
          const nmp = imSet(st.apps)(appId, [old[0], fn(old[1])]);
          return { ...st, apps: nmp };
        } else {
          return st;
        }
      } else {
        return st;
      }
    })
    .with({ type: 'critical' }, () => {
      return state;
    })
    .exhaustive();
};

export const clearOutCommand = (appReg: AppRegistration): AppRegistration => {
  return { ...appReg, out_command: undefined };
};

export const updateComp =
  (debugLoc: string) =>
  (inList: boolean) =>
  (statecomp: ComponentModel, msgcomp: ComponentModel): ComponentModel => {
    const id = inList ? msgcomp.id : msgcomp.id || statecomp.id;
    const defres = { ...msgcomp, id: id };
    if (statecomp.id && msgcomp?.id && statecomp.id !== msgcomp.id) {
      return defres;
    } else {
      if (statecomp.value) defres.value = statecomp.value; //we do not have any internal state on components at this time
      if (Array.isArray(statecomp.tchildren)) {
        if (!Array.isArray(msgcomp.tchildren)) {
        } else {
          defres.tchildren = zipWith(
            statecomp.tchildren,
            msgcomp.tchildren,
            updateComp(debugLoc)(inList)
          );
        }
      } else if (isDefined(statecomp.child)) {
        if (isDefined(msgcomp.child)) {
          defres.child = updateComp(debugLoc)(inList)(statecomp.child, msgcomp.child);
        }
      }
      return defres;
    }
  };

export const stateSetComponent = (appId: AppId, newcomp: ComponentModel, state: State): State => {
  const uniqueCid: string = getUniqueId(newcomp);
  return stateOverApp(
    appId,
    (appreg) => {
      const debugupdates: ComponentModel[] = [];
      const newcoms: ComponentModel[] = appreg.app_skeleton.components.map((oldcomp) => {
        if (getUniqueId(oldcomp) === uniqueCid) {
          debugupdates.push(oldcomp);
          return newcomp;
        } else {
          return oldcomp;
        }
      });
      const newAppSkeleton = { ...appreg.app_skeleton, components: newcoms };
      return { ...appreg, app_skeleton: newAppSkeleton };
    },
    state
  );
};
