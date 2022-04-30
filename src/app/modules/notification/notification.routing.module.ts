import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NotificationComponent } from './view/Notification/Notification.component';

const routes: Routes = [
  {
    path: '',
    // component: NotificationComponent,
    data: { breadcrumb: 'اعلان ها' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
RouterModule.forRoot(routes, { useHash: false });
