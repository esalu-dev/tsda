import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ValidateStudentUseCase } from 'src/application/use-cases/student/validate-student.use-case';

describe('ServicesController', () => {
  let controller: ServicesController;
  let useCase: ValidateStudentUseCase;

  const mockUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ValidateStudentUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    useCase = module.get<ValidateStudentUseCase>(ValidateStudentUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('validateStudent', () => {
    it('debe llamar al use case y retornar el resultado del SIIT', async () => {
      const dto = { numControl: '12345678', pin: 'pass' };
      const expectedResult: any = {
        isValid: true,
        data: { name: 'Juan', numControl: '12345678', career: 'ISC' },
      };

      mockUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.validateStudent(dto);

      expect(useCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });
});
