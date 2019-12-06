import axios from 'axios';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchItems = () => dispatch => {
  dispatch({ type: FETCH_REQUEST });

  return axios
    .get('http://localhost:2093/data')
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
