import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-course-banner',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './course-banner.component.html',
  styleUrls: ['./course-banner.component.css']
})
export class CourseBannerComponent {
  @Input() course: any;
}
