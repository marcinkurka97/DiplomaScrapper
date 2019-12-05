import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../theme/mainTheme';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import LoginAnimation from '../components/atoms/LoginAnimation/LoginAnimation';
import CheckBox from '../components/atoms/CheckBox/CheckBox';
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

  .pass-forgot {
    width: 131px;
    color: ${theme.blue};
    font-size: 17px;
    line-height: normal;
    text-decoration: none;
    border-bottom: 1px solid;
    margin: 20px 0 0 0;
    align-self: center;
  }
`;

const LoginTitle = styled(Heading)`
  font-size: 50px;
  text-align: center;
  margin: 0 0 18px 0;
  font-weight: 400;
`;

const CreateAccounts = styled.p`
  margin: 0 0 30px 0;

  a {
    margin-left: 6px;
    color: ${theme.blue};
    font-size: 17px;
    line-height: normal;
    text-decoration: none;
    border-bottom: 1px solid;
  }
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

const RememberMe = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 0 0;

  span {
    font-size: 18px;
    margin: 0 0 0 10px;
  }
`;

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    return (
      <LoginWrapper>
        <LoginFormContainer>
          <LoginForm>
            <img
              className="logo"
              alt="logo"
              src="https://icon-library.net/images/png-home-icon/png-home-icon-6.jpg"
            />

            <LoginTitle>Zaloguj się</LoginTitle>
            <CreateAccounts>
              Nie masz jeszcze konta?
              <NavLink to="/register">Załóż je!</NavLink>
            </CreateAccounts>
            <label htmlFor="username">Użytkownik</label>
            <StyledInput id="username" />
            <label htmlFor="password">Hasło</label>
            <StyledInput id="password" type="password" />
            <StyledButton as={NavLink} to="/">
              Zaloguj
            </StyledButton>
            <RememberMe>
              <CheckBox checked={this.state.checked} onChange={this.handleCheckboxChange} />
              <span>Zapamiętaj mnie</span>
            </RememberMe>
            <a className="pass-forgot" href="#">
              Przypomnij hasło
            </a>
          </LoginForm>
        </LoginFormContainer>
        <LoginAnimation width={'67%'} height={'100%'} />
      </LoginWrapper>
    );
  }
}

export default LoginView;
