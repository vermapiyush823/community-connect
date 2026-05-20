import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<User | null>({
    id: 'mock-user-001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@community.org',
    avatar: '',
    role: 'President',
  });

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly userName = computed(() => this.currentUser()?.name ?? 'Guest');
  readonly userInitials = computed(() => {
    const name = this.currentUser()?.name ?? '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  getToken(): string {
    return 'mock-jwt-token-community-connect';
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
