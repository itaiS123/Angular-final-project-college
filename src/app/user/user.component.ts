import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserI } from '../models/user-i';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user?: UserI;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    if (this.user) this.edit.emit(this.user.id);
  }

  onDelete() {
    if (this.user) this.delete.emit(this.user.id);
  }
}
