import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logIn } from '../../store/actions/AuthActions';
import './style.scss';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleInputChange = field => event => this.setState({ [field]: event.target.value });

  submit = event => {
    event.preventDefault();

    let logInData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.logIn(logInData);
  };

  render() {
    return (
      <div className="auth-page container">
        <div className="row full-width">
          <div className="col-sm-8 col-lg-6 mx-auto">
            <form onSubmit={this.submit}>
              <h2>Log In</h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleInputChange('email')}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleInputChange('password')}
                />
              </div>

              <input className="btn btn-primary" type="submit" value="Log in" />
              {this.props.loginError && <p>Login error</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.error.loginError
  };
};

const mapDispatchToProps = {
  logIn
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
