import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import routes from "./routes/";
import "./config/config";
import { createRoles } from "./libs/initialSetup";
const app = express();

//Connnect to database
connectDB();
createRoles();
app.set("port", process.env.PORT || 6000);
app.use(bodyParser.json());

//middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
console.log(process.env.CLIENT_URL)

app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/", routes);

export default app;
