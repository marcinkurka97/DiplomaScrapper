import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register as registerAction } from '../../../actions';
import { StyledForm, StyledInput, StyledButton } from '../LoginForm/LoginForm.style';

const RegisterForm = ({ userID, register }) => (
  <Formik
    initialValues={{ username: '', email: '', password: '' }}
    onSubmit={({ username, email, password }) => {
      register(username, email, password);
    }}
  >
    {({ handleChange, handleBlur, values }) => {
      if (userID) {
        return <Redirect to="/login" />;
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
          <label htmlFor="email">Email</label>
          <StyledInput
            id="email"
            type="email"
            name="email"
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
          <StyledButton type="submit">Zarejestruj się</StyledButton>
        </StyledForm>
      );
    }}
  </Formik>
);

const mapStateToProps = ({ userID = null }) => ({
  userID,
});

const mapDispatchToProps = dispatch => ({
  register: (username, email, password) => dispatch(registerAction(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
