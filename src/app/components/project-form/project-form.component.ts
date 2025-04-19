import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Services and routing
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  form!: FormGroup;
  today: Date = new Date(); // used to bind to [min]

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      dueDate: ['', Validators.required] // Include only if DB supports it
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      if (this.form.controls['name'].errors?.['maxlength']) {
        alert('Project name cannot exceed 50 characters!');
      } else if (this.form.controls['description'].errors?.['maxlength']) {
        alert('Description cannot exceed 200 characters!');
      } else {
        alert('Please fill out all required fields.');
      }
      return;
    }

    const project = {
      name: this.form.value.name,
      description: this.form.value.description
      // Uncomment this if you add due_date column in DB:
      // dueDate: this.form.value.dueDate
    };

    this.projectService.createProject(project).subscribe({
      next: () => {
        alert('Project created and stored successfully!');
        this.form.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating project:', err);
        alert('Failed to create project.');
      }
    });
  }
}
