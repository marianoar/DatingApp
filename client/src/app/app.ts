import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  protected members = signal<any>([]);

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:7278/api/members'));

    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}
