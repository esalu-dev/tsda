import { Inject, Injectable } from '@nestjs/common';
import { CreatePasswordResetTokenDto } from 'src/application/dtos/request/create-password-reset-token.dto';
import { CreateTokenHelper } from 'src/application/helpers/create-token.helper';
import { IPasswordResetTokenRepository } from 'src/domain/password-reset-token/repository/password-reset-token.repository.interface';

@Injectable()
export class CreatePasswordResetTokenUseCase {
  constructor(
    @Inject(IPasswordResetTokenRepository)
    private readonly passwordResetTokenRepository: IPasswordResetTokenRepository,
  ) {}

  async execute(dto: CreatePasswordResetTokenDto) {
    const token = CreateTokenHelper.createToken();
    return this.passwordResetTokenRepository.create(token, dto.email);
  }
}
