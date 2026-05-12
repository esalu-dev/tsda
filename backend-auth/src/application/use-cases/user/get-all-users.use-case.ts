import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
