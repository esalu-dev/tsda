import { Test } from '@nestjs/testing';
import { BanUserUseCase } from './ban-user.use-case';
import { IBanningsRepository } from 'src/domain/bannings/repository/bannings.repository.interface';

describe('BanUserUseCase', () => {
  let useCase: BanUserUseCase;

  const mockBanningsRepo = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BanUserUseCase,
        { provide: IBanningsRepository, useValue: mockBanningsRepo },
      ],
    }).compile();

    useCase = module.get(BanUserUseCase);
    jest.clearAllMocks();
  });

  it('debe crear un ban con duración calculada', async () => {
    const banResult = { id: 'ban-1', reason: 'Spam', duration: new Date() };
    mockBanningsRepo.create.mockResolvedValue(banResult);

    const result = await useCase.execute({
      userId: 'user-1',
      reason: 'Spam',
      duration: 86400000, // 1 día en ms
    });

    expect(result).toEqual(banResult);
    expect(mockBanningsRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: 'Spam',
        user: { connect: { id: 'user-1' } },
      }),
    );
    // Verificar que duration es un Date (no null)
    const callArg = mockBanningsRepo.create.mock.calls[0][0];
    expect(callArg.duration).toBeInstanceOf(Date);
  });

  it('debe crear un ban sin duración (permanente)', async () => {
    const banResult = { id: 'ban-1', reason: 'Trampa', duration: null };
    mockBanningsRepo.create.mockResolvedValue(banResult);

    const result = await useCase.execute({
      userId: 'user-1',
      reason: 'Trampa',
    });

    expect(result).toEqual(banResult);
    const callArg = mockBanningsRepo.create.mock.calls[0][0];
    expect(callArg.duration).toBeNull();
  });
});
