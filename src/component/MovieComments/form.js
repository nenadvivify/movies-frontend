import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createComment } from 'store/actions/MovieActions';
import './style.scss';

class CommentsForm extends Component {
  state = {
    body: "",
    touched: false
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const body = this.state.body.trim();

    if(!body) {
      return toast.error('Comment text cannot be empty.');
    }

    if(body.length > 500) {
      return toast.error('Comment text cannot be longer the 500 characters.')
    }

    this.props.createComment({
      body: this.state.body,
      movie_id: this.props.movie.id
    }).then(res => {
      this.clear();
    }).catch(err => {
      toast.error('Comment not created.');
    })
  }

  handleFocus = event => {
    this.setState({ touched: true })
  }

  clear = () => {
    this.setState({
      touched: false,
      body: ""
    })
  }

  displayControls = () => {
    if(this.state.touched) {
      return (
        <div className="comment-form-controls">
          <button onClick={this.clear} className="btn btn-sm">Dismiss</button>
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      )
    }
  }

  displayInput = () => {
    return (
      <textarea
      rows="1" 
      max="500"
      type="text" 
      name="body" 
      value={this.state.body}
      onFocus={this.handleFocus} 
      onChange={this.handleChange}
      placeholder="Write something about this movie..."
      className="comment-form-input"></textarea>
    )
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        {this.displayInput()}
        {this.displayControls()}
      </form>
    );
  }
}


export default connect(null, {
  createComment
})(CommentsForm)