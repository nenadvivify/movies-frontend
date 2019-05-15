import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovie } from 'store/actions/MovieActions';
import Movie from 'component/MovieSingle';

class Home extends Component {
  state = {
    movie: null,
    loading: true
  }

  componentDidMount() {
    const id = this.props.match.params.movieId;
    this.props.getMovie(id).then(res => {
      this.setState({movie: res, loading: false})
    }).catch(err => {
      console.log(err);
      this.setState({loading: false})
    })
  }

  render() {
    
    return (
      <Movie 
      loading={this.state.loading} 
      movie={this.state.movie} />
    );
  }
}

const mapDispatchToProps = {
  getMovie
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Home)
);
