import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createComment } from 'store/actions/MovieActions';
import './style.scss';

const CommentsForm = props => {
  const [body, setBody] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const value = body.trim();

    if(!value) {
      return toast.error('Comment text cannot be empty.');
    }

    if(value.length > 500) {
      return toast.error('Comment text cannot be longer the 500 characters.')
    }

    props.createComment({
      movie_id: props.movie.id,
      body: value
    }).then(res => {
      clear();
    }).catch(err => {
      toast.error('Comment not created.');
    })
  }

  const handleFocus = event => {
    setTouched(true);
  }

  const clear = () => {
    setBody("");
    setTouched(false);
  }

  const displayControls = () => {
    if(touched) {
      return (
        <div className="comment-form-controls">
          <button onClick={clear} className="btn btn-sm">Dismiss</button>
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      )
    }
  }

  const displayInput = () => {
    return (
      <textarea
      rows="1" 
      max="500"
      type="text" 
      name="body" 
      value={body}
      onFocus={handleFocus} 
      onChange={({target}) => setBody(target.value)}
      placeholder="Write something about this movie..."
      className="comment-form-input"></textarea>
    )
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {displayInput()}
      {displayControls()}
    </form>
  )
}

export default connect(null, {
  createComment
})(CommentsForm)