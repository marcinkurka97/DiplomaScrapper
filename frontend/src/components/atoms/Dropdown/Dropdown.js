import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme/mainTheme';

const DropdownWrapper = styled.span`
  width: 10%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;

  select {
    height: 40px;
    background-color: ${theme.light};
    color: ${theme.dark};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
    padding: 10px;
    border: 0;
    margin: 0;
    border-radius: 20px;

    option {
      height: 20px;
    }
  }
`;

const Dropdown = () => (
  <DropdownWrapper>
    <select>
      <option>Dzisiaj</option>
      <option>Od wczoraj</option>
      <option>Ostatnie 3 dni</option>
      <option>W tym tygodniu</option>
      <option>W tym miesiącu</option>
    </select>
  </DropdownWrapper>
);
export default Dropdown;
