import { useState } from 'react';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Addlet from './components/Addlet/Addlet';
import Drawer from './components/Drawer/Drawer';
import { AppItem } from './types/Common';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // TODO implement functionality
  const appList: AppItem[] = [];

  return (
    <Router basename="">
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
          <Drawer
            appList={appList}
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
          />
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
                  //TODO home
                  //<Home apps={res.apps} onAllAppsClicked={() => setDrawerOpen(true)} />
                  <p>Home!</p>
                }
              />
              <Route
                path="apps/:id"
                element={
                  //TODO add handlers
                  <Addlet
                    //state={{ type: 'success', apps: [] }}
                    onAppChange={() => console.log('onAppChange')}
                    //onComponentChange={() => console.log('onComponentChange')}
                    //onOutMsg={}
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
};

export default App;
