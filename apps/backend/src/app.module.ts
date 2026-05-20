import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { EventsModule } from './modules/events/events.module';
import { MembersModule } from './modules/members/members.module';
import { DonationsModule } from './modules/donations/donations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    AnnouncementsModule,
    EventsModule,
    MembersModule,
    DonationsModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
