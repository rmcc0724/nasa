import { elements } from "./base";

export const clearAsteroid = () => {
    elements.asteroid.innerHTML = `
    <ul class="close__data-results"></ul>`;
};

export const renderAsteroid = (asteroid, isLiked, page = 1, resPerPage = 5) => {

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

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
            <ul class="recipe__ingredient-list">
            <li>Name: ${asteroid.name}</li>
            <li>Diameter: ${asteroid.diameter} miles</li>
            <li>Hazardous: ${asteroid.hazardous}</li>
            </ul>
        </div>
    <div class="recipe__ingredients">
<h4>Close Approach Data</h4><br>`;

    asteroid.miss_distance.forEach(renderCloseResults)
    elements.asteroid.insertAdjacentHTML("afterbegin", markup);
    //   console.log(asteroid);
};

const renderCloseResults = (data, page = 1, resPerPage = 5) => {
    console.log(data.close_approach_date);
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    console.log(renderApproachData(data));
    let markup = `<ul class="close__data-results">`;
    markup += renderApproachData(data);
    markup += `</ul>`;
    elements.asteroid.insertAdjacentHTML("beforeend", markup);
}

const renderApproachData = e =>

    `<li>Date: ${e.close_approach_date}</li>
                <li>Miss Distance: ${e.miss_distance.miles} miles</li>
                <li>Orbiting Body: ${e.orbiting_body}</li>
                <li>Relative Velocity: ${
    e.relative_velocity.miles_per_hour
    }mph</li>`;


// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
    }>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use src="img/icons.svg#icon-triangle-${
    type === "prev" ? "left" : "right"
    }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

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
    elements.asteroid.insertAdjacentHTML("afterbegin", button);
};


        // elements.asteroid.insertAdjacentHTML('beforeend', markup);
// console.log(e.close_approach_date);



