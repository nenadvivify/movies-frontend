import { SET_MOVIES, GET_MOVIES } from '../actions/ActionTypes';

const initialState = {
  all: []
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload };

    default:
      return state;
  }
};

export default movieReducer;
