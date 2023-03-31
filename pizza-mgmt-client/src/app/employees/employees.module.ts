import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { PageComponent } from '../shared/page/page.component';
import { CreatePageComponent } from './create/create.page';

import { ListPageComponent } from './list/list.page';
import { DataTableComponent } from '../shared/data-table/data-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button/button.component';
import { NgIconComponent } from '@ng-icons/core';
import { EditPageComponent } from './edit/edit.page';
import { EmployeeFormComponent } from '../shared/employee-form/employee-form.component';
import { ToastComponent } from '../shared/toast/toast.component';

@NgModule({
  declarations: [CreatePageComponent, ListPageComponent, EditPageComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PageComponent,
    DataTableComponent,
    ReactiveFormsModule,
    ButtonComponent,
    NgIconComponent,
    EmployeeFormComponent,
    ToastComponent,
  ],
  exports: [],
})
export class EmployeesModule {}
