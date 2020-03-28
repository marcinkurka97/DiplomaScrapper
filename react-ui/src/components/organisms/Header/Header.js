import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { faHome, faStar, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout as logoutAction } from '../../../actions';
import LinkItem from '../../molecules/LinkItem/LinkItem';
import LogoSVG from '../../../assets/logo1.svg';
import LogoSVGDark from '../../../assets/logo3.svg';
import { theme as mainTheme } from '../../../theme/mainTheme';
import { StyledHeader, Logo, LoginPanel, StyledButton, NavPanel } from './Header.style';

const Header = ({ darkModeEnabled, logout }) => {
  const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem('isUserLogged') === 'true');

  return (
    <StyledHeader>
      <NavPanel>
        <Logo
          style={{
            background: `url(${darkModeEnabled ? LogoSVGDark : LogoSVG})`,
            width: '200px',
            height: '8vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
          }}
          as={NavLink}
          to="/"
        />
        {isUserLogged && (
          <>
            <LinkItem theme={mainTheme} icon={faSearch} linkTitle="Search" />
            <LinkItem theme={mainTheme} icon={faHome} linkTitle="Offers" />
            <LinkItem theme={mainTheme} icon={faPlus} linkTitle="Add offer" />
            <LinkItem theme={mainTheme} icon={faStar} linkTitle="Favourites" />
          </>
        )}
      </NavPanel>
      <LoginPanel>
        {!isUserLogged && (
          <>
            <StyledButton color={mainTheme.green} as={NavLink} to="/login">
              Logowanie
            </StyledButton>
            <StyledButton color={mainTheme.orange} as={NavLink} to="/register">
              Rejestracja
            </StyledButton>
          </>
        )}
        {isUserLogged && (
          <StyledButton
            color={mainTheme.orange}
            onClick={() => {
              localStorage.setItem('isUserLogged', false);
              localStorage.setItem('userID', null);
              logout();
              setIsUserLogged(false);
              return <Redirect to="/" />;
            }}
          >
            Wyloguj
          </StyledButton>
        )}
      </LoginPanel>
    </StyledHeader>
  );
};

const mapStateToProps = state => {
  const { userID } = state;
  return { userID };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
