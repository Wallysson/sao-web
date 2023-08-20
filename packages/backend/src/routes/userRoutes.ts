import { Router } from 'express';
import {
  authenticateUserController,
  getUsersController,
} from '@/controllers/userController';

const router = Router();

router.get('', getUsersController);
router.post('', authenticateUserController);

export { router as userRoutes };
