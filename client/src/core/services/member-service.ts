import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../../types/member';
import { Photo } from '../../types/photo';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode = signal(false);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members');
    // remuevo el getHttpOptions() because el token es added by the interceptor
  }
  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }

getMemberPhotos(id: string) {
  return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
}
  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token
  //     })
  //   }
  // }
}
