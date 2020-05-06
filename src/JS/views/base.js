export const elements = {
  form: document.querySelector(".nav__form"),
  container: document.querySelector(".container"),
  formInput: document.querySelector(".nav__search"),
};

export const clearUI = () => {
  elements.container.innerHTML = "";
};
