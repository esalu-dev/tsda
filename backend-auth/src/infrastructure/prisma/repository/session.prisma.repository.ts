import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { PrismaService } from '../context/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserSessionCreateInput } from 'generated/prisma-pg/models';
import { UserSession } from 'generated/prisma-pg/client';

@Injectable()
export class SessionPrismaRepository implements ISessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRefreshToken(refreshToken: string): Promise<string | null> {
    const userSession = await this.prisma.writer.userSession.findUnique({
      where: {
        refreshToken,
      },
    });

    return userSession?.refreshToken || null;
  }

  async create(session: UserSessionCreateInput): Promise<UserSession> {
    return this.prisma.writer.userSession.create({ data: session });
  }

  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.prisma.writer.userSession.delete({
        where: {
          refreshToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    try {
      await this.prisma.writer.userSession.deleteMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
