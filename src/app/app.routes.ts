import { Routes } from '@angular/router';
import { MainDashboardComponent } from './features/dashboard/main-dashboard/main-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', component: MainDashboardComponent },
  { path: 'search', loadComponent: () => import('./features/courses/search-results/search-results.component').then(m => m.SearchResultsComponent) },
  { path: 'course/:id', loadComponent: () => import('./features/courses/course-details/course-details.component').then(m => m.CourseDetailsComponent) }
];
