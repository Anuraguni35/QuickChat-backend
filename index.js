// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import connectToMongoDB from "./Db/connetToMongoDb.js";
import morgan from "morgan";
import cors from "cors";
import { app, server } from "./Socket/Socket.js";
import mongoose from "mongoose";
// const app = express();
app.use(morgan("dev"));
app.use(cors());
dotenv.config();

const Port = process.env.Port || 4000;
app.use(express.json());
app.use(router);

const MONGO_URL = process.env.Mongo_Db_URI;
server.listen(Port, () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("MONGO DB connected successfully.");
      console.log("server listening on port " + Port);
    })
    .catch((err) => console.error("ERROR connecting MONGODB =>", err.message));
});
