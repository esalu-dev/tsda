import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class GetUsersByConflictKeys {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: string) {
    return this.userRepository.findFirst5ByConflictKeys(query);
  }
}
