import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log('Registrazione effettuata con successo!', response); //Reindirizza l'utente alla pagina di login
        alert('Registrazione avvenuta con successo! Ora puoi effettuare il login.');
        this.router.navigate(['/login']); // Reindirizza alla pagina di login
      },
      error => {
        console.error('Errore nella registrazione:', error); //Mostra l'errore
        alert('Errore nella registrazione. Probabile username gia\' in uso ');
        this.router.navigate(['/registration-failed']); //reinderizza alla pagina di errore
      }
    );
  }
}
