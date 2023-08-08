import { Request, Response } from 'express';
import { getQrCode } from '../services/whatsapp-service';

export function generateQrCodeController(req: Request, res: Response) {
  if (getQrCode()) {
    res.status(200).json(getQrCode());
  } else {
    res.status(404).json('QR Code não disponível.');
  }
}
