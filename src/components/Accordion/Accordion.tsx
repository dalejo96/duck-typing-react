import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material';

import { AccordionModel, ComponentModel } from '../../types/Models';
import { adjustStdComponentArgs, containerSetChild } from '../../utils/common';
import { StdComponentArgs } from '../../types/Common';
import SwitchYard from '../SwitchYard/SwitchYard';

const Accordion: React.FC<StdComponentArgs<AccordionModel>> = (props) => {
  const { comp, onComponentChange } = props;
  const children: ComponentModel[] = comp.tchildren || [];

  return (
    <MuiAccordion
      sx={{
        boxShadow: 'none !important',
        margin: '16px 0',
        border: (theme) => `1px solid ${theme.palette.primary.dark}`,
        '.MuiAccordionSummary-root.Mui-expanded': {
          minHeight: '48px',
          borderBottom: (theme) => `1px solid ${theme.palette.primary.dark}`
        },
        background: (theme) => alpha(theme.palette.primary.main, 0.1),
        '&:before': {
          height: '0 !important'
        }
      }}>
      <AccordionSummary
        sx={{
          flexDirection: 'row-reverse',
          background: (theme) => theme.palette.primary.main,
          '.Mui-expanded': {
            margin: '12px 0 !important'
          },
          '.MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center'
          }
        }}>
        <Typography
          variant="subtitle2"
          sx={{
            marginLeft: '16px',
            letterSpacing: '0.15px',
            lineHeight: '28px',
            color: 'white'
          }}>
          {comp.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children.map((cp, idx) => {
          const childProps = adjustStdComponentArgs(props, cp, (nc) =>
            onComponentChange(containerSetChild(nc, idx, comp))
          );

          return <SwitchYard key={idx} {...childProps} />;
        })}
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
