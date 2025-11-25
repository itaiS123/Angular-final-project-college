// user service incomplete
// needs father and son componnents

/*
import { Injectable } from '@angular/core';

export interface UserI {
  id: number;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'loginData';
  private users: UserI[] = [
    { id: 1, name: 'admin', password: 'password123' },
    { id: 2, name: 'user', password: 'pass123' },
  ];

  validateUser(username: string, password: string): boolean {
    return this.users.some((user) => user.name === username && user.password === password);
  }

  objectToJson(obj: LoginRecord[]): string {
    return JSON.stringify(obj, null, 2);
  }

  jsonToObject(jsonText: string): LoginRecord[] {
    try {
      return JSON.parse(jsonText);
    } catch (error) {
      console.error('Invalid JSON:', error);
      return [];
    }
  }

  saveLogin(username: string): void {
    const history = this.getLoginHistory();
    const record: LoginRecord = {
      username: username,
      timestamp: new Date().toLocaleString(),
    };
    history.push(record);

    const jsonText = this.objectToJson(history);
    localStorage.setItem(this.storageKey, jsonText);
  }

  getLoginHistory(): LoginRecord[] {
    const jsonText = localStorage.getItem(this.storageKey);
    if (!jsonText) {
      return [];
    }
    return this.jsonToObject(jsonText);
  }

  clearLoginHistory(): void {
    localStorage.removeItem(this.storageKey);
  }
}
*/
