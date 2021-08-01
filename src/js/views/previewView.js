import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import rock from 'url:../../img/vesta_0715.jpg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src=${rock} alt="Asteroid" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">NAME: ${this._data.id} ${this._data.name} </h4>
            <p class="preview__publisher">HAZARDOUS?: ${this._data.hazardous}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();