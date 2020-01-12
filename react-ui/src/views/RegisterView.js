import React, { useState } from 'react';
import styled from '@emotion/styled';
import LoginAnimation from '../components/atoms/LoginAnimation/LoginAnimation';
import RegisterForm from '../components/organisms/RegisterForm/RegisterForm';
import Heading from '../components/atoms/Heading/Heading';
import LogoSVG from '../assets/logo1_1.svg';
import LogoSVGDark from '../assets/logo3_1.svg';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Logo = styled.div``;

const LoginFormContainer = styled.div`
  width: 33%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgroundOffer};
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    padding: 0 0 12px 0;
    font-weight: 500;
    color: ${({ theme }) => theme.body};
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.body};
`;

const RegisterView = () => {
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark') === 'true');

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginForm>
          <Logo
            style={{
              background: `url(${darkMode ? LogoSVGDark : LogoSVG})`,
              width: '100%',
              height: '17.5vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              marginBottom: '12px',
            }}
          />
          <LoginTitle>Rejestracja</LoginTitle>
          <RegisterForm />
        </LoginForm>
      </LoginFormContainer>
      <LoginAnimation width="68%" height="100%" />
    </LoginWrapper>
  );
};

export default RegisterView;
