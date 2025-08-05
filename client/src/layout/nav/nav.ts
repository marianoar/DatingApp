import { Component, inject, signal } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  protected accountService = inject(AccountService);
  protected creds: any = {};
  // protected loggedIn = signal(false);

  login(){
    console.log(this.creds);
    this.accountService.login(this.creds)
    .subscribe({
      next: result => {
        // this.loggedIn.set(true);
        this.creds = {};
        console.log(result)
        
      },
      error: error=> console.log(error.message)
    })
  }
  logout() {
    this.accountService.logout();
  }
}
