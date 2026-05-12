import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    service.writer.$connect = jest.fn();
    service.writer.$disconnect = jest.fn();
    service.reader.$connect = jest.fn();
    service.reader.$disconnect = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe tener writer y reader definidos', () => {
    expect(service.writer).toBeDefined();
    expect(service.reader).toBeDefined();
  });

  it('debe llamar a $connect en ambos clientes en onModuleInit', async () => {
    await service.onModuleInit();
    expect(service.writer.$connect).toHaveBeenCalled();
    expect(service.reader.$connect).toHaveBeenCalled();
  });

  it('debe llamar a $disconnect en ambos clientes en onModuleDestroy', async () => {
    await service.onModuleDestroy();
    expect(service.writer.$disconnect).toHaveBeenCalled();
    expect(service.reader.$disconnect).toHaveBeenCalled();
  });
});
