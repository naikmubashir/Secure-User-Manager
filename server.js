
require('dotenv').config(); // to load environment variables from a .env file into process.env
const express = require("express");
const connectDB = require('./config/DBconn');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const path = require("path");

connectDB();

//buildin middlewares
app.use( express.urlencoded({extended:false}) );
app.use(express.json());
app.use( express.static(path.join(__dirname,'public')) ); //here the static files(css,img,text) will be present 

//router for root:
app.use('/', require('./routes/root'));

//making sure to only listen when the database is connected
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB....");
    app.listen(PORT, ()=>console.log(`Server runnign on port ${PORT}`))
})