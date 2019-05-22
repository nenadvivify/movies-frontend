import React, { Component } from 'react';
import './style.scss';

class SearchNav extends Component {
  render() {
    return (
      <input 
      type="search" 
      value={this.props.searchText}
      onChange={this.props.handleChange}
      className="form-control nav-search-input" 
      placeholder="Search" 
      aria-label="Search" />
    );
  }
}

export default SearchNav;