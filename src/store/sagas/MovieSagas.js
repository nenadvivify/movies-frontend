import { call, put } from 'redux-saga/effects';

import { movieService } from '../../services/MovieService';
import { setMovies } from '../actions/MovieActions';

export function* moviesGet() {
  try {
    const { data } = yield call(movieService.getMovies);

    yield put(setMovies(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}

export function* movieGet(id) {
  try {
    const { data } = yield call(movieService.getMovies, {id});

    yield put(setMovies(data));
  } catch (error) {
    console.log({ error }); /*eslint-disable-line*/
  }
}