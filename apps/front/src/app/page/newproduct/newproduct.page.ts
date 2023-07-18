import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

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
    category: string;
    storage: string;
    name: string;
  };

  categories: any[] = [];
  storages: any[] = [];


  constructor(private apiService: ApiService, private toastController: ToastController) {
    this.product = {
      quantity: 0,
      dlc: '',
      nutriscore: '',
      category: '',
      storage: '',
      name: '',
    };
  }

  async addProduct() {

    this.product.category = '/api/categories/' + this.product.category;
    this.product.storage = '/api/storages/' + this.product.storage;

    try {
      const response = await this.apiService.addProduct(this.product).toPromise();

      const toast = await this.toastController.create({
        message: 'Produit ajouté avec succès.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } catch (error) {

      const toast = await this.toastController.create({
        message: 'Une erreur est survenue lors de l\'ajout du produit.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  getCategories() {
    this.apiService.getCategories().subscribe((data) => {
      this.categories = data['hydra:member'];
    });
  }

  getStorages() {
    this.apiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
    });
  }

  ionViewWillEnter() {
    this.getCategories();
    this.getStorages();
  }
}

