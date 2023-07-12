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
    user: string;
    season : string;
    unit : string;
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
      user: '/api/users/20',
      season : 'hiver',
      unit : 'kg'
    };
  }

  addProduct() {
    this.product.category = '/api/categories/' + this.product.category;
    this.product.storage = '/api/storages/' + this.product.storage;
    console.log('Product:', this.product);
    this.apiService.addProduct(this.product).subscribe(
      (data) => {
        console.log('Add product response:', data);
      },
      (error: HttpErrorResponse) => {
        console.log('Add product error:', error);
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

