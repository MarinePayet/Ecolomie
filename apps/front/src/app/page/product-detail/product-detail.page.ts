import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productUserStorage: any;
  storageOptions: any;

  constructor(private route:ActivatedRoute, private webApiService: WebApiService, router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let id = params.get('id');
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
      console.log(this.storageOptions);
      console.log('prout');
    });
  }
  
  getStorageOptions() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storageOptions = data['hydra:member'];
      console.log(this.storageOptions)
    });
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

  deleteProductUserStorage(id: number) {
    this.webApiService.deleteProductUserStorage(id).subscribe((data) => {
      this.productUserStorage = data;
      console.log(this.productUserStorage);
    }
    );
  }
 
}

