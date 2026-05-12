import { Test } from '@nestjs/testing';
import { CheckExistingUserUseCase } from './check-existing-user.use-case';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { ConflictException } from '@nestjs/common';

describe('CheckExistingUserUseCase', () => {
  let useCase: CheckExistingUserUseCase;

  const mockUserRepo = {
    findByEmailOrUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CheckExistingUserUseCase,
        { provide: IUserRepository, useValue: mockUserRepo },
      ],
    }).compile();

    useCase = module.get(CheckExistingUserUseCase);
    jest.clearAllMocks();
  });

  it('debe lanzar ConflictException si el email ya existe', async () => {
    mockUserRepo.findByEmailOrUsername.mockResolvedValue({
      email: 'existe@mail.com',
      username: 'otro',
    });

    await expect(
      useCase.execute({ email: 'existe@mail.com', username: 'nuevo' }),
    ).rejects.toThrow(new ConflictException('Email en uso'));
  });

  it('debe lanzar ConflictException si el username ya existe', async () => {
    mockUserRepo.findByEmailOrUsername.mockResolvedValue({
      email: 'otro@mail.com',
      username: 'existe',
    });

    await expect(
      useCase.execute({ email: 'nuevo@mail.com', username: 'existe' }),
    ).rejects.toThrow(new ConflictException('Username en uso'));
  });

  it('debe retornar true si no hay conflictos', async () => {
    mockUserRepo.findByEmailOrUsername.mockResolvedValue(null);

    const result = await useCase.execute({
      email: 'nuevo@mail.com',
      username: 'nuevo',
    });

    expect(result).toBe(true);
  });
});
