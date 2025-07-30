import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-grid',
  standalone: true,
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CourseGridComponent {
  @Input() courses: any[] = [];
  constructor(private router: Router) {}

  goToCourse(course: any) {
    if (course.id) {
      this.router.navigate(['/course', course.id]);
    }
  }
}
