import { Test, TestingModule } from '@nestjs/testing';
import { BanningsPrismaRepository } from './bannings.prisma.repository';
import { PrismaService } from '../context/prisma.service';

const mockPrismaService = {
  writer: {
    bannings: {
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
  reader: {
    bannings: {
      findFirst: jest.fn(),
    },
  },
};

describe('BanningsPrismaRepository', () => {
  let repository: BanningsPrismaRepository;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BanningsPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<BanningsPrismaRepository>(BanningsPrismaRepository);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('debe encontrar un banneo basado en email de usuario (usa reader)', async () => {
      const mockBan = { id: 'ban1', userId: 'user1' };
      mockPrismaService.reader.bannings.findFirst.mockResolvedValue(mockBan);

      const result = await repository.findByEmail('test@mail.com');
      
      expect(prismaService.reader.bannings.findFirst).toHaveBeenCalledWith({
        where: { user: { email: 'test@mail.com' } },
      });
      expect(result).toEqual(mockBan);
    });
  });

  describe('create', () => {
    it('debe crear un ban', async () => {
      const mockBan: any = { userId: '1', reason: 'spam' };
      mockPrismaService.writer.bannings.create.mockResolvedValue(mockBan);

      const result = await repository.create(mockBan);
      expect(prismaService.writer.bannings.create).toHaveBeenCalledWith({ data: mockBan });
      expect(result).toEqual(mockBan);
    });
  });

  describe('delete', () => {
    it('debe borrar el ban', async () => {
      await repository.delete('ban1');
      expect(prismaService.writer.bannings.delete).toHaveBeenCalledWith({ where: { id: 'ban1' } });
    });
  });
});
