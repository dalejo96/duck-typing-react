import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, useTheme } from '@mui/material';

import { AppItem } from '../../types/Common';
import Hamburger from './Hamburguer';
import AddletList from '../AddletList/AddletList';

const Drawer: React.FC<{
  appList: AppItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ appList, open, onOpen, onClose }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          overflowX: 'visible',
          height: '100%',
          zIndex: (theme) => theme.zIndex.drawer,
          transform: 'translateX(-100%)',
          transition: 'transform 300ms ease-in-out'
        }}>
        <IconButton
          onClick={open ? onClose : onOpen}
          size="small"
          sx={{
            zIndex: 10,
            color: (style) => style.palette.grey[100],
            position: 'absolute',
            top: 0
          }}>
          <Hamburger />
        </IconButton>
        <Box
          sx={{
            width: { xs: '100%', sm: 'var(--drawer-width)' },
            overflowY: 'auto !important',
            height: '100%',
            backgroundColor: (theme) => theme.palette.primary.dark
          }}>
          <Box
            sx={{
              marginTop: '32px'
            }}>
            <Typography
              variant="subtitle2"
              id="all-apps-title"
              sx={{
                margin: { xs: '0 0 0 12px', sm: '0 0 0 20px' },
                color: (theme) => theme.palette.primary.light
              }}>
              All apps ({appList.length})
            </Typography>
            <Addlet`1List appList={appList} closeFn={onClose} open={open} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'none',
          [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 'var(--drawer-width)',
            zIndex: (theme) => theme.zIndex.drawer - 1,
            '&.juvo-drawer-overlay-open': {
              display: 'block'
            }
          }
        }}
        onClick={onClose}
      />
    </>
  );
};

export default Drawer;
