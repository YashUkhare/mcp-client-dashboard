import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { loginRedirectGuard } from './auth/login-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [loginRedirectGuard],
    loadComponent: () => import('./auth/login/login').then((c) => c.LoginComponent)
  },
  {
    path: 'servers',
    canActivate: [authGuard],
    loadComponent: () => import('./servers/server-list/server-list').then((c) => c.ServerListComponent)
  },
  { path: '**', redirectTo: 'login' }
];
