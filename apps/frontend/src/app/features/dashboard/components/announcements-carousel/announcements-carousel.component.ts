import {
  Component,
  input,
  signal,
  computed,
  effect,
  DestroyRef,
  inject,
} from '@angular/core';
import { DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Announcement } from '../../../../services/announcement.service';

@Component({
  selector: 'app-announcements-carousel',
  standalone: true,
  imports: [DatePipe, TitleCasePipe, MatIconModule, MatButtonModule, NgClass],
  template: `
    @if (isLoading()) {
      <div class="hero-skeleton"></div>
    } @else if (announcements().length === 0) {
      <div class="hero-empty">
        <mat-icon>campaign</mat-icon>
        <p>No announcements yet</p>
      </div>
    } @else {
      <div
        class="hero-carousel"
        (mouseenter)="pauseAutoScroll()"
        (mouseleave)="resumeAutoScroll()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      >
        <!-- Slides -->
        <div class="hero-slides-container">
          @for (announcement of announcements(); track announcement._id; let i = $index) {
            <div
              class="hero-slide"
              [ngClass]="{ 'active': i === currentIndex(), 'inactive': i !== currentIndex() }"
              [style.backgroundImage]="'url(' + announcement.imageUrl + ')'"
            >
              <div class="hero-overlay"></div>
              
              <div class="hero-content">
                <h1 class="hero-title">{{ announcement.title }}</h1>
                <h2 class="hero-subtitle">जय माता दी</h2>
                <p class="hero-description">{{ announcement.description }}</p>
                <div class="hero-meta">
                  <span class="category-badge" [attr.data-category]="announcement.category">
                    {{ announcement.category | titlecase }}
                  </span>
                  <span class="hero-date">
                    <mat-icon>event</mat-icon>
                    {{ announcement.eventDate | date:'mediumDate' }}
                  </span>
                </div>
                <button mat-flat-button class="hero-cta">
                  Learn More
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Navigation Arrows -->
        <button
          class="hero-nav-btn hero-nav-prev"
          mat-icon-button
          (click)="prev()"
          aria-label="Previous slide"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <button
          class="hero-nav-btn hero-nav-next"
          mat-icon-button
          (click)="next()"
          aria-label="Next slide"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>

        <!-- Slide Indicators -->
        <div class="hero-indicators">
          @for (announcement of announcements(); track announcement._id; let i = $index) {
            <button
              class="indicator-dot"
              [class.active]="i === currentIndex()"
              (click)="goTo(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1)"
            ></button>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .hero-skeleton {
      width: 100%;
      height: 60vh;
      min-height: 400px;
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
    }

    .hero-empty {
      width: 100%;
      height: 60vh;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      color: #94a3b8;
      gap: 16px;

      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
      }
    }

    .hero-carousel {
      position: relative;
      width: 100%;
      height: 60vh;
      min-height: 400px;
      max-height: 700px;
      overflow: hidden;
      background-color: #0f172a;
    }

    .hero-slides-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .hero-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      display: flex;
      align-items: center;
      z-index: 1;

      &.active {
        opacity: 1;
        z-index: 2;
      }
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 3;
      padding: 0 10%;
      max-width: 800px;
      color: white;
    }

    .hero-title {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 8px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .hero-subtitle {
      font-size: clamp(1.2rem, 2vw, 1.8rem);
      font-weight: 600;
      color: #fca5a5; /* Soft red/pink */
      margin-bottom: 24px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    }

    .hero-description {
      font-size: clamp(1rem, 1.2vw, 1.25rem);
      line-height: 1.6;
      margin-bottom: 32px;
      opacity: 0.9;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }

    .category-badge {
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      
      &[data-category="health"] { background: #e91e63; }
      &[data-category="community"] { background: #3f51b5; }
      &[data-category="charity"] { background: #4caf50; }
      &[data-category="festival"] { background: #ff9800; }
      &[data-category="education"] { background: #2196f3; }
      &[data-category="sports"] { background: #9c27b0; }
      /* Default fallback */
      &:not([data-category]) { background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); }
    }

    .hero-date {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
      opacity: 0.9;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }

    .hero-cta {
      background-color: #ef4444 !important; /* Red accent button like reference */
      color: white !important;
      font-size: 1rem !important;
      padding: 0 32px !important;
      height: 48px !important;
      border-radius: 24px !important;
      font-weight: 600 !important;
    }

    /* Navigation */
    .hero-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      background: rgba(0, 0, 0, 0.3) !important;
      color: white !important;
      width: 56px !important;
      height: 56px !important;
      transition: background 0.3s ease !important;
      backdrop-filter: blur(4px);

      &:hover {
        background: rgba(0, 0, 0, 0.6) !important;
      }

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        line-height: 32px;
      }
    }

    .hero-nav-prev {
      left: 24px;
    }

    .hero-nav-next {
      right: 24px;
    }

    /* Indicators */
    .hero-indicators {
      position: absolute;
      bottom: 24px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 12px;
      z-index: 10;
    }

    .indicator-dot {
      width: 48px;
      height: 4px;
      border-radius: 2px;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: background 0.3s ease;
      padding: 0;

      &.active {
        background: white;
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.6);
      }
    }

    @media (max-width: 768px) {
      .hero-content {
        padding: 0 24px;
        text-align: center;
      }

      .hero-overlay {
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%);
      }

      .hero-slide {
        align-items: flex-end;
        padding-bottom: 80px;
      }

      .hero-meta {
        justify-content: center;
      }

      .hero-nav-btn {
        display: none; /* Hide arrows on mobile, rely on swipe */
      }
      
      .indicator-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
    }
  `],
})
export class AnnouncementsCarouselComponent {
  announcements = input<Announcement[]>([]);
  isLoading = input<boolean>(false);

  private readonly destroyRef = inject(DestroyRef);

  readonly currentIndex = signal(0);
  readonly isAutoPlaying = signal(true);
  private autoScrollInterval: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;
  private touchCurrentX = 0;

  constructor() {
    // Start auto-scroll
    effect(() => {
      if (this.announcements().length > 0 && this.isAutoPlaying()) {
        this.startAutoScroll();
      } else {
        this.stopAutoScroll();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.stopAutoScroll();
    });
  }

  next(): void {
    if (this.announcements().length === 0) return;
    this.currentIndex.update((i) => (i + 1) % this.announcements().length);
  }

  prev(): void {
    if (this.announcements().length === 0) return;
    this.currentIndex.update((i) => (i === 0 ? this.announcements().length - 1 : i - 1));
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  pauseAutoScroll(): void {
    this.isAutoPlaying.set(false);
  }

  resumeAutoScroll(): void {
    this.isAutoPlaying.set(true);
  }

  private startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      this.next();
    }, 6000); // 6 seconds for hero slider
  }

  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  // Touch/swipe support
  onTouchStart(event: TouchEvent): void {
    this.pauseAutoScroll();
    this.touchStartX = event.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchCurrentX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    const diff = this.touchStartX - this.touchCurrentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }

    this.resumeAutoScroll();
  }
}

