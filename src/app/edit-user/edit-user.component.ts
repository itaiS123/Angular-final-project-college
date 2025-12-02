import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { UserI } from '../models/user-i';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id?: number;
  name = '';
  email = '';
  password = '';
  role = '';
  isEdit = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const logged = localStorage.getItem('loggedUser');
    if (!logged) {
      this.router.navigate(['/login']);
      return;
    }
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = parseInt(idParam, 10);
      const u = this.userService.findUserById(this.id);
      if (u) {
        this.name = u.name;
        this.email = u.email;
        this.password = u.password;
        this.role = u.role || '';
        this.isEdit = true;
      }
    }
  }

  save() {
    if (!this.name || !this.email || !this.password) {
      this.message = 'Please fill all required fields';
      return;
    }

    if (this.isEdit && this.id != null) {
      this.userService.updateUser({ id: this.id, name: this.name, email: this.email, password: this.password, role: this.role });
    } else {
      this.userService.addUser({ name: this.name, email: this.email, password: this.password, role: this.role });
    }
    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
