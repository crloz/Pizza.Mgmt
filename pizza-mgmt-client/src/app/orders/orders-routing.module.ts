import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderCreatePage } from './order-create/order-create.page';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  {
    path: 'add',
    component: OrderCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
