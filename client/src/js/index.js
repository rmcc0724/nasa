//Import the Search model from the Search.js file
import Search from './models/Search';
import Asteroid from './models/Asteroid';
import Likes from './models/Likes';
import Auth from './models/Auth';
import * as searchView from './views/searchView';
import * as asteroidView from './views/asteroidView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader, toggleLogInOutButton, disableButton } from './views/base';

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

const controlLike = async() => {
    /////////////////////////////////////////
    console.log(`Likes ctrl fired `);
    if (!state.likes) state.likes = new Likes();
    
    const currentID = state.asteroid.id;

    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {

        // Add like to the state and db and wait till done before moving on
            await state.likes.addLike(
            currentID,
            state.asteroid.name,
            state.asteroid.hazardous        
            );
            state.likes.readStorage();

            likesView.toggleLikeBtn(true);
            // state.likes.likes.forEach(like => likesView.renderLike(like));
    }
    else {
        //Remove like from the state
        await state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

    }
    likesView.clearLikes();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
    console.log("End of like ctrl");
};

window.addEventListener('load', async() => {
    state.authenticated = await new Auth();
    disableButton(true);

    if(state.authenticated.token) {
        state.likes = new Likes();
        try {
            
            //Try to authenticate the user with the token in local storage
            await state.authenticated.loadUser(state.authenticated.token);
            //Hide the logIn button and show the logOut button
            await toggleLogInOutButton(true);
            // Toggle like menu button
            likesView.toggleLikeMenu(state.likes.getNumLikes());
            // Restore likes
            state.likes.readStorage();
            // Render the existing likes
            state.likes.likes.forEach(like => likesView.renderLike(like));
        }
        catch(err) {
            console.log(err);
        }
    } else {
        likesView.toggleLikeMenu(0);
        console.log("Need to log in");
        await toggleLogInOutButton(false);
    }
    disableButton(false);
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlAsteroid));

elements.logBtn.addEventListener('click', async e => {
    disableButton(true);
    console.log("LogBtn fired");
    if(!state.authenticated.token) {
        console.log("Logging In");
        await state.authenticated.login({ email: "reid2@gmail.com", password: "123456"});    
        await toggleLogInOutButton(true);
    } else if(state.authenticated.token) {
        console.log("Logging Out");
        await state.authenticated.logout();
        await toggleLogInOutButton(false);
    }
    disableButton(false);
    
});

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

// Handling asteroid bookmark button clicks
elements.asteroid.addEventListener('click', e => {
  if (e.target.matches('.recipe__love, .recipe__love *')) {
       controlLike();
    }
});