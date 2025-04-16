// src/app/models/task.model.ts
export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  projectId: number;
}
