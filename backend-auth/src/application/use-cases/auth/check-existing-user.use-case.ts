import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CheckExistingUserDto } from 'src/application/dtos/request/check-existing-user.dto';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class CheckExistingUserUseCase {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CheckExistingUserDto): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmailOrUsername(
      dto.email,
      dto.username,
    );
    if (existingUser) {
      if (existingUser.email === dto.email)
        throw new ConflictException('Email en uso');
      if (existingUser.username === dto.username)
        throw new ConflictException('Username en uso');
    }
    return true;
  }
}
