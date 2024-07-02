import express from 'express';
const authRoutes=express.Router();
import {signup,login,validateUser} from "../controller/auth.controller.js"
authRoutes.post('/signUp',signup)

authRoutes.post('/logIn',login)
authRoutes.get('/validateUser',validateUser)
// authRoutes.get('/logOut',logout)

export default authRoutes;
