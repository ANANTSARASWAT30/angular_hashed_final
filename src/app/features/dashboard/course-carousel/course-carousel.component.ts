import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-carousel',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-carousel.component.html',
  styleUrl: './course-carousel.component.css'
})
export class CourseCarouselComponent {
  @Input() title = '';
  @Input() courses: any[] = [];
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef<HTMLElement>;

  scrollCarousel(direction: 'left' | 'right') {
    const carousel = this.carouselRef?.nativeElement;
    if (!carousel) return;
    const scrollAmount = 320;
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}

