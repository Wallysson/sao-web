import { prisma } from '@/lib/prisma';

export async function getEquipamentosManutencao() {
  const equipamentosManutencaoAberto = await prisma.eQU_Equipamento.findMany({
    select: {
      sApelidoEQU: true,
      MAN_Manutencao: {
        where: {
          dDataSaidaMAN: null,
        },
        select: {
          dDataEntradaMAN: true,
          dDiasParadosMAN: true,
          sMotivoMAN: true,
        },
        orderBy: {
          dDiasParadosMAN: 'desc',
        },
      },
    },
    where: {
      MAN_Manutencao: {
        some: {
          dDataSaidaMAN: null,
        },
      },
    },
  });

  const countEquipamentosManutencaoAberto = equipamentosManutencaoAberto.length;

  return {
    equipamentosManutencaoAberto,
    countEquipamentosManutencaoAberto,
  };
}
