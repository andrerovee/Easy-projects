import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service'; //Autenticazione
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {} // Inietta il servizio

    logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}




 

