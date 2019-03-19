//Import the Search model from the Search.js file
import Search from './models/Search';
import * as searchView from './views/searchView';

//Declare a new state variable
const state = {};

//Here we create the search controller
const controlSearch = async() => {

    //1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    //2. Create a Search object and add to the state
    if (query) {
        state.search = new Search(query);
    }
    //3. Prepare UI for the results

    //4. Search for the asteroids
    await state.search.getResults();

    //5. Render results on the UI
    searchView.getResults(state.search.result);
};

document.querySelector('.search').addEventListener('submit', e => {
    event.preventDefault();
    controlSearch();
});
