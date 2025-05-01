import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskFiltersComponent } from '../task-filters/task-filters.component';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule,TaskFiltersComponent],
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
    this.route.queryParams.subscribe(params => {
      const projectId = +params['projectId'];
  
      if (projectId) {
        // Call getTasksByProjectId if projectId exists
        this.taskService.getTasksByProject(projectId).subscribe((data: any[]) => {
          this.tasks = data;
          this.filteredTasks = this.tasks;
        });
      } else {
        // Otherwise fetch all tasks
        this.taskService.getTasks().subscribe((data: any[]) => {
          this.tasks = data;
          this.filteredTasks = this.tasks;
        });
      }
    });
  }
  onFiltersChanged(filters: {
    status?: string;
    priority?: string;
    dueDate?: string | Date;
  }) {
    this.filteredTasks = this.tasks.filter(task => {
      // 1) status & priority
      const matchesStatus   = !filters.status   || task.status   === filters.status;
      const matchesPriority = !filters.priority || task.priority === filters.priority;
  
      // 2) extract Y-M-D from task.due_date
      const taskDateStr = task.due_date.toString().slice(0, 10);
  
      // 3) normalize filters.dueDate to a string
      let filterDateStr: string | undefined;
      if (filters.dueDate) {
        filterDateStr = filters.dueDate instanceof Date
          ? filters.dueDate.toISOString().slice(0, 10)
          : filters.dueDate;
      }
  
      // 4) compare
      const matchesDueDate = !filterDateStr || taskDateStr === filterDateStr;
  
      return matchesStatus && matchesPriority && matchesDueDate;
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
