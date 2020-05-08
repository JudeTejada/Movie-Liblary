import { elements } from "./base";

const createLi = (data) => `<li>${data}</li>`;

const displayGenre = (genre) => {
  const genres = Array.from(genre);

  const markup = `${genres.map((genre) => createLi(genre)).join("")}`;

  return markup;
};
const getFirstLanguage = (lang) => {
  const language = Array.from(lang);


  
  return language[0]
 
}


export const renderMovie = (movie, isFavorite) => {

  //check if there's movie
  if (movie) {
    let markup = `
    <div class="container__moviePage moviePage">
    <div class="moviePage__flex">
        <div class="col-1">
        ${  movie.img === "N/A"
        ? `<figure class="movie__image">
               <div class="moviePage__noPoster">No Image🤡</div>
            </figure>`
        : `<figure class="moviePage__image">
              <img src="${movie.img}" alt="${movie.title}" />
          </figure>`}
        
          
        </div>

        <div class="col-2">
        <h1 class="moviePage__title">${movie.title}</h1>

          <ul class="moviePage__details hide-mobile">
                <li class="moviePage__detail">
                <span class="material-icons">calendar_today</span>

                    ${movie.releasedDate}
                </li>

                <li class="moviePage__detail">
                <span class="material-icons">alarm</span>
                    ${movie.runtime} min
                </li>
                <li class="moviePage__detail">
                <span class="material-icons">person</span>
                    ${movie.director}
               </li>

                <li class="moviePage__detail">
                <span class="material-icons">language</span>
                    ${getFirstLanguage(movie.language.split(','))}
               </li>
               
              
          </ul>
     

        <ul>
          <h3 class="moviePage__subheading">
          The Genres
          </h3>
          <div class="moviePage__details">
         ${displayGenre(movie.genres.split(","))}
         <div>
        </ul>


        <div class="moviePage__description">
        <h3 class="moviePage__subheading">The Synopsis</h3>
        <p class="moviePage__plot">${movie.plot}</p>
        </div>
       

      <div class="flex-between">
        <button class="btn btn__main">IMDB ${movie.imdbRating}</button>
        <button class="btn btn__main btn__main--save">
        <span class="material-icons icon-favorite">      
        ${isFavorite ? "favorite" : "favorite_border"}</span></button>
      </div>
      </div>
</div>


      <button class="btn btn__back">  
       <span class="material-icons">keyboard_backspace</span>
       Go back
       </button> 
      </div>
    `;

    elements.container.insertAdjacentHTML("afterbegin", markup);
  }
};
