import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.page.html',
  styleUrls: ['./newproduct.page.scss'],
})
export class NewproductPage {
  product!: {
    quantity: number;
    dlc: string;
    nutriscore: string;
    calorie: number;
    category: string;
    storage: string;
    name: string;
  };

  categories: any[] = [];
  storages: any[] = [];


  constructor(private apiService: ApiService) {
    this.product = {
      quantity: 0,
      dlc: '',
      nutriscore: '',
      calorie: 0,
      category: '',
      storage: '',
      name: '',
    };
  }

  addProduct() {
    // ...

    this.apiService.addProduct(this.product).subscribe(
      response => {
        // Traitement de la réponse
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
      }
    );
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data['hydra:member'];
      console.log(this.categories);
    });
  }

  getStorages() {
    this.apiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
    });
  }

  ionViewWillEnter() {
    this.getCategories();
    this.getStorages();
  }


}

