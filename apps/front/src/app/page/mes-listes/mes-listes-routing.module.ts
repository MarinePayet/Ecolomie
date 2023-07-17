import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesListesPage } from './mes-listes.page';

const routes: Routes = [
  {
    path: '',
    component: MesListesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesListesPageRoutingModule {}
