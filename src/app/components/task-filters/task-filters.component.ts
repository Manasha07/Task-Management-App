import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.css']
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

  applyFilters(): void {
    this.filtersChanged.emit(this.filterForm.value);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filtersChanged.emit({});
  }
}
