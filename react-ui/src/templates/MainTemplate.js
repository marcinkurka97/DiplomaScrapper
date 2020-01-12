import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import GlobalStyle from '../theme/GlobalStyle';
import { ThemeProvider } from '../context/ThemeContext';

const MainTemplate = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
