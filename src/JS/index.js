import "./../scss/main.scss";

import Search from "./model/Search";

import * as searchView from "./views/searchView";

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

      try {
        //get ress
        await state.search.getResults();

        //render the pages
        searchView.renderResults(state.search);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

// Event listener for submit form at nav
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController("new");
});
