import bodyParser from 'body-parser';
import { app } from './app';
import { env } from './env';
import { sendMessageRouter } from './routes/sendMessageRoute';
import { generateQrCodeRouter } from './routes/generateQrCodeRoute';
import { getClient } from './services/whatsapp-service';

const client = getClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

client.initialize();

app.use('/api', sendMessageRouter);
app.use('/api', generateQrCodeRouter);

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}...`);
});
