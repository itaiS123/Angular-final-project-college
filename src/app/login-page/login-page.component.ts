import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserI } from '../models/user-i';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.message = 'Please enter both email and password';
      this.isError = true;
      return;
    }

    const found = this.userService.findUserByEmailAndPassword(this.email, this.password);
    if (found) {
      this.message = 'Login successful!';
      this.isError = false;
      localStorage.setItem('loggedUser', JSON.stringify(found));
      this.router.navigate(['/users']);
    } else {
      this.message = 'Invalid email or password';
      this.isError = true;
    }
  }

  reset() {
    this.email = '';
    this.password = '';
    this.message = '';
  }
}
