//Import the Search model from the Search.js file
import Search from './models/Search';
import Asteroid from './models/Asteroid';
import * as searchView from './views/searchView';
import * as asteroidView from './views/asteroidView';
import { elements, renderLoader, clearLoader } from './views/base';

//Declare a new state variable
const state = {};

//Here we create the search controller
const controlSearch = async() => {

    //1. Get query from view
    const query = searchView.getInput();
    console.log(`${query} query`);

    //2. Create a Search object and add to the state
    if (query) {
        console.log(query);
        state.search = new Search(query);
        renderLoader(elements.searchRes);

        //3. Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();

        try {
            // 4) Search for asteroids
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }

    }
    else {
        alert('Input is blank!');
    }
};

//Here we create the asteroid controller

const controlAsteroid = async() => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        asteroidView.clearAsteroid();
        renderLoader(elements.asteroid);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new asteroid object
        state.asteroid = new Asteroid(id);

        try {
            // Get asteroid data
            await state.asteroid.getAsteroid();

            // Render recipe
            clearLoader();
            asteroidView.renderAsteroid(
                state.asteroid
                // state.likes.isLiked(id)
            );
        }
        catch (err) {
            console.log(err);
            alert('Error processing asteroid!');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlAsteroid));

elements.searchForm.addEventListener('submit', e => {
    event.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});
