//Import the Search model from the Search.js file
import Search from './models/Search';

//Declare a new state variable
const state = {};

//Here we create the search controller
const controlSearch = async() => {

    //1. Get query from view
    const query = '2019-03-18';

    //2. Create a Search object and add to the state
    if (query) {
        state.search = new Search(query);
    }
    //3. Prepare UI for the results

    //4. Search for the asteroids
    await state.search.getResults();
};

document.querySelector('.search').addEventListener('submit', e => {
    event.preventDefault();
    controlSearch();
});
