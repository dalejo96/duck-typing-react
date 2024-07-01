import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { alpha } from '@mui/material';
import { AppItem } from '../../types/Common';

const AddletList: React.FC<{
  appList: AppItem[];
  closeFn: () => void;
  open: boolean;
}> = ({ appList, closeFn, open }) => {
  const location = useLocation();

  return (
    <List>
      {appList.map((app) => (
        <ListItem
          key={app.app_id}
          sx={{
            padding: '0 !important',
            '& .MuiListItemSecondaryAction-root': {
              opacity: 0,
              transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              button: {
                color: 'white !important'
              },
              right: { xs: '8px', sm: '16px' }
            },
            '&:hover .MuiListItemSecondaryAction-root': {
              opacity: 1
            }
          }}>
          <ListItemButton
            data-testid={`addlet-item-${app.app_id}`}
            component={Link}
            onClick={closeFn}
            tabIndex={open ? 0 : -1}
            to={`apps/${app.app_id}`}
            selected={location.pathname.split('/').pop() === app.app_id}
            sx={{
              color: (style) => style.palette.grey[200],
              borderLeft: '5px solid transparent',
              padding: {
                xs: '12px 24px 12px 10px !important',
                sm: '12px 24px !important'
              },
              '&:hover': {
                background: (style) => alpha(style.palette.primary.main, 0.5),
                '.drawer-menu-item-label span, .drawer-menu-item-icon': {
                  color: 'white'
                }
              },
              '&.Mui-selected, &.Mui-selected:hover': {
                background: (style) => style.palette.primary.main,
                '.drawer-menu-item-label span, .drawer-menu-item-icon': {
                  color: 'white'
                }
              }
            }}>
            <ListItemText
              primary={app.app_name}
              className="drawer-menu-item-label"
              sx={{
                span: {
                  color: (style) => style.palette.grey[300],
                  fontSize: '0.9em',
                  fontWeight: 500
                },
                marginRight: { xs: '20px' }
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default AddletList;
