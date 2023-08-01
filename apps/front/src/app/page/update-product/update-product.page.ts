import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage  implements OnInit {
  productUserStorage: any;
  storageOptions: any;

  constructor(
    private route:ActivatedRoute, 
    private webApiService: WebApiService, 
    router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        console.log('Product ID:', id);
        if (id !== null) {
            this.getProductUserStorage(Number(id)); // Conversion de la chaîne en nombre
        }
    });

    this.webApiService.getStorages().subscribe((data) => {
      this.storageOptions = data;
  }
    );
  }

  getProductUserStorage(id: number) {
    this.webApiService.getProductUserStorage(id).subscribe((data) => {
      this.productUserStorage = data;
      console.log(this.productUserStorage);
      this.getStorageOptions(); // Ajoutez cette ligne pour récupérer les options d'emplacement
      console.log(typeof(this.storageOptions));
      console.log('porut update');
    });
  }

  getStorageOptions() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storageOptions = data['hydra:member'];
    });
  }

  
  updateProductUserStorage() {
    console.log('Product ID to update:', this.productUserStorage.id);
  console.log('Product data to update:', this.productUserStorage);
    // Appelez votre service pour mettre à jour les données
    this.webApiService.updateProductUserStorage(this.productUserStorage.id, this.productUserStorage)
    .subscribe(
      data => {
        console.log('Product updated successfully!');
        this.productUserStorage = data; // Mettez à jour la propriété avec les nouvelles données du serveur
      },
      error => {
        console.log('There was an error updating the product.');
      }
      );
    }
    
    updateStorage(storageId: number) {
      this.productUserStorage.storage.id = storageId;
    }
    
    deleteProductUserStorage(id: number) {
      this.webApiService.deleteProductUserStorage(id).subscribe((data) => {
        this.productUserStorage = data;
        console.log(this.productUserStorage);
      }
      );
    }
    
    increaseQuantity() {
      if (this.productUserStorage && this.productUserStorage.quantity) {
        this.productUserStorage.quantity++;
      }
    }
  
    decreaseQuantity() {
      if (this.productUserStorage && this.productUserStorage.quantity && this.productUserStorage.quantity > 0) {
        this.productUserStorage.quantity--;
      }
    }

}
