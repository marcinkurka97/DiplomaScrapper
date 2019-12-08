import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/organisms/LoginForm/LoginForm';
import LoginAnimation from '../components/atoms/LoginAnimation/LoginAnimation';
import CheckBox from '../components/atoms/CheckBox/CheckBox';
import Heading from '../components/atoms/Heading/Heading';
import LogoSVG from '../assets/logo1_1.svg';
import LogoSVGDark from '../assets/logo3_1.svg';

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Logo = styled.div`
  width: 100%;
  height: 17.5vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  margin-bottom: 12px;
`;

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

const StyledLoginForm = styled.div`
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
    color: ${({ theme }) => theme.blue};
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.body};
`;

const CreateAccounts = styled.p`
  margin: 0 0 30px 0;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.body};

  a {
    margin-left: 6px;
    color: ${({ theme }) => theme.blue};
    font-size: 17px;
    line-height: normal;
    text-decoration: none;
    border-bottom: 1px solid;
  }
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
    this.state = {
      checked: false,
      darkMode: localStorage.getItem('dark') === 'true',
    };
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked });
  };

  render() {
    const { checked, darkMode } = this.state;
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
            <LoginTitle>Logowanie</LoginTitle>
            <CreateAccounts>
              Nie masz jeszcze konta?
              <NavLink to="/register">Załóż je!</NavLink>
            </CreateAccounts>
            <LoginForm />
            <RememberMe>
              <CheckBox checked={checked} onChange={this.handleCheckboxChange} />
              <span>Zapamiętaj mnie</span>
            </RememberMe>
            <a className="pass-forgot" href="/register">
              Przypomnij hasło
            </a>
          </StyledLoginForm>
        </LoginFormContainer>
        <LoginAnimation width="67%" height="100%" />
      </LoginWrapper>
    );
  }
}

export default LoginView;
