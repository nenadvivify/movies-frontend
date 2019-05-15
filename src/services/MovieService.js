import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies'
};

class MovieService extends ApiService {
  getMovies = () => {
    return this.apiClient.get(ENDPOINTS.MOVIES);
  };

  getMovie = movieData => {
    return this.apiClient.get(ENDPOINTS.MOVIES, movieData)
  };
}

export const movieService = new MovieService();
