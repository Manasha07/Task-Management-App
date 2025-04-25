import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; 

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form-container">
      <h4 class="text-center mb-3">New Task</h4>
      <form (ngSubmit)="addTask()" #taskForm="ngForm" class="form-layout">
        <input type="text" [(ngModel)]="task.title" name="title" placeholder="Title" class="form-control input-sm" required>
        <input type="text" [(ngModel)]="task.description" name="description" placeholder="Description" class="form-control input-sm" required>

        <select [(ngModel)]="task.status" name="status" class="form-control input-sm" required>
          <option value="" disabled selected>Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select [(ngModel)]="task.priority" name="priority" class="form-control input-sm" required>
          <option value="" disabled selected>Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input type="date" [(ngModel)]="task.due_date" name="due_date" class="form-control input-sm" required>
        <input type="text" [(ngModel)]="task.project_id" name="project_id" placeholder="Project" class="form-control input-sm" required>

        <button type="submit" class="btn btn-success">Add</button>
      </form>
    </div>
  `,
 styles: [`
  .task-form-container {
    margin: 60px auto;
    max-width: 500px;
    background: #f9f9f9;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }

  h4 {
    font-weight: bold;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  input, select {
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  button.btn-success {
    padding: 12px;
    font-size: 14px;
    border-radius: 8px;
    font-weight: 500;
    background-color:rgb(40, 53, 167);
    border: none;
    color: white;
    transition: background-color 0.3s ease;
  }

  button.btn-success:hover {
    background-color:rgb(45, 33, 136);
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
    due_date: '',
    project_id: 0
    
  };



  addTask() {
    if (this.task.title && this.task.description && this.task.status && this.task.priority && this.task.due_date && this.task.project_id) {
      this.taskCreated.emit(this.task);
      this.task = {
        title: '',
        description: '',
        status: '',
        priority: '',
        due_date: '',
        project_id: 0
          
      };
    }
  }
}
