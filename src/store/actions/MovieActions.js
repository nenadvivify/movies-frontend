import { 
	GET_MOVIES, 
	GET_MOVIE
} from 'store/types';
import axios from 'axios';
import config from 'config';

const MOVIES_URL = config.API_BASE_URL + '/api/movies';

export const getMovies = () => {
	return async dispatch => {
		try {
			const res = await axios.get(MOVIES_URL);
			dispatch({type: GET_MOVIES, payload: res.data})
			return res.data;
		} catch(error) {
			throw new Error(error.response.data.message)
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
			throw new Error(error.response.data.message)
		}
	}
}