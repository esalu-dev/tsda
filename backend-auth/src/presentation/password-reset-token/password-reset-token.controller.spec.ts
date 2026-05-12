import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetTokenController } from './password-reset-token.controller';
import { CreatePasswordResetTokenUseCase } from 'src/application/use-cases/password-reset/create-pw-reset-token.use-case';

describe('PasswordResetTokenController', () => {
  let controller: PasswordResetTokenController;
  let useCase: CreatePasswordResetTokenUseCase;

  const mockUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetTokenController],
      providers: [
        {
          provide: CreatePasswordResetTokenUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<PasswordResetTokenController>(PasswordResetTokenController);
    useCase = module.get<CreatePasswordResetTokenUseCase>(CreatePasswordResetTokenUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createResetPasswordToken', () => {
    it('debe llamar al use case correspondiente y retornar el token creado', async () => {
      const dto = { email: 'test@mail.com' };
      const expectedResult: any = { token: 't1', email: 'test@mail.com', expires: new Date() };
      
      mockUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.createResetPasswordToken(dto);

      expect(useCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
