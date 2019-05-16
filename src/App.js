import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ToastContainer} from 'react-toastify';
import AppLayout from './component/layout';
import store from './store/Store';
import './App.css';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <>
            <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            closeOnClick
            pauseOnVisibilityChange
            pauseOnHover />

            <AppLayout history={history} />
          </>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
