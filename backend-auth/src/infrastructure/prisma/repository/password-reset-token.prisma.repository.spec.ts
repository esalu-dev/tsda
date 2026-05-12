import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetTokenPrismaRepository } from './password-reset-token.prisma.repository';
import { PrismaService } from '../context/prisma.service';

const mockPrismaService = {
  writer: {
    passwordResetToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
  reader: {},
};

describe('PasswordResetTokenPrismaRepository', () => {
  let repository: PasswordResetTokenPrismaRepository;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetTokenPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PasswordResetTokenPrismaRepository>(
      PasswordResetTokenPrismaRepository,
    );
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe registrar y retornar un nuevo token con expiración de 24 horas', async () => {
      const mockResult = { token: 't1', email: 'e@mail.com', expires: new Date() };
      mockPrismaService.writer.passwordResetToken.create.mockResolvedValue(mockResult);

      const result = await repository.create('t1', 'e@mail.com');

      expect(prismaService.writer.passwordResetToken.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            token: 't1',
            email: 'e@mail.com',
            expires: expect.any(Date),
          }),
        }),
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('findByToken', () => {
    it('debe buscar y retornar un token por su valor', async () => {
      const mockToken = { token: 't1' };
      mockPrismaService.writer.passwordResetToken.findUnique.mockResolvedValue(mockToken);

      const result = await repository.findByToken('t1');
      
      expect(prismaService.writer.passwordResetToken.findUnique).toHaveBeenCalledWith({
        where: { token: 't1' },
      });
      expect(result).toEqual(mockToken);
    });
  });

  describe('delete', () => {
    it('debe borrar el token', async () => {
      await repository.delete('t1');
      expect(prismaService.writer.passwordResetToken.delete).toHaveBeenCalledWith({
        where: { token: 't1' },
      });
    });
  });
});
