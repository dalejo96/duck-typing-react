import React from 'react';
import Typography from '@mui/material/Typography';

import { StaticTextModel } from '../../types/Models';

const StaticText: React.FC<{ comp: StaticTextModel }> = ({ comp }) => {
  return (
    <Typography
      variant={comp.variant ?? 'body1'}
      component="p"
      sx={{
        display: 'block',
        position: 'relative',
        margin: '1rem 0 !important',
        whiteSpace: 'pre-line'
      }}>
      {comp.title ?? comp.text}
    </Typography>
  );
};

const MemoizedStaticText = React.memo(StaticText);

export default MemoizedStaticText;
