//Import the Search model from the Search.js file
import Search from './models/Search'
import Asteroid from './models/Asteroid'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as asteroidView from './views/asteroidView'
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base'

//Declare a new state variable
const state = {}

//search controller for date picker and search button
const controlSearch = async () => {
  //1. Get query from view
  const query = searchView.getInput()

  //2. Create a Search object and add to the state
  if (query) {
    state.search = new Search(query)

    //3. Prepare UI for the results
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.searchRes)

    try {
      // 4) Search for asteroids
      await state.search.getResults()

      // 5) Render results on UI
      clearLoader()
      searchView.renderResults(state.search.result)

      //Catch the error and alert the user
    } catch (err) {
      alert('Something wrong with the search...' + err)
      clearLoader()
    }
  } else {
    alert('Input is blank!')
  }
}

//Here we create the asteroid controller

const controlAsteroid = async () => {
  // Get ID from url
  console.log("controlAsteroid firing");
  const id = window.location.hash.replace('#', '')

  if (id) {
  console.log("ID is " + id);
    // Prepare UI for changes
    asteroidView.clearAsteroid()
    // asteroidView.clearCloseData()
    renderLoader(elements.asteroid)
    // Highlight selected search item
    console.log("State search is outside " + !state.search);   
    if (state.search) {
      console.log("State search is inside " + !state.search);
      searchView.highlightSelected(id)
    }

    state.asteroid = new Asteroid(id)

    try {
      // Get asteroid data
      await state.asteroid.getAsteroid()

      // Render recipe
      clearLoader()
      asteroidView.renderAsteroid(state.asteroid)
      asteroidView.renderCloseResults(state.asteroid.miss_distance)
      likesView.toggleLikeBtn(state.likes.isLiked(id))
    } catch (err) {
      alert('Error processing asteroid!')
    }
  }
};

const controlLike = async () => {
  /////////////////////////////////////////
  console.log(`Likes ctrl fired `)
  if (!state.likes) state.likes = new Likes()

  const currentID = state.asteroid.id

  // User has NOT yet liked anything yet
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state and db and wait till done before moving on
    await state.likes.addLike(
      currentID,
      state.asteroid.name,
      state.asteroid.hazardous,
    )
    state.likes.readStorage()

    likesView.toggleLikeBtn(true)
    state.likes.likes.forEach((like) => likesView.renderLike(like))
  } else {
    //Remove like from the state
    await state.likes.deleteLike(currentID)

    // Toggle the like button
    likesView.toggleLikeBtn(false)
  }
  likesView.clearLikes()
  likesView.toggleLikeMenu(state.likes.getNumLikes())
  state.likes.likes.forEach((like) => likesView.renderLike(like))
  console.log('End of like ctrl')
}


['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlAsteroid),
)

//Listens for when the user clicks the Search button
//Fires off the controlSearch() function
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  controlSearch()
})  

// Handling astroid button clicks
elements.asteroid.addEventListener('click', (e) => {
  if (e.target.matches('.recipe__love, .recipe__love *')) {
    //console.log('Likes ctrl');
    // Like controller
    controlLike()
  }
})

window.addEventListener('load', async () => {
  console.log('Load likes')
  state.likes = new Likes()
  // Restore likes
  state.likes.readStorage()

  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes())

  console.log(state.likes.getNumLikes())
  // Render the existing likes
  state.likes.likes.forEach((like) => likesView.renderLike(like))
})

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    searchView.clearResults()
    searchView.renderResults(state.search.result, goToPage)
  }
})

elements.asteroidClosePages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10)
    asteroidView.clearCloseData()
    asteroidView.renderCloseResults(state.asteroid.miss_distance, goToPage)
  }
})
