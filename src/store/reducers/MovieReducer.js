import { GET_MOVIES } from 'store/types';

const initialState = [];

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
    	return action.payload;

    default:
      return state;
  }
};

export default movieReducer;
