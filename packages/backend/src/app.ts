import express from 'express';
import { PrismaClient } from '@prisma/client';

export const app = express();

const prisma = new PrismaClient();

async function getAllEquipaments() {
  try {
    const equipaments = await prisma.eQU_Equipamento.findMany({
      where: {
        sApelidoEQU: 'CBM 178',
      },
    });
    return equipaments;
  } catch (error) {
    console.error('Erro ao obter os equipamentos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

getAllEquipaments().then((equipaments) => console.log(equipaments));
