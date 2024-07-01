import React from 'react';
import { Typography } from '@mui/material';
import { ComponentModel } from '../../types/Models';

const MissingComponent: React.FC<{ comp: ComponentModel }> = ({ comp }) => {
  const componentType = comp.type;

  return (
    <>
      <Typography variant="body1">{comp.text}</Typography>
      <Typography variant="body1">{componentType} is not recognized</Typography>
    </>
  );
};

export default MissingComponent;
