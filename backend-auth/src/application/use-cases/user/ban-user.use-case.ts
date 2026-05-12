import { Inject, Injectable } from '@nestjs/common';
import { BanUserRequestDto } from 'src/application/dtos/request/user/ban-user-request.dto';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

@Injectable()
export class BanUserUseCase {
  constructor(
    @Inject(IBanningsRepository)
    private readonly banningsRepository: IBanningsRepository,
  ) {}

  async execute(dto: BanUserRequestDto) {
    return await this.banningsRepository.create({
      reason: dto.reason,
      user: {
        connect: {
          id: dto.userId,
        },
      },
      duration: dto.duration ? new Date(Date.now() + dto.duration) : null,
    });
  }
}
