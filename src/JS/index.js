import "./../scss/main.scss";

import Search from "./model/Search";
import Movie from "./model/Movie";
import Favorites from "./model/Favorite";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";
import * as favoriteView from "./views/favoriteView";
import {
  elements,
  clearUI,
  addLoader,
  clearLoader,
  renderMainPage,
} from "./views/base";
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
      addLoader();
      searchView.clearInput();

      try {
        //get ress
        await state.search.getResults();
        clearLoader();
        //render the pages
        searchView.renderResults(state.search);
      } catch (err) {
     
      }
    }
  } else if (type === "used") {
    //preare UI

    clearUI();
    addLoader();
    searchView.clearInput();

    try {
      console.log("Getting Ready");

      //fetch a request
      await state.search.getResults(page);
      clearLoader();
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
    clearUI();
    addLoader();

    //send a request
    try {
      await state.movie.getMovie();
      clearLoader();
      movieView.renderMovie(
        state.movie,
        state.favorites.checkFavorite(id),
        fromMenu
      );
    } catch (err) {
      console.log(err);
    }

    //display
  }
};

const favoriteController = () => {
  // if there is no fav obj make one
  if (!state.favorites) state.favorites = new Favorites();

  //save the id of current Movie
  const movieID = state.movie.id;

  //if its not favorited then add it to favorites
  if (!state.favorites.checkFavorite(movieID)) {
    //add to favorite
    const newFavorite = state.favorites.addFavorite(
      movieID,
      state.movie.img,
      state.movie.title
    );

    //toggle heart
    favoriteView.toggleFavorite(true);

    // //render new Favorite on the list
    favoriteView.renderFavorite(newFavorite);
  }
  // if its saved in Local Storage
  else {
    //remove from Favorites
    state.favorites.deleteFavorite(movieID);

    //toggle back to not favorite
    favoriteView.toggleFavorite(false);

    //remove from favorite list
    favoriteView.removeFavorite(movieID);
  }
  // toggle menu
  favoriteView.toggleMenu(state.favorites.checkFavoritesLength());
};
/*  ----- LISTENERS ----- */

// Event listener for submit form at nav
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController("new");
});

window.addEventListener("load", () => {
  renderMainPage();
  //create object for the favorite section
  state.favorites = new Favorites();

  //check if user saved a movie
  state.favorites.readLocal();

  //toggle menu
  favoriteView.toggleMenu(state.favorites.checkFavoritesLength());

  //render data
  state.favorites.favorites.forEach((fav) => {
    favoriteView.renderFavorite(fav);
  });
});
// Listen for a pagination btns
elements.container.addEventListener("click", (e) => {
  const buttonPagination = e.target.closest(".btn__pagination");
  const buttonFavorite = e.target.closest(".btn__main--save");
  const buttonBack = e.target.matches(".btn__back");
  const movie = e.target.closest(".movie");

  //check if pagination was clicked
  if (buttonPagination) {
    const page = parseInt(buttonPagination.dataset.page, 10);
    searchController("used", page);
  }

  //if movie card is clicked
  if (movie) {
    const movieID = movie.dataset.id;
    movieController(movieID);
  }

  //if back button is clicked
  if (buttonBack) {
    searchController("used", state.search.page);
  }

  if (buttonFavorite) {
    favoriteController();
  }
});

elements.nav.addEventListener("click", (e) => {
  const panelFavorites = e.target.closest(".favorites__div");

  if (panelFavorites) {
    const movieId = panelFavorites.dataset.id;

    //call movie controller
    movieController(movieId, true);
  }
});
