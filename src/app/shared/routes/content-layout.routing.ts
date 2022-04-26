import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules').then((m) => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('../../modules').then((m) => m.ProfileModule),
  },

  {
    path: '**',
    redirectTo: 'app/dashboard',
  },
];
