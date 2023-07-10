import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditerPageRoutingModule } from './editer-routing.module';

import { EditerPage } from './editer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditerPageRoutingModule
  ],
  declarations: [EditerPage]
})
export class EditerPageModule {}
