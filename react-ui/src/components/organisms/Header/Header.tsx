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
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ darkModeEnabled, logout }) => {
  const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem('isUserLogged') === 'true');

  return (
    <StyledHeader>
      <NavPanel>
        <NavLink to="/">
          <Logo
            style={{
              background: `url(${darkModeEnabled ? LogoSVGDark : LogoSVG})`,
              width: '200px',
              height: '8vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
            }}
          />
        </NavLink>
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
            <NavLink to="/login">
              <StyledButton color={mainTheme.green}>Logowanie</StyledButton>
            </NavLink>
            <NavLink to="/register">
              <StyledButton color={mainTheme.orange}>Rejestracja</StyledButton>
            </NavLink>
          </>
        )}
        {isUserLogged && (
          <StyledButton
            color={mainTheme.orange}
            onClick={() => {
              localStorage.setItem('isUserLogged', JSON.stringify(false));
              localStorage.setItem('userID', JSON.stringify(null));
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

const mapStateToProps = (state: any) => {
  const { userID } = state;
  return { userID };
};

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
