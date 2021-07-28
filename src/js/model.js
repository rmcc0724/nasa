import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY, PROXY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

export const state = {
  asteroid: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createAsteroidObject = function (data) {
  const { asteroid } = data.data;
  return {
    id: asteroid.id,
    title: asteroid.title,
    publisher: asteroid.publisher,
    sourceUrl: asteroid.source_url,
    image: asteroid.image_url,
    servings: asteroid.servings,
    cookingTime: asteroid.cooking_time,
    ingredients: asteroid.ingredients,
    ...(asteroid.key && { key: asteroid.key }),
  };
};

export const loadAsteroid = async function (id) {
  try {
    const data = await AJAX(`${proxy}${API_URL}${id}?api_key=${KEY}`);
    state.asteroid = createAsteroidObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.asteroid.bookmarked = true;
    else state.asteroid.bookmarked = false;

    console.log(state.asteroid);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${PROXY}${API_URL}?start_date=${query}&end_date=${query}&api_key=${KEY}`);
    console.log(data);

    state.search.results = data.data.asteroids.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.asteroid.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.asteroid.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.asteroid.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (asteroid) {
  // Add bookmark
  state.bookmarks.push(asteroid);

  // Mark current asteroid as bookmarked
  if (asteroid.id === state.asteroid.id) state.asteroid.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current asteroid as NOT bookmarked
  if (id === state.asteroid.id) state.asteroid.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadAsteroid = async function (newAsteroid) {
  try {
    const ingredients = Object.entries(newAsteroid)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const asteroid = {
      title: newAsteroid.title,
      source_url: newAsteroid.sourceUrl,
      image_url: newAsteroid.image,
      publisher: newAsteroid.publisher,
      cooking_time: +newAsteroid.cookingTime,
      servings: +newAsteroid.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, asteroid);
    state.asteroid = createAsteroidObject(data);
    addBookmark(state.asteroid);
  } catch (err) {
    throw err;
  }
};