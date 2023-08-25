import qrcode from 'qrcode-terminal';
import { LocalAuth, Client } from 'whatsapp-web.js';

let clientIsReady = false;
let qrCode: string;

export const client = new Client({
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

client.on('disconnected', () => {
  clientIsReady = false;
  console.log('Client is disconnected!');
});

client.on('authenticated', () => {
  console.log('Client is authenticated!');
});

export async function initializeClient() {
  try {
    client.initialize();
  } catch (error) {
    console.error('Error initializing client:', error);
  }
}

export function getClientIsReady() {
  return clientIsReady;
}

export function getQrCode() {
  return qrCode;
}

export function getClient() {
  return client;
}
