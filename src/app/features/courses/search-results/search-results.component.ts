import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseGridComponent } from './course-grid.component';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../dashboard/header/header.component';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  standalone: true,
  imports: [CommonModule, CourseGridComponent, PaginationComponent, FormsModule, FilterSidebarComponent, HeaderComponent]
})
export class SearchResultsComponent {
  searchTerm = '';
  sort = 'Latest';
  page = 1;
  pageSize = 6;
  // Filter state
  filters = {
    duration: 'All',
    rating: 'All',
    published: 'All',
    level: 'All'
  };
  allCourses: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    // Set searchTerm from query param if present
    this.route.queryParams.subscribe((params: any) => {
      if (params['q']) {
        this.searchTerm = params['q'];
      }
    });
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load courses.';
        this.loading = false;
      }
    });
  }
  get courses() {
    // Filter logic using db.json fields
    let filtered = this.allCourses;
    if (this.filters.level !== 'All') {
      filtered = filtered.filter(c => c.difficulty === this.filters.level);
    }
    if (this.filters.rating !== 'All') {
      const min = parseFloat(this.filters.rating);
      filtered = filtered.filter(c => c.rating >= min);
    }
    // Add more filter logic for duration, published, etc.
    if (this.searchTerm) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }
  get totalPages() {
    // Use filtered count for pagination
    let filtered = this.allCourses;
    if (this.filters.level !== 'All') {
      filtered = filtered.filter(c => c.level === this.filters.level);
    }
    if (this.filters.rating !== 'All') {
      const min = parseFloat(this.filters.rating);
      filtered = filtered.filter(c => c.rating >= min);
    }
    // Add more filter logic for duration, published, etc.
    return Math.ceil(filtered.length / this.pageSize);
  }
  onPageChange(newPage: number) {
    this.page = newPage;
  }

  onFilterChange(filter: any) {
    this.filters = { ...this.filters, ...filter };
    this.page = 1;
  }
}
