import React from 'react';
import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from '../../../actions';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  box-shadow: 0;
  border-radius: 0;
  border: 1px solid rgba(36, 28, 21, 0.3);
  background-color: #fff;
  color: ${({ theme }) => theme.black};
  padding: 0 15px;
  height: 52px;
  width: 100%;
  margin: 0 0 24px 0;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  background-color: ${({ theme }) => theme.blue};
  height: 52px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 0 0;
`;

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
