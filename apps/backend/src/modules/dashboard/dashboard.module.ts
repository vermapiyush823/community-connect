import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MembersModule } from '../members/members.module';
import { EventsModule } from '../events/events.module';
import { DonationsModule } from '../donations/donations.module';

@Module({
  imports: [MembersModule, EventsModule, DonationsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
