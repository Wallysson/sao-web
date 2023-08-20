import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { userRoutes } from './routes/userRoutes';
import { maintenanceRoutes } from './routes/maintenanceRoutes';

export const app = express();
app.use(
  cors({
    origin: ['http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json());

app.use('/equipaments', maintenanceRoutes);
app.use('/users', userRoutes);

app.get('/set-cookie', (req, res) => {
  res.cookie('testCookie', 'Hello, Cookie!');
  res.send('Cookie set successfully');
});
