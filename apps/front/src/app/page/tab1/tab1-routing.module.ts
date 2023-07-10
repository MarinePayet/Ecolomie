import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ProduitPage } from '../produit/produit.page';
import { LoginPage } from '../login/login.page';


const routes: Routes = [
  {
    path: '', component: Tab1Page,
    children: [
      {
        path: 'produit', component: ProduitPage,
      },

      {
        path: 'login',  component: LoginPage,
      },

      {
        path: 'editer', loadChildren: () => import('../editer/editer.module').then( m => m.EditerPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Tab1PageRoutingModule {}
