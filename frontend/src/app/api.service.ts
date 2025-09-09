import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutti i progetti backend
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  // Metodo per aggiungere un nuovo progetto
  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, project)
  }

  // Metodo per aggiornare un progetto
  updateProject(project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${project._id}`, project);
  }
  
  // Metodo per eliminare un progetto
  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${id}`);
  }

// Nuovi metodi per i task
getTasks(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/${projectId}/tasks`)
  }

addTask(projectId: string, task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/tasks`, task)
  }

 updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${task._id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }
}


