// backend-auth/src/presentation/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { IUserRepository } from '../../domain/user/repository/user.repository.interface';
import { UserPrismaRepository } from '../../infrastructure/prisma/repository/user.prisma.repository';
import { PrismaService } from '../../infrastructure/prisma/context/prisma.service';
import 'dotenv/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshSessionUseCase } from 'src/application/use-cases/session/refresh-session.use-case';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { SessionPrismaRepository } from 'src/infrastructure/prisma/repository/session.prisma.repository';
import { SignOutUseCase } from 'src/application/use-cases/session/sign-out.use-case';
import { CheckExistingUserUseCase } from 'src/application/use-cases/auth/check-existing-user.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { BanningsPrismaRepository } from 'src/infrastructure/prisma/repository/bannings.prisma.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // El token dura 15 días
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    LoginUseCase,
    RegisterUseCase,
    CheckExistingUserUseCase,
    RefreshSessionUseCase,
    SignOutUseCase,
    JwtStrategy,
    // Aquí "engañamos" a NestJS para inyectar la Interfaz
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: ISessionRepository,
      useClass: SessionPrismaRepository,
    },
    {
      provide: IBanningsRepository,
      useClass: BanningsPrismaRepository,
    },
  ],
})
export class AuthModule {}
