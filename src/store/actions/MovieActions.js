import {
  GET_MOVIES,
  GET_MOVIE,
  GET_MOVIES_COMLETED,
  GET_MOVIE_COMPLETED,
  GET_MOVIES_START,
  GET_MOVIE_START,
  SEARCH_MOVIE,
  VOTE_MOVIE,
  GET_SIMILAR,
  CREATE_COMMENT,
  REMOVE_ACTIVE,
  CREATE_MOVIE,
  SEARCH_MOVIE_INDEXED,
  CLEAR_MOVIE_INDEXED
} from 'store/types';
import axios from 'axios';
import config from 'config';

const MOVIES_URL = config.API_BASE_URL + '/api/movies';

export const searchMovie = searchText => {
  return { type: SEARCH_MOVIE, payload: searchText }
}

export const removeActive = () => {
  return { type: REMOVE_ACTIVE }
}

export const getMovies = () => {
  return async dispatch => {
    dispatch({ type: GET_MOVIES_START });

    try {
      const res = await axios.get(MOVIES_URL);
      dispatch({ type: GET_MOVIES, payload: res.data })
      dispatch({ type: GET_MOVIES_COMLETED })
      return res.data;
    } catch (error) {
      console.log("Get all movies action failed.")
      dispatch({ type: GET_MOVIES_COMLETED })
    }
  }
}

export const getMovie = id => {
  return async dispatch => {
    dispatch({ type: GET_MOVIE_START });

    try {
      const res = await axios.get(`${MOVIES_URL}/${id}`);
      dispatch({ type: GET_MOVIE, payload: res.data });
      dispatch({ type: GET_MOVIE_COMPLETED })
      return res.data;
    } catch (error) {
      console.log("Get movie action failed.")
      dispatch({ type: GET_MOVIE_COMPLETED })
    }
  }
}

export const createMovie = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${MOVIES_URL}`, data);
      dispatch({ type: CREATE_MOVIE, payload: res.data });
      return res.data;
    } catch (error) {
      const message = 'Create movie failed';
      throw new Error(message);
    }
  }
}

export const voteMovie = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${MOVIES_URL}/vote`, data);
      dispatch({ type: VOTE_MOVIE, payload: res.data });
    } catch (error) {
      console.log("Vote action failed.")
    }
  }
}

export const getSimilar = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${MOVIES_URL}/similar`, data);
      dispatch({ type: GET_SIMILAR, payload: res.data });
    } catch (error) {
      console.log("Get similar action failed.")
    }
  }
}

export const createComment = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${MOVIES_URL}/comment`, data);
      dispatch({ type: CREATE_COMMENT, payload: res.data });
      return res.data;
    } catch (error) {
      console.log("Create comment action failed.")
    }
  }
}

export const searchMovieIndexed = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${MOVIES_URL}/search`, data);
      dispatch({ type: SEARCH_MOVIE_INDEXED, payload: res.data });
      return res.data;
    } catch (error) {
      console.log("Search failed")
    }
  }
}

export const clearMovieIndexed = data => {
  return async dispatch => {
    dispatch({ type: CLEAR_MOVIE_INDEXED })
  }
}