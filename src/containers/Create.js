import React, { Component } from 'react';
import { createMovie, getMovies } from 'store/actions/MovieActions';
import { getFilters } from 'store/actions/FilterActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import MovieCreate from 'component/MovieCreate';

class CreatePage extends Component {
  componentDidMount = async () => {
    try {
      await this.props.getFilters();
      await this.props.getMovies();
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    return (
      <MovieCreate 
      recent={this.props.recent}
      history={this.props.history}
      genres={this.props.genres.all}
      createMovie={this.props.createMovie} />
    );
  }
}

function getRecent(movies, len) {
  return movies.slice(0, len);
}

const mapStateToProps = state => {
  return {
    recent: getRecent(state.movies.all, 5),
    genres: state.filters
  }
};

const mapDispatchToProps = {
  createMovie,
  getMovies,
  getFilters
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage)