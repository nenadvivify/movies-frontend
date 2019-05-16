import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies, searchMovie } from 'store/actions/MovieActions';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import Search from 'component/Search';
import Filters from 'component/Filters';

class Home extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  handlePageChange = page => {
    this.props.history.push(`/home/${page}`);
    window.scrollTo(0, 0);
  }

  renderMovies = () => {
    const movies = this.props.movies;
    
    if(!movies.length) {
      return <div style={{padding: "150px 0", margin: "0 auto"}}>
        <h1 className="display-4">No movies found</h1>
      </div>
    }

    return movies.map(movie => {
      return <MovieCard key={movie.id} movie={movie} />
    });
  };

  render() {
    return (
      <div style={{padding: '2rem 0' }} className="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-2 order-lg-1 home-left">

              <div className="row">
                {this.renderMovies()}
              </div>

              <div className="row">
                <Pagination 
                total={this.props.total}
                current={this.props.match.params.page}
                onChange={this.handlePageChange}
                pageSize={10} />
              </div>
            </div>

            <div className="col-lg-4 order-1 order-lg-2 home-right">
              <Search 
              history={this.props.history}
              searchMovie={this.props.searchMovie} />

              <Filters />
            </div>
          </div>
        </div>
      </div>
    );
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

const mapStateToProps = (state, props) => {
  const searchText = state.searchText;
  const afterSearch = applySearchText(state.movies, searchText);
  const afterFilters = applyFilters(afterSearch, state.filters.active);
  const afterSlice = slicePerPage(afterFilters, props, 10)

  return {
    total: afterFilters.length,
    movies: afterSlice
  }
};

const mapDispatchToProps = {
  getMovies,
  searchMovie
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
