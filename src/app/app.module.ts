import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
  imports: [
    BrowserModule,
    TaskListComponent,
    TaskFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
