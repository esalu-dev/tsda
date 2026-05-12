import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ISiitService } from 'src/domain/services/siit.service.interface';
import { SiitCrawlerService } from 'src/infrastructure/external-services/siit/siit-crawler.service';
import { ValidateStudentUseCase } from 'src/application/use-cases/student/validate-student.use-case';

@Module({
  controllers: [ServicesController],
  providers: [
    SiitCrawlerService,
    ValidateStudentUseCase,
    {
      provide: ISiitService,
      useClass: SiitCrawlerService,
    },
  ],
})
export class ServicesModule {}
