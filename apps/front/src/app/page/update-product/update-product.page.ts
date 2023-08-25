import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage  implements OnInit {
  productUserStorage: any;
  storageOptions: any;

  constructor(
    private route: ActivatedRoute,
    private webApiService: WebApiService,
    private router: Router,
    private toastController: ToastController
    ) {

    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id !== null) {
            this.getProductUserStorage(Number(id)); // Conversion de la chaîne en nombre
        }
    });

    this.webApiService.getStorage().subscribe((data) => {
      this.storageOptions = data;
  }
    );

}

  getProductUserStorage(id: number) {
    this.webApiService.getProductUserStorage(id).subscribe((data) => {
      this.productUserStorage = data;
      if (this.productUserStorage && this.productUserStorage.storage) {
        this.productUserStorage.originalStorageId = this.productUserStorage.storage.id;
      };
      this.getStorageOptions(); // Ajoutez cette ligne pour récupérer les options d'emplacement
    });
  }

  getStorageOptions() {
    this.webApiService.getStorage().subscribe((data) => {
      this.storageOptions = data['hydra:member'];
    });
  }

  async updateProductUserStorage() {

    if (this.productUserStorage && this.productUserStorage.storage.id !== this.productUserStorage.originalStorageId) {

      let updatedData = {
        ...this.productUserStorage,
        storage: this.productUserStorage.storage
      };
      try {
        let data = await this.webApiService.updateProductUserStorage(this.productUserStorage.id, updatedData).toPromise();
        console.log('Product updated successfully!');
        this.productUserStorage = data;
        this.router.navigate(['/tabs/tab3']);
      } catch (error) {
        console.log('There was an error updating the product.');
      }
    } else {
      this.router.navigate(['/tabs/tab3']);
    }
  }

    updateStorage(storageId: number) {
      this.productUserStorage.storage.id = storageId;
    }

    deleteProductUserStorage(id: number) {
      this.webApiService.deleteProductUserStorage(id).subscribe((data) => {
        this.productUserStorage = data;
      }
      );
    }

    increaseQuantity() {
      if (this.productUserStorage && this.productUserStorage.quantity) {
        this.productUserStorage.quantity++;
      }
    }

    async decreaseQuantity() {
      if (this.productUserStorage && this.productUserStorage.quantity && this.productUserStorage.quantity > 0) {
        this.productUserStorage.quantity--;
      } else {
        const toast = await this.toastController.create({
          message: 'Produit terminé !',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    }

}
