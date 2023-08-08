import { Request, Response } from 'express';
import { getClientIsReady, getClient } from '../services/whatsapp-service';
import { parseNumber } from '../helpers/parse-number';
import { z } from 'zod';

export async function sendMessageController(req: Request, res: Response) {
  const requestBodySchema = z.object({
    countryCode: z.string().default('55'),
    ddd: z.string(),
    number: z.string(),
    message: z.string(),
  });

  const { countryCode, ddd, number, message } = requestBodySchema.parse(
    req.body
  );

  if (!getClientIsReady()) {
    res.status(400).json('Client is not ready yet.');
    return;
  }

  try {
    const completeNumber = parseNumber(countryCode, ddd, number);
    await getClient().sendMessage(completeNumber, message);
    res.status(200).json('Sent message.');
  } catch (error: any) {
    res.status(500).json(error.message);
  }
}
