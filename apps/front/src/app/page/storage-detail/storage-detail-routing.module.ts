import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageDetailPage } from './storage-detail.page';

const routes: Routes = [
  {
    path: '',
    component: StorageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorageDetailPageRoutingModule {}
