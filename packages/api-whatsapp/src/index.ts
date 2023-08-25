import bodyParser from 'body-parser';
import { app } from './app';
import { sendMessageRouter } from './routes/sendMessageRoute';
import { generateQrCodeRouter } from './routes/generateQrCodeRoute';
import { initializeClient } from './services/whatsapp-service';

initializeClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', sendMessageRouter);
app.use('/api', generateQrCodeRouter);

app.listen(8000, () => {
  console.log(`🚀 Server running at http://localhost:8000...`);
});
