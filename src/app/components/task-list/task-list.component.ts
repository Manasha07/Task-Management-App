import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  editingIndex: number | null = null;
  editedTask = { title: '', description: '', status: '', priority: '', due_date: '',project_id:0};

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: any[]) => {
      this.tasks = data;

      this.route.queryParams.subscribe(params => {
        const projectId = +params['projectId'];
        if (projectId) {
          this.filteredTasks = this.tasks.filter(task => task.projectId === projectId);
        } else {
          this.filteredTasks = this.tasks;
        }
      });
    });
  }

  startEdit(index: number) {
    this.editingIndex = index;
    const task = { ...this.filteredTasks[index] };

    // Format dueDate to YYYY-MM-DD for input[type="date"]
    if (task.due_date) {
      const date = new Date(task.due_date);
      task.due_date = date.toISOString().substring(0, 10);
    }

    this.editedTask = task;
  }

  saveEdit(index: number) {
    const taskId = this.filteredTasks[index].id;
    this.taskService.updateTask(taskId, this.editedTask).subscribe(() => {
      this.filteredTasks[index] = { ...this.editedTask };
      this.editingIndex = null;
    });
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteTask(index: number) {
    const taskId = this.filteredTasks[index].id;
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.filteredTasks.splice(index, 1);
    });
  }
}
