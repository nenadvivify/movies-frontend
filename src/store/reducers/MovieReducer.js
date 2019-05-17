import {
  VOTE_MOVIE,
	GET_MOVIES,
  GET_MOVIE,
  GET_SIMILAR
} from 'store/types';

const initialState = {
  all: [],
  similar: [],
  active: null
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
    	return {...state, all: action.payload}

    case GET_MOVIE:
      return {...state, active: action.payload}

    case GET_SIMILAR:
      return {...state, similar: action.payload}

    case VOTE_MOVIE:
      const newState = {...state}
      const payload = action.payload;
      const {all, active} = state;

      if(active) {
        if(active.id === payload.id) {
          newState.active = payload;
        }
      }

      newState.all = all.map(movie => {
        return movie.id === payload.id ? payload : movie;
      });

      return newState;

    default:
      return state;
  }
};

export default movieReducer;
