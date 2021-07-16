//Import express for data models
//Mongoose for our actual database
//Bodyparser for the main app
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const likes = require('./routes/apis/likes');
app.use(cors());
//Body parser middleware
app.use(express.json());
//DB config gets the URL from  keys.js for our mongo DB
const db = require('./config/keys').mongoURI;

//Connect to Mongo

//Connect to the database
//IF the connection is successful log the message below
//IF there's an error log the error message
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB connected"))
.catch(err=> console.log('Errors, Mongo not connected: ' + err));

//Anything going to '/' will go to the likes variable
    app.use('/api/likes', likes);

//Set the server port to 5000
    const port = process.env.PORT || 5000;
//Tell the server to start on port 5000
    app.listen(port, () => console.log(`Server has started on port ${port}`));