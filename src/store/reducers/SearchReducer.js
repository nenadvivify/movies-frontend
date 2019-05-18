import { SEARCH_MOVIE } from 'store/types';

const initialState = "";

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return action.payload;

    default:
      return state;
  }
};

export default movieReducer;