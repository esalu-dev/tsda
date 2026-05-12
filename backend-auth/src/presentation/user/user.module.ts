import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/infrastructure/prisma/context/prisma.service';
import { CheckUserBanInfoUseCase } from 'src/application/use-cases/user/check-user-ban-info.use-case';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { BanningsPrismaRepository } from 'src/infrastructure/prisma/repository/bannings.prisma.repository';
import { BanUserUseCase } from 'src/application/use-cases/user/ban-user.use-case';
import { GetUsersByConflictKeys } from 'src/application/use-cases/user/get-users-by-conflict-keys.use-case';
import { UserPrismaRepository } from 'src/infrastructure/prisma/repository/user.prisma.repository';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { UnbanUserUseCase } from 'src/application/use-cases/user/unban-user.use-case';
import { GetAllUsersUseCase } from 'src/application/use-cases/user/get-all-users.use-case';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CheckUserBanInfoUseCase,
    BanUserUseCase,
    GetUsersByConflictKeys,
    UnbanUserUseCase,
    GetAllUsersUseCase,
    {
      provide: IBanningsRepository,
      useClass: BanningsPrismaRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
