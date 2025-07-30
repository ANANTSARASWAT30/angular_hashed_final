import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/courses/search-results/search-results.component').then(m => m.SearchResultsComponent)
  },
  {
    path: 'course/:id',
    loadComponent: () => import('./features/courses/course-details/course-details.component').then(m => m.CourseDetailsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
