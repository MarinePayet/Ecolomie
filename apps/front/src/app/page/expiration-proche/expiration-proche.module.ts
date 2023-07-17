import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpirationProchePageRoutingModule } from './expiration-proche-routing.module';

import { ExpirationProchePage } from './expiration-proche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpirationProchePageRoutingModule
  ],
  declarations: [ExpirationProchePage]
})
export class ExpirationProchePageModule {}
