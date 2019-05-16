import React from 'react';
import _ from 'lodash';
import './style.scss';

const Search = ({ searchMovie, history }) => {
	const handleChange = (event) => {
		searchMovie(event.target.value);
		history.push('/home/1');
	}

	function debounceEventHandler(...args) {
	  const debounced = _.debounce(...args)

	  return function(e) {
	    e.persist()
	    return debounced(e)
	  }
	}

    return (
        <div className="form-group search-field">
        	<input 
        	type="text" 
        	className="form-control search-input" 
        	placeholder="Search movie..."
        	onChange={debounceEventHandler(handleChange, 750)} />
        </div>
    );
};

export default Search;
