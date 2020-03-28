import styled from '@emotion/styled';
import { Form } from 'formik';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledInput = styled(Input)`
  box-shadow: 0;
  border-radius: 0;
  border: 1px solid rgba(36, 28, 21, 0.3);
  background-color: #fff;
  color: ${({ theme }) => theme.black};
  padding: 0 15px;
  height: 52px;
  width: 100%;
  margin: 0 0 24px 0;
`;

export const StyledButton = styled(Button)`
  border-radius: 0;
  background-color: ${({ theme }) => theme.blue};
  height: 52px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 0 0;
`;
