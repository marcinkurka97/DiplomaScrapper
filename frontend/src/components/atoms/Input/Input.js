import styled from '@emotion/styled';
import { css } from '@emotion/core';
import magnifierIcon from '../../../assets/magnifier.svg';

const Input = styled.input`
  padding: 15px 30px;
  height: 35px;
  font-size: '2.1rem';
  font-weight: ${({ theme }) => theme.normalFont};
  color: ${({ theme }) => theme.body};
  background-color: ${({ theme }) => theme.backgroundDarkGray};
  border: none;
  border-radius: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.body};
  }

  ${({ search }) =>
    search &&
    css({
      padding: '10px 20px 10px 40px',
      fontSize: '1.2rem',
      backgroundImage: `url(${magnifierIcon})`,
      backgroundSize: '15px',
      backgroundPosition: '15px 50%',
      backgroundRepeat: 'no-repeat',
    })}
`;

export default Input;
