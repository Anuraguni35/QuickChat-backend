import express from 'express';
import authRoutes from './auth.routes.js';
import protectRoute from '../middleware/protectRoutes.js';
import messagesRoutes from "../routes/message.routes.js"
import userRouter from "../routes/user.routes.js"
const router=express.Router();



router.get('/',(req,res)=>{
    res.send('Welcome to the server');
})

router.use('/auth',authRoutes)
router.use('/messages',messagesRoutes)
router.use('/users',  userRouter)

export default router;