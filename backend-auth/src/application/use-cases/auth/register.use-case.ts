import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { User } from 'generated/prisma-pg/client';
import { RegisterUserDto } from 'src/application/dtos/request/register.dto';
import { HashHelper } from 'src/application/helpers/hash.helper';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByConflictKeys(
      dto.email,
      dto.username,
      dto.numControl,
    );
    if (existingUser) {
      if (existingUser.email === dto.email)
        throw new ConflictException('Email en uso');
      if (existingUser.username === dto.username)
        throw new ConflictException('Username en uso');
      if (existingUser.numControl === dto.numControl)
        throw new ConflictException('Número de control en uso');
    }
    const hashedPassword = await HashHelper.hashPassword(dto.password);
    const user = await this.userRepository.save({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }
}
