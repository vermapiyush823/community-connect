import { Component, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { AnnouncementService } from '../../services/announcement.service';
import { EventService } from '../../services/event.service';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { AnnouncementsCarouselComponent } from './components/announcements-carousel/announcements-carousel.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [

    MatIconModule,
    StatsCardsComponent,
    AnnouncementsCarouselComponent,
    UpcomingEventsComponent,
    ActivityFeedComponent,
  ],
  template: `
    <!-- Section 1: Hero Carousel -->
    <div class="hero-carousel-section">
      <app-announcements-carousel
        [announcements]="announcementService.announcements()"
        [isLoading]="announcementService.isLoading()"
      />
    </div>

    <div class="page-container">
      <!-- Section 2: Stats -->
      <app-stats-cards
        [summary]="dashboardService.summary()"
        [isLoading]="dashboardService.isLoading()"
      />

      <!-- Section 3 & 4: Events + Activity Feed -->
      <div class="bottom-grid">
        <section class="dashboard-section">
          <h2 class="section-title">
            <mat-icon>event_upcoming</mat-icon>
            Upcoming Events
          </h2>
          <app-upcoming-events
            [events]="eventService.upcomingEvents()"
            [isLoading]="eventService.isLoading()"
          />
        </section>

        <section class="dashboard-section">
          <h2 class="section-title">
            <mat-icon>timeline</mat-icon>
            Recent Activity
          </h2>
          <app-activity-feed />
        </section>
      </div>
    </div>
  `,
  styles: [`
    .hero-carousel-section {
      width: 100%;
      margin-bottom: -32px; /* Pull content up slightly */
    }

    .page-container {
      position: relative;
      z-index: 10;
      padding: 0 24px 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-section {
      margin-bottom: 32px;
    }

    .bottom-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 24px;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class DashboardComponent {
  readonly dashboardService = inject(DashboardService);
  readonly announcementService = inject(AnnouncementService);
  readonly eventService = inject(EventService);
}
