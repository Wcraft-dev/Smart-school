const express = require('express');
const cors = require('cors');
const app = express();

//setings
app.set('port', process.env.PORT || 3000);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/user',require('./routes/users'));
app.use('/class',require('./routes/class_'));

module.exports = app;