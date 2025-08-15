import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  protected creds: any = {};
  // protected loggedIn = signal(false);

  login() {
    console.log(this.creds);
    this.accountService.login(this.creds).subscribe({
      next: (result) => {
        this.creds = {};
        this.router.navigateByUrl('/members');
      },
      error: (error) => console.log(error.message),
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
