import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
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
    <TextField
      id={label}
      name={label}
      value={inputValue}
      onChange={handleChange}
      multiline={multiline}
      label={comp.text}
      variant="outlined"
    />
  );
};

export default InputTextField;
