import { secretKey } from '@/config/secret';
import { Request, Response, NextFunction } from 'express';

export async function verifyToken(req: Request, res: Response) {
  try {
    req.cookies;
  } catch (error: any) {
    res.status(error.code ?? 500).send(error.message);
    return false;
  }
}
