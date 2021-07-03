import axios from 'axios';

const API_KEY = "b0d9f8fee50eecce89069973e0636eba";

export default axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params : {
      api_key: API_KEY
  }
});

export const imageUrl = "https://image.tmdb.org/t/p/w780";