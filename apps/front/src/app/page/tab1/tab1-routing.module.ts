import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { LoginPage } from '../login/login.page';


const routes: Routes = [
  {
    path: '', component: Tab1Page,
    children: [


      {
        path: 'login',  component: LoginPage,
      },
      {
        path: 'expiration-proche',
        loadChildren: () => import('../expiration-proche/expiration-proche.module').then(m => m.ExpirationProchePageModule)
      },
      {
        path: 'mes-listes',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class Tab1PageRoutingModule {}
