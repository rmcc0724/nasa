//Import express for data models
//Mongoose for our actual database
//Bodyparser for the main app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const likes = require('./routes/apis/likes');
//Body parser middleware
app.use(bodyParser.json());
//DB config gets the URL from  keys.js for our mongo DB
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
//Connect to the database
    .connect(db, { useNewUrlParser: true })
//IF the connection is successful log the message below
    .then(() => console.log("MongoDB connected"))
//IF there's an error log the error message
    .catch(err=> console.log('Errors: ' + err));

//Anything going to api/items will go to the items variable, can also just be '/'
    app.use('/api/likes', likes);

//Set the server port to 5000
    const port = process.env.PORT || 5000;
//Tell the server to start on port 5000
    app.listen(port, () => console.log(`Server has started on port ${port}`));