import express from 'express';
import { sendMessageRouter } from './sendMessageRoute';
import { generateQrCodeRouter } from './generateQrCodeRoute';

const routes = express.Router();

routes.use('/sendMessage', sendMessageRouter);
routes.use('/generateQrCode', generateQrCodeRouter);

export { routes };
