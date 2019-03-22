//Import the Search model from the Search.js file
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

//Declare a new state variable
const state = {};

//Here we create the search controller
const controlSearch = async() => {
    
console.log(searchView.getInput());
    //1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    //2. Create a Search object and add to the state
    if (query) {
        state.search = new Search(query);
        renderLoader(elements.searchRes);


        //3. Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();


        try {
            // 4) Search for recipes
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
