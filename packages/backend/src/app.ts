import express from 'express';
import { PrismaClient } from '@prisma/client';

export const app = express();

const prisma = new PrismaClient();

// async function getAllEquipaments() {
//   try {
//     const equipaments = await prisma.eQU_Equipamento.findMany({
//       where: {
//         sApelidoEQU: {
//           in: ['CBM 178', 'CBM 181'],
//         },
//       },
//       // where: {
//       //   sApelidoEQU: 'CBM 178',
//       // },
//     });
//     return { equipaments };
//   } catch (error) {
//     console.error('Erro ao obter os equipamentos:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// getAllEquipaments().then((equipaments) => console.log(equipaments));

async function getEquipamentosComDadosManutencao() {
  const equipamentosComDadosManutencao = await prisma.eQU_Equipamento.findMany({
    where: {
      MAN_Manutencao: {
        some: {
          dDataSaidaMAN: null,
        },
      },
    },
    select: {
      GEQ_GrupoEquipamentos: {
        include: {
          TEQ_TiposEquipamentos: {
            select: {
              sTipoEquipTEQ: true,
            },
          },
        },
      },
      sApelidoEQU: true,
      MAN_Manutencao: {
        select: {
          dDataEntradaMAN: true,
          dDataSaidaMAN: true,
          sMotivoMAN: true,
        },
      },
    },
  });

  return {
    equipamentosComDadosManutencao,
  };
}

// Executar a função para obter os dados desejados
getEquipamentosComDadosManutencao()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Erro ao obter os equipamentos:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
