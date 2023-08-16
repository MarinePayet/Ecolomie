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

    constructor(
      private webApiService: WebApiService,
      private router: Router,
      public authService: AuthService,
      private route: ActivatedRoute,
      private AlertController: AlertController,
      private toastController: ToastController,
      ) {}

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.idList = Number(params.get('id'));
        if (this.idList !== null) {
            this.getProductsOfMyList();
          }
          console.log(this.getMyListWithProducts());
      });
    }

    getProductsOfMyList() {
      this.webApiService.getProductsForList().subscribe((data) => {
        this.productsOfMyList = data['hydra:member'];
        // console.log(this.productsOfMyList);
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

    onClickCheckBox(event: any, product: any) {
      event.stopPropagation();


      product.is_product_buy = !product.is_product_buy

      // if (product.is_product_buy === 0) {
      //   product.is_product_buy = 1;
      // } else if (product.is_product_buy === 1) {
      //   product.is_product_buy = 0;
      // }

      this.onUpdateMyListWithProducts(product);

      console.log('onClickCheckBox');
      console.log(product);
    }


  }
