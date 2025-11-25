import { Component } from '@angular/core';
import { UserI } from '../app/models/user-i';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements UserI{
  id!: number;
  name!: string
  password!: string;

  constructor(id!: number, name!: string, password!: string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
