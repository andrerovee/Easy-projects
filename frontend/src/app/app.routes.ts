import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { App } from './app'; //Dashboard dei progetti
import { Projects } from './projects/projects';
import { authGuard } from './auth-guard';
import { RegistrationFailed } from './registration-failed/registration-failed';


export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    /* { path: '', component: App }, */
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'projects', component: Projects, canActivate: [authGuard] },
    { path: 'registration-failed', component: RegistrationFailed }
];
