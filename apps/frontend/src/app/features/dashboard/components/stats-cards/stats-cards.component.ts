import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardSummary } from '../../../../services/dashboard.service';

interface StatCard {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  key: keyof DashboardSummary;
  prefix?: string;
  count?: number;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <div class="stats-grid">
      @for (card of statCards; track card.key) {
        <mat-card class="stat-card">
          @if (isLoading()) {
            <div class="stat-skeleton">
              <div class="skeleton" style="width: 48px; height: 48px; border-radius: 12px;"></div>
              <div>
                <div class="skeleton" style="width: 60px; height: 14px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="width: 80px; height: 28px;"></div>
              </div>
            </div>
          } @else {
            <div class="stat-content">
              <div class="stat-icon-wrapper" [style.background]="card.bgColor">
                <mat-icon [style.color]="card.color">{{ card.icon }}</mat-icon>
              </div>
              <div class="stat-info">
                <span class="stat-label">{{ card.label }}</span>
                <span class="stat-value">
                  @if (card.key === 'donationsThisMonth') {
                    ₹{{ card.count }}
                  } @else {
                    {{ card.count }}
                  }
                </span>
              </div>
            </div>
          }
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 20px !important;
      cursor: default;
      transition: transform 0.2s ease, box-shadow 0.3s ease !important;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-skeleton {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon {
        font-size: 24px;
      }
    }

    .stat-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
    }
  `],
})
export class StatsCardsComponent {
  summary = input.required<DashboardSummary>();
  isLoading = input<boolean>(false);

  readonly statCards: StatCard[] = [
    {
      label: 'Total Members',
      icon: 'people',
      color: '#3f51b5',
      bgColor: '#e8eaf6',
      key: 'totalMembers',
      count: 5
    },
    {
      label: 'Upcoming Events',
      icon: 'event',
      color: '#f57c00',
      bgColor: '#fff3e0',
      key: 'upcomingEvents',
      count: 3
    },
    {
      label: 'Donations This Month',
      icon: 'volunteer_activism',
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      key: 'donationsThisMonth',
      count: 50000
    },
    {
      label: 'Active Volunteers',
      icon: 'emoji_people',
      color: '#7b1fa2',
      bgColor: '#f3e5f5',
      key: 'activeVolunteers',
      count: 100
    },
  ];
}
