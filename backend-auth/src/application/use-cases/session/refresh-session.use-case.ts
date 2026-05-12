import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { JwtPayload } from 'src/domain/constants/jwt';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';

@Injectable()
export class RefreshSessionUseCase {
  constructor(
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
    private readonly jwtService: JwtService,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IBanningsRepository)
    private readonly banningsRepository: IBanningsRepository,
  ) {}

  async execute(
    refreshToken: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    const stored =
      await this.sessionRepository.findByRefreshToken(refreshToken);
    if (!stored) {
      throw new UnauthorizedException('Token inválido');
    }
    await this.sessionRepository.deleteByRefreshToken(refreshToken);
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }
    const ban = await this.banningsRepository.findByEmail(user.email);
    if (ban) {
      throw new UnauthorizedException({
        error: 'banned',
        banReason: ban.reason,
        banDuration: ban.duration,
      });
    }

    const newPayload = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      career: payload.career,
      username: payload.username,
    };

    const accessToken = await this.jwtService.signAsync(newPayload);
    const newRefreshToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '15d',
    });
    await this.sessionRepository.create({
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      user: {
        connect: {
          id: payload.sub,
        },
      },
    });

    return { accessToken, newRefreshToken };
  }
}
