const mongoose = require('mongoose');
const Bookmark = require('./bookmarkModel');


const UserScehma = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookmark',
        },
    ]
})


module.exports = mongoose.model("Users",UserScehma);