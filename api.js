const axios = require('axios');

async function getResults() {
  try {
    const result = await axios('https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-03-18&api_key=xtcQn1fI4aTFJGdXDuVKxHMrUOEQIQbN6lYtSf4K');
    const data = result.data;
    const items = data.near_earth_objects;
    console.log(items);
    Object.keys(items).map((item) => {
      
    items[item].forEach(e => {
      const html = `<ul>
<li>Astroid name: ${e.name}</li>
<li>Date: ${item}</li>
<li>Diameter: ${e.estimated_diameter.miles.estimated_diameter_max} miles</li>
<li>Potentially Hazardous: ${e.is_potentially_hazardous_asteroid}</li>
<li>Missed Earth by ${e.close_approach_data[0].miss_distance.miles} miles</li>
</ul>`;      
            console.log(html);
    })       

    });
  }
  catch (error) {
    console.log("Error Happened " + error);
  }
}
getResults();
