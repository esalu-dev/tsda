import { Test } from '@nestjs/testing';
import { RefreshSessionUseCase } from './refresh-session.use-case';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

const fakePayload = {
  sub: '1',
  email: 'user@mail.com',
  role: 'USER',
  career: 'ISC',
  username: 'juan',
};

describe('RefreshSessionUseCase', () => {
  let useCase: RefreshSessionUseCase;

  const mockSessionRepo = {
    findByRefreshToken: jest.fn(),
    deleteByRefreshToken: jest.fn(),
    create: jest.fn(),
  };
  const mockUserRepo = {
    findByEmail: jest.fn(),
  };
  const mockBanningsRepo = {
    findByEmail: jest.fn(),
  };
  const mockJwt = {
    verifyAsync: jest.fn().mockResolvedValue(fakePayload),
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RefreshSessionUseCase,
        { provide: ISessionRepository, useValue: mockSessionRepo },
        { provide: IUserRepository, useValue: mockUserRepo },
        { provide: IBanningsRepository, useValue: mockBanningsRepo },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    useCase = module.get(RefreshSessionUseCase);
    jest.clearAllMocks();
    mockJwt.verifyAsync.mockResolvedValue(fakePayload);
  });

  it('debe lanzar UnauthorizedException si la sesión no existe en la BD', async () => {
    mockSessionRepo.findByRefreshToken.mockResolvedValue(null);

    await expect(useCase.execute('token-invalido')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
    mockSessionRepo.findByRefreshToken.mockResolvedValue({ id: '1' });
    mockSessionRepo.deleteByRefreshToken.mockResolvedValue(undefined);
    mockUserRepo.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute('token-valido')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('debe lanzar UnauthorizedException si el usuario está baneado', async () => {
    mockSessionRepo.findByRefreshToken.mockResolvedValue({ id: '1' });
    mockSessionRepo.deleteByRefreshToken.mockResolvedValue(undefined);
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      email: 'user@mail.com',
    });
    mockBanningsRepo.findByEmail.mockResolvedValue({
      reason: 'Spam',
      duration: null,
    });

    await expect(useCase.execute('token-valido')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('debe retornar nuevos tokens si todo es válido', async () => {
    mockSessionRepo.findByRefreshToken.mockResolvedValue({ id: '1' });
    mockSessionRepo.deleteByRefreshToken.mockResolvedValue(undefined);
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      email: 'user@mail.com',
    });
    mockBanningsRepo.findByEmail.mockResolvedValue(null);
    mockJwt.signAsync
      .mockResolvedValueOnce('new-access')
      .mockResolvedValueOnce('new-refresh');
    mockSessionRepo.create.mockResolvedValue({});

    const result = await useCase.execute('token-valido');

    expect(result).toEqual({
      accessToken: 'new-access',
      newRefreshToken: 'new-refresh',
    });
    expect(mockSessionRepo.create).toHaveBeenCalledTimes(1);
  });
});
