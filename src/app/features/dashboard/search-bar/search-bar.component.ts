import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  courseNames: string[] = [];
  filteredNames: string[] = [];
  searchText: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getCourses().subscribe(courses => {
      this.courseNames = courses.map((c: any) => c.title);
    });
  }

  onInput(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredNames = this.courseNames.filter(name => name.toLowerCase().includes(value));
  }
}
