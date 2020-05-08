export default class Favorites {
  constructor() {
    //movies will be stored
    this.favorites = [];
  }

  addFavorite(id, img, title) {
    const movie = {
      id,
      img,
      title,
    };
    //push the object tof avorites
    this.favorites.push(movie);
    //save to local storage
    this.savetoLocal();

    return movie;
  }
  //check if the id is on the favorite array
  checkFavorite(id) {
    return this.favorites.findIndex((el) => el.id === id) !== -1;
  }

  //delete the movie
  deleteFavorite(id) {
    //get the id
    const index = this.favorites.findIndex((el) => el.id === id);
    //remove from the favorites
    this.favorites.splice(index, 1);

    // update local Storage
    this.savetoLocal();
  }

  //check how many favorites exisit
  checkFavoritesLength() {
    return this.favorites.length;
  }

  savetoLocal() {
    //save to Local Storage
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  readLocal() {
    //get the data
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    // if local is not empty save it to favorites
    if (favorites) this.favorites = favorites;
  }
}
