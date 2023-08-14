import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewproductForListPageRoutingModule } from './newproduct-for-list-routing.module';

import { NewproductForListPage } from './newproduct-for-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewproductForListPageRoutingModule
  ],
  declarations: [NewproductForListPage]
})
export class NewproductForListPageModule {}
