import { Test } from '@nestjs/testing';
import { ValidateStudentUseCase } from './validate-student.use-case';
import { ISiitService } from 'src/domain/services/siit.service.interface';

describe('ValidateStudentUseCase', () => {
  let useCase: ValidateStudentUseCase;

  const mockSiitService = {
    validateStudent: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ValidateStudentUseCase,
        { provide: ISiitService, useValue: mockSiitService },
      ],
    }).compile();

    useCase = module.get(ValidateStudentUseCase);
    jest.clearAllMocks();
  });

  it('debe validar al estudiante usando el servicio de SIIT', async () => {
    mockSiitService.validateStudent.mockResolvedValue({
      valid: true,
      name: 'Juan Pérez',
    });

    const result = await useCase.execute({
      numControl: '20250001',
      pin: '1234',
    });

    expect(result).toEqual({ valid: true, name: 'Juan Pérez' });
    expect(mockSiitService.validateStudent).toHaveBeenCalledWith({
      numControl: '20250001',
      pin: '1234',
    });
  });

  it('debe retornar inválido si el estudiante no existe', async () => {
    mockSiitService.validateStudent.mockResolvedValue({ valid: false });

    const result = await useCase.execute({
      numControl: '99999999',
      pin: '0000',
    });

    expect(result).toEqual({ valid: false });
  });
});
