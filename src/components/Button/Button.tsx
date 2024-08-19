import React from 'react';
import MuiButton from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { ButtonModel } from '../../types/Models';
import { Command } from '../../types/Common';

const Button: React.FC<{
  comp: ButtonModel;
  onCommand: (cmd: Command) => void;
}> = ({ comp }) => {
  const handleClick = () => {
    alert('doing stuff!');
  };

  return (
    <MuiButton
      variant={comp.variant ?? 'contained'}
      onClick={handleClick}
      endIcon={comp.icon && <Icon className={comp.icon} />}>
      {comp.text || 'Unknown'}
    </MuiButton>
  );
};

export default Button;
