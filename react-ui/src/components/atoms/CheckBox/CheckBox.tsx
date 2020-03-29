import React from 'react';
import { HiddenCheckbox, Icon, StyledCheckbox, CheckboxContainer } from './CheckBox.style';
import { CheckBoxProps } from './CheckBox.types';

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default CheckBox;
