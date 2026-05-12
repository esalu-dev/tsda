import { IPasswordResetTokenRepository } from 'src/domain/password-reset-token/repository/password-reset-token.repository.interface';
import { PrismaService } from '../context/prisma.service';
import { PasswordResetToken } from 'generated/prisma-pg/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordResetTokenPrismaRepository implements IPasswordResetTokenRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(token: string, email: string): Promise<PasswordResetToken> {
    return await this.prisma.writer.passwordResetToken.create({
      data: {
        token,
        email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const searchToken = await this.prisma.writer.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return searchToken;
  }

  async delete(token: string): Promise<void> {
    await this.prisma.writer.passwordResetToken.delete({
      where: { token },
    });
  }
}
