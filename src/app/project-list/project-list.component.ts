import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projects: any[] = [];
  displayedColumns: string[] = ['name', 'description'];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
    });
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.fetchProjects();
    });
  }

  viewTasks(projectId: number): void {
    this.router.navigate(['/tasks'], { queryParams: { projectId } });
  }

}
