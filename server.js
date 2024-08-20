
require('dotenv').config(); // to load environment variables from a .env file into process.env
const express = require("express");
const connectDB = require('./config/DBconn');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');

connectDB();


//making sure to only listen when the database is connected
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB....");
    app.listen(PORT, ()=>console.log(  `app connected to port ${PORT}`))
})