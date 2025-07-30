
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course: any;
  getProgressClass(progress: number): string {
    if (progress >= 80) return 'progress-green';
    if (progress >= 50) return 'progress-yellow';
    return 'progress-red';
  }
}
