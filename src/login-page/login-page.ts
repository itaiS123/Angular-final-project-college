import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  username: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  login() {
    if (this.username === '' || this.password === '') {
      this.message = 'Please enter both username and password';
      this.isError = true;
      return;
    }

    if (this.username === 'admin' && this.password === 'password123') {
      this.message = 'Login successful!';
      this.isError = false;
    } else {
      this.message = 'Invalid username or password';
      this.isError = true;
    }
  }

  reset() {
    this.username = '';
    this.password = '';
    this.message = '';
  }
}
