import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modals/user.modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpCLicnet: HttpClient = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.httpCLicnet.get<User[]>('http://localhost:3000/users');
  }

  public getUserById(userId: number): Observable<User> {
    return this.httpCLicnet.get<User>(`http://localhost:3000/users/${userId}`);
  }
}
