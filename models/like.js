//Lets use mongoose Schema for our data model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//here we define how are data table is setup, and what items are required, the type, format, etc
LikesSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hazardous: {
        type: Boolean,
        required: true
    }
})

module.exports = Likes = mongoose.model('like', LikesSchema);