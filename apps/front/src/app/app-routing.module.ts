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
    path: 'update-product/:id',
    loadChildren: () => import('./page/update-product/update-product.module').then( m => m.UpdateProductPageModule)
  },
  {
    path: 'expiration-proche',
    loadChildren: () => import('./page/expiration-proche/expiration-proche.module').then( m => m.ExpirationProchePageModule)
  },
  {
    path: 'mes-listes',
    loadChildren: () => import('./page/mes-listes/mes-listes.module').then( m => m.MesListesPageModule)
  },
  {
    path: 'list-detail/:id',
    loadChildren: () => import('./page/list-detail/list-detail.module').then( m => m.ListDetailPageModule)
  },
  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
