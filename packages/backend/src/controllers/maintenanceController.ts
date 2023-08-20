import { MaintenanceService } from '@/services/maintenceService';
import { Request, Response } from 'express';
import { z } from 'zod';

const maintenanceService = new MaintenanceService();

export const getMaintenanceEquipmentsController = async (
  req: Request,
  res: Response
) => {
  const equipamentsQuerySchema = z.object({
    openOnly: z.string().optional(),
    equipment: z.string().optional(),
  });

  try {
    const query = equipamentsQuerySchema.parse(req.query);

    const openOnly = query.openOnly ? true : false;
    const equipment = query.equipment;
    const equipaments = await maintenanceService.getMany(openOnly, equipment);
    res.json(equipaments);
  } catch (error) {
    console.error('Error getting equipaments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
