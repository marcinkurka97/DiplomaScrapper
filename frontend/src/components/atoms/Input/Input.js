import styled, { css } from 'styled-components';
import magnifierIcon from '../../../assets/magnifier.svg';

const Input = styled.input`
  padding: 15px 30px;
  height: 35px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.normalFont};
  background-color: ${({ theme }) => theme.light};
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);

  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.dark};
  }

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${magnifierIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;
