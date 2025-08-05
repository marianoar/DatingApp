import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUrl = 'https://localhost:XXXX/api/';

  login(creds: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds)
    .pipe(
      tap((user) => {
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
