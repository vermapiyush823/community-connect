export interface Announcement {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  category: AnnouncementCategory;
  eventDate: string;
  createdAt: string;
}

export type AnnouncementCategory =
  | 'health'
  | 'community'
  | 'charity'
  | 'festival'
  | 'education'
  | 'sports';
