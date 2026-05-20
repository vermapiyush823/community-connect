import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

export interface Announcement {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  eventDate: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly http = inject(HttpClient);

  // TEMPORARY DUMMY DATA FOR DEMO PURPOSES
  private readonly DUMMY_ANNOUNCEMENTS: Announcement[] = [
    {
      _id: '1',
      title: 'Navratri Mahotsav 2026 Celebration',
      description: 'Join us for the grand 9-day Navratri festival. Experience divine aarti, cultural performances, and daily prasadam distributions. All community members are cordially invited.',
      imageUrl: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=2070&auto=format&fit=crop',
      category: 'festival',
      eventDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Monthly Community Townhall',
      description: 'Our regular monthly meetup to discuss upcoming community projects, budget allocations, and welcoming new members to our organization.',
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
      category: 'community',
      eventDate: new Date(Date.now() + 86400000 * 12).toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'Free Health & Wellness Camp',
      description: 'Partnering with City Hospital to provide free general checkups, eye exams, and basic medications for the underprivileged in our area.',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
      category: 'health',
      eventDate: new Date(Date.now() + 86400000 * 20).toISOString(),
      createdAt: new Date().toISOString(),
    }
  ];

  private readonly latestResponse = toSignal(
    of(this.DUMMY_ANNOUNCEMENTS)
    // this.http.get<Announcement[]>('/api/announcements/latest').pipe(
    //   catchError(() => of<Announcement[]>([])),
    // ),
  );

  readonly announcements = computed(() => this.latestResponse() ?? []);
  readonly isLoading = computed(() => this.latestResponse() === undefined);
}
