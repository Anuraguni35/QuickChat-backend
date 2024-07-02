import express from "express";
 
import protectRoute from "../middleware/protectRoutes.js";
import {getUsersList} from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/", protectRoute, getUsersList);

export default userRouter;