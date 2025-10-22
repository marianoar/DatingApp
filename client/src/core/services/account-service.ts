import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, RegisterCredentials, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseUrl = environment.apiUrl;

  register(creds: RegisterCredentials) {
    console.log('Registering user with credentials:', creds);
    return this.http.post<User>(this.baseUrl + 'account/register', creds)
    .pipe(
      tap((user) => {
        if(user)
          this.setCurrentUser(user);
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(creds: LoginCredentials) {
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
