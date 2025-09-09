import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service'; //Autenticazione
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,/*  Register, Login */],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class Projects implements OnInit {
  projects: any[] = [];
  newProject = { name: '', description: '', status: ''} //oggetto per il form
  newTask = { name: ''} 

  selectedProject: any = null;

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router
  ) {} // Inietta il servizio

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
    this.fetchProjects(); //Funzione per caricare i progetti
    }
  }

  fetchProjects(): void {
    this.apiService.getProjects().subscribe(data => {
      this.projects = data;
    });
    }

    addProject(): void {
      this.apiService.addProject(this.newProject).subscribe(addedProject => {
        this.projects.push(addedProject); // Aggiungi il nuovo progetto alla lista
        this.newProject = { name: '', description: '', status: ''}; // Resetta il form
      });
    }

    // Funzione per selezionare un progetto e mostrarlo nel form di modifica
    selectProject(project: any): void {
      this.selectedProject = { ...project }; // Usa lo spread operator per copiare l'oggetto
    }

    // Funzione per aggiornare un progetto
    updateProject(): void {
      this.apiService.updateProject(this.selectedProject).subscribe(updatedProject => {
        const index = this.projects.findIndex(p => p._id === updatedProject._id);
        if (index > -1) {
        this.projects[index] = updatedProject;
        }
        this.selectedProject = null; // Resetta la selezione
      });
    }

    // Funzione per eliminare un progetto
    deleteProject(id: string): void {
      this.apiService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p._id !== id);
      });
    }

      // Funzioni per i task
  loadTasks(projectId: string): void {
    this.apiService.getTasks(projectId).subscribe((tasks: any) => {
      const project = this.projects.find((p: { _id: any; }) => p._id === projectId);
      if (project) {
        project.tasks = tasks;
      }
    });
  }

      addTask(projectId: string): void {
    this.apiService.addTask(projectId, this.newTask).subscribe((task: any) => {
      const project = this.projects.find((p: { _id: any }) => p._id === projectId);
      if (project) {
        if (!project.tasks) {
          project.tasks = [];
        }
        project.tasks.push(task);
        this.newTask = { name: '' };
      }
    });
  }

  toggleTaskCompletion(task: any): void {
    task.isCompleted = !task.isCompleted;
    this.apiService.updateTask(task).subscribe();
  }

  deleteTask(taskId: string): void {
    this.apiService.deleteTask(taskId).subscribe(() => {
      this.projects.forEach((project: { tasks: any[] }) => {
        if (project.tasks) {
          project.tasks = project.tasks.filter((t: { _id: any }) => t._id !== taskId);
        }
      });
    });
  }

    logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  }