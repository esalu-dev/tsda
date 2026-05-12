import { Module } from '@nestjs/common';
import { AuthModule } from './presentation/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './presentation/services/services.module';
import { PasswordResetTokenModule } from './presentation/password-reset-token/password-reset-token.module';
import { UserModule } from './presentation/user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { VulnerabilitiesModule } from './presentation/vulnerabilities/vulnerabilities.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env.local',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    ServicesModule,
    PasswordResetTokenModule,
    UserModule,
    VulnerabilitiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
