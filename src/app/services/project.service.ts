import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/projects';
  constructor(private http:HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, project);
  }
}
