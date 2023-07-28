import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'newproduct',
    loadChildren: () => import('./page/newproduct/newproduct.module').then( m => m.NewproductPageModule)
  },

  {
    path: 'product-detail/:id',
    loadChildren: () => import('./page/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'expiration-proche',
    loadChildren: () => import('./page/expiration-proche/expiration-proche.module').then( m => m.ExpirationProchePageModule)
  },
  {
    path: 'mes-listes',
    loadChildren: () => import('./page/mes-listes/mes-listes.module').then( m => m.MesListesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
