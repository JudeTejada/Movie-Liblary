import { elements } from "./base";

//toggle the favorite button
export const toggleFavorite = (isFavorite) => {
  const button = document.querySelector(".icon-favorite");

  if (isFavorite) {

    button.innerHTML = "favorite";
  } else if (!isFavorite) {

    button.innerHTML = "favorite_border";
  }
};

export const removeFavorite = (id) => {
  if (id) {
    const favorite = document.querySelector(`.favorites__div[data-id='${id}']`);

    if (favorite) {
      favorite.parentElement.removeChild(favorite);
    }
  }
};

export const renderFavorite = (movie) => {

  if (movie) {
    const markup = `
    <div class ="favorites__div" data-id="${movie.id}">
     <img src="${movie.img}" alt="${movie.title}" class="favorites__img" />
      <h3 class="favorites__movieName">${movie.title}</h3>
    </div>
    `;

    elements.favorites.insertAdjacentHTML("afterbegin", markup);
  }
};

export const toggleMenu = (favorites) => {
  
  if (favorites > 0) {
    elements.heartPanel.classList.remove("hide");
  } else {
    elements.heartPanel.classList.add("hide");
  }
};
