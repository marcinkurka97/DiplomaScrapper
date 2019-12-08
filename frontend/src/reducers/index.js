import { AUTH_SUCCESS, REG_SUCCESS, FETCH_REQUEST, FETCH_SUCCESS } from '../actions';

const initialState = {
  homeOffers: [],
  isLoading: false,
  userId: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case REG_SUCCESS:
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        homeOffers: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default rootReducer;
