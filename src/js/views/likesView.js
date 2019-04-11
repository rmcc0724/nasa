import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    let x = document.querySelector('.header__likes');
    isLiked ? x.classList.add('header__likes_true') : x.classList.remove('header__likes_true') 
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

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

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}