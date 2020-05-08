export const elements = {
  form: document.querySelector(".nav__form"),
  container: document.querySelector(".container"),
  formInput: document.querySelector(".nav__search"),
  favorites: document.querySelector(".favorites"),
  heartPanel: document.querySelector(".nav__right"),
  nav: document.querySelector(".nav"),
};

export const clearUI = () => {
  elements.container.innerHTML = "";
};

export const addLoader = () => {
  const markup = `
  <div class="loader-container">
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
  <span class="loader"></span>
</div>

  `;
  elements.container.insertAdjacentHTML("afterbegin", markup);
};

export const clearLoader = () => {
  elements.container.innerHTML = "";
};

export const renderMainPage = () => {
  const markup = `<div class="container__home">
    <h1 class="container__home--title">Find an Interesting Movie</h1>
    <p class ="container__home--desc"> 🌟 Type a movie at the search bar and press enter! Enjoy 🌟</p>
  </div>
  
  `;

  elements.container.insertAdjacentHTML("afterbegin", markup);
};
