import { Component, OnInit } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService }    from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task = {
    title: '',
    description: '',
    status: '',
    priority: '',
    due_date: '',
    project_id: 0   //  <-- Will set this in ngOnInit
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // Pull projectId from the URL (?projectId=123)
    const pid = this.route.snapshot.queryParamMap.get('projectId');
    if (pid) {
      this.task.project_id = +pid;
    }
  }

  onSubmit() {
    // All fields are required by your backend
    if (
      !this.task.title ||
      !this.task.description ||
      !this.task.status ||
      !this.task.priority ||
      !this.task.due_date ||
      !this.task.project_id
    ) {
      alert('Please fill all fields (including a valid Project ID).');
      return;
    }

    this.taskService.createTask(this.task).subscribe({
      next: (response) => {
        console.log('Task created successfully:', response);
        this.router.navigate(['/tasks'], {
          queryParams: { projectId: this.task.project_id }
        });
      },
      error: (err) => {
        console.error('Failed to create task', err);
        // Show the exact message from backend if available
        const msg = err?.error?.message || 'Please try again.';
        alert('Failed to create task: ' + msg);
      }
    });
  }
}