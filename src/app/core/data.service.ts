import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dbUrl = 'assets/db.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.courses));
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.courses.find((c: any) => c.id === id)));
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.users));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.users.find((u: any) => u.id === id)));
  }

  getCurriculumByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.curriculum[String(courseId)] || []));
  }

  getReviewsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.reviews[courseId] || []));
  }

  getQuizzesByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.quizzes[courseId] || []));
  }

  getUserEnrollments(userId: number): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.userEnrollments[userId] || []));
  }

  getBanners(): Observable<any[]> {
    return this.http.get<any>(this.dbUrl).pipe(map(db => db.banners));
  }
}
