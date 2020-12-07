import express from "express";
import http from "http";
import cors from "cors";
import socket from "./middlewares/socket";
import morgan from "morgan";
import initialSetup from "./libs/initialSetup";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import routes from "./routes/";
import "./config/config";

const app = express();
const server = http.createServer(app);
const security = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
socket(server,security);

connectDB();
initialSetup();

//middleware
app.use(cors(security));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/", routes);

console.log(`URL client: ${process.env.CLIENT_URL}`);
export default server;
