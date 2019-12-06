import React from 'react';
import styled from '@emotion/styled';

const DropdownWrapper = styled.span`
  width: 10%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;

  select {
    height: 40px;
    background-color: ${({ theme }) => theme.backgroundDarkGray};
    color: ${({ theme }) => theme.body};
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

const Dropdown = ({ handleDurationChange }) => (
  <DropdownWrapper>
    <select onChange={e => handleDurationChange(e.target.options[e.target.selectedIndex].value)}>
      <option value="1 day">Dzisiaj</option>
      <option value="2 days">Od wczoraj</option>
      <option value="3 days" defaultValue>
        Ostatnie 3 dni
      </option>
      <option value="7 days">W tym tygodniu</option>
      <option value="31 days">W tym miesiącu</option>
    </select>
  </DropdownWrapper>
);
export default Dropdown;
