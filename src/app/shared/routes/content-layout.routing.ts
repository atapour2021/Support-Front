import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules').then(m => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../../auth').then(m => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('../../modules').then(m => m.ProfileModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('../../modules').then(m => m.NotificationModule),
  },
  {
    path: 'users',
    loadChildren: () => import('../../modules').then(m => m.UserModule),
  },
  {
    path: 'advertises',
    loadChildren: () => import('../../modules').then(m => m.AdvertiseModule),
  },
  {
    path: 'tokens',
    loadChildren: () => import('../../modules').then(m => m.TokenModule),
  },
  {
    path: 'requests',
    loadChildren: () => import('../../modules').then(m => m.RequestModule),
  },

  {
    path: '**',
    redirectTo: 'app/dashboard',
  },
];
