import React from 'react';

import {
  isAccordionModel,
  isCheckboxModel,
  isStaticTextModel,
  isTextAreaModel,
  isTextInputModel,
  isButtonModel
} from '../../types/Guards';
import Button from '../Button/Button';
import CheckBoxField from '../Checkbox/CheckBoxField';
import StaticText from '../StaticText/StaticText';
import Accordion from '../Accordion/Accordion';
import MissingComponent from '../MissingComponent/MissingComponent';
import InputTextField from '../TextInput/TextInput'
import { ComponentModel } from '../../types/Models';
import { StdComponentArgs } from '../../types/Common';
import { isUndefined } from '../../utils/common';

const SwitchYard: React.FC<StdComponentArgs<ComponentModel>> = (props) => {
  const { comp, onComponentChange, onCommand } = props;

  if (isUndefined(comp)) {
    return <h2>Developer error, null model in switchyard</h2>;
  }

  if (isButtonModel(comp)) {
    return <Button comp={comp} onCommand={onCommand} />;
  }

  if (isStaticTextModel(comp)) {
    return <StaticText comp={comp} />;
  }

  if (isCheckboxModel(comp)) {
    return <CheckBoxField comp={comp} onCommand={onCommand} onChange={onComponentChange} />;
  }

  if (isTextInputModel(comp) || isTextAreaModel(comp)) {
    return <InputTextField comp={comp} multiline={isTextAreaModel(comp)} />;
  }

  if (isAccordionModel(comp)) {
    return <Accordion {...props} />;
  }

  return <MissingComponent comp={comp} />;
};

export default SwitchYard;
