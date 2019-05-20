import {
  GET_WATCHLIST,
  SET_WATCHED,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  TOGGLE_SHOW_WATCHED
} from 'store/types';

const initialState = {
  all: [],
  showWatched: false
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WATCHLIST:
      return { ...state, all: action.payload };

    case SET_WATCHED:
      return { ...state, all: action.payload };

    case ADD_TO_WATCHLIST:
      return { ...state, all: action.payload };

    case REMOVE_FROM_WATCHLIST:
      return { ...state, all: action.payload };

    case TOGGLE_SHOW_WATCHED:
      return {
        ...state,
        showWatched: !state.showWatched
      }

    default:
      return state;
  }
};

export default movieReducer;