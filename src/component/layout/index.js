import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';

import { authUser } from 'store/actions/AuthActions';
import Login from 'containers/auth/Login';
import Register from 'containers/auth/Register';
import Home from 'containers/Home';
import Navbar from 'component/navbar';
import Movie from 'component/movie';
import './index.scss';

class AppLayout extends React.Component {
  state = {
    loading: true
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.user !== prevProps.user) {
  //     if (this.props.user) {
  //       this.props.history.push('/home');
  //     } else {
  //       this.props.history.push('/login');
  //     }
  //   }
  // }

  // componentDidMount() {
  //   if (this.props.user) {
  //     this.props.history.push('/home');
  //   } else {
  //     this.props.history.push('/login');
  //   }
  // }

  render() {
    return <div>
      <Navbar />

      <main>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies/:movieId" component={Movie} />
        </Switch>
      </main>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.authUser
  };
};

const mapDispatchToProps = () => {
  return {
    authUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppLayout)
);
