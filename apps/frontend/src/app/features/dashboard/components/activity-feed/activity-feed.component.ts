import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ActivityItem {
  icon: string;
  iconColor: string;
  iconBg: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="activity-timeline">
      @for (item of activities; track item.message; let last = $last) {
        <div class="activity-item" [class.last]="last">
          <div class="activity-dot" [style.background]="item.iconBg">
            <mat-icon [style.color]="item.iconColor">{{ item.icon }}</mat-icon>
          </div>
          <div class="activity-line" [class.hidden]="last"></div>
          <div class="activity-content">
            <p class="activity-message">{{ item.message }}</p>
            <span class="activity-time">{{ item.time }}</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .activity-timeline {
      position: relative;
    }

    .activity-item {
      display: flex;
      gap: 12px;
      position: relative;
      padding-bottom: 20px;

      &.last {
        padding-bottom: 0;
      }
    }

    .activity-dot {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      z-index: 1;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }

    .activity-line {
      position: absolute;
      left: 18px;
      top: 36px;
      bottom: 0;
      width: 2px;
      background: #e2e8f0;

      &.hidden {
        display: none;
      }
    }

    .activity-content {
      flex: 1;
      padding-top: 6px;
    }

    .activity-message {
      font-size: 0.88rem;
      color: #334155;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #94a3b8;
    }
  `],
})
export class ActivityFeedComponent {
  readonly activities: ActivityItem[] = [
    {
      icon: 'person_add',
      iconColor: '#3f51b5',
      iconBg: '#e8eaf6',
      message: 'Ananya Reddy joined as a Committee Member',
      time: '2 hours ago',
    },
    {
      icon: 'volunteer_activism',
      iconColor: '#2e7d32',
      iconBg: '#e8f5e9',
      message: 'Deepak Tiwari donated ₹12,000 to the community fund',
      time: '5 hours ago',
    },
    {
      icon: 'campaign',
      iconColor: '#f57c00',
      iconBg: '#fff3e0',
      message: 'New announcement: Free Health Checkup Camp on July 5th',
      time: '1 day ago',
    },
    {
      icon: 'event',
      iconColor: '#7b1fa2',
      iconBg: '#f3e5f5',
      message: 'Senior Citizens Day Celebration scheduled for August 1st',
      time: '2 days ago',
    },
    {
      icon: 'person_add',
      iconColor: '#3f51b5',
      iconBg: '#e8eaf6',
      message: 'Kavita Joshi joined as a Committee Member',
      time: '3 days ago',
    },
    {
      icon: 'volunteer_activism',
      iconColor: '#2e7d32',
      iconBg: '#e8f5e9',
      message: 'Meera Nair donated ₹15,000 for the Food Distribution Drive',
      time: '5 days ago',
    },
  ];
}
