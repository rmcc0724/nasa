import { elements } from "./base";

export const clearAsteroid = () => {
  elements.introText.style.display = "none";
  elements.asteroidView.innerHTML = "";
};

export const clearCloseData = () => {
  elements.asteroidCloseList.innerHTML = "";
  elements.asteroidClosePages.innerHTML = "";
};

export const renderAsteroid = (asteroid) => {

  const markup = `
        <figure class="recipe__fig">
            <img src="img/vesta_0715.jpg" alt="${
              asteroid.name
            }" class="recipe__img">
            <h1 class="recipe__title">
                <span>${asteroid.name}</span>
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
            <li>Name: ${asteroid.name}</li>
            <li>Diameter: ${asteroid.diameter} miles</li>
            <li>Hazardous: ${asteroid.hazardous}</li>
            </ul>

          </div>
          <div class="recipe__ingredients">
             <h4>Close Approach Data:</h4><br>
          </div>
</div>
          </button>
        </div>`;
  elements.asteroidView.insertAdjacentHTML("afterbegin", markup);
};

export const renderCloseResults = (data, page = 1, resPerPage = 5) => {
  // elements.asteroidCloseList.innerHTML = "";
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  data.slice(start, end).forEach(renderApproachData);
  renderButtons(page, data.length, resPerPage);
};

const renderApproachData = e => {
  const markup = `<li>Date: ${e.close_approach_date}</li>
                <li>Miss Distance: ${e.miss_distance.miles} miles</li>
                <li>Orbiting Body: ${e.orbiting_body}</li>
                <li>Relative Velocity: ${
                  e.relative_velocity.miles_per_hour
                }mph</li><br>`;
  elements.asteroidCloseList.insertAdjacentHTML("beforeend", markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  //console.log(`${page} ${numResults} ${resPerPage}`);
  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons
    button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
    button = createButton(page, "prev");
  } else if (page === pages && pages === 1) {
    // Only button to go to prev page
    button = "";
  }
  elements.asteroidClosePages.insertAdjacentHTML("afterbegin", button);
};
