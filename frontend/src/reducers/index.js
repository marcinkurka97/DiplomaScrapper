import { FETCH_REQUEST, FETCH_SUCCESS } from '../actions';

const initialState = {
  homeOffers: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
