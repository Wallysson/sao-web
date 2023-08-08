import express from 'express';
import { generateQrCodeController } from '../controllers/generateQrCodeController';

const generateQrCodeRouter = express.Router();

generateQrCodeRouter.get('/generateQrCode', generateQrCodeController);

export { generateQrCodeRouter };
