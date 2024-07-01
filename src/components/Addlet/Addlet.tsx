import React from 'react';
import { useParams } from 'react-router-dom';
import {
  FinalMessage,
  appRegistrationSetComponent,
  commandMessage,
  isDefined,
  isUndefined
} from '../../utils/common';
import NotFound from '../NotFound/NotFound';
import { AppId, AppRegistration, Command, SuccessState } from '../../types/Common';
import { ComponentModel } from '../../types/Models';
import { imGet } from '../../utils/immutable';
import SwitchYard from '../SwitchYard/SwitchYard';

type AddletEffParams = {
  id: string;
};

const Addlet: React.FC<{
  state?: SuccessState;
  onAppChange?: (appId: AppId, appReg: AppRegistration) => void;
  onComponentChange?: (appId: AppId) => (c: ComponentModel) => void;
  onOutMsg?: (msg: FinalMessage) => Promise<void>;
}> = ({ state, onAppChange, onComponentChange, onOutMsg }) => {
  const { id } = useParams<AddletEffParams>() as AddletEffParams;
  const app = imGet(state!.apps)(id);
  const handleComponentChange = onComponentChange!(id);

  if (isUndefined(app)) {
    return <NotFound message="Invalid app ID." />;
  }

  const [appReg] = app;

  const sendMsgHandler = async (cmd: Command, c?: ComponentModel): Promise<void> => {
    onAppChange!(id, { ...appReg, out_command: cmd });
    const modappreg = isDefined(c) ? appRegistrationSetComponent(c)(appReg) : appReg;
    await onOutMsg!(commandMessage(modappreg)(cmd));
  };

  return (
    <>
      {appReg.app_skeleton.components.map((comp, idx) => (
        <SwitchYard
          key={idx}
          comp={comp}
          onComponentChange={handleComponentChange}
          onCommand={sendMsgHandler}
          appInfo={app}
        />
      ))}
    </>
  );
};

export default Addlet;
