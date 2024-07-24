import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersPage } from './pages/users/users.page';
import { GroupsPage } from './pages/groups/groups.page';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'users',
        component: UsersPage,
      },
      {
        path: 'groups',
        component: GroupsPage,
      },
      {
        path: '',
        redirectTo: '/groups',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
];
