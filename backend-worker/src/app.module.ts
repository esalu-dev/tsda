import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CleanUserSessionsModule } from './clean-user-sessions/clean-user-sessions.module';

@Module({
  imports: [CleanUserSessionsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
