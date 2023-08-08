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
  idList: any;
  // productUserStorages: any;

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
      this.idList = params.get('id');
      if (this.idList !== null) {
          this.getProductsOfMyList();
      }
    });
  }


  getProductsOfMyList() {
    this.webApiService.getProductsOfMyList().subscribe((data) => {
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

  increaseQuantity() {
    if (this.productsOfMyList && this.productsOfMyList.quantity) {
      this.productsOfMyList.quantity++;
    }
    console.log("+++")
  }
  
  decreaseQuantity() {
    if (this.productsOfMyList && this.productsOfMyList.quantity && this.productsOfMyList.quantity > 0) {
      this.productsOfMyList.quantity--;
    }
    console.log("___")
  }



}
