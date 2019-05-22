import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const DropdownItem = props => {
  const { movie } = props;
  const to = '/movies/' + movie.id;

  const excerpt = (string, len) => {
    return string.slice(0, len) + '...';
  }

  return (
    <div className="nav-search-dropdown-item media">
      <img src={movie.image_url} alt="" className="media-image"/>

      <div className="media-body">
        <div className="media-body-header">
          <Link 
          onClick={props.handleClick}
          className="media-body-title" 
          to={to}>{movie.title}</Link>
          <span className="badge badge-secondary media-body-badge">{movie.genre.name}</span>
        </div>

        <p className="media-body-description">{excerpt(movie.description, 75)}</p>
      </div>
    </div>
  )
}

class Dropdown extends Component {
  render() {
    const { movies, close } = this.props;

    if(!movies || !movies.length) {
      return null;
    }

    if(close) {
      return null;
    }

    return (
      <div className="nav-search-dropdown">
        {movies.map(movie => (
          <DropdownItem 
          handleClick={this.props.handleClick}
          key={movie.id} 
          movie={movie} />
        ))}
      </div>
    );
  }
}

export default Dropdown;