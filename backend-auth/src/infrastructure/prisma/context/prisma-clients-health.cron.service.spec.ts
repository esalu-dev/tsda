import { Logger } from '@nestjs/common';
import { PrismaClientsHealthCronService } from './prisma-clients-health.cron.service';
import { PrismaService } from './prisma.service';

describe('PrismaClientsHealthCronService', () => {
  let service: PrismaClientsHealthCronService;

  const prismaMock = {
    writer: {
      $queryRawUnsafe: jest.fn(),
    },
    reader: {
      $queryRawUnsafe: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PrismaClientsHealthCronService(prismaMock);
  });

  it('logs when both prisma clients are working', async () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();

    (
      prismaMock.writer.$queryRawUnsafe as jest.MockedFunction<
        typeof prismaMock.writer.$queryRawUnsafe
      >
    ).mockResolvedValue(1);
    (
      prismaMock.reader.$queryRawUnsafe as jest.MockedFunction<
        typeof prismaMock.reader.$queryRawUnsafe
      >
    ).mockResolvedValue(1);

    await service.checkPrismaClientsHealth();

    expect(prismaMock.writer.$queryRawUnsafe).toHaveBeenCalledWith('SELECT 1');
    expect(prismaMock.reader.$queryRawUnsafe).toHaveBeenCalledWith('SELECT 1');
    expect(logSpy).toHaveBeenCalledWith(
      'Prisma client "writer" funcionando correctamente',
    );
    expect(logSpy).toHaveBeenCalledWith(
      'Prisma client "reader" funcionando correctamente',
    );
  });

  it('logs an error when a prisma client fails', async () => {
    const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

    (
      prismaMock.writer.$queryRawUnsafe as jest.MockedFunction<
        typeof prismaMock.writer.$queryRawUnsafe
      >
    ).mockRejectedValue(new Error('writer down'));
    (
      prismaMock.reader.$queryRawUnsafe as jest.MockedFunction<
        typeof prismaMock.reader.$queryRawUnsafe
      >
    ).mockResolvedValue(1);

    await service.checkPrismaClientsHealth();

    expect(errorSpy).toHaveBeenCalledWith(
      'Prisma client "writer" no está funcionando: writer down',
    );
  });
});
