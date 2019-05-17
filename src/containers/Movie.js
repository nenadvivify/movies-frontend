import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie } from 'store/actions/MovieActions';
import Movie from 'component/MovieSingle';

class Home extends Component {
  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    this.props.getMovie(movieId)
  }

  render() {
    if(!this.props.movie) {
      return null;
    }
    
    return (
      <Movie 
      similar={this.props.similar}
      movie={this.props.movie} />
    );
  }
}

const getSimilar = (movies, active, len) => {
  if(!movies || !active) return [];

  return movies.filter(movie => {
    return movie.genre.name === active.genre.name
  }).slice(0, len);
}

const mapStateToProps = state => {
  const {active, all} = state.movies;
  const similar = getSimilar(all, active, 10);

  return {
    movie: active,
    similar
  }
}

const mapDispatchToProps = {
  getMovie
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
