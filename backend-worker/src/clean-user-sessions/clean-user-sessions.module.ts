import { Module } from '@nestjs/common';
import { CleanUserSessionsService } from './clean-user-sessions.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [CleanUserSessionsService],
  imports: [ScheduleModule.forRoot()],
})
export class CleanUserSessionsModule {}
