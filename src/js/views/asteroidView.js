import { elements } from './base';

export const clearAsteroid = () => {
    elements.asteroid.innerHTML = '';
};


export const renderAsteroid = (asteroid, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="dist/img/vesta_0715.jpg" alt="${asteroid.name}" class="recipe__img">
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
<h4>Close Approach Data</h4><br>
  <ul class="recipe__ingredient-list">${asteroid.miss_distance.map(renderApproachData)}</ul>`;

    // <div class="recipe__info">
    //     <svg class="recipe__info-icon">
    //         <use href="img/icons.svg#icon-stopwatch"></use>
    //     </svg>
    //     <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
    //     <span class="recipe__info-text"> minutes</span>
    // </div>
    //         <div class="recipe__info">
    //             <svg class="recipe__info-icon">
    //                 <use href="img/icons.svg#icon-man"></use>
    //             </svg>
    //             <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
    //             <span class="recipe__info-text"> servings</span>

    //             <div class="recipe__info-buttons">
    //                 <button class="btn-tiny btn-decrease">
    //                     <svg>
    //                         <use href="img/icons.svg#icon-circle-with-minus"></use>
    //                     </svg>
    //                 </button>
    //                 <button class="btn-tiny btn-increase">
    //                     <svg>
    //                         <use href="img/icons.svg#icon-circle-with-plus"></use>
    //                     </svg>
    //                 </button>
    //             </div>

    //         </div>
    //         <button class="recipe__love">
    //             <svg class="header__likes">
    //                 <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
    //             </svg>
    //         </button>
    //     </div>


    // <button class="btn-small recipe__btn recipe__btn--add">
    //     <svg class="search__icon">
    //         <use href="img/icons.svg#icon-shopping-cart"></use>
    //     </svg>
    //     <span>Add to shopping list</span>
    // </button>


    //     <div class="recipe__directions">
    //         <h2 class="heading-2">How to cook it</h2>
    //         <p class="recipe__directions-text">
    //             This recipe was carefully designed and tested by
    //             <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
    //         </p>
    //         <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
    //             <span>Directions</span>
    //             <svg class="search__icon">
    //                 <use href="img/icons.svg#icon-triangle-right"></use>
    //             </svg>

    //         </a>
    //     </div>

    elements.asteroid.insertAdjacentHTML('afterbegin', markup);
    console.log(asteroid);
};



    const renderApproachData = e => 
        `<li>Date: ${e.close_approach_date}</li>
            <li>Miss Distance: ${e.miss_distance.miles} miles</li>
            <li>Orbiting Body: ${e.orbiting_body}</li>
            <li>Relative Velocity: ${e.relative_velocity.miles_per_hour} mph</li>`;

