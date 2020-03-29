import React from 'react';
import { DropdownWrapper } from './Dropdown.style';
import { DropdownProps } from './Dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({ handleDurationChange }) => (
  <DropdownWrapper>
    <select
      defaultValue="3 days"
      onChange={e => handleDurationChange(e.target.options[e.target.selectedIndex].value)}
    >
      <option value="1 day">Dzisiaj</option>
      <option value="2 days">Od wczoraj</option>
      <option value="3 days">Ostatnie 3 dni</option>
      <option value="7 days">W tym tygodniu</option>
      <option value="31 days">W tym miesiącu</option>
    </select>
  </DropdownWrapper>
);
export default Dropdown;
