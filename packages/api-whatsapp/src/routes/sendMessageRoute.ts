import express from 'express';
import { sendMessageController } from '../controllers/sendMessageController';

const sendMessageRouter = express.Router();

sendMessageRouter.post('/sendMessage', sendMessageController);

export { sendMessageRouter };
