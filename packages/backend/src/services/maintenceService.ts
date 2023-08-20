import { prisma } from '@/lib/prisma';

export class MaintenanceService {
  async getMany(openOnly: boolean = false, equipment?: string) {
    let equipamentosManutencao = await prisma.eQU_Equipamento.findMany({
      select: {
        iControleEQU: true,
        sApelidoEQU: true,
        MAN_Manutencao: {
          select: {
            iControleMAN: true,
            dDataEntradaMAN: true,
            dDataSaidaMAN: true,
            dDiasParadosMAN: true,
            sMotivoMAN: true,
          },
          orderBy: {
            dDiasParadosMAN: 'desc',
          },
        },
      },
    });

    if (openOnly) {
      equipamentosManutencao = equipamentosManutencao.filter((equipamento) => {
        equipamento.MAN_Manutencao = equipamento.MAN_Manutencao?.filter(
          (manutencao) => manutencao.dDataSaidaMAN === null
        );
        return equipamento.MAN_Manutencao?.length > 0;
      });
    }

    if (equipment) {
      equipamentosManutencao = equipamentosManutencao.filter(
        (equipamento) => equipamento.sApelidoEQU === equipment
      );
    }

    return { equipamentosManutencao, size: equipamentosManutencao.length };
  }
}
