import { 
	GET_FILTERS,
	TOGGLE_FILTER
} from 'store/types';
import axios from 'axios';
import config from 'config';
const GENRES_URL = config.API_BASE_URL + '/api/genres';

export const getFilters = () => {
	return async dispatch => {
		try {
			const res = await axios.get(GENRES_URL);
			dispatch({type: GET_FILTERS, payload: res.data});
			return res.data;
		} catch(error) {
			console.log("Request to server failed.")
		}
	}
}

export const toggleFilter = filter => {
	return {type: TOGGLE_FILTER, payload: filter}
}