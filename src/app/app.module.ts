import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
<<<<<<< HEAD
  imports: [
    BrowserModule,
    TaskListComponent,
    TaskFormComponent
=======
  declarations: [
    // add other components like ProjectFormComponent, etc.
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    AppComponent,
    TaskFiltersComponent,
    TaskFormComponent,
    ProjectFormComponent,
    ProjectListComponent
>>>>>>> 4c9660a (third commit)
  ],
  providers: [],
  // Removed bootstrap array as AppComponent is a standalone component
})
export class AppModule { }
