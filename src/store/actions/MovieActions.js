import { 
	GET_MOVIES, 
	GET_MOVIE,
	SEARCH_MOVIE,
	VOTE_MOVIE
} from 'store/types';
import axios from 'axios';
import config from 'config';

const MOVIES_URL = config.API_BASE_URL + '/api/movies';

export const searchMovie = searchText => {
	return {type: SEARCH_MOVIE, payload: searchText}
}

export const getMovies = () => {
	return async dispatch => {
		try {
			const res = await axios.get(MOVIES_URL);
			dispatch({type: GET_MOVIES, payload: res.data})
			return res.data;
		} catch(error) {
			console.log("Get all movies action failed.")
		}
	}
}

export const getMovie = id => {
	return async dispatch => {
		try {
			const res = await axios.get(`${MOVIES_URL}/${id}`);
			dispatch({type: GET_MOVIE, payload: res.data});
			return res.data;
		} catch(error) {
			console.log("Get movie action failed.")
		}
	}
}

export const voteMovie = data => {
	return async dispatch => {
		try {
			const res = await axios.post(`${MOVIES_URL}/vote`, data);
			dispatch({type: VOTE_MOVIE, payload: res.data});
		} catch(error) {
			console.log("Vote action failed.")
		}
	}
}