import { Injectable } from '@nestjs/common';
import { MembersService } from '../members/members.service';
import { EventsService } from '../events/events.service';
import { DonationsService } from '../donations/donations.service';

export interface DashboardSummary {
  totalMembers: number;
  upcomingEvents: number;
  donationsThisMonth: number;
  activeVolunteers: number;
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly membersService: MembersService,
    private readonly eventsService: EventsService,
    private readonly donationsService: DonationsService,
  ) {}

  async getSummary(): Promise<DashboardSummary> {
    const [totalMembers, upcomingEvents, donationsThisMonth, activeVolunteers] =
      await Promise.all([
        this.membersService.countAll(),
        this.eventsService.countUpcoming(),
        this.donationsService.sumThisMonth(),
        this.membersService.countByRole('Volunteer'),
      ]);

    return {
      totalMembers,
      upcomingEvents,
      donationsThisMonth,
      activeVolunteers,
    };
  }
}
