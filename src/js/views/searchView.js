import { elements } from './base';

export const getInput = () => {
    let date = elements.datePicker.value.split('');
    console.log(`${date} input`);
    if (`${date}`) {
        return `${date[6]}${date[7]}${date[8]}${date[9]}-${date[0]}${date[1]}-${date[3]}${date[4]}`;
    }
    else {
        return false;
    }
};

export const clearInput = () => {
    elements.datePicker.value = '';
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
                                    <img src="img/vesta_0715.jpg" alt="Asteroid">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">Name: ${asteroid.name}</h4>
                                    <p class="results__author">Hazardous?: ${asteroid.is_potentially_hazardous_asteroid}</p>
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
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
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
    else if (page === pages && pages === 1) {
        // Only button to go to prev page
        button = '';
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (asteroids, page = 1, resPerPage = 5) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    Object.keys(asteroids).map((asteroid) => {
        let newDate = asteroid.slice('');
        console.log(newDate);
        let headMarkup = `<h2>Date: ${newDate[5]}${newDate[6]}/${newDate[8]}${newDate[9]}/${newDate[0]}${newDate[1]}${newDate[2]}${newDate[3]}</h2><br/>`;
        elements.searchResList.insertAdjacentHTML('beforeend', headMarkup);
        asteroids[asteroid].slice(start, end).forEach(renderAsteroid);

        // render pagination buttons
        renderButtons(page, asteroids[asteroid].length, resPerPage);
    });
};
