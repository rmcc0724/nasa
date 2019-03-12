const axios = require('axios');

async function getResults() {
  try {
    const result = await axios('https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-03-18&api_key=DEMO_KEY');
    const data = result.data;
    const items = data.near_earth_objects;

    for (var key in items) {
        Object.keys(items).map((item) => {console.log("item", items[item])})
    }
  }
  catch (error) {
    console.log("Error Happened " + error);
  }
}

getResults();
