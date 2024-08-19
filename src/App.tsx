import { useState } from 'react';
import { match } from 'ts-pattern';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Addlet from './components/Addlet/Addlet';
import { AppId, AppRegistration, CtxMessage, emptyMsg } from './types/Common';
import { FinalMessage, isUndefined } from './utils/common';
import { stateOverApp, stateSetComponent, updateState } from './utils/state';
import { ComponentModel } from './types/Models';
import { useWsConnection } from './hooks/useWsConnection';
import { emptyState } from './fixtures/state';
import Home from './components/Home/Home';

const App = () => {
  // harcoded initial state, this could be handled in different ways
  const [apps, setApps] = useState(emptyState);
  const [outMsg, setOutMessage] = useState<FinalMessage | CtxMessage>(emptyMsg);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //sets outMsg state, so it is available for the WS component
  const outMsgHandler = async (msg: FinalMessage) => {
    if (msg === null) {
      setOutMessage(msg);
    } else {
      const command = msg.payload?.command;
      if (isUndefined(command)) {
        setOutMessage(msg);
      } else {
        const newcommand = { ...command };
        const newpayload = { ...msg.payload, command: newcommand };
        setOutMessage({ ...msg, payload: newpayload });
      }
    }
  };

  //handler for processing WebSocket inbound (from server) messages
  const inMsgHandler = (msg: FinalMessage): void => {
    console.log('inMsgHandler - setApps');
    setApps((prevApps) => updateState(msg, prevApps));
  };

  const userComponentActionHandler = (appId: AppId) => (c: ComponentModel) => {
    const newApps = stateSetComponent(appId, c, apps);
    setApps(newApps);
  };

  const onAppChange = (appId: AppId, appReg: AppRegistration): void => {
    setApps(stateOverApp(appId, () => appReg, apps));
  };

  useWsConnection({
    outMsg,
    inMsg: inMsgHandler
  });

  console.log('apps');
  console.log(apps);

  const content = match(apps)
    .with({ type: 'success' }, (res) => {
      console.log(res);
      return (
        <Router basename="/">
          <Box
            className="main-container"
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#dfdfe1'
            }}>
            <Paper
              className="application-box"
              elevation={6}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(100% - 3rem)',
                  md: '92%',
                  lg: '1100px'
                },
                flex: 1,
                overflowY: 'hidden',
                borderRadius: 0,
                position: 'relative',
                marginTop: '1.5rem'
              }}>
              <Box
                className="app-content"
                sx={{
                  height: `calc(100% - var(--header-height))`,
                  padding: { xs: '20px', md: '28px' },
                  overflowY: 'auto'
                }}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home apps={res.appList} onAllAppsClicked={() => setDrawerOpen(true)} />
                    }
                  />
                  <Route
                    path="apps/:id"
                    element={
                      <Addlet
                        state={res}
                        onAppChange={onAppChange}
                        onComponentChange={userComponentActionHandler}
                        onOutMsg={outMsgHandler}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
            </Paper>
          </Box>
        </Router>
      );
    })
    .with({ type: 'critical' }, (res) => {
      return <p>Critical error!</p>;
    })
    .exhaustive();

  return <>{content}</>;
};

export default App;
