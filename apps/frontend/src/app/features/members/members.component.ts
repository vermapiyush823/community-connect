import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>people</mat-icon>
          Members
        </h1>
        <button mat-raised-button color="primary">
          <mat-icon>person_add</mat-icon>
          Add Member
        </button>
      </div>

      <mat-card class="placeholder-card">
        <div class="placeholder-content">
          <mat-icon class="placeholder-icon">people_outline</mat-icon>
          <h2>Members Directory</h2>
          <p>This page will display a searchable, filterable list of all community members with their roles, contact information, and membership status.</p>
          <div class="feature-tags">
            <span class="tag">Search & Filter</span>
            <span class="tag">Role Management</span>
            <span class="tag">Export CSV</span>
            <span class="tag">Bulk Actions</span>
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
        color: #3f51b5;
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
      color: #c5cae9;
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
export class MembersComponent {}
