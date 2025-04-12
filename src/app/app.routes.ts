import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component'; // import it

export const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'projects/add', component: ProjectFormComponent }, // this matches your button!
];
