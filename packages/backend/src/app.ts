import express from 'express';
import { equipamentoRoutes } from './routes/equipamentoManutencaoRoutes';

export const app = express();

app.use('/equipamentos', equipamentoRoutes);

// verifyUserCredentials('051304', '0xdc1c3dce83bd537e6f939bef76a67e41');
