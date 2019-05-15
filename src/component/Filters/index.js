import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilters, toggleFilter } from 'store/actions/FilterActions';
import './style.scss';

class Filters extends Component {
	componentDidMount = () => {
		this.props.getFilters()
	}

  handleChange = filter => {
    this.props.toggleFilter(filter);
  }

  showFilters = () => {
    return this.props.filters.map(filter => {
      const checked = this.props.active.includes(filter.name);

      return (
        <div key={filter.id} className="custom-control custom-checkbox">
          <input 
          type="checkbox" 
          checked={checked} 
          className="custom-control-input" 
          onChange={() => this.handleChange(filter)}
          id={`filter-${filter.id}`} />

          <label className="custom-control-label" htmlFor={`filter-${filter.id}`}>
            <span>{this.capitalize(filter.name)}</span>
          </label>
        </div>
      )
    })
  }

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
  	console.log(this.props);

  	return (
  		<div className="filters">
  			<h1 className="display-4">Filters</h1>
        {this.showFilters()}
  		</div>
  	);
  }
}


const mapStateToProps = (state, props) => {
	return {
		filters: state.filters.all,
    active: state.filters.active
	}
};

const mapDispatchToProps = {
  getFilters,
  toggleFilter
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filters)
