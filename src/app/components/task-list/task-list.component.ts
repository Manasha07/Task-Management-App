import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="tasks.length; else empty">
      <div *ngFor="let task of tasks">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button (click)="onEdit.emit(task)">Edit</button>
        <button (click)="onDelete.emit(task.id)">Delete</button>
      </div>
    </div>
    <ng-template #empty>
      <p>No tasks available.</p>
    </ng-template>
  `
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
}
