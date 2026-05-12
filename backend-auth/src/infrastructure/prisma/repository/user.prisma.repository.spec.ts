import { Test, TestingModule } from '@nestjs/testing';
import { UserPrismaRepository } from './user.prisma.repository';
import { PrismaService } from '../context/prisma.service';

const mockUserModel = {
  findUnique: jest.fn(),
  create: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
};

const mockPrismaService = {
  writer: {
    user: mockUserModel,
  },
  reader: {
    user: {
      findMany: jest.fn(),
    },
  },
};

describe('UserPrismaRepository', () => {
  let repository: UserPrismaRepository;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPrismaRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<UserPrismaRepository>(UserPrismaRepository);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('debe buscar y retornar un usuario por email', async () => {
      mockUserModel.findUnique.mockResolvedValue({ id: '1', email: 'test@mail.com' });
      const result = await repository.findByEmail('test@mail.com');
      expect(prismaService.writer.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@mail.com' } });
      expect(result).toEqual({ id: '1', email: 'test@mail.com' });
    });
  });

  describe('save', () => {
    it('debe guardar y retornar el usuario creado', async () => {
      const mockUser: any = { email: 'test@mail.com', password: 'abc', username: 'test', numControl: '12345678', carrera: 'ISC' };
      mockUserModel.create.mockResolvedValue(mockUser);
      const result = await repository.save(mockUser);
      expect(prismaService.writer.user.create).toHaveBeenCalledWith({ data: mockUser });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByConflictKeys', () => {
    it('debe buscar un usuario por email, username o numControl', async () => {
      const expectedQuery = {
        where: { OR: [{ email: 'e' }, { username: 'u' }, { numControl: 'n' }] }
      };
      mockUserModel.findFirst.mockResolvedValue({ id: '1' });
      const result = await repository.findByConflictKeys('e', 'u', 'n');
      expect(prismaService.writer.user.findFirst).toHaveBeenCalledWith(expectedQuery);
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('findByNumControl', () => {
    it('debe buscar un usuario por numControl', async () => {
      mockUserModel.findUnique.mockResolvedValue({ id: '1' });
      const result = await repository.findByNumControl('n');
      expect(prismaService.writer.user.findUnique).toHaveBeenCalledWith({ where: { numControl: 'n' } });
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('findByEmailOrUsername', () => {
    it('debe buscar un usuario por email o username', async () => {
      const expectedQuery = {
        where: { OR: [{ email: 'e' }, { username: 'u' }] }
      };
      mockUserModel.findFirst.mockResolvedValue({ id: '1' });
      const result = await repository.findByEmailOrUsername('e', 'u');
      expect(prismaService.writer.user.findFirst).toHaveBeenCalledWith(expectedQuery);
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('findFirst5ByConflictKeys', () => {
    it('debe retornar 5 usuarios buscando por query (usa reader)', async () => {
      const mockResults = [{ id: '1' }];
      mockPrismaService.reader.user.findMany.mockResolvedValue(mockResults);
      const expectedQuery = {
        where: {
          OR: [
            { email: { contains: 'q' } },
            { username: { contains: 'q' } },
            { numControl: { contains: 'q' } },
          ],
        },
        take: 5,
        select: {
          id: true,
          email: true,
          username: true,
          numControl: true,
          bannings: { select: { reason: true, duration: true } },
        },
      };

      const result = await repository.findFirst5ByConflictKeys('q');
      expect(prismaService.reader.user.findMany).toHaveBeenCalledWith(expectedQuery);
      expect(result).toEqual(mockResults);
    });
  });
});
