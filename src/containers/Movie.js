import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie, getSimilar, removeActive } from 'store/actions/MovieActions';
import { getWatchlist } from 'store/actions/WatchlistActions';
import { toast } from 'react-toastify';
import MovieSingle from 'component/MovieSingle';

class Home extends Component {
  async componentDidMount() {
    const movieId = this.props.match.params.movieId;
    try {
      await this.props.getWatchlist();
      await this.props.getMovie(movieId);
      await this.props.getSimilar({ movie_id: movieId })
    } catch (err) {
      toast.error(err.message);
    }
  }

  async componentDidUpdate(prevProps) {
    const movieId = this.props.match.params.movieId;
    if(movieId !== prevProps.match.params.movieId) {
      try {
        await this.props.getWatchlist();
        await this.props.getMovie(movieId);
        await this.props.getSimilar({ movie_id: movieId })
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  componentWillUnmount() {
    this.props.removeActive();
  }

  render() {
    return (
      <MovieSingle 
      watchlist={this.props.watchlist}
      loading={this.props.loading}
      similar={this.props.similar}
      movie={this.props.movie} />
    );
  }
}

function filterWatched(movies, showWatched) {
  if(showWatched) return movies;
  return movies.filter(({ pivot }) => !pivot.watched)
}

const mapStateToProps = state => {
  const watchlist = filterWatched(
    state.watchlist.all,
    state.watchlist.showWatched
  );

  return {
    movie: state.movies.active,
    similar: state.movies.similar,
    loading: state.loading,
    watchlist
  }
}

const mapDispatchToProps = {
  getMovie,
  getSimilar,
  removeActive,
  getWatchlist
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);