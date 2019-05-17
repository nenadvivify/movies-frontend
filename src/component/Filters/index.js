import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFilters, toggleFilter } from 'store/actions/FilterActions';
import { withRouter } from 'react-router-dom';
import './style.scss';

class Filters extends Component {
	componentDidMount = () => {
		this.props.getFilters()
	}

  handleChange = filter => {
    this.props.toggleFilter(filter);
    if(this.props.match.params.page > 1) {
      this.props.history.push('/home/1')
    }
  }

  showFilters = () => {
    return this.props.filters.map(filter => {
      const checked = this.props.active.includes(filter.name);

      return (
        <div key={filter.id} className="list-group-item filters-item">
          <div className="custom-control custom-checkbox">
            <input 
            type="checkbox" 
            checked={checked} 
            className="custom-control-input" 
            onChange={() => this.handleChange(filter)}
            id={`filter-${filter.id}`} />

            <label className="custom-control-label filters-label" htmlFor={`filter-${filter.id}`}>
              <span>{this.capitalize(filter.name)}</span>
            </label>
          </div>
        </div>
      )
    })
  }

  capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
  	return (
  		<div className="filters card">
  			<div className="card-header">Filters</div>
        <div className="card-body filters-body">{this.showFilters()}</div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filters)
)
