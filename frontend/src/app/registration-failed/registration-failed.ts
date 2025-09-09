import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-failed',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './registration-failed.html',
  styleUrl: './registration-failed.css'
})
export class RegistrationFailed {
  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
