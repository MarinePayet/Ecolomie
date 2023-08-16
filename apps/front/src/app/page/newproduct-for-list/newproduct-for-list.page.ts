import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiForListService } from './api-for-list.service';

@Component({
  selector: 'app-newproduct-for-list',
  templateUrl: './newproduct-for-list.page.html',
  styleUrls: ['./newproduct-for-list.page.scss'],
})
export class NewproductForListPage implements OnInit {
  product!: {
    quantity: number;
    category: string;
    name: string;
  };

  categories: any[] = [];

  constructor(private apiForListService: ApiForListService, private toastController: ToastController) {
    this.product = {
      quantity: 0,
      category: '',
      name: '',
    };
   }

  ngOnInit() {
  }

}

// async addProduct() {

//   this.product.category = '/api/categories/' + this.product.category;

//   try {
//     const response = await this.apiForListService.addProduct(this.product).toPromise();

//     const toast = await this.toastController.create({
//       message: 'Produit ajouté avec succès.',
//       duration: 2000,
//       position: 'bottom'
//     });
//     toast.present();
//   } catch (error) {

//     const toast = await this.toastController.create({
//       message: 'Une erreur est survenue lors de l\'ajout du produit.',
//       duration: 2000,
//       position: 'bottom',
//       color: 'danger'
//     });
//     toast.present();
//   }
// }
// export class NewproductPage {



//   getCategories() {
//     this.apiService.getCategories().subscribe((data) => {
//       this.categories = data['hydra:member'];
//     });
//   }

//   getStorages() {
//     this.apiService.getStorages().subscribe((data) => {
//       this.storages = data['hydra:member'];
//     });
//   }

//   ionViewWillEnter() {
//     this.getCategories();
//     this.getStorages();
//   }
// }


