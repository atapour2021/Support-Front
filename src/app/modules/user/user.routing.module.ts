import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './view/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { breadcrumb: 'کاربران' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
RouterModule.forRoot(routes, { useHash: false });
