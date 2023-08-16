import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorageDetailPageRoutingModule } from './storage-detail-routing.module';

import { StorageDetailPage } from './storage-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorageDetailPageRoutingModule
  ],
  declarations: [StorageDetailPage]
})
export class StorageDetailPageModule {}
