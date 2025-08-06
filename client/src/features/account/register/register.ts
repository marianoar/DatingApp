import { Component } from '@angular/core';
import { RegisterCredentials } from '../../../types/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  protected creds = {} as RegisterCredentials;

  register(){

  }

  cancel() {
  }
}
