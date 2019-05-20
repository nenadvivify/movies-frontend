import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import movieReducer from './MovieReducer';
import searchReducer from './SearchReducer';
import filtersReducer from './FiltersReducer';
import loadingReducer from './LoadingReducer';
import watchlistReducer from './WatchlistReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    authUser: authReducer,
    error: errorReducer,
    movies: movieReducer,
    searchText: searchReducer,
    filters: filtersReducer,
    loading: loadingReducer,
    watchlist: watchlistReducer
  });