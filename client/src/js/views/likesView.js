import { elements } from './base';
import { limitRecipeTitle } from './searchView';

//Toggles the like button, if true this will be added to the list of likes
export const toggleLikeBtn = isLiked => {
    let x = document.querySelector('.header__likes');
    isLiked ? x.classList.add('header__likes_true') : x.classList.remove('header__likes_true') 
};


//Check to see if there are an likes
//Hide the bookmark icon if false or display if true
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};


export const clearLikes = () => {
    elements.likesList.innerHTML = "";
}
//Render the likes view
export const renderLike = like => {
    console.log(like);
        const markup = `
            <li>
                <a class="likes__link" href="#${like.id}">
                    <figure class="likes__fig">
                        <img src="img/vesta_0715.jpg" alt="Asteroid">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${like.name}</h4>
                        <p class="likes__author">${like.hazardous}</p>
                    </div>
                </a>
            </li>
        `;
        elements.likesList.insertAdjacentHTML('beforeend', markup);
    };

//Remove like from the DOM
export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}