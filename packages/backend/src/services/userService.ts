import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { secretKey } from '@/config/secret';

export class UserService {
  async getMany() {
    const users = await prisma.uSU_Usuario.findMany({
      select: {
        sLoginUSU: true,
        sNomeUSU: true,
        sSenhaUSU: true,
        GRU_Grupo: {
          select: {
            sNomeGRU: true,
          },
        },
      },
    });

    const flattenedUsers = users.map((user) => ({
      sLoginUSU: user.sLoginUSU,
      sNomeUSU: user.sNomeUSU,
      sSenhaUSU: user.sSenhaUSU,
      sNomeGRU: user.GRU_Grupo?.sNomeGRU || null,
    }));

    return flattenedUsers;
  }

  async authenticateUser(username: string, password: string) {
    const user = await prisma.uSU_Usuario.findFirst({
      where: {
        sLoginUSU: username,
        sSenhaUSU: password,
      },
      select: {
        iControleUSU: true,
        sLoginUSU: true,
        sNomeUSU: true,
        GRU_Grupo: {
          select: {
            iControleGRU: true,
            sNomeGRU: true,
          },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found or authentication failed.',
        status: 401,
      };
    }

    const flattenedUsers = {
      iControleUSU: user?.iControleUSU,
      sLoginUSU: user?.sLoginUSU,
      sNomeUSU: user?.sNomeUSU,
      iControleGRU: user?.GRU_Grupo.iControleGRU,
      sNomeGRU: user?.GRU_Grupo.sNomeGRU.split('- ')[1],
    };
    const token = jwt.sign(flattenedUsers, secretKey, { expiresIn: '1h' });

    return { success: true, user: flattenedUsers, token };
  }
}
