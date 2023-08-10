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
      console.log(this.idList)
      console.log(typeof(this.idList))
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

    
    async updateProductForList() {
      // Prepare the data to send
      let updatedData = {
        ...this.productOfMyList,
      };
  
      // Call your service to update the data
      try {
        let data = await this.webApiService.updateProductForList(this.productOfMyList.id, updatedData).toPromise();
        console.log('Product updated successfully!');
        this.productOfMyList = data;
        this.router.navigate(['/tabs/tab3']);
      } catch (error) {
        console.log('There was an error updating the product.');
      }
    }
    
    decreaseQuantity() {
      // console.log(this.productsOfMyList.quantity)
      console.log(this.productsOfMyList)
      console.log(this.productsOfMyList[0].quantity)
      console.log(typeof(Number(this.productsOfMyList[0].quantity)))
      console.log(this.productsOfMyList[0].name)
      // console.log(typeof (this.productsOfMyList))
      // for (const property in this.productsOfMyList) {
      //   console.log(`${property}: ${this.productsOfMyList[property]}`);
      // }
      if (Number(this.productsOfMyList.quantity) > 0) {
        Number(this.productsOfMyList.quantity--);
      }
      console.log('--');
    }
    
    increaseQuantity() {
      this.productsOfMyList.quantity++;
      console.log(this.productsOfMyList.quantity)
      console.log('++');
      // this.productsOfMyList[.quantity++;
      // console.log('++');
    }
    
  

  }
