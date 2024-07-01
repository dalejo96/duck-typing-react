import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { CheckBoxOutlineBlankSharp, CheckBoxSharp } from '@mui/icons-material';

import { CheckboxModel } from '../../types/Models';
import { Command } from '../../types/Common';

const CheckBoxField: React.FC<{
  comp: CheckboxModel;
  onCommand: (cmd: Command) => void;
  onChange: (_: CheckboxModel) => void;
}> = ({ comp, onChange }) => {
  // TODO
  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(userCheckboxAction(comp, e.target.checked));
  }; */

  const label = comp.text || '';

  return (
    <FormControl sx={{ display: 'block', marginBottom: (theme) => theme.spacing(2) }}>
      <FormControlLabel
        label={label}
        sx={{
          marginRight: 0
        }}
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankSharp />}
            checkedIcon={<CheckBoxSharp />}
            checked={comp.value}
            name={label}
            onClick={() => {
              // TODO
            }}
          />
        }
      />
    </FormControl>
  );
};

export default CheckBoxField;
