import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ index: number, task: any }>();

  editingIndex: number | null = null;
  editedTask = { title: '', description: '', status: '', priority: '', dueDate: '', associatedProject: '' };

  startEdit(index: number) {
    this.editingIndex = index;
    this.editedTask = { ...this.tasks[index] };
  }

  saveEdit(index: number) {
    this.update.emit({ index, task: this.editedTask });
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  deleteTask(index: number) {
    this.delete.emit(index);
  }
}
