import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie, getSimilar, removeActive } from 'store/actions/MovieActions';
import MovieSingle from 'component/MovieSingle';

class Home extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    this.props.getMovie(movieId);
    this.props.getSimilar({ movie_id: movieId })
  }

  componentDidUpdate(prevProps) {
    const movieId = this.props.match.params.movieId;
    if(movieId !== prevProps.match.params.movieId) {
      this.props.getMovie(movieId);
      this.props.getSimilar({ movie_id: movieId })
    }
  }

  componentWillUnmount() {
    this.props.removeActive();
  }

  render() {
    return (
      <MovieSingle 
      loading={this.props.loading}
      similar={this.props.similar}
      movie={this.props.movie} />
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.active,
    similar: state.movies.similar,
    loading: state.loading
  }
}

const mapDispatchToProps = {
  getMovie,
  getSimilar,
  removeActive
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);