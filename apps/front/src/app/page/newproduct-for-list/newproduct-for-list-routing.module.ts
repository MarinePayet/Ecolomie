import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewproductForListPage } from './newproduct-for-list.page';

const routes: Routes = [
  {
    path: '',
    component: NewproductForListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewproductForListPageRoutingModule {}
