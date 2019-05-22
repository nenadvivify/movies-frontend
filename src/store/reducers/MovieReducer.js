import {
  VOTE_MOVIE,
  GET_MOVIES,
  GET_MOVIE,
  GET_SIMILAR,
  CREATE_COMMENT,
  REMOVE_ACTIVE,
  CREATE_MOVIE,
  SEARCH_MOVIE_INDEXED,
  CLEAR_MOVIE_INDEXED
} from 'store/types';

const initialState = {
  all: [],
  similar: [],
  search: [],
  active: null
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, all: action.payload }

    case GET_MOVIE:
      return { ...state, active: action.payload }

    case GET_SIMILAR:
      return { ...state, similar: action.payload }

    case REMOVE_ACTIVE:
      return { ...state, active: null }

    case CREATE_MOVIE:
      return {
        ...state,
        all: [action.payload, ...state.all]
      }

    case SEARCH_MOVIE_INDEXED:
      return {
        ...state,
        search: action.payload
      }

    case CLEAR_MOVIE_INDEXED:
      return {
        ...state,
        search: []
      }

    case CREATE_COMMENT:
      if(!state.active) {
        return state;
      } else {
        return {
          ...state,
          active: {
            ...state.active,
            comments: [
              action.payload,
              ...state.active.comments
            ]
          }
        }
      }

    case VOTE_MOVIE:
      const payload = action.payload;
      const active = state.active;

      if(active) {
        if(active.id === payload.id) {
          return {
            ...state,
            active: {
              ...state.active,
              likes: payload.likes,
              dislikes: payload.dislikes
            }
          }
        }
      } else {
        return {
          ...state,
          all: state.all.map(movie => {
            if(movie.id !== payload.id) return movie;
            else return {
              ...movie,
              likes: payload.likes,
              dislikes: payload.dislikes
            }
          })
        }
      }

      return state;

    default:
      return state;
  }
};

export default movieReducer;