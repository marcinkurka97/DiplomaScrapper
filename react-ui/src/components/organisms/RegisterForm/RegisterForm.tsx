import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register as registerAction } from '../../../actions';
import { StyledForm, StyledInput, StyledButton } from '../LoginForm/LoginForm.style';
import { RegisterFormProps } from './RegisterForm.types';

const RegisterForm: React.FC<RegisterFormProps> = ({ userID, register }) => (
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
            value={values.username}
          />
          <label htmlFor="email">Email</label>
          <StyledInput
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
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
          <StyledButton type="submit">Zarejestruj się</StyledButton>
        </StyledForm>
      );
    }}
  </Formik>
);

const mapStateToProps = ({ userID = null }) => ({
  userID,
});

const mapDispatchToProps = (dispatch: any) => ({
  register: (username: string, email: string, password: string) =>
    dispatch(registerAction(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
