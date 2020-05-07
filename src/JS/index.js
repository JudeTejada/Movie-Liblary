import "./../scss/main.scss";

import Search from "./model/Search";
import Movie from "./model/Movie";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";
import { elements, clearUI } from "./views/base";
//GLobal state of the app\

const state = {};

/*---- SEARCH CONTROLLER ---- */

const searchController = async (type, page) => {
  if (type === "new") {
    const query = searchView.getInput();

    //check if query
    if (query) {
      //create the search object
      state.search = new Search(query);

      // Prepare UI for results
      clearUI();
      searchView.clearInput();

      try {
        //get ress
        await state.search.getResults();

        //render the pages
        searchView.renderResults(state.search);
      } catch (err) {
        console.log(err);
      }
    }
  } else if (type === "used") {
    //preare UI
    clearUI();
    searchView.clearInput();

    try {
      console.log("Fetching Next Page");
      //fetch a request
      await state.search.getResults(page);
      //render movies on page
      searchView.renderResults(state.search);
    } catch (err) {
      console.log(err);
    }
  }
};

const movieController = async (id, fromMenu = false) => {
  //check if there's an id
  if (id) {
    state.movie = new Movie(id);

    //prepare the ui

    //send a request
    try {
      state.movie.getMovie();

      movieView.renderMovie(state.movie);
    } catch (err) {}

    //display
  }
};

// Event listener for submit form at nav
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController("new");
});

// Listen for a pagination btn
elements.container.addEventListener("click", (e) => {
  const buttonPagination = e.target.closest(".btn__pagination");
  const movie = e.target.closest(".movie");
  //check if pagination was clicked
  if (buttonPagination) {
    const page = parseInt(buttonPagination.dataset.page, 10);
    searchController("used", page);
  }
  if (movie) {
    const movieID = movie.dataset.id;
    movieController(movieID);
  }
});
