import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { faHome, faStar, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../atoms/Button/Button';
import LinkItem from '../../molecules/LinkItem/LinkItem';
import LogoSVG from '../../../assets/logo2.svg';
import { theme as mainTheme } from '../../../theme/mainTheme';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 12.5vh;
  background: ${({ theme }) => theme.backgroundDarkGray};
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 0 30px;
`;

const Logo = styled.div`
  background: url(${LogoSVG});
  width: 200px;
  height: 8vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

const LoginPanel = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
  border-radius: 0;
`;

const NavPanel = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 8vh;
    width: 8vh;
    margin: 0 25px 0 0;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <NavPanel>
        <Logo />
        <LinkItem theme={mainTheme} icon={faSearch} linkTitle="Search" />
        <LinkItem theme={mainTheme} icon={faHome} linkTitle="Offers" />
        <LinkItem theme={mainTheme} icon={faPlus} linkTitle="Add offer" />
        <LinkItem theme={mainTheme} icon={faStar} linkTitle="Favourites" />
      </NavPanel>
      <LoginPanel>
        <StyledButton color={mainTheme.green} as={NavLink} to="/login">
          Sign in
        </StyledButton>
        <StyledButton color={mainTheme.orange} as={NavLink} to="/register">
          Sign up
        </StyledButton>
      </LoginPanel>
    </StyledHeader>
  );
}
