import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { faHome, faStar, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../atoms/Button/Button';
import Heading from '../../atoms/Heading/Heading';
import LinkItem from '../../molecules/LinkItem/LinkItem';
import { theme } from '../../../theme/mainTheme';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 12.5vh;
  background: #dfe0df;
  padding: 0 30px;
`;

const LoginPanel = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
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
        <img alt="logo" src="https://icon-library.net/images/png-home-icon/png-home-icon-6.jpg" />
        <Heading theme={theme}>Home finder</Heading>
        <LinkItem theme={theme} icon={faSearch} linkTitle="Search" />
        <LinkItem theme={theme} icon={faHome} linkTitle="Offers" />
        <LinkItem theme={theme} icon={faPlus} linkTitle="Add offer" />
        <LinkItem theme={theme} icon={faStar} linkTitle="Favourites" />
      </NavPanel>
      <LoginPanel>
        <StyledButton as={NavLink} to="/login" bold color={theme.green}>
          Sign in
        </StyledButton>
        <StyledButton as={NavLink} to="/register" bold color={theme.orange}>
          Sign up
        </StyledButton>
      </LoginPanel>
    </StyledHeader>
  );
}
