 import { GET_FILTERS, TOGGLE_FILTER } from 'store/types';

const initialState = {all: [], active: []}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
	case GET_FILTERS:
		const all = action.payload.filter(function(f) {
			if(!this[f.name]) return this[f.name] = 1;
			else return false;
		}, {})

		return {...state, all}

	case TOGGLE_FILTER:
		let active = state.active;
		let found = state.active.includes(action.payload.name);
		if(found) active = active.filter(e => e != action.payload.name);
		else active = active.concat(action.payload.name);

		return {...state, active}

    default:
      return state;
  }
};

export default filtersReducer;
