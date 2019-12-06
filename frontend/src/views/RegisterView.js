import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../theme/mainTheme';
import LoginAnimation from '../components/atoms/LoginAnimation/LoginAnimation';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import Heading from '../components/atoms/Heading/Heading';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const LoginFormContainer = styled.div`
  width: 33%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    padding: 0 0 12px 0;
    font-weight: 500;
  }
`;

const LoginForm = styled.div`
  width: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;

  .logo {
    width: 125px;
    height: 125px;
    align-self: center;
    margin-bottom: 20px;
  }
`;

const LoginTitle = styled(Heading)`
  font-size: 50px;
  text-align: center;
  margin: 0 0 18px 0;
  font-weight: 400;
`;

const StyledInput = styled(Input)`
  box-shadow: 0;
  border-radius: 0;
  border: 1px solid rgba(36, 28, 21, 0.3);
  background-color: #fff;
  padding: 0 15px;
  height: 52px;
  margin: 0 0 24px 0;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  background-color: ${theme.blue};
  height: 52px;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 0 0;
`;

const LoginView = () => {
  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginForm>
          <img
            className="logo"
            alt="logo"
            src="https://icon-library.net/images/png-home-icon/png-home-icon-6.jpg"
          />

          <LoginTitle>Rejestracja</LoginTitle>
          <label htmlFor="email">Email</label>
          <StyledInput id="email" type="email" />
          <label htmlFor="username">Użytkownik</label>
          <StyledInput id="username" />
          <label htmlFor="password">Hasło</label>
          <StyledInput id="password" type="password" />
          <StyledButton as={NavLink} to="/">
            Zarejestruj się
          </StyledButton>
        </LoginForm>
      </LoginFormContainer>
      <LoginAnimation width="68%" height="100%" />
    </LoginWrapper>
  );
};

export default LoginView;
