import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>{{ task?.id ? 'Edit Task' : 'New Task' }}</h2>
      <form (ngSubmit)="submitForm()">
        <input [(ngModel)]="taskData.title" name="title" placeholder="Title" required />
        <textarea [(ngModel)]="taskData.description" name="description" placeholder="Description"></textarea>
        <button type="submit">{{ task?.id ? 'Update' : 'Add' }}</button>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() onSubmit = new EventEmitter<Task>();

  taskData: Task = { id: '', title: '', description: '' };

  ngOnChanges() {
    this.taskData = this.task ? { ...this.task } : { id: '', title: '', description: '' };
  }

  submitForm() {
    this.onSubmit.emit(this.taskData);
  }
}
