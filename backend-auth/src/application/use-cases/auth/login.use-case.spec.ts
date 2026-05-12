import { Test } from '@nestjs/testing';
import { LoginUseCase } from './login.use-case';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { HashHelper } from 'src/application/helpers/hash.helper';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const mockUserRepo = {
    findByEmail: jest.fn(),
  };
  const mockSessionRepo = {
    create: jest.fn(),
  };
  const mockBanningsRepo = {
    findByEmail: jest.fn(),
  };
  const mockJwt = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: IUserRepository, useValue: mockUserRepo },
        { provide: ISessionRepository, useValue: mockSessionRepo },
        { provide: IBanningsRepository, useValue: mockBanningsRepo },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    useCase = module.get(LoginUseCase);
    jest.clearAllMocks();
  });

  it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'noexiste@mail.com', password: '123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debe lanzar ForbiddenException si el usuario está baneado', async () => {
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      email: 'user@mail.com',
      password: 'hash',
    });
    mockBanningsRepo.findByEmail.mockResolvedValue({
      reason: 'Spam',
      duration: null,
    });

    await expect(
      useCase.execute({ email: 'user@mail.com', password: '123' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('debe lanzar UnauthorizedException si el password es incorrecto', async () => {
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      email: 'user@mail.com',
      password: 'hashCorrecto',
    });
    mockBanningsRepo.findByEmail.mockResolvedValue(null);
    jest.spyOn(HashHelper, 'comparePassword').mockResolvedValue(false);

    await expect(
      useCase.execute({ email: 'user@mail.com', password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debe retornar accessToken y refreshToken con credenciales válidas', async () => {
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '1',
      email: 'user@mail.com',
      password: 'hashCorrecto',
      role: 'USER',
      carrera: 'ISC',
      username: 'juan',
    });
    mockBanningsRepo.findByEmail.mockResolvedValue(null);
    jest.spyOn(HashHelper, 'comparePassword').mockResolvedValue(true);
    mockJwt.signAsync.mockResolvedValueOnce('fake-access-token');
    mockSessionRepo.create.mockResolvedValue({});

    const result = await useCase.execute({
      email: 'user@mail.com',
      password: 'correct',
    });

    expect(result).toEqual({
      accessToken: 'fake-access-token',
      refreshToken: expect.any(String),
    });
    expect(mockSessionRepo.create).toHaveBeenCalledTimes(1);
  });
});
