import { Test } from '@nestjs/testing';
import { SignOutUseCase } from './sign-out.use-case';
import { ISessionRepository } from 'src/domain/session/repository/session.repository.interface';

describe('SignOutUseCase', () => {
  let useCase: SignOutUseCase;

  const mockSessionRepo = {
    deleteByRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SignOutUseCase,
        { provide: ISessionRepository, useValue: mockSessionRepo },
      ],
    }).compile();

    useCase = module.get(SignOutUseCase);
    jest.clearAllMocks();
  });

  it('debe eliminar la sesión por refreshToken', async () => {
    mockSessionRepo.deleteByRefreshToken.mockResolvedValue(undefined);

    await useCase.execute('refresh-token-123');

    expect(mockSessionRepo.deleteByRefreshToken).toHaveBeenCalledWith(
      'refresh-token-123',
    );
    expect(mockSessionRepo.deleteByRefreshToken).toHaveBeenCalledTimes(1);
  });
});
