async function getResults(e) {
  try {
    const result = await axios('https://api.nasa.gov/neo/rest/v1/feed?start_date=2019-03-18&api_key=DEMO_KEY');
    const data = result.data;
    console.log(data.near_earth_objects);
  }
  catch(error) {
    console.log("Error" +  error);
  }
}
console.log(getResults());