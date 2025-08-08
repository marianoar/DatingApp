import { Component, inject, input, output } from '@angular/core';
import { RegisterCredentials, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCredentials;
  protected accountService = inject(AccountService);

  register() {

    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.error('Registration failed', error);
      }
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.creds = {} as RegisterCredentials;
  }
}
