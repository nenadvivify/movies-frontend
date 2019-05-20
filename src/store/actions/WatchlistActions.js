import {
  SET_WATCHED,
  GET_WATCHLIST,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  TOGGLE_SHOW_WATCHED
} from 'store/types';
import axios from 'axios';
import config from 'config';

const URL = config.API_BASE_URL + '/api/watchlist';

export const getWatchlist = () => {
  return async dispatch => {
    try {
      const res = await axios.get(URL);
      dispatch({ type: GET_WATCHLIST, payload: res.data });
    } catch (error) {
      const message = "Watchlist fetch failed";
      throw new Error(message);
    }
  }
};

export const addToWatchlist = id => {
  return async dispatch => {
    try {
      const res = await axios.post(`${URL}/${id}`);
      dispatch({ type: ADD_TO_WATCHLIST, payload: res.data });
    } catch (error) {
      const message = "Add to watchlist failed";
      throw new Error(message);
    }
  }
};

export const removeFromWatchlist = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`${URL}/${id}`);
      dispatch({ type: REMOVE_FROM_WATCHLIST, payload: res.data });
    } catch (error) {
      const message = "Remove from watchlist failed";
      throw new Error(message);
    }
  }
};

export const setWatched = id => {
  return async dispatch => {
    try {
      const res = await axios.patch(`${URL}/${id}`);
      dispatch({ type: SET_WATCHED, payload: res.data });
    } catch (error) {
      const message = "Set to watched failed";
      throw new Error(message);
    }
  }
};

export const toggleShowWatched = () => {
  return async dispatch => {
    dispatch({ type: TOGGLE_SHOW_WATCHED })
  }
};