import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';

@Injectable()
export class SignOutUseCase {
  constructor(
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(refreshToken: string) {
    await this.sessionRepository.deleteByRefreshToken(refreshToken);
  }
}
