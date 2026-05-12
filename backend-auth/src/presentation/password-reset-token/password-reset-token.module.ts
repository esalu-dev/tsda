import { PrismaService } from 'src/infrastructure/prisma/context/prisma.service';
import { PasswordResetTokenController } from './password-reset-token.controller';
import { IPasswordResetTokenRepository } from 'src/domain/password-reset-token/repository/password-reset-token.repository.interface';
import { PasswordResetTokenPrismaRepository } from 'src/infrastructure/prisma/repository/password-reset-token.prisma.repository';
import { Module } from '@nestjs/common';
import { CreatePasswordResetTokenUseCase } from 'src/application/use-cases/password-reset/create-pw-reset-token.use-case';

@Module({
  controllers: [PasswordResetTokenController],
  providers: [
    PrismaService,
    CreatePasswordResetTokenUseCase,
    // Aquí "engañamos" a NestJS para inyectar la Interfaz
    {
      provide: IPasswordResetTokenRepository,
      useClass: PasswordResetTokenPrismaRepository,
    },
  ],
})
export class PasswordResetTokenModule {}
