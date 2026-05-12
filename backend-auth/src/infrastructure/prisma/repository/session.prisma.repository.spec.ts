import { Test, TestingModule } from '@nestjs/testing';
import { SessionPrismaRepository } from './session.prisma.repository';
import { PrismaService } from '../context/prisma.service';

const mockPrismaService = {
  writer: {
    userSession: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
  reader: {},
};

describe('SessionPrismaRepository', () => {
  let repository: SessionPrismaRepository;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<SessionPrismaRepository>(SessionPrismaRepository);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByRefreshToken', () => {
    it('debe buscar y retornar un refreshToken', async () => {
      mockPrismaService.writer.userSession.findUnique.mockResolvedValue({ refreshToken: 'token123' });
      const result = await repository.findByRefreshToken('token123');
      expect(prismaService.writer.userSession.findUnique).toHaveBeenCalledWith({ where: { refreshToken: 'token123' } });
      expect(result).toBe('token123');
    });

    it('debe retornar null si no existe', async () => {
      mockPrismaService.writer.userSession.findUnique.mockResolvedValue(null);
      const result = await repository.findByRefreshToken('fake');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('debe guardar y retornar la sesión creada', async () => {
      const mockSession: any = { userId: '1', refreshToken: 't', expiresAt: new Date() };
      mockPrismaService.writer.userSession.create.mockResolvedValue(mockSession);
      const result = await repository.create(mockSession);
      expect(prismaService.writer.userSession.create).toHaveBeenCalledWith({ data: mockSession });
      expect(result).toEqual(mockSession);
    });
  });

  describe('deleteByRefreshToken', () => {
    it('debe eliminar la sesión por token', async () => {
      await repository.deleteByRefreshToken('token');
      expect(prismaService.writer.userSession.delete).toHaveBeenCalledWith({ where: { refreshToken: 'token' } });
    });

    it('debe manejar errores si falla la eliminación', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      mockPrismaService.writer.userSession.delete.mockRejectedValue(new Error('fail'));
      await repository.deleteByRefreshToken('token');
      expect(consoleSpy).toHaveBeenCalledWith(new Error('fail'));
      consoleSpy.mockRestore();
    });
  });

  describe('deleteAllByUserId', () => {
    it('debe eliminar todas las sesiones de un usuario', async () => {
      await repository.deleteAllByUserId('user1');
      expect(prismaService.writer.userSession.deleteMany).toHaveBeenCalledWith({ where: { userId: 'user1' } });
    });

    it('debe manejar errores si falla', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      mockPrismaService.writer.userSession.deleteMany.mockRejectedValue(new Error('fail'));
      await repository.deleteAllByUserId('user1');
      expect(consoleSpy).toHaveBeenCalledWith(new Error('fail'));
      consoleSpy.mockRestore();
    });
  });
});
