import { Test } from '@nestjs/testing';
import { RegisterUseCase } from './register.use-case';
import { IUserRepository } from 'src/domain/user/repository/user.repository.interface';
import { ConflictException } from '@nestjs/common';
import { HashHelper } from 'src/application/helpers/hash.helper';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;

  const mockUserRepo = {
    findByConflictKeys: jest.fn(),
    save: jest.fn(),
  };

  const validDto = {
    email: 'nuevo@mail.com',
    username: 'nuevo',
    password: 'Pass123!',
    numControl: '20250001',
    carrera: 'ISC',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        { provide: IUserRepository, useValue: mockUserRepo },
      ],
    }).compile();

    useCase = module.get(RegisterUseCase);
    jest.clearAllMocks();
  });

  it('debe lanzar ConflictException si el email ya existe', async () => {
    mockUserRepo.findByConflictKeys.mockResolvedValue({
      email: validDto.email,
      username: 'otro',
      numControl: '99999999',
    });

    await expect(useCase.execute(validDto)).rejects.toThrow(
      new ConflictException('Email en uso'),
    );
  });

  it('debe lanzar ConflictException si el username ya existe', async () => {
    mockUserRepo.findByConflictKeys.mockResolvedValue({
      email: 'otro@mail.com',
      username: validDto.username,
      numControl: '99999999',
    });

    await expect(useCase.execute(validDto)).rejects.toThrow(
      new ConflictException('Username en uso'),
    );
  });

  it('debe lanzar ConflictException si el numControl ya existe', async () => {
    mockUserRepo.findByConflictKeys.mockResolvedValue({
      email: 'otro@mail.com',
      username: 'otro',
      numControl: validDto.numControl,
    });

    await expect(useCase.execute(validDto)).rejects.toThrow(
      new ConflictException('Número de control en uso'),
    );
  });

  it('debe registrar al usuario con password hasheado', async () => {
    mockUserRepo.findByConflictKeys.mockResolvedValue(null);
    jest.spyOn(HashHelper, 'hashPassword').mockResolvedValue('hashed-pw');
    const savedUser = { id: '1', ...validDto, password: 'hashed-pw' };
    mockUserRepo.save.mockResolvedValue(savedUser);

    const result = await useCase.execute(validDto);

    expect(result).toEqual(savedUser);
    expect(mockUserRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'hashed-pw' }),
    );
  });
});
