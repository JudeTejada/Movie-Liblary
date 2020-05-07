import { elements } from "./base";

const liGenre = (genre) => `<li>${genre}</li>`;

const displayGenre = (genre) => {
  const genres = Array.from(genre);

  const markup = `${genres.map((genre) => liGenre(genre)).join("")}`;

  return markup;
};

export const renderMovie = (movie) => {
  //check if there's movie
  if (movie) {
    let markup = `
    <div class="container__moviePage moviePage">
    <div class="flex-between">
        <div class="col-1">
              <figure class="moviePage__image">
                <img class="moviePage__photo" src="${movie.img}" alt="${
      movie.title
    }"/>
              </figure>
        </div>

        <div class="col-2">
        <h1 class="moviePage__title">${movie.title}</h1>
        <div class="flex-between">
        
        </div>

        <ul class="moviePage__genres">
          <h3 class="moviePage__subheading">
          The Genres
          </h3>
         ${displayGenre(movie.genres.split(","))}
        </ul>


        <div class="moviePage__description">
        <h3 class="moviePage__subheading">The Synopsis</h3>
        <p class="moviePage__plot">${movie.plot}</p>
        </div>
       

      <div class="flex-between">
        <button class="btn btn__main">IMDB ${movie.imdbRating}</button>
        <button class="btn btn__main btn__main--save">
        <span class="material-icons">favorite_border</span></button>
      </div>
      </div>
</div>


      <button class="btn btn__back">   <span class="material-icons">
      arrow_back
      </span> Back</button>
      </div>
    `;

    elements.container.insertAdjacentHTML("afterbegin", markup);
  }
};
