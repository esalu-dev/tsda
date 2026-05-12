import { Test } from '@nestjs/testing';
import { CheckUserBanInfoUseCase } from './check-user-ban-info.use-case';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

describe('CheckUserBanInfoUseCase', () => {
  let useCase: CheckUserBanInfoUseCase;

  const mockBanningsRepo = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CheckUserBanInfoUseCase,
        { provide: IBanningsRepository, useValue: mockBanningsRepo },
      ],
    }).compile();

    useCase = module.get(CheckUserBanInfoUseCase);
    jest.clearAllMocks();
  });

  it('debe retornar la info del ban si el usuario está baneado', async () => {
    const ban = { id: 'ban-1', reason: 'Spam', duration: null };
    mockBanningsRepo.findByEmail.mockResolvedValue(ban);

    const result = await useCase.execute('user@mail.com');

    expect(result).toEqual(ban);
  });

  it('debe retornar null si el usuario no está baneado', async () => {
    mockBanningsRepo.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute('user@mail.com');

    expect(result).toBeNull();
  });
});
