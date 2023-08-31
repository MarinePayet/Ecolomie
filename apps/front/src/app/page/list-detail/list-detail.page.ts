  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { WebApiService } from 'src/app/service/web-api.service';
  import { AuthService } from '../login/auth.service';
  import { ActivatedRoute } from '@angular/router';
  import { AlertController } from '@ionic/angular';
  import { ToastController } from '@ionic/angular';


  @Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.page.html',
    styleUrls: ['./list-detail.page.scss'],
  })

  export class ListDetailPage implements OnInit {

    productsOfMyList: any;
    productOfMyList: any;
    idList?: number;
    myListProducts: any;
    loggedIn: boolean;

    constructor(
      private webApiService: WebApiService,
      private router: Router,
      public authService: AuthService,
      private route: ActivatedRoute,
      private AlertController: AlertController,
      private toastController: ToastController,
      ) {
        this.loggedIn = false;
      }

      ngOnInit() {
        this.ionViewWillEnter();
        this.authService.loggedIn$.subscribe(isLoggedIn => {
          this.loggedIn = isLoggedIn;
          if (!isLoggedIn) {
            console.log('Utilisateur non connecté, redirection vers la connexion.');
            this.router.navigate(['/login']);
          } else {
            this.route.paramMap.subscribe(params => {
              const idListParam = params.get('id');
              if (idListParam !== null) {
                this.idList = Number(idListParam);
                if (!isNaN(this.idList)) {
                  this.getProductsOfMyList();
                }
              }
              this.getMyListWithProducts();
            });
          }
        });
      }

  ionViewWillEnter() {
    this.getProductsOfMyList();
    this.getMyListWithProducts();
  }

    getProductsOfMyList() {

      this.webApiService.getProductsForList().subscribe((data) => {
        this.productsOfMyList = data['hydra:member'];
      });
    }

    getMyListWithProducts() {
      this.webApiService.getMyListWithProducts().subscribe((data) => {
        this.myListProducts = data['hydra:member'];
        console.log(this.myListProducts);
      });
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }

    async openDeleteConfirm(productId: number) {
      const alert = await this.AlertController.create({
        header: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          }, {
            text: 'Supprimer',
            handler: () => {
              this.webApiService.deleteMyListWithProducts( Number(productId) ).subscribe(() => {
                this.getProductsOfMyList();
                this.presentToast('Le produit a été supprimé avec succès.');
              });
              this.ionViewWillEnter();
            }
          }
        ]
      });

      await alert.present();
    }

    decreaseQuantity(product: any) {
      if (product.quantity > 0) {
        product.quantity--;
        this.onUpdateMyListWithProducts(product);
      }
    }

    increaseQuantity(product: any) {
      product.quantity++;
      this.onUpdateMyListWithProducts(product);
    }

    async onUpdateMyListWithProducts(product: any) {
      try {
        const updatedData = {
          ...product,
        };

        let updatedProduct = await this.webApiService.updateMyListWithProducts(product.id, updatedData).toPromise();
        console.log('Product updated successfully!', updatedProduct);
        this.presentToast('Le produit a été mise à jour.');
      } catch (error) {
        console.log('There was an error updating the product.', error);
        this.presentToast("Une erreur s'est produite lors de la mise à jour de la quantité.");
      }
    }

    navigateToNewProductForListPage() {
      this.router.navigate(['/newproduct-for-list', this.idList]);
    }


    async onClickCheckBox(event: any, product: any) {
      event.stopPropagation();

      product.isProductBuy = !product.isProductBuy;
      try {
            const updatedData = {
              ...product,
            };
            console.log('updatedData')
            console.log(updatedData)

      let updatedBuying: any = await this.webApiService.updateIsProductBuy(product.id, updatedData).toPromise();
        console.log('isProductBuy updated successfully!', updatedBuying);
        this.presentToast('État d\'achat du produit mis à jour.');
      } catch (error) {
        console.log('There was an error updating isProductBuy.', error);
        this.presentToast('Une erreur s\'est produite lors de la mise à jour de l\'état d\'achat du produit.');
      }

      console.log('onClickCheckBox', product);
    }

    get isLoggedIn() {
      return this.authService.loggedIn$;
    }

    async onLogout() {
      this.authService.logout();
      console.log('Logout successful');
      this.presentToast('Logout successful');
      this.router.navigate(['/login']);
    }
  }
