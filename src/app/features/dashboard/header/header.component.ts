import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // (removed duplicate constructor)
  // --- Autocomplete ---
  searchText = '';
  showAutocomplete = false;
  isInputFocused = false;
  allCourses: string[] = [];
  get filteredCourses() {
    if (!this.searchText) return [];
    return this.allCourses.filter(c => c.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  onSearchInput(e: Event) {
    this.showAutocomplete = !!this.searchText || this.isInputFocused;
  }
  onSearchFocus() {
    this.isInputFocused = true;
    this.showAutocomplete = !!this.searchText || this.isInputFocused;
  }
  onSearchBlur() {
    setTimeout(() => {
      this.isInputFocused = false;
      this.showAutocomplete = false;
    }, 200);
  }
  selectSuggestion(s: string) {
    this.searchText = s;
    this.showAutocomplete = false;
    this.goToSearch();
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchText.trim()) {
      this.goToSearch();
    }
  }

  goToSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchText.trim() } });
    }
  }
  clearSearch() {
    this.searchText = '';
    this.showAutocomplete = false;
  }
  // --- Profile Dropdown ---
  showProfileDropdown = false;
  user: any = null;
  constructor(private router: Router, private dataService: DataService) {
    // Fetch all course titles for autocomplete
    this.dataService.getCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses.map((c: any) => c.title);
      }
    });
    // Fetch user profile (simulate userId=1 for demo)
    this.dataService.getUserById(1).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
  closeProfileDropdown() {
    this.showProfileDropdown = false;
  }
}
