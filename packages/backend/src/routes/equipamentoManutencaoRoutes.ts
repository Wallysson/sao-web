import { getEquipamentosManutencaoController } from '@/controllers/equipamentoManutencaoController';
import { Router } from 'express';

const router = Router();

router.get('/manutencao', getEquipamentosManutencaoController);

export { router as equipamentoRoutes };
