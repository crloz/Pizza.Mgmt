import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderListPage } from './order-list/order-list.page';
import { OrderCreatePage } from './order-create/order-create.page';

const routes: Routes = [
  { path: '', component: OrderListPage },
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
