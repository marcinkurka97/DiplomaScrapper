import styled from '@emotion/styled';
import Heading from '../../components/atoms/Heading/Heading';

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const Logo = styled.div`
  width: 100%;
  height: 17.5vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  margin-bottom: 12px;
`;

export const LoginFormContainer = styled.div`
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

export const StyledLoginForm = styled.div`
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

export const LoginTitle = styled(Heading)`
  font-size: 50px;
  text-align: center;
  margin: 0 0 18px 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.body};
`;

export const CreateAccounts = styled.p`
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

export const RememberMe = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 0 0;

  span {
    font-size: 18px;
    margin: 0 0 0 10px;
  }
`;
