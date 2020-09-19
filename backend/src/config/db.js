const mongoose = require('mongoose');
const URL = process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://localhost/mern'; 

const connectDB = async()=>{
    const connection = await mongoose.connect(URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log("MongoDB Conected: " + connection.connection.host)
}

module.exports = connectDB