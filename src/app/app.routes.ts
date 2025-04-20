import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component'; // import it

export const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'projects/add', component: ProjectFormComponent },// this matches your button!
  { path: 'projects/edit/:id', component: ProjectFormComponent },
  { path: 'tasks', loadComponent: () => import('./components/task-list/task-list.component').then(m => m.TaskListComponent) },


];
