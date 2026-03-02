import express from 'express';
import authRoutes from './auth.routes.js';
import protectRoute from '../middleware/protectRoutes.js';
import messagesRoutes from "../routes/message.routes.js"
import userRouter from "../routes/user.routes.js"
const router=express.Router();



router.get('/',(req,res)=>{
    res.send({
  "event": {
    "name": "Holi Madness 🎨🔥",
    "type": "Daruuu... Attack Party 💥",
    "festival": "Holi 🌈",
    "description": "Warning ⚠️: You WILL get colored! Join us for madness, music, Daruuuu.... and zero regrets 😎💃🕺"
  },
  "host": {
    "name": "Sahil (Chief Color Officer) 😜",
    "location": "Sahil ki haveli",
  },
  "date_time": {
    "date": "2026-03-14 📅",
    "start_time": "10:00 AM ⏰",
    "end_time": "Till We Drop 💃🕺",
  },
 "rsvp": {
    "required": true,
    "deadline": "2026-02-10 ⏳",
    "contact_method": "Call, Text, DM, or Send a Pigeon 🐦"
  },
  "additional_notes": [
    "Daru daba kr (No cheating with Nashe 😜).",
    "Parking available 🚗",
    "Bring energy, leave ego at home 😌",
    "Friends allowed. Enemies… optional 😏"
  ]
});
})

router.use('/auth',authRoutes)
router.use('/messages',messagesRoutes)
router.use('/users',  userRouter)

export default router;
