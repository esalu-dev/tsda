import { Test } from '@nestjs/testing';
import { CreatePasswordResetTokenUseCase } from './create-pw-reset-token.use-case';
import { IPasswordResetTokenRepository } from 'src/domain/password-reset-token/repository/password-reset-token.repository.interface';

// Mock del módulo completo para evitar el import de uuid (ESM)
jest.mock('src/application/helpers/create-token.helper', () => ({
  CreateTokenHelper: {
    createToken: jest.fn().mockReturnValue('generated-token'),
  },
}));

describe('CreatePasswordResetTokenUseCase', () => {
  let useCase: CreatePasswordResetTokenUseCase;

  const mockPwResetTokenRepo = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreatePasswordResetTokenUseCase,
        {
          provide: IPasswordResetTokenRepository,
          useValue: mockPwResetTokenRepo,
        },
      ],
    }).compile();

    useCase = module.get(CreatePasswordResetTokenUseCase);
    jest.clearAllMocks();
  });

  it('debe crear un token de reseteo de contraseña', async () => {
    mockPwResetTokenRepo.create.mockResolvedValue({
      id: '1',
      token: 'generated-token',
      email: 'user@mail.com',
    });

    const result = await useCase.execute({ email: 'user@mail.com' });

    expect(result).toEqual({
      id: '1',
      token: 'generated-token',
      email: 'user@mail.com',
    });
    expect(mockPwResetTokenRepo.create).toHaveBeenCalledWith(
      'generated-token',
      'user@mail.com',
    );
  });
});

