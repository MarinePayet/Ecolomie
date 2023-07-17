import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesListesPageRoutingModule } from './mes-listes-routing.module';

import { MesListesPage } from './mes-listes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesListesPageRoutingModule
  ],
  declarations: [MesListesPage]
})
export class MesListesPageModule {}
