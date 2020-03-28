import styled from '@emotion/styled';
import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

export const FilterBarWrapper = styled.div`
  position: relative;
  height: 17.5vh;
  background: ${({ theme }) => theme.backgroundGray};
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FilterBarRowOne = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

export const TypeButtons = styled.div`
  display: flex;
  width: 30%;
`;

export const StyledButton = styled(Button)`
  margin: 0 15px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
  background: ${({ theme, active, rent, sell, swap }) =>
    active && rent // eslint-disable-line no-nested-ternary
      ? theme.orange
      : active && sell // eslint-disable-line no-nested-ternary
      ? theme.green
      : active && swap
      ? theme.blue
      : theme.backgroundDarkGray};

  &:hover {
    background: ${({ theme, rent, sell, swap }) =>
      // eslint-disable-next-line no-nested-ternary
      rent ? theme.orange : sell ? theme.green : swap ? theme.blue : theme.orange};
  }
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const Price = styled.h3`
  margin-left: 5%;
  width: 15%;
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

export const StyledInput = styled(Input)`
  position: relative;
  width: 40%;
  height: 40px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
  font-size: 16px;
  padding: 5px 15px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const FilterBarRowTwo = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;
