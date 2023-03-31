import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { PageComponent } from '../shared/page/page.component';
import { OrderListPage } from './order-list/order-list.page';
import { OrderCreatePage } from './order-create/order-create.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';

@NgModule({
  declarations: [OrderListPage, OrderCreatePage],
  imports: [CommonModule, OrdersRoutingModule, PageComponent, ReactiveFormsModule, ButtonComponent],
})
export class OrdersModule {}
