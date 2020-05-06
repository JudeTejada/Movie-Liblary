import { elements } from "./base";

export const getInput = () => elements.formInput.value;

const renderMovie = (result) => {
  const movieContainer = document.querySelector(".container__movies");
  const markup =
    result.Poster === "N/A"
      ? `<figure class="movie" data-id="${result.imdbID}">
   <div class="movie__noimg"> No Image🤡</div>
    <h3 class="movie__title">${result.Title}</h3>
  </figure>`
      : `<figure class="movie" data-id="${result.imdbID}">
    <img src="${result.Poster}" alt="${result.Title}"  class="movie__img"/>
    <figcaption class="movie__title">${result.Title}</figcaption>
   </figure>`;

  movieContainer.insertAdjacentHTML("beforeend", markup);
};

const renderError = (msg) => {};

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
};
