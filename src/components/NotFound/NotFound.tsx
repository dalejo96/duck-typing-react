import { Box, Button, Typography, darken, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC<{
  message: string;
}> = ({ message }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          textAlign: 'center'
        }}>
        <Box
          sx={{
            margin: '12px 0 24px'
          }}>
          <Typography
            variant="h2"
            sx={{
              color: (style) => style.palette.primary.dark
            }}>
            Oops!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: (style) => darken(style.palette.primary.light, 0.2),
              fontWeight: 400,
              margin: '6px 0'
            }}>
            Something went wrong.
          </Typography>
        </Box>
        <Box
          sx={{
            fontWeight: '500',
            background: (style) => style.palette.secondary.main,
            color: (style) => style.palette.primary.dark,
            borderRadius: '4px',
            margin: '0 auto',
            padding: '14px 18px',
            lineHeight: '1.6',
            [theme.breakpoints.up('xs')]: {
              minWidth: 'unset',
              width: 'unset'
            },
            [theme.breakpoints.up('sm')]: {
              minWidth: '400px',
              width: '60%'
            },
            [theme.breakpoints.up('md')]: {
              minWidth: '500px',
              width: '50%'
            }
          }}>
          {message}
        </Box>
        <Box
          sx={{
            margin: '24px 0 0 0'
          }}>
          <Button variant="contained" component={Link} to="/">
            Go Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
