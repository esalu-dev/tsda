import { Module } from '@nestjs/common';
import { VulnerabilitiesController } from './vulnerabilities.controller';
import { PrismaService } from '../../infrastructure/prisma/context/prisma.service';
import { VulnerabilitiesService } from 'src/application/use-cases/vulnerabilities/vulnerabilities.service';
import { PrismaClientsHealthCronService } from 'src/infrastructure/prisma/context/prisma-clients-health.cron.service';

@Module({
  controllers: [VulnerabilitiesController],
  providers: [
    PrismaService,
    VulnerabilitiesService,
    PrismaClientsHealthCronService,
  ],
})
export class VulnerabilitiesModule {}
