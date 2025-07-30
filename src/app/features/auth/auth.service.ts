import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from '../../core/data.service';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private apiUrl = 'http://localhost:3000/users';

  constructor(private dataService: DataService) {}

  signUp(user: User): Observable<User> {
    // For demo: just return the user object (no real persistence)
    return of(user);
  }

  signIn(username: string, password: string): Observable<User[]> {
    // For demo: fetch users from db.json and filter
    return new Observable<User[]>(observer => {
      this.dataService.getUsers().subscribe({
        next: (users) => {
          const found = users.filter((u: any) => u.username === username && u.password === password);
          observer.next(found);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
