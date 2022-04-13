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
    path: '**',
    redirectTo: 'app/dashboard',
  },
];
