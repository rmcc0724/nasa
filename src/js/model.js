import { async } from 'regenerator-runtime'
import { API_URL, RES_PER_PAGE, KEY } from './config.js'
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js'

export const state = {
  asteroid: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
}

const createAsteroidObject = function (data) {
  const { name, estimated_diameter, is_potentially_hazardous_asteroid, close_approach_data, id } = data
  return {
    name: name,
    diameter: estimated_diameter.miles.estimated_diameter_max,
    hazardous: is_potentially_hazardous_asteroid,
    miss_distance: close_approach_data,
    // image: asteroid.image_url,
    ...(id && { key: id }),
  }
}

export const loadAsteroid = async function (id) {
  try {
    const data = await AJAX(`${API_URL}neo/${id}?api_key=${KEY}`)
    state.asteroid = createAsteroidObject(data)
    console.log(`Create done`);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.asteroid.bookmarked = true
    else state.asteroid.bookmarked = false

    console.log(state.asteroid)
  } catch (err) {
    // Temp error handling
    console.error(`WTF ${err} 💥💥💥💥`)
    throw err
  }
}

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query

    const res = await AJAX(
      `${API_URL}feed?start_date=${query}&end_date=${query}&api_key=${KEY}`,
    )

    for (var k in res.near_earth_objects) {
      state.search.results = res.near_earth_objects[k].map((a) => {
        return {
          id: a.id,
          name: a.name,
          hazardous: a.is_potentially_hazardous_asteroid
        }
      })
    }

    console.log(state.search.results)
    state.search.page = 1
  } catch (err) {
    console.error(`${err} 💥💥💥💥`)
    throw err
  }
}

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page
  const start = (page - 1) * state.search.resultsPerPage // 0
  const end = page * state.search.resultsPerPage // 9
  console.log(`Start is ${start}, end is ${end}`)
  return state.search.results.slice(start, end)
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function (asteroid) {
  // Add bookmark
  state.bookmarks.push(asteroid)

  // Mark current asteroid as bookmarked
  if (asteroid.id === state.asteroid.id) state.asteroid.bookmarked = true

  persistBookmarks()
}

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === id)
  state.bookmarks.splice(index, 1)

  // Mark current asteroid as NOT bookmarked
  if (id === state.asteroid.id) state.asteroid.bookmarked = false

  persistBookmarks()
}

const init = function () {
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
}
init()

const clearBookmarks = function () {
  localStorage.clear('bookmarks')
}
// clearBookmarks();