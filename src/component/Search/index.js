import React from 'react';
import { debounce } from 'lodash';
import { withRouter } from 'react-router-dom';
import './style.scss';

class Search extends React.Component {
  handleChange = event => {
    const value = event.target.value;
    const page = this.props.match.params.page;

    this.props.searchMovie(value);
    if(page > 1) this.props.history.push('/home/1');
  }

  debouncedHandleChange = (...args) => {
    const debounced = debounce(...args)

    return function(e) {
      e.persist()
      return debounced(e)
    }
  }

  render = () => {
    return (
      <div className="form-group search-field">
        <input 
        type="text" 
        defaultValue={this.props.searchText || ""}
        className="form-control search-input" 
        placeholder="Search movie..."
        onChange={this.debouncedHandleChange(this.handleChange, 750)} />
      </div>
    );
  }
}

export default withRouter(Search);