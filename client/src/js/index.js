//Import the Search model from the Search.js file
import Search from './models/Search';
import Asteroid from './models/Asteroid';
import Likes from './models/Likes';
import Bookmarks from './models/Bookmarks';
import * as searchView from './views/searchView';
import * as asteroidView from './views/asteroidView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
import axios from 'axios';
import { proxy } from '../../config';


//import * as routes from '../../routes/apis/likes';

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
        asteroidView.clearCloseData();

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
            );
            asteroidView.renderCloseResults(state.asteroid.miss_distance);
            likesView.toggleLikeBtn(state.likes.isLiked(id));
        }
        catch (err) {
            console.log(err);
            alert('Error processing asteroid!');
        }
    }
};

/** 
 * LIKE CONTROLLER
 */

const controlLike = () => {


    /////////////////////////////////////////

    if (!state.likes) state.likes = new Likes();
    const currentID = state.asteroid.id;
    console.log(currentID)
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.asteroid.name,
            state.asteroid.hazardous        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

        // User HAS liked current recipe
    }
    else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    console.log(state.likes.getNumLikes());
};

window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readDataBase();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});



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

elements.asteroidClosePages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        asteroidView.clearCloseData();
        asteroidView.renderCloseResults(state.asteroid.miss_distance, goToPage);
    }
});

// Handling recipe button clicks
elements.asteroid.addEventListener('click', e => {
  if (e.target.matches('.recipe__love, .recipe__love *')) {
    console.log('Likes ctrl');
    // Like controller
       controlLike();
    }
});