import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user-service';
import { UserI } from '../models/user-i';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users: UserI[] = [];
  private sub?: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const logged = localStorage.getItem('loggedUser');
    if (!logged) {
      this.router.navigate(['/login']);
      return;
    }
    this.users = this.userService.getUsers();
    this.sub = this.userService.users$.subscribe((list) => {
      this.users = list;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  edit(userId: number) {
    this.router.navigate(['/edit', userId]);
  }

  delete(userId: number) {
    if (confirm('Delete user?')) {
      this.userService.deleteUser(userId);
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
