import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routing';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: CONTENT_ROUTES,
  },

  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
