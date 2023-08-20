import { getMaintenanceEquipmentsController } from '@/controllers/maintenanceController';
import { Router } from 'express';

const router = Router();

router.get('/maintenance', getMaintenanceEquipmentsController);

export { router as maintenanceRoutes };
