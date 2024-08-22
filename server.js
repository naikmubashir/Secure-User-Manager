
require('dotenv').config(); // to load environment variables from a .env file into process.env
const express = require("express");
const connectDB = require('./config/DBconn');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT')


connectDB();
app.use(cors());
//buildin middlewares
app.use( express.urlencoded({extended:false}) );
app.use(express.json());
app.use( express.static(path.join(__dirname,'public')) ); //here the static files(css,img,text) will be present 

//router for root:
app.use('/', require('./routes/root'));

//registerRoute
app.use('/register',require('./routes/register'));

//auth route
app.use('/auth',require('./routes/auth'));

//verifying jwt before getting/posting/puting/deleting the employees
app.use(verifyJWT);

app.use('/employees', require('./routes/api/employees'));



app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if(req.accepts('json')){
        res.json({error :'404 Not Found'});
    }else{
        res.type('txt').send('404 Not Found');
    }
})
//making sure to only listen when the database is connected
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB....");
    app.listen(PORT, ()=>console.log(`Server runnign on port ${PORT}`))
})