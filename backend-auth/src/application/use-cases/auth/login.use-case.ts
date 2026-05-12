import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { LoginDto } from 'src/application/dtos/request/login.request.dto';
import { LoginResponseDto } from 'src/application/dtos/response/login.response.dto';
import { HashHelper } from 'src/application/helpers/hash.helper';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
    @Inject(IBanningsRepository)
    private readonly banningsRepository: IBanningsRepository,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const ban = await this.banningsRepository.findByEmail(user.email);
    if (ban) {
      throw new ForbiddenException({
        error: 'banned',
        banReason: ban.reason,
        banDuration: ban.duration,
      });
    }
    const isMatch = await HashHelper.comparePassword(
      dto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      career: user.carrera,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.sessionRepository.create({
      refreshToken,
      expiresAt,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
    return { accessToken, refreshToken };
  }
}
