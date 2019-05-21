import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies, searchMovie } from 'store/actions/MovieActions';
import { getWatchlist } from 'store/actions/WatchlistActions';
import { toast } from 'react-toastify';
import MoviesList from 'component/MoviesList';

class Home extends Component {
  componentDidMount = async () => {
    try {
      await this.props.getMovies();
      await this.props.getWatchlist();
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    return <MoviesList 
    watchlist={this.props.watchlist}
    movies={this.props.movies}
    popular={this.props.popular}
    total={this.props.total}
    searchMovie={this.props.searchMovie}
    searchText={this.props.searchText}
    loading={this.props.loading} />
  }
}

function slicePerPage(movies, props, pageSize = 10) {
  let page = props.match.params.page || 1;
  if(!page || page <= 1) {
    page = 1;
  }

  let end = page * pageSize;
  let start = end - pageSize;

  return movies.slice(start, end)
}

function applySearchText(movies, searchText) {
  return movies.filter(movie => {
    return movie.title.toLowerCase().includes(searchText.toLowerCase());
  })
}

function applyFilters(movies, filters) {
  if(!filters.length) return movies;
  return movies.filter(movie => {
    return filters.includes(movie.genre.name)
  })
}

function mostPopular(movies, length) {
  const copy = [...movies];
  copy.sort((a, b) => b.likes - a.likes);
  return copy.slice(0, length);
}

function filterWatched(movies, showWatched) {
  if(showWatched) return movies;
  return movies.filter(({ pivot }) => !pivot.watched)
}

const mapStateToProps = (state, props) => {
  const { searchText, movies } = state;
  const afterSearch = applySearchText(movies.all, searchText);
  const afterFilters = applyFilters(afterSearch, state.filters.active);
  const afterSlice = slicePerPage(afterFilters, props, 10)
  const popular = mostPopular(movies.all, 5);
  const watchlist = filterWatched(
    state.watchlist.all,
    state.watchlist.showWatched
  );

  return {
    total: afterFilters.length,
    movies: afterSlice,
    loading: state.loading,
    searchText,
    watchlist,
    popular
  }
};

const mapDispatchToProps = {
  getMovies,
  searchMovie,
  getWatchlist
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);