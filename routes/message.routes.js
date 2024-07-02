import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const messageRouter = express.Router();

messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;