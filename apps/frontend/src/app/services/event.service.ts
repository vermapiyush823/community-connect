import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  bannerImage: string;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly http = inject(HttpClient);

  // TEMPORARY DUMMY DATA FOR DEMO PURPOSES
  private readonly DUMMY_EVENTS: CommunityEvent[] = [
    {
      _id: '101',
      title: 'Weekend Yoga & Meditation',
      description: 'Start your weekend with peace and mindfulness. Join our expert instructors for a free 2-hour session suitable for all ages.',
      venue: 'Community Park, Main Pavilion',
      date: new Date(Date.now() + 86400000 * 2).toISOString(),
      bannerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop'
    },
    {
      _id: '102',
      title: 'Blood Donation Drive',
      description: 'Give the gift of life. We are hosting a blood donation drive in collaboration with the Red Cross. Refreshments will be provided.',
      venue: 'Community Hall Center',
      date: new Date(Date.now() + 86400000 * 8).toISOString(),
      bannerImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2000&auto=format&fit=crop'
    },
    {
      _id: '103',
      title: 'Annual Charity Gala Dinner',
      description: 'Our biggest fundraising event of the year. Enjoy a night of fine dining, auctions, and entertainment to support local schools.',
      venue: 'The Grand Hotel Banquet',
      date: new Date(Date.now() + 86400000 * 30).toISOString(),
      bannerImage: 'https://images.unsplash.com/photo-1519671482749-fd09871171dd?q=80&w=2000&auto=format&fit=crop'
    }
  ];

  private readonly upcomingResponse = toSignal(
    of(this.DUMMY_EVENTS)
    // this.http.get<CommunityEvent[]>('/api/events/upcoming').pipe(
    //   catchError(() => of<CommunityEvent[]>([])),
    // ),
  );

  readonly upcomingEvents = computed(() => this.upcomingResponse() ?? []);
  readonly isLoading = computed(() => this.upcomingResponse() === undefined);
}
