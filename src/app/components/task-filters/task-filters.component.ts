import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './task-filters.component.html',
  styleUrls: []
})
export class TaskFiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: [''],
      priority: [''],
      dueDate: ['']
    });
  }

  emitFilters() {
    this.filtersChanged.emit(this.filterForm.value);
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filterForm.value);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filtersChanged.emit({});
  }
}
