import { Component, Output, EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent {
  @Output() filterChange = new EventEmitter<any>();

  filters: {
    duration: string;
    rating: string;
    published: string;
    level: string;
  } = {
    duration: 'All',
    rating: 'All',
    published: 'All',
    level: 'All'
  };

  // Dropdown state for each group
  showDuration = true;
  showRating = true;
  showPublished = true;
  showLevel = true;

  toggleDropdown(group: 'duration' | 'rating' | 'published' | 'level') {
    switch (group) {
      case 'duration':
        this.showDuration = !this.showDuration;
        break;
      case 'rating':
        this.showRating = !this.showRating;
        break;
      case 'published':
        this.showPublished = !this.showPublished;
        break;
      case 'level':
        this.showLevel = !this.showLevel;
        break;
    }
  }

  setFilter(type: 'duration' | 'rating' | 'published' | 'level', value: string) {
    this.filters[type] = value;
    this.filterChange.emit({ [type]: value });
  }
}
