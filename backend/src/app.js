const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connnect to database
connectDB()

//Configs
require('dotenv').config({ path: './src/config/config.env' })
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json())

//middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}
app.use(express.json());


//load Routes
const authRoute = require('./routes/authRoute.js')

//routes
app.use('/api/', authRoute)

app.use('/user',require('./routes/users'));
app.use('/class',require('./routes/class_'));



module.exports = app;