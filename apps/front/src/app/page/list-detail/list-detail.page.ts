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
      });
    }

    getProductsOfMyList() {
      this.webApiService.getProductsForList().subscribe((data) => {
        this.productsOfMyList = data['hydra:member'];
        console.log(this.productsOfMyList);
      }
      );
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }

    async openDeleteConfirm(productId: string) {
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
              this.webApiService.deleteProduct(Number(productId)).subscribe(() => {
                this.getProductsOfMyList();
                this.presentToast('Le produit a été supprimé avec succès.');
              });
            }
          }
        ]
      });

      await alert.present();
    }

    decreaseQuantity(product: any, index: number) {
      if (product.quantity > 0) {
        product.quantity--;
        this.updateProductForList(product);
      }
    }
    
    increaseQuantity(product: any, index: number) {
      product.quantity++;
      this.updateProductForList(product);
    }
    
    async updateProductForList(product: any) {
      try {
        const updatedData = {
          ...product,
        };
    
        let updatedProduct = await this.webApiService.updateProductForList(product.id, updatedData).toPromise();
        console.log('Product updated successfully!', updatedProduct);
        this.presentToast('La quantité du produit a été mise à jour.');
      } catch (error) {
        console.log('There was an error updating the product.', error);
        this.presentToast("Une erreur s'est produite lors de la mise à jour de la quantité.");
      }
    }
    
  }
