const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./models/userModel');
const Bookmark = require('./models/bookmarkModel');

dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(3000, () => {
    console.log("server is listening at http://localhost:3000");
})
