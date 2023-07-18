import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductStorageUserPage } from './product-storage-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProductStorageUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductStorageUserPageRoutingModule {}
