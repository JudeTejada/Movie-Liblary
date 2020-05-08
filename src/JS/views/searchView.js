import { elements } from "./base";

export const getInput = () => elements.formInput.value;
export const clearInput = () => (elements.formInput.value = "");

//creating a button of next and back
const createButton = (page, type) => `
  <button class="btn btn__pagination" data-page=${
    type === "next" ? page + 1 : page - 1
  }>
  Page ${type === "next" ? page + 1 : page - 1}

  <span class="material-icons">
  arrow_${type === "next" ? "forward" : "back"}
  </span>
  </button>

`;

const renderMovie = (result) => {
  const movieContainer = document.querySelector(".container__movies");
  const markup =
    result.Poster === "N/A"
      ? `<figure class="movie" data-id="${result.imdbID}">
        <div class="movie__noPoster">No Image🤡</div>
          <h3 class="movie__title">${result.Title}</h3>
        </figure>`
      : `<figure class="movie" data-id="${result.imdbID}">
    <img src="${result.Poster}" alt="${result.Title}"  class="movie__img"/>
   </figure>`;

  movieContainer.insertAdjacentHTML("beforeend", markup);
};
//add Pagination to the site
const renderPagination = (...args) => {
  const [page, totalResults] = args;
  let button;
  //get total pages of the results
  const pages = Math.ceil(totalResults / 10);

  //check if were on page 1
  if (page === 1) {
    button = createButton(page, "next");
  } else if (page < pages) {
    button = `
    ${createButton(page, "back")}
    ${createButton(page, "next")}
    `;
  }
  // create back button if
  else if (page === pages && pages > 1) {
    button = createButton(page, "back");
  }

  //check if theres a button
  if (button) {
    document
      .querySelector(".container__pagination")
      .insertAdjacentHTML("afterbegin", button);
  }
};

const renderError = (msg) => {};

//display the content to DOM
export const renderResults = (search) => {
  //if no movie was found
  if (search.Response === "False") renderError(search);

  const markup = `
  <section class="container__search">
    <h1 class="container__query">Search Results for <strong>${search.query}</strong></h1>
  </section>
  <section class="container__movies"></section>
  <section class="container__pagination"></section>
  `;

  //add the boilerplate
  elements.container.insertAdjacentHTML("afterbegin", markup);

  //display all movie related to query
  search.result.Search.forEach((movie) => renderMovie(movie));

  renderPagination(search.page, search.result.totalResults);
};
