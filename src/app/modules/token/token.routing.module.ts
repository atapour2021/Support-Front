import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './view/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { breadcrumb: 'توکن' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenRoutingModule {}
RouterModule.forRoot(routes, { useHash: false });
