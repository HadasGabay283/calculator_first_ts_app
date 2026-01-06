import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Com1 } from './com1/com1';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: Com1, canActivate: [authGuard] },
	{ path: '**', redirectTo: '' }
];
