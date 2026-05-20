import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>volunteer_activism</mat-icon>
          Donations
        </h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Record Donation
        </button>
      </div>

      <mat-card class="placeholder-card">
        <div class="placeholder-content">
          <mat-icon class="placeholder-icon">payments</mat-icon>
          <h2>Donation Management</h2>
          <p>Track all community donations, generate receipts, view donor history, and create financial reports. Full donation lifecycle management.</p>
          <div class="feature-tags">
            <span class="tag">Donation History</span>
            <span class="tag">Receipt Generation</span>
            <span class="tag">Reports</span>
            <span class="tag">Analytics</span>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;

      mat-icon {
        color: #2e7d32;
      }
    }

    .placeholder-card {
      padding: 64px 32px !important;
    }

    .placeholder-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
    }

    .placeholder-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #a5d6a7;
    }

    h2 {
      font-size: 1.35rem;
      font-weight: 600;
      color: #334155;
    }

    p {
      max-width: 500px;
      color: #64748b;
      line-height: 1.6;
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .tag {
      padding: 6px 14px;
      background: #f1f5f9;
      border-radius: 20px;
      font-size: 0.8rem;
      color: #475569;
      font-weight: 500;
    }
  `],
})
export class DonationsComponent {}
