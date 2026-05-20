import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./features/members/members.component').then(
            (m) => m.MembersComponent,
          ),
      },
      {
        path: 'donations',
        loadComponent: () =>
          import('./features/donations/donations.component').then(
            (m) => m.DonationsComponent,
          ),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./features/events/events.component').then(
            (m) => m.EventsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
