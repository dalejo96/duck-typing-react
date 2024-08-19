import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { TextInputModel } from '../../types/Models';
import { Box } from '@mui/material';

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
    <Box sx={{ margin: '8px 0px', width: '300px' }}>
      <TextField
        id={label}
        name={label}
        value={inputValue}
        onChange={handleChange}
        multiline={multiline}
        label={comp.text}
        variant="outlined"
        rows={6}
        fullWidth
      />
    </Box>
  );
};

export default InputTextField;
