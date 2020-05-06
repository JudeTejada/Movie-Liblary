import axios from "axios";
// Search class for model

import { API_KEY, PROXY } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(page = 1) {
    try {
      const res = await axios.get(
        `${PROXY}http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.query}&type=movie&page=${page}`
      );
      //store the data in result
      this.result = res.data;
      this.page = page;
    } catch (error) {
      console.log(error);
    }
  }
}
