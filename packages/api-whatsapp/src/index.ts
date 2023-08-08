import { z } from 'zod';
import { app } from './app';
import { env } from './env';
import qrcode from 'qrcode-terminal';
import bodyParser from 'body-parser';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { parseNumber } from './helpers/parse-number';

let clientIsReady = false;
let qrCode: string;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--unhandled-rejections=strict',
    ],
  },
});

client.on('qr', (qr) => {
  qrCode = qr;
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  clientIsReady = true;
  console.log('Client is ready!');
});

client.on('authenticated', () => {
  console.log('Client is authenticated!');
});

client.on('disconnected', () => {
  clientIsReady = false;
  console.log('Client is disconnected!');
});

client.initialize();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/sendMessage', async (req, res) => {
  const requestBodySchema = z.object({
    countryCode: z.string().default('55'),
    ddd: z.string(),
    number: z.string(),
    message: z.string(),
  });

  const { countryCode, ddd, number, message } = requestBodySchema.parse(
    req.body
  );

  if (!clientIsReady) {
    res.status(400).json('Client is not ready yet.');
    return;
  }
  try {
    const completeNumber = parseNumber(countryCode, ddd, number);
    await client.sendMessage(completeNumber, message).then(() => {
      res.status(200).json('Sent message.');
    });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

app.get('/generateQrCode', function (req, res) {
  if (qrCode) {
    res.status(200).json(qrCode);
  } else {
    res.status(404).json('QR Code não disponível.');
  }
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}...`);
});
