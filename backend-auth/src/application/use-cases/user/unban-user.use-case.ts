import { Inject, Injectable } from '@nestjs/common';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

@Injectable()
export class UnbanUserUseCase {
  constructor(
    @Inject(IBanningsRepository)
    private readonly banningsRepository: IBanningsRepository,
  ) {}

  async execute(banId: string): Promise<void> {
    await this.banningsRepository.delete(banId);
  }
}
