// backend-auth/src/presentation/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import * as loginRequestDto from '../../application/dtos/request/login.request.dto';
import { LoginResponseDto } from '../../application/dtos/response/login.response.dto';
import { User } from 'generated/prisma-pg/browser';
import * as registerRequestDto from '../../application/dtos/request/register.dto';
import { CheckExistingUserDto } from 'src/application/dtos/request/check-existing-user.dto';
import { RefreshSessionUseCase } from 'src/application/use-cases/session/refresh-session.use-case';
import { SignOutUseCase } from 'src/application/use-cases/session/sign-out.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import { CheckExistingUserUseCase } from 'src/application/use-cases/auth/check-existing-user.use-case';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly checkExistingUserUseCase: CheckExistingUserUseCase,
    private readonly refreshSessionUseCase: RefreshSessionUseCase,
    private readonly signOutUseCase: SignOutUseCase,
  ) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: loginRequestDto.LoginDto,
  ): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(dto);
  }

  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() dto: registerRequestDto.RegisterUserDto,
  ): Promise<User> {
    return this.registerUseCase.execute(dto);
  }

  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @HttpCode(HttpStatus.OK)
  @Post('check-existing-user')
  async checkExistingUser(@Body() dto: CheckExistingUserDto): Promise<boolean> {
    return this.checkExistingUserUseCase.execute(dto);
  }

  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshSession(
    @Body() refreshToken: { refreshToken: string },
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    console.log('refreshSession', refreshToken);
    return this.refreshSessionUseCase.execute(refreshToken.refreshToken);
  }

  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  async signOut(@Body() refreshToken: { refreshToken: string }) {
    return this.signOutUseCase.execute(refreshToken.refreshToken);
  }
}
