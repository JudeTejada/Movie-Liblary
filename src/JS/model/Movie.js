import { API_KEY, PROXY } from "../config";
import axios from "axios";

export default class Movie {
  constructor(id) {
    this.id = id;
  }

  async getMovie() {
    try {
      const res = await axios.get(
        `${PROXY}http://www.omdbapi.com/?apikey=${API_KEY}&i=${this.id}&type=movie&plot=full`
      );

      this.ratings = res.data.Ratings;
      this.title = res.data.Title;
      this.genres = res.data.Genre;
      this.plot = res.data.Plot;
      this.img = res.data.Poster;
      this.imdbRating = res.data.imdbRating;
      this.genres = res.data.Genre;
      this.language = res.data.Language;
      this.runtime = res.data.Runtime;
      this.releasedDate = res.data.Released;
    } catch (err) {
      console.log(err);
    }
  }
}
