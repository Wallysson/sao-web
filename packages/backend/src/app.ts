import cors from 'cors';
import express from 'express';

import bodyParser from 'body-parser';
import { userRoutes } from './routes/userRoutes';

import { maintenanceRoutes } from './routes/maintenanceRoutes';

export const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/equipaments', maintenanceRoutes);
app.use('/users', userRoutes);
