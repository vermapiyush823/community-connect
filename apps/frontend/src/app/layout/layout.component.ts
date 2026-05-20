import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../core/auth/auth.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  template: `
    <div class="layout-container">
      <mat-toolbar class="app-toolbar" color="primary">
        <button mat-icon-button (click)="toggleSidenav()" aria-label="Toggle menu" class="menu-toggle">
          <mat-icon>menu</mat-icon>
        </button>

        <div class="toolbar-brand">
          <mat-icon class="brand-icon">groups</mat-icon>
          <span class="brand-name">Community Connect</span>
        </div>

        <span class="toolbar-spacer"></span>

        <button mat-icon-button matTooltip="Notifications" [matBadge]="3" matBadgeColor="accent" matBadgeSize="small">
          <mat-icon>notifications_none</mat-icon>
        </button>

        <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-avatar-btn">
          <div class="user-avatar">{{ authService.userInitials() }}</div>
        </button>

        <mat-menu #userMenu="matMenu">
          <div class="user-menu-header">
            <strong>{{ authService.userName() }}</strong>
            <small>{{ authService.user()?.email }}</small>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="authService.logout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="isMobile() ? 'over' : 'side'"
          [opened]="!isMobile()"
          class="app-sidenav"
          [fixedInViewport]="true"
          fixedTopGap="64"
        >
          <div class="sidenav-content">
            <mat-nav-list>
              @for (item of navItems; track item.route) {
                <a
                  mat-list-item
                  [routerLink]="item.route"
                  routerLinkActive="active-link"
                  [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
                  (click)="onNavClick()"
                  class="nav-item"
                >
                  <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                  <span matListItemTitle>{{ item.label }}</span>
                </a>
              }
            </mat-nav-list>

            <div class="sidenav-footer">
              <div class="org-badge">
                <mat-icon>verified</mat-icon>
                <span>Community Connect v0.1</span>
              </div>
            </div>
          </div>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <router-outlet />
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .app-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .menu-toggle {
      margin-right: 8px;
    }

    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .brand-name {
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .toolbar-spacer {
      flex: 1;
    }

    .user-avatar-btn {
      margin-left: 4px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #26a69a, #00796b);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .user-menu-header {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;

      small {
        color: #64748b;
        font-size: 0.8rem;
      }
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .app-sidenav {
      width: 260px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
    }

    .sidenav-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 8px;
    }

    .nav-item {
      margin: 2px 8px;
      border-radius: 8px !important;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: #f1f5f9 !important;
      }
    }

    .active-link {
      background-color: #e8eaf6 !important;
      color: #3f51b5 !important;

      mat-icon {
        color: #3f51b5 !important;
      }
    }

    .sidenav-footer {
      margin-top: auto;
      padding: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .org-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #94a3b8;
      font-size: 0.75rem;

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: #26a69a;
      }
    }

    .main-content {
      background-color: #f5f5f5;
      min-height: calc(100vh - 64px);
    }

    @media (max-width: 768px) {
      .brand-name {
        font-size: 1rem;
      }

      .app-sidenav {
        width: 240px;
      }
    }
  `],
})
export class LayoutComponent {
  readonly authService = inject(AuthService);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Members', route: '/members', icon: 'people' },
    { label: 'Donations', route: '/donations', icon: 'volunteer_activism' },
    { label: 'Events', route: '/events', icon: 'event' },
  ];

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  onNavClick(): void {
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }
}
