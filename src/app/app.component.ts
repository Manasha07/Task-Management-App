import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './models/task.model';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  addOrUpdateTask(task: Task) {
    const existing = this.tasks.find(t => t.id === task.id);
    if (existing) {
      Object.assign(existing, task);
    } else {
      this.tasks.push({ ...task, id: Date.now().toString() });
    }
    this.selectedTask = null;
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }
}
