import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserI } from '../models/user-i';

@Injectable({ providedIn: 'root' })
export class UserService {
  private storageKey = 'users';
  private users: UserI[] = [];
  private usersSubject = new BehaviorSubject<UserI[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.load();
  }

  private load() {
    const json = localStorage.getItem(this.storageKey);
    if (!json) {
      this.users = [{ id: 1, name: 'admin', email: 'admin@example.com', password: 'password123', role: 'admin' }];
      this.save();
    } else {
      try {
        this.users = JSON.parse(json) as UserI[];
        
        let changed = false;
        for (const u of this.users) {
          if (!u.email) {
            u.email = `${u.name}@example.com`;
            changed = true;
          }
        }
        if (changed) this.save();
      } catch (err) {
        console.error('Invalid users JSON', err);
        this.users = [];
      }
    }
    this.usersSubject.next([...this.users]);
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    this.usersSubject.next([...this.users]);
  }

  getUsers(): UserI[] {
    return [...this.users];
  }

  saveUsers(list: UserI[]) {
    this.users = [...list];
    this.save();
  }

  addUser(user: Omit<UserI, 'id'>): UserI {
    const id = this.nextId();
    const newUser: UserI = { id, ...user } as UserI;
    this.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(updated: UserI): boolean {
    const idx = this.users.findIndex((u) => u.id === updated.id);
    if (idx === -1) return false;
    this.users[idx] = { ...updated };
    this.save();
    return true;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    this.save();
  }

  findUserByEmailAndPassword(emailOrName: string, password: string): UserI | undefined {
    return this.users.find((u) => (u.email === emailOrName || u.name === emailOrName) && u.password === password);
  }

  findUserById(id: number): UserI | undefined {
    return this.users.find((u) => u.id === id);
  }

  private nextId(): number {
    if (!this.users.length) return 1;
    return Math.max(...this.users.map((u) => u.id)) + 1;
  }
}
