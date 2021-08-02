import View from './View.js';
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';


class asteroidView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.name
    }" class="recipe__img">
    <h1 class="recipe__title">
        <span>${this._data.name}</span>
    </h1>
</figure>
<div class="recipe__details">
  <div class="recipe__ingredients">            
  <button class="recipe__love svg recipe_loved svg">
  <svg class="header__likes">
      <use href="img/book-mark.svg#book-mark"></use>
  </svg>
</button>
    <ul class="recipe__ingredient-list">
    <li>Name: ${this._data.name}</li>
    <li>Diameter: ${this._data.diameter} miles</li>
    <li>Hazardous: ${this._data.hazardous}</li>
    </ul>
  </div>
  <div class="recipe__ingredients">
     <h4>Close Approach Data:</h4><br>
  </div>
</div>
  </button>
</div>`;
  }
}

export default new asteroidView();