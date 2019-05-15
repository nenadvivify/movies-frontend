import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import movieReducer from './MovieReducer';
import searchReducer from './SearchReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    authUser: authReducer,
    error: errorReducer,
    movies: movieReducer,
    searchText: searchReducer
  });
