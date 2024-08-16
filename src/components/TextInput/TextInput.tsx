import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { InputBase } from '@mui/material';
import { TextInputModel } from '../../types/Models';

const InputTextField: React.FC<{
  comp: TextInputModel;
  multiline: boolean;
}> = ({ comp, multiline }) => {
  const [inputValue, setInputValue] = useState(comp.value);
  const label = comp.text || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <InputBase
        type="text"
        id={label}
        name={label}
        value={inputValue}
        onChange={handleChange}
        sx={{
          width: '100%'
        }}
        multiline={multiline}
      />
    </FormControl>
  );
};

export default InputTextField;
