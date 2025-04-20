import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Services
import { ProjectService } from '../../services/project.service';

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
  today: Date = new Date();
  isEditMode = false;
  projectId!: number;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      dueDate: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectId = +id;
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.form.patchValue({
        name: project.name,
        description: project.description,
        // dueDate: project.dueDate ? new Date(project.dueDate) : ''
      });
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

    const project = this.form.value;

    if (this.isEditMode) {
      this.projectService.updateProject(this.projectId, project).subscribe({
        next: () => {
          alert('Project updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating project:', err);
          alert('Failed to update project.');
        }
      });
    } else {
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
}
