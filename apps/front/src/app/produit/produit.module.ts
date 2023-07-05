import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitPageRoutingModule } from './produit-routing.module';

import { ProduitPage } from './produit.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitPageRoutingModule,
    ScrollingModule
  ],
  declarations: [ProduitPage]
})
export class ProduitPageModule {}
