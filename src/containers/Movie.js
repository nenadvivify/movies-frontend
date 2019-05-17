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
      <Movie movie={this.props.movie} />
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.active
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
