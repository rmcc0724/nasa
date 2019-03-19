import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};


export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
export const limitAsteroidTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderAsteroid = asteroid => {

                        const bodyMarkup = `
                        <li>
                            <a class="results__link" href="#${asteroid.id}">
                                <figure class="results__fig">
                                    <img src="http://img.timeinc.net/time/daily/2011/1107/360_dawn_vesta_0715.jpg" alt="Asteroid">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">Asteroid Name ${asteroid.name}</h4>
                                    <p class="results__author">Hazardous? ${asteroid.is_potentially_hazardous_asteroid}</p>
                                </div>
                            </a>
                        </li>
                    `;
                    elements.searchResList.insertAdjacentHTML('beforeend', bodyMarkup);
                };

                // type: 'prev' or 'next'
                const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="dist/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

                const renderButtons = (page, numResults, resPerPage) => {
                    const pages = Math.ceil(numResults / resPerPage);

                    let button;
                    if (page === 1 && pages > 1) {
                        // Only button to go to next page
                        button = createButton(page, 'next');
                    }
                    else if (page < pages) {
                        // Both buttons
                        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
                    }
                    else if (page === pages && pages > 1) {
                        // Only button to go to prev page
                        button = createButton(page, 'prev');
                    }

                    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
                };

                export const renderResults = (asteroids, page = 1, resPerPage = 10) => {
                    // render results of currente page
                    const start = (page - 1) * resPerPage;
                    const end = page * resPerPage;

                    asteroids.slice(start, end).forEach(renderAsteroid());

                    // render pagination buttons
                    renderButtons(page, asteroids.length, resPerPage);
                };

                export const getResults = asteroids => {
                    
                    Object.keys(asteroids).map((asteroid) => {
                    let headMarkup = `<h2>Date: ${asteroid}</h2><br/>`;
                    elements.searchResList.insertAdjacentHTML('beforeend', headMarkup);
                    asteroids[asteroid].forEach(renderAsteroid)
                });
                };
