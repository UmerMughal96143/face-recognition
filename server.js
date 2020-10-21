const express = require('express');
const bodypasrser = require('body-parser');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const users= require('./routes/User');
const connectdb = require('./config/db');
const cors = require('cors');

dotenv.config({path : './config/config.env'})

//Call Database

connectdb();   

//Initial App
const app = express();

//Middleware


app.use(cors())



//Parsing Body TO JSON

app.use(bodypasrser.json())

//ASsigning server Port

const PORT = process.env.PORT || 3002


// Running Server

app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))

//Users Route


app.use('/api/v1/users' ,users); 

