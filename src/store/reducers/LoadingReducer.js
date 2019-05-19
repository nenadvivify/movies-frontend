import {
  GET_MOVIES_COMLETED,
  GET_MOVIE_COMPLETED,
  GET_MOVIES_START,
  GET_MOVIE_START
} from 'store/types';

const initialState = {
  movies: false,
  movie: false
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_START:
      return { ...state, movies: true }

    case GET_MOVIE_START:
      return { ...state, movie: true }

    case GET_MOVIES_COMLETED:
      return { ...state, movies: false }

    case GET_MOVIE_COMPLETED:
      return { ...state, movie: false }

    default:
      return state;
  }
};

export default errorReducer;