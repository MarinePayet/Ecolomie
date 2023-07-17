import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpirationProchePage } from './expiration-proche.page';

const routes: Routes = [
  {
    path: '',
    component: ExpirationProchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpirationProchePageRoutingModule {}
