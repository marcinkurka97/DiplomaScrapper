import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';
import RegisterForm from '../../components/organisms/RegisterForm/RegisterForm';
import LoginAnimation from '../../components/atoms/LoginAnimation/LoginAnimation';
import CheckBox from '../../components/atoms/CheckBox/CheckBox';
import LogoSVG from '../../assets/logo1_1.svg';
import LogoSVGDark from '../../assets/logo3_1.svg';
import {
  LoginWrapper,
  Logo,
  LoginFormContainer,
  StyledLoginForm,
  LoginTitle,
  CreateAccounts,
  RememberMe,
} from './LoginView.style';

const LoginView = ({ register }) => {
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [darkMode] = useState(localStorage.getItem('dark') === 'true');

  const handleCheckboxChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <StyledLoginForm>
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
          <LoginTitle>{register ? 'Rejestracja' : 'Logowanie'}</LoginTitle>
          {!register && (
            <CreateAccounts>
              Nie masz jeszcze konta?
              <NavLink to="/register">Załóż je!</NavLink>
            </CreateAccounts>
          )}
          {register ? <RegisterForm /> : <LoginForm />}
          {!register && (
            <>
              <RememberMe>
                <CheckBox checked={checked} onChange={handleCheckboxChange} />
                <span>Zapamiętaj mnie</span>
              </RememberMe>
              <a className="pass-forgot" href="/register">
                Przypomnij hasło
              </a>
            </>
          )}
        </StyledLoginForm>
      </LoginFormContainer>
      <LoginAnimation width="67%" height="100%" />
    </LoginWrapper>
  );
};

export default LoginView;
