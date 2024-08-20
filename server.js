
require('dotenv').config(); // to load environment variables from a .env file into process.env

const express = require("express");
const connectDB = require('./config/DBconn');
const app = express();
const PORT = process.env.PORT || 3500;
connectDB();

app.listen(PORT, ()=>console.log(  `app connected to port ${PORT}`))