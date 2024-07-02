// const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route.js';
import connectToMongoDB from "./Db/connetToMongoDb.js";
import morgan from "morgan";
import cors from "cors";
import {app,server} from './Socket/Socket.js'
// const app = express();
app.use(morgan('dev'));
app.use(cors());
dotenv.config();


const Port=process.env.Port||4000;
 app.use(express.json());
app.use(router)

server.listen(Port,()=>{
    console.log(process.env.MONGO_DB_URI,"index")
    connectToMongoDB()
    console.log("server listening on port "+Port)
});
