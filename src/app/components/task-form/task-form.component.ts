import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  template: `
    <div class="form-container">
      <h2>New Task</h2>
      <form (ngSubmit)="addTask()" #taskForm="ngForm">
        <input type="text" placeholder="Title" [(ngModel)]="title" name="title" required />
        <input type="text" placeholder="Description" [(ngModel)]="description" name="description" required />
        <button type="submit">Add</button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      margin-bottom: 20px;
    }

    input {
      margin: 5px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #27ae60;
    }
  `]
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<{ title: string, description: string }>();

  title: string = '';
  description: string = '';

  addTask() {
    if (this.title.trim() && this.description.trim()) {
      this.taskCreated.emit({ title: this.title, description: this.description });
      this.title = '';
      this.description = '';
    }
  }
}
