import React, { Component } from 'react';
import { createMovie } from 'store/actions/MovieActions';
import { getFilters } from 'store/actions/FilterActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import MovieCreate from 'component/MovieCreate';

class CreatePage extends Component {
  componentDidMount = async () => {
    try {
      await this.props.getFilters();
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    return (
      <MovieCreate 
      history={this.props.history}
      genres={this.props.genres.all}
      createMovie={this.props.createMovie} />
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.filters
  }
};

const mapDispatchToProps = {
  createMovie,
  getFilters
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage)