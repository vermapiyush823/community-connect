import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

export interface DashboardSummary {
  totalMembers: number;
  upcomingEvents: number;
  donationsThisMonth: number;
  activeVolunteers: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly summaryResponse = toSignal(
    this.http.get<DashboardSummary>('/api/dashboard/summary').pipe(
      catchError(() =>
        of<DashboardSummary>({
          totalMembers: 0,
          upcomingEvents: 0,
          donationsThisMonth: 0,
          activeVolunteers: 0,
        }),
      ),
    ),
  );

  readonly summary = computed(() => this.summaryResponse() ?? {
    totalMembers: 0,
    upcomingEvents: 0,
    donationsThisMonth: 0,
    activeVolunteers: 0,
  });

  readonly isLoading = computed(() => this.summaryResponse() === undefined);
}
