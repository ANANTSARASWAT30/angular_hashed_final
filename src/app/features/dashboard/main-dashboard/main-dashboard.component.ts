
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { StatisticsCardsComponent } from '../statistics-cards/statistics-cards.component';
import { CourseCarouselComponent } from '../course-carousel/course-carousel.component';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [HeaderComponent, StatisticsCardsComponent, CourseCarouselComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {
  lastViewedCourses: any[] = [];
  newlyLaunchedCourses: any[] = [];
  constructor(private dataService: DataService) {
    // Simulate userId=1 for demo
    this.dataService.getUserEnrollments(1).subscribe({
      next: (enrollments: any[]) => {
        this.dataService.getCourses().subscribe({
          next: (courses: any[]) => {
            this.lastViewedCourses = enrollments.map((enroll: any) => {
              const course = courses.find((c: any) => c.id === enroll.courseId);
              return course ? { ...course, progress: enroll.progressPercent } : null;
            }).filter((c: any) => !!c);
            // For newly launched, show the 10 latest published courses
            this.newlyLaunchedCourses = courses
              .sort((a: any, b: any) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
              .slice(0, 10);
          }
        });
      }
    });
  }
}
