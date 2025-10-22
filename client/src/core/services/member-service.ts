import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../../types/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members'); 
    // remuevo el getHttpOptions() because el token es added by the interceptor
  }
  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }
  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token
  //     })
  //   }
  // }
}
