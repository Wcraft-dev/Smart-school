import mongoose from "mongoose";
import config from "./config"

const URL = process.env.MONGODB_URL
  ? process.env.MONGODB_URL
  : "null";
  
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Conected: " + connection.connection.host);
  } catch (error) {
    console.log(`it was error to conected database: ${error}`)
  }

};

export default connectDB;
