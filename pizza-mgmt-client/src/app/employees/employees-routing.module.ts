import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create/create.page';
import { ListPageComponent } from './list/list.page';
import { EditPageComponent } from './edit/edit.page';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  {
    path: 'add',
    component: CreatePageComponent,
  },
  {
    path: 'edit/:id',
    component: EditPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
