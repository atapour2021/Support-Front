import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/gaurd/auth.gaurd';
import { BaseComponent, ContentComponent } from './layout';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routing';

const routes: Routes = [
  {
    path: 'app',
    component: ContentComponent,
    children: CONTENT_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: BaseComponent,
    loadChildren: () => import('./auth').then((m) => m.AuthModule),
  },

  { path: '**', redirectTo: 'app/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
