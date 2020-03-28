import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from '../../../actions';
import { StyledForm, StyledInput, StyledButton } from './LoginForm.style';

const LoginForm = ({ userID, authenticate }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={({ username, password }) => {
      authenticate(username, password);
    }}
  >
    {({ handleChange, handleBlur, values }) => {
      if (userID) {
        localStorage.setItem('isUserLogged', true);
        localStorage.setItem('userID', JSON.stringify(userID));
        return <Redirect to="/" />;
      }
      return (
        <StyledForm>
          <label htmlFor="username">Użytkownik</label>
          <StyledInput
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          <label htmlFor="password">Hasło</label>
          <StyledInput
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          <StyledButton type="submit">Zaloguj</StyledButton>
        </StyledForm>
      );
    }}
  </Formik>
);

const mapStateToProps = ({ userID = null }) => ({
  userID,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
