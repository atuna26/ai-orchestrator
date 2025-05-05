import express from 'express';
import { getChat, getAllChat, startChat, newMessage,deleteChat } from '../controllers/chat.js'; 
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/getChat/:chatUrl', verifyToken, getChat);
router.get('/getAllChats', verifyToken, getAllChat);
router.post('/startChat', verifyToken, startChat);
router.post('/newMessage', verifyToken, newMessage);
router.delete('/deleteChat', verifyToken, deleteChat);

export default router;