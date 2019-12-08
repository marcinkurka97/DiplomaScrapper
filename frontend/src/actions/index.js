import axios from 'axios';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REG_REQUEST = 'REG_REQUEST';
export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_FAILURE = 'REG_FAILURE';

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .post('http://localhost:9000/api/user/login', {
      username,
      password,
    })
    .then(payload => {
      console.log(payload);
      dispatch({ type: AUTH_SUCCESS, payload });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const register = (username, email, password) => dispatch => {
  dispatch({ type: REG_REQUEST });

  return axios
    .post('http://localhost:9000/api/user/register', {
      username,
      email,
      password,
    })
    .then(payload => {
      console.log(payload);
      dispatch({ type: REG_SUCCESS, payload });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: REG_FAILURE });
    });
};

export const fetchItems = () => dispatch => {
  dispatch({ type: FETCH_REQUEST });

  return axios
    .get('http://localhost:9000/api/scrapes/getData')
    .then(({ data }) => {
      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      dispatch({ type: FETCH_FAILURE });
    });
};
