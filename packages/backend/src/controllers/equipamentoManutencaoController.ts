import { Request, Response } from 'express';
import { getEquipamentosManutencao } from '@/services/equipamentoManutencaoService';

export const getEquipamentosManutencaoController = async (
  req: Request,
  res: Response
) => {
  try {
    const equipamentos = await getEquipamentosManutencao();
    res.json(equipamentos);
  } catch (error) {
    console.error('Error getting equipamentos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
