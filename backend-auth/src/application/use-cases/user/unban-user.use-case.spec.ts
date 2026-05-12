import { Test } from '@nestjs/testing';
import { UnbanUserUseCase } from './unban-user.use-case';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

describe('UnbanUserUseCase', () => {
  let useCase: UnbanUserUseCase;

  const mockBanningsRepo = {
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UnbanUserUseCase,
        { provide: IBanningsRepository, useValue: mockBanningsRepo },
      ],
    }).compile();

    useCase = module.get(UnbanUserUseCase);
    jest.clearAllMocks();
  });

  it('debe eliminar el ban por ID', async () => {
    mockBanningsRepo.delete.mockResolvedValue(undefined);

    await useCase.execute('ban-123');

    expect(mockBanningsRepo.delete).toHaveBeenCalledWith('ban-123');
    expect(mockBanningsRepo.delete).toHaveBeenCalledTimes(1);
  });
});
