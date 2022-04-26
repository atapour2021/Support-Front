import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { breadcrumb: 'پروفایل' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
RouterModule.forRoot(routes, { useHash: false });
