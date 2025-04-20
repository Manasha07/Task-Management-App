import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form-container">
      <h4 class="text-center mb-3">New Task</h4>
      <form (ngSubmit)="addTask()" #taskForm="ngForm" class="d-flex flex-wrap justify-content-center gap-2">
        <input type="text" [(ngModel)]="task.title" name="title" placeholder="Title" class="form-control input-sm" required>
        <input type="text" [(ngModel)]="task.description" name="description" placeholder="Description" class="form-control input-sm" required>
        
        <select [(ngModel)]="task.status" name="status" class="form-control input-sm" required>
          <option value="" disabled selected>Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select [(ngModel)]="task.priority" name="priority" class="form-control input-sm" required>
          <option value="" disabled selected>Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input type="date" [(ngModel)]="task.dueDate" name="dueDate" class="form-control input-sm" required>
        <input type="text" [(ngModel)]="task.project" name="project" placeholder="Project" class="form-control input-sm" required>

        <button type="submit" class="btn btn-success">Add</button>
      </form>
    </div>
  `,
  styles: [`
    .task-form-container {
      text-align: center;
      padding: 20px;
      margin: 0 auto;
      max-width: 900px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    input, select {
      margin: 5px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 150px;
    }

    .form-control.input-sm {
      font-size: 14px;
    }

    .btn-success {
      padding: 8px 16px;
    }
  `]
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<any>();

  task = {
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    project: ''
  };

  addTask() {
    if (this.task.title && this.task.description && this.task.status && this.task.priority && this.task.dueDate && this.task.project) {
      this.taskCreated.emit(this.task);
      this.task = {
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: '',
        project: ''
      };
    }
  }
}
