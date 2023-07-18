import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductStorageUserPageRoutingModule } from './product-storage-user-routing.module';

import { ProductStorageUserPage } from './product-storage-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductStorageUserPageRoutingModule
  ],
  declarations: [ProductStorageUserPage]
})
export class ProductStorageUserPageModule {}
