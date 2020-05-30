import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from '../../../actions';
import { StyledForm, StyledInput, StyledButton } from './LoginForm.style';
import { LoginFormProps } from './LoginForm.types';

const LoginForm: React.FC<LoginFormProps> = ({ userID, authenticate }) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={({ username, password }) => {
      authenticate(username, password);
    }}
  >
    {({ handleChange, handleBlur, values }) => {
      if (userID) {
        localStorage.setItem('isUserLogged', JSON.stringify(true));
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
            value={values.username}
          />
          <label htmlFor="password">Hasło</label>
          <StyledInput
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
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

const mapDispatchToProps = (dispatch: any) => ({
  authenticate: (username: string, password: string) =>
    dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
