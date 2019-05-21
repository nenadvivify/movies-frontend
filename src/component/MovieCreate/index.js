import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { pick } from 'lodash';
import faker from 'faker';

import MoviesWidget from 'component/MoviesWidget';
import './style.scss';

const initial = {
  title: "",
  description: "",
  image_url: faker.image.imageUrl(),
  genre_id: ""
}

class MovieCreate extends Component {
  state = {
    ...initial
  }

  clear = () => {
    this.setState({ ...initial })
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = pick(this.state, [
      'title', 'description', 'image_url', 'genre_id'
    ])

    if(!data.title.length) {
      return toast.error('Title field is required');
    }

    if(!data.image_url.length) {
      return toast.error('Image field is required');
    }

    try {
      await this.props.createMovie(data);
      toast.success(`Added: ${data.title}`);
      this.clear();
      // this.props.history.push('/home');
    } catch (err) {
      return toast.error(err.message);
    }
  }

  displayGenres = () => {
    const { genres } = this.props;
    if(!genres || !genres.length) return null;

    return (
      <select 
      name="genre_id" 
      onChange={this.handleChange} 
      value={this.state.genre_id} 
      className="custom-select">
        <option disabled hidden value="">Select genre</option>
        {genres.map(genre => 
        <option 
        key={genre.id} 
        value={genre.id}>{genre.name}</option>)}
      </select>
    )
  }

  render() {
    return (
      <div className="page container full-height">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-4">Create new movie</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Movie title</label>
                <input 
                onChange={this.handleChange}
                value={this.state.title}
                placeholder="Insert movie title" 
                className="form-control" 
                name="title"
                type="text"  
                id="title" />
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Image url</label>
                <input 
                onChange={this.handleChange}
                value={this.state.image_url}
                placeholder="Insert image url" 
                className="form-control" 
                name="image_url"
                type="text"  
                id="image_url" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Movie description</label>
                <textarea 
                onChange={this.handleChange}
                value={this.state.description}
                placeholder="Insert movie description" 
                className="form-control" 
                id="description" 
                name="description"
                rows="3"></textarea>
              </div>

              <div className="form-group">
                {this.displayGenres()}
              </div>

              <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-primary">
                  <span>Create movie</span>
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-4 sidebar">
            <MoviesWidget
            movies={this.props.recent}
            title="Recent movies"
            withDescription
            withGenre />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCreate;