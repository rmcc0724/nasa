//Create an object that uses properties for each of the event listener classes
export const elements = {
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    asteroid: document.querySelector('.asteroid'),
    asteroidView: document.querySelector('.asteroid-view'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    datePicker: document.querySelector('#datepicker'),
    asteroidCloseData: document.querySelector('.close__data-results'),
    asteroidCloseList: document.querySelector('.close__data-list'),
    asteroidClosePages: document.querySelector('.close__data-pages'),
    introText: document.querySelector('.text-intro')
};

//Create a variable loader and assign a string with the same name to it.
export const elementStrings = {
    loader: 'loader'
};


//Create a variable renderLoader and use the variable elementStrings.loader as the class name in the div
//This will render when certain conditions are true 
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    //Insert the loader after the beginning parent html element
    parent.insertAdjacentHTML('afterbegin', loader);
};


//Create a variable clearLoader and use the variable elementStrings.loader as the class to clear it when the items have loaded
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
