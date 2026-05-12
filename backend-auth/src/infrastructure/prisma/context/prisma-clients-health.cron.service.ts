import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaClientsHealthCronService {
  private readonly logger = new Logger(PrismaClientsHealthCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkPrismaClientsHealth(): Promise<void> {
    await this.checkClient('writer', this.prisma.writer);
    await this.checkClient('reader', this.prisma.reader);
  }

  private async checkClient(
    clientName: 'writer' | 'reader',
    client: { $queryRawUnsafe: (query: string) => Promise<unknown> },
  ): Promise<void> {
    try {
      await client.$queryRawUnsafe('SELECT 1');
      this.logger.log(`Prisma client "${clientName}" funcionando correctamente`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(
        `Prisma client "${clientName}" no está funcionando: ${message}`,
      );
    }
  }
}
