import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpirationDepasseePageRoutingModule } from './expiration-depassee-routing.module';

import { ExpirationDepasseePage } from './expiration-depassee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpirationDepasseePageRoutingModule
  ],
  declarations: [ExpirationDepasseePage]
})
export class ExpirationDepasseePageModule {}
