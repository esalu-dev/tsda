import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PasswordResetToken } from 'generated/prisma-pg/browser';
import type { CreatePasswordResetTokenDto } from 'src/application/dtos/request/create-password-reset-token.dto';
import { CreatePasswordResetTokenUseCase } from 'src/application/use-cases/password-reset/create-pw-reset-token.use-case';

@Controller('password-reset-token')
export class PasswordResetTokenController {
  constructor(
    private readonly createPasswordResetToken: CreatePasswordResetTokenUseCase,
  ) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create-reset-password-token')
  async createResetPasswordToken(
    @Body() dto: CreatePasswordResetTokenDto,
  ): Promise<PasswordResetToken> {
    return this.createPasswordResetToken.execute(dto);
  }
}
