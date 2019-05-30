const axios = require('axios');
  
async function getLikes() {
    try {
      const result = await axios('http://localhost:5000');
      const data = result.data;
      console.log(data);
    }
    catch (error) {
      console.log("Error Happened " + error);
    }
  }
  getLikes();