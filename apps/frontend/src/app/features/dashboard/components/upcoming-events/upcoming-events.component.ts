import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommunityEvent } from '../../../../services/event.service';

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    @if (isLoading()) {
      <div class="events-list">
        @for (i of [1, 2, 3]; track i) {
          <mat-card class="event-card">
            <div class="event-skeleton">
              <div class="skeleton" style="width: 56px; height: 56px; border-radius: 12px;"></div>
              <div style="flex: 1;">
                <div class="skeleton" style="height: 16px; width: 60%; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 12px; width: 40%; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 12px; width: 50%;"></div>
              </div>
            </div>
          </mat-card>
        }
      </div>
    } @else if (events().length === 0) {
      <div class="empty-state">
        <mat-icon>event_busy</mat-icon>
        <p>No upcoming events</p>
      </div>
    } @else {
      <div class="events-list">
        @for (event of events(); track event._id) {
          <mat-card class="event-card">
            <div class="event-row">
              <div class="event-date-badge">
                <span class="event-day">{{ event.date | date:'d' }}</span>
                <span class="event-month">{{ event.date | date:'MMM' }}</span>
              </div>
              <div class="event-details">
                <h4 class="event-title">{{ event.title }}</h4>
                <div class="event-meta">
                  <span class="meta-item">
                    <mat-icon>location_on</mat-icon>
                    {{ event.venue }}
                  </span>
                  <span class="meta-item">
                    <mat-icon>schedule</mat-icon>
                    {{ event.date | date:'shortTime' }}
                  </span>
                </div>
              </div>
              <button mat-stroked-button color="primary" class="register-btn">
                Register
              </button>
            </div>
          </mat-card>
        }
      </div>
    }
  `,
  styles: [`
    .events-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .event-card {
      padding: 16px !important;
      transition: transform 0.2s ease !important;

      &:hover {
        transform: translateX(4px);
      }
    }

    .event-skeleton {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .event-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .event-date-badge {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      background: linear-gradient(135deg, #e8eaf6, #c5cae9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .event-day {
      font-size: 1.25rem;
      font-weight: 700;
      color: #3f51b5;
      line-height: 1;
    }

    .event-month {
      font-size: 0.7rem;
      font-weight: 600;
      color: #5c6bc0;
      text-transform: uppercase;
    }

    .event-details {
      flex: 1;
      min-width: 0;
    }

    .event-title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .event-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      color: #64748b;

      mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }
    }

    .register-btn {
      flex-shrink: 0;
      font-size: 0.8rem;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;
      color: #94a3b8;
      gap: 8px;

      mat-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
      }
    }

    @media (max-width: 600px) {
      .event-row {
        flex-wrap: wrap;
      }

      .register-btn {
        width: 100%;
        margin-top: 8px;
      }
    }
  `],
})
export class UpcomingEventsComponent {
  events = input<CommunityEvent[]>([]);
  isLoading = input<boolean>(false);
}
