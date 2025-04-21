// In task.model.ts
export interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  associatedProject: string;
  // project?: string; // ❌ Remove or make optional
}
