import { Inject, Injectable } from '@nestjs/common';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

@Injectable()
export class CheckUserBanInfoUseCase {
  constructor(
    @Inject(IBanningsRepository)
    private readonly banningRepository: IBanningsRepository,
  ) {}

  async execute(email: string) {
    return this.banningRepository.findByEmail(email);
  }
}
