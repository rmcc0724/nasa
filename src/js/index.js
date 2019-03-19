// const axios = require('axios');
// async function getResults() {
//     try {
//         const result = await axios('https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-03-18&api_key=xtcQn1fI4aTFJGdXDuVKxHMrUOEQIQbN6lYtSf4K');
//         const items = result.data.near_earth_objects;
//         console.log(items);
//         //     Object.keys(items).map((item) => {
//         //       let html = `<h2>Date: ${item}</h2><br/>`;

//         //       items[item].forEach(e => {
//         //         html += `<ul><li>Astroid name: ${e.name}</li>
//         // <li>Diameter: ${e.estimated_diameter.miles.estimated_diameter_max} miles</li>
//         // <li>Potentially Hazardous: ${e.is_potentially_hazardous_asteroid}</li>
//         // <li>Missed Earth by ${e.close_approach_data[0].miss_distance.miles} miles</li>
//         // </ul><br/>`;
//     }
//     catch (error) {
//         console.log("Error Happened " + error);
//     }
// }
// getResults();


//Import the Search model from the Search.js file
import Search from './models/Search';

//Create a new Search model with the search query as the argument
const search = new Search('2019-03-18');


console.log(search);

//Call the getResults() method on the new instantiated Search model
search.getResults();
