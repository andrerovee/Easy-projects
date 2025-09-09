import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login({ username: this.username, password: this.password}).subscribe(
      response => {
        console.log('Login effettuato con successo!', response); //Salva il token
        this.router.navigate(['/projects']); // Reindirizza l'utente alla dashboard dei progetti
      },
      error => {
        console.error('Errore nel login:', error); //Mostra l'errore
        alert('Credenziali non valide :(')
      }
    );
  }

}
