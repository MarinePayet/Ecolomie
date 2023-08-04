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
    private route: ActivatedRoute,
    private webApiService: WebApiService,
    private router: Router
    ) {}

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


  async updateProductUserStorage() {
    // Prepare the data to send
    let updatedData = {
      ...this.productUserStorage,
      storage: this.productUserStorage.storage // Send the full path to the storage
    };

    // Call your service to update the data
    try {
      let data = await this.webApiService.updateProductUserStorage(this.productUserStorage.id, updatedData).toPromise();
      console.log('Product updated successfully!');
      this.productUserStorage = data;
      this.router.navigate(['/tabs/tab3']);
    } catch (error) {
      console.log('There was an error updating the product.');
    }
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
