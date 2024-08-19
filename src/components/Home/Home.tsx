import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Box } from '@mui/material';
import { AppItem } from '../../types/Common';

const Home: React.FC<{
  apps: AppItem[];
  onAllAppsClicked: () => void;
}> = ({ apps, onAllAppsClicked }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: 'black'
      }}>
      <Box
        sx={{
          padding: '36px 0',
          marginBottom: '8px',
          '& img': {
            width: { xs: '300px', md: '400px' }
          }
        }}></Box>
      <Box
        sx={{
          width: { xs: '100%', md: '800px' },
          maxWidth: '100%',
          margin: '16px 0',
          padding: { xs: '0 16px', sm: '0 64px', md: 0 },
          display: { xs: 'block', md: 'grid' },
          gridTemplateColumns: '1fr 1fr',
          gap: '8px'
        }}>
        {apps.map((app) => (
          <Button
            component={NavLink}
            to={`apps/${app.app_id}`}
            className="recommended-app"
            key={app.app_id}
            sx={{
              width: '100%',
              textTransform: 'capitalize',
              display: 'flex',
              justifyContent: 'left',
              transition: 'all 0.22s ease',
              overflow: 'hidden',
              marginBottom: { xs: '8px', md: 0 },
              padding: '20px 64px 20px 20px',
              gap: '8px',
              color: 'white',
              background: (style) => style.palette.primary.main,
              '&:hover': {
                background: (style) => style.palette.primary.dark,
                '*': {
                  color: 'white'
                },
                '.recommended-app-arrow': {
                  transform: 'translateX(0)'
                }
              }
            }}>
            <Typography
              sx={{
                fontWeight: (style) => style.typography.fontWeightMedium,
                transition: 'all 0.22s ease'
              }}>
              {app.app_name}
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                transform: 'translateX(100%)',
                overflow: 'hidden',
                transition: 'transform 0.22s ease',
                padding: '0 20px',
                background: (style) => style.palette.secondary.main
              }}></Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
