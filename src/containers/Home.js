import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies, searchMovie } from 'store/actions/MovieActions';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';
import Search from 'component/Search';

class Home extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  handlePageChange = page => {
    this.props.history.push(`/home/${page}`)
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
      <div className="home">
        <div className="container">
          <div className="row">
            <div className="col-md-8 home-left">
              <div className="row">
                <Search 
                history={this.props.history}
                searchMovie={this.props.searchMovie} />
              </div>

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

            <div className="home-right">
              Sidebar
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

const mapStateToProps = (state, props) => {
  const searchText = state.searchText;
  const afterSearch = applySearchText(state.movies, searchText);
  const afterSlice = slicePerPage(afterSearch, props, 10)

  return {
    total: afterSearch.length,
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
