import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register } from 'store/actions/AuthActions';
import {toast} from 'react-toastify';
import './style.scss';

class Register extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    name: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();

    let registerData = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      name: this.state.name
    };

    this.props.register(registerData).then(res => {
      this.props.history.push('/login');
      toast.success(`Registration successful. Please login.`);
    }).catch(err => {
      console.log(err)
    })
  };

  render() {
    return (
      <div className="auth-page container">
        <div className="row full-width">
          <div className="col-sm-8 col-lg-6 mx-auto">
            <form onSubmit={this.submit}>
              <h2>Register</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleInputChange('email')}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange('password')}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={this.state.password_confirmation}
                  onChange={this.handleInputChange('password_confirmation')}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleInputChange('name')}
                />
              </div>

              <input className="btn btn-primary" type="submit" value="Register" />
              {this.props.registerError && <p>registerError</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerError: state.error.registerError
  };
};

const mapDispatchToProps = {
  register
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
