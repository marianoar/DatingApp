import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);

  baseUrl = 'https://localhost:XXXX/api/';

  login(creds: any) {
    return this.http.post(this.baseUrl + 'account/login', creds);
  }
}
