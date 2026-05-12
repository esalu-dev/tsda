import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BanUserRequestDto } from 'src/application/dtos/request/user/ban-user-request.dto';
import { BanUserUseCase } from 'src/application/use-cases/user/ban-user.use-case';
import { CheckUserBanInfoUseCase } from 'src/application/use-cases/user/check-user-ban-info.use-case';
import { GetUsersByConflictKeys } from 'src/application/use-cases/user/get-users-by-conflict-keys.use-case';
import { UnbanUserUseCase } from 'src/application/use-cases/user/unban-user.use-case';
import { GetAllUsersUseCase } from 'src/application/use-cases/user/get-all-users.use-case';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly checkUserBanInfoUseCase: CheckUserBanInfoUseCase,
    private readonly banUserUseCase: BanUserUseCase,
    private readonly getUsersByConflictKeys: GetUsersByConflictKeys,
    private readonly unbanUserUseCase: UnbanUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('ban-info')
  async checkUserBanInfo(@Query() query: { email: string }) {
    return this.checkUserBanInfoUseCase.execute(query.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @Post('ban-user')
  async banUser(@Body() dto: BanUserRequestDto) {
    return this.banUserUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  @Post('unban-user')
  async unbanUser(@Body() dto: { banId: string }) {
    return this.unbanUserUseCase.execute(dto.banId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.OK)
  @Get('get-users-by-conflict-keys')
  async getUsers(@Query() query: { query: string }) {
    return this.getUsersByConflictKeys.execute(query.query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAllUsers() {
    return this.getAllUsersUseCase.execute();
  }
}
