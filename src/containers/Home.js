import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies } from 'store/actions/MovieActions';
import MovieCard from 'component/MovieCard';
import Pagination from 'component/Pagination';

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
      <div>
        <div className="container">
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
      </div>
    );
  }
}

function slicePerPage(state, props, pageSize = 10) {
  let page = props.match.params.page || 1;
  if(!page || page <= 1) {
    page = 1;
  }

  let end = page * pageSize;
  let start = end - pageSize;

  return state.movies.slice(start, end)
}

const mapStateToProps = (state, props) => {
  const movies = slicePerPage(state, props, 10);

  return {
    movies,
    total: state.movies.length
  }
};

const mapDispatchToProps = {
  getMovies
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
